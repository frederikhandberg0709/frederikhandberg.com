"use client";

import { useNostrEvents } from "nostr-react";
import BlogPost from "./BlogPost";
import { BLOG_AUTHOR_PUBKEY, BLOG_RELAY_URLS } from "@/config/nostr";
import { extractMediaUrls } from "@/utils/extractMediaUrls";
import { NostrEvent } from "@/utils/convertTimestamp";
import { useProfileContext } from "@/context/ProfileContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SimplePool } from "nostr-tools/pool";
import BlogMediaGrid from "./BlogMediaGrid";

interface BlogTimelineProps {
  filterType: string;
  view?: "timeline" | "media";
  activeSection?: string;
  maxElements?: number;
  searchQuery?: string;
}

const POSTS_PER_PAGE = 20;
const SCROLL_THRESHOLD = 500;
const PAGE_TIMEOUT_MS = 6000;
const EMPTY_PAGE_RETRIES = 1;

// Keep one reconnecting pool for the lifetime of the client bundle. The legacy
// nostr-react provider removes disconnected relays and never reconnects them.
const postsPool = new SimplePool();

export default function BlogTimeline({
  filterType,
  view = "timeline",
  // activeSection,
  maxElements,
  searchQuery = "",
}: BlogTimelineProps) {
  const [visibleReplies, setVisibleReplies] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [oldestTimestamp, setOldestTimestamp] = useState<number>(
    Math.floor(Date.now() / 1000),
  );
  const [accumulatedPosts, setAccumulatedPosts] = useState<NostrEvent[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [loadTriggerCount, setLoadTriggerCount] = useState(0);

  const logPagination = useCallback(
    (message: string, details: Record<string, unknown>) => {
      if (process.env.NODE_ENV !== "production") {
        console.debug(`[BlogTimeline pagination] ${message}`, details);
      }
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const fetchPage = async () => {
      setIsLoading(true);

      let receivedPosts: NostrEvent[] = [];

      for (let attempt = 0; attempt <= EMPTY_PAGE_RETRIES; attempt++) {
        try {
          receivedPosts = await postsPool.querySync(
            BLOG_RELAY_URLS,
            {
              authors: [BLOG_AUTHOR_PUBKEY],
              until: oldestTimestamp,
              kinds: [1],
              limit: POSTS_PER_PAGE,
            },
            { maxWait: PAGE_TIMEOUT_MS },
          );
        } catch (error) {
          console.error("Failed to fetch Nostr posts:", error);
        }

        if (cancelled || receivedPosts.length > 0) break;
      }

      if (cancelled) return;

      logPagination("request settled", {
        request: loadTriggerCount,
        received: receivedPosts.length,
        cursor: oldestTimestamp,
        reachedEnd: receivedPosts.length === 0,
      });

      if (receivedPosts.length === 0) {
        setHasMorePosts(false);
      } else {
        setAccumulatedPosts((previousPosts) => {
          const postsById = new Map(
            [...previousPosts, ...receivedPosts].map((post) => [post.id, post]),
          );

          return [...postsById.values()].sort(
            (first, second) => second.created_at - first.created_at,
          );
        });
      }

      setIsLoading(false);
    };

    void fetchPage();

    return () => {
      cancelled = true;
    };
  }, [loadTriggerCount, logPagination, oldestTimestamp]);

  const allPosts = accumulatedPosts;

  const originalPostIds = useMemo(
    () => allPosts.map((event) => event.id),
    [allPosts],
  );

  const { events: legacyReplies } = useNostrEvents({
    filter: {
      // Legacy text-note replies reference their parent post with a lowercase e tag.
      kinds: [1],
      "#e": originalPostIds,
      since: 0,
      limit: Math.max(100, originalPostIds.length * 2),
    },
    enabled: originalPostIds.length > 0,
  });

  const { events: nip22Replies } = useNostrEvents({
    filter: {
      // NIP-22 comments use uppercase E to identify the root post. Their
      // lowercase e tag identifies only the direct parent, which may be a comment.
      kinds: [1111],
      "#E": originalPostIds,
      since: 0,
      limit: Math.max(100, originalPostIds.length * 2),
    },
    enabled: originalPostIds.length > 0,
  });

  const replies = useMemo(
    () => [...legacyReplies, ...nip22Replies],
    [legacyReplies, nip22Replies],
  );

  const { events: mentions } = useNostrEvents({
    filter: {
      kinds: [1],
      "#p": [BLOG_AUTHOR_PUBKEY],
      since: 0,
      limit: 50,
    },
  });

  const { getProfile, loadProfile } = useProfileContext();

  const filterEvents = (events: NostrEvent[]) => {
    return events.filter((event) => {
      const hasEventTags = event.tags.some((tag) => tag[0] === "e");

      if (hasEventTags) {
        return false;
      }

      const hasPTags = event.tags.some((tag) => tag[0] === "p");
      if (hasPTags && hasEventTags) {
        return false;
      }

      const { images, videos } = extractMediaUrls(event.content);

      if (filterType === "image" && images.length > 0) return true;
      if (filterType === "video" && videos.length > 0) return true;
      if (filterType === "text" && images.length === 0 && videos.length === 0)
        return true;
      if (filterType === "all") return true;
      return false;
    });
  };

  const loadMorePosts = useCallback(
    (trigger: "scroll" | "intersection" | "search") => {
      if (isLoading || !hasMorePosts) return;

      if (allPosts.length > 0) {
        const oldestPost = allPosts[allPosts.length - 1];
        const newTimestamp = oldestPost.created_at - 1;
        const nextRequest = loadTriggerCount + 1;

        logPagination("request started", {
          request: nextRequest,
          trigger,
          cursor: newTimestamp,
          accumulatedPostTotal: allPosts.length,
        });

        setIsLoading(true);
        setOldestTimestamp(newTimestamp);
        setLoadTriggerCount(nextRequest);
      }
    },
    [allPosts, hasMorePosts, isLoading, loadTriggerCount, logPagination],
  );

  useEffect(() => {
    if (!searchQuery.trim() || maxElements || isLoading || !hasMorePosts) {
      return;
    }

    loadMorePosts("search");
  }, [hasMorePosts, isLoading, loadMorePosts, maxElements, searchQuery]);

  const handleScroll = useCallback(() => {
    if (maxElements) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < SCROLL_THRESHOLD && !isLoading && hasMorePosts) {
      loadMorePosts("scroll");
    }
  }, [loadMorePosts, isLoading, hasMorePosts, maxElements]);

  // Scroll listener as fallback
  useEffect(() => {
    if (maxElements) return;

    const throttledHandleScroll = throttle(handleScroll, 200);
    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll, maxElements]);

  useEffect(() => {
    if (!loadingRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && !isLoading && hasMorePosts) {
          loadMorePosts("intersection");
        }
      },
      {
        threshold: 0.1,
        rootMargin: `${SCROLL_THRESHOLD}px`,
      },
    );

    observerRef.current.observe(loadingRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMorePosts, isLoading, hasMorePosts]);

  useEffect(() => {
    const allEvents = [...allPosts, ...replies, ...mentions];

    if (allEvents.length > 0) {
      const uniquePubkeys = [
        ...new Set(allEvents.map((event) => event.pubkey)),
      ];
      uniquePubkeys.forEach((pubkey) => {
        loadProfile(pubkey);
      });
    }
  }, [allPosts, replies, mentions, loadProfile]);

  const getRepliesForPost = (postId: string) => {
    const postReplies = replies.filter((reply) =>
      reply.tags.some(
        (tag) =>
          tag[1] === postId &&
          (tag[0] === "e" || (reply.kind === 1111 && tag[0] === "E")),
      ),
    );
    const postMentions = mentions.filter(
      (mention) =>
        mention.tags.some((tag) => tag[0] === "e" && tag[1] === postId) ||
        mention.content.includes(postId),
    );

    const allReplies = [...postReplies, ...postMentions];
    const uniqueReplies = allReplies.filter(
      (reply, index, self) =>
        index === self.findIndex((r) => r.id === reply.id),
    );

    return uniqueReplies.sort((a, b) => a.created_at - b.created_at);
  };

  const toggleReplies = (postId: string) => {
    setVisibleReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const renderPost = (event: NostrEvent) => {
    const userData = getProfile(event.pubkey);
    const postReplies = getRepliesForPost(event.id);
    const showingReplies = visibleReplies.has(event.id);

    return (
      <div key={event.id} className="flex w-full justify-center">
        <div className="relative">
          <BlogPost
            profilePicture={userData?.picture}
            displayName={userData?.display_name}
            username={userData?.name}
            timestamp={event}
            content={event.content}
            replies={postReplies}
            showReplies={showingReplies}
            pubkey={event.pubkey}
            onToggleReplies={() => toggleReplies(event.id)}
          />

          <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:h-0"></div>
        </div>
      </div>
    );
  };

  const normalizedSearchTerms = searchQuery
    .trim()
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const filteredPosts = filterEvents(allPosts).filter((post) => {
    if (view !== "timeline" || normalizedSearchTerms.length === 0) {
      return true;
    }

    const searchableContent = post.content
      .toLocaleLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");

    return normalizedSearchTerms.every((term) =>
      searchableContent.includes(term),
    );
  });
  const postsToShow = maxElements
    ? filteredPosts.slice(0, maxElements)
    : filteredPosts;

  return (
    <div
      id="blog-content"
      role="tabpanel"
      aria-labelledby={`${view}-tab`}
      className="flex w-full flex-col items-center overflow-x-hidden sm:gap-5"
    >
      {view === "media" ? (
        <BlogMediaGrid posts={postsToShow} />
      ) : (
        postsToShow.map(renderPost)
      )}

      {view === "timeline" &&
        normalizedSearchTerms.length > 0 &&
        postsToShow.length === 0 &&
        !hasMorePosts && (
          <div
            className="flex min-h-32 w-full items-center justify-center px-4 text-center text-sm text-gray-500 sm:w-[600px]"
            role="status"
          >
            No posts match “{searchQuery.trim()}”.
          </div>
        )}

      {hasMorePosts && !maxElements && (
        <div ref={loadingRef} className="flex items-center justify-center py-8">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-400">
                {normalizedSearchTerms.length > 0
                  ? "Searching older posts..."
                  : "Loading more posts..."}
              </span>
            </div>
          ) : (
            <div className="h-10" /> // Invisible div to trigger intersection
          )}
        </div>
      )}

      {!hasMorePosts &&
        !maxElements &&
        (normalizedSearchTerms.length === 0 || postsToShow.length > 0) && (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            {normalizedSearchTerms.length > 0
              ? "End of search results"
              : "No more posts to load"}
          </div>
        )}
    </div>
  );
}

function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): T {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          func(...args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime),
      );
    }
  }) as T;
}
