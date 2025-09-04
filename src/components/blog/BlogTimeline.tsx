"use client";

import { useNostrEvents } from "nostr-react";
import BlogPost from "./BlogPost";
import { extractMediaUrls } from "@/utils/extractMediaUrls";
import { NostrEvent } from "@/utils/convertTimestamp";
import { useProfileContext } from "@/context/ProfileContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface BlogTimelineProps {
  filterType: string;
  activeSection?: string;
  maxElements?: number;
}

const POSTS_PER_PAGE = 20;
const SCROLL_THRESHOLD = 500;

export default function BlogTimeline({
  filterType,
  // activeSection,
  maxElements,
}: BlogTimelineProps) {
  const [visibleReplies, setVisibleReplies] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [oldestTimestamp, setOldestTimestamp] = useState<number>(
    Math.floor(Date.now() / 1000),
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [loadTriggerCount, setLoadTriggerCount] = useState(0);
  const initialPostCount = useRef<number>(0);

  const { events: originalPosts } = useNostrEvents({
    filter: {
      authors: [
        "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2",
      ],
      until: oldestTimestamp,
      kinds: [1],
      limit: POSTS_PER_PAGE,
    },
  });

  const { events: olderPosts } = useNostrEvents({
    filter: {
      authors: [
        "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2",
      ],
      until: oldestTimestamp,
      kinds: [1],
      limit: POSTS_PER_PAGE,
    },
    enabled: oldestTimestamp < Math.floor(Date.now() / 1000),
  });

  const allPosts = useMemo(() => {
    const combined = [...originalPosts, ...olderPosts];
    const unique = combined.filter(
      (post, index, self) => index === self.findIndex((p) => p.id === post.id),
    );
    return unique.sort((a, b) => b.created_at - a.created_at);
  }, [originalPosts, olderPosts]);

  useEffect(() => {
    if (originalPosts.length > 0 && initialPostCount.current === 0) {
      initialPostCount.current = originalPosts.length;
    }
  }, [originalPosts]);

  useEffect(() => {
    if (isLoading && loadTriggerCount > 0) {
      // Wait a bit for the query to potentially return results
      const timeout = setTimeout(() => {
        if (olderPosts.length < POSTS_PER_PAGE && olderPosts.length >= 0) {
          setHasMorePosts(false);
        }

        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, loadTriggerCount, olderPosts.length]);

  const originalPostIds = useMemo(
    () => allPosts.map((event) => event.id),
    [allPosts],
  );

  const { events: replies } = useNostrEvents({
    filter: {
      kinds: [1],
      "#e": originalPostIds,
      since: 0,
      limit: Math.max(100, originalPostIds.length * 2),
    },
    enabled: originalPostIds.length > 0,
  });

  const { events: mentions } = useNostrEvents({
    filter: {
      kinds: [1],
      "#p": [
        "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2",
      ],
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

  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMorePosts || initialPostCount.current === 0) return;

    const filteredPosts = filterEvents(allPosts);
    if (filteredPosts.length > 0) {
      const oldestPost = filteredPosts[filteredPosts.length - 1];
      const newTimestamp = oldestPost.created_at - 1;

      setIsLoading(true);
      setOldestTimestamp(newTimestamp);
      setLoadTriggerCount((prev) => prev + 1);
    } else {
      setHasMorePosts(false);
    }
  }, [
    isLoading,
    hasMorePosts,
    allPosts,
    oldestTimestamp,
    loadTriggerCount,
    filterEvents,
  ]);

  const handleScroll = useCallback(() => {
    if (maxElements) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < SCROLL_THRESHOLD && !isLoading && hasMorePosts) {
      loadMorePosts();
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
          loadMorePosts();
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
    const allEvents = [...originalPosts, ...replies, ...mentions];

    if (allEvents.length > 0) {
      const uniquePubkeys = [
        ...new Set(allEvents.map((event) => event.pubkey)),
      ];
      uniquePubkeys.forEach((pubkey) => {
        loadProfile(pubkey);
      });
    }
  }, [originalPosts, replies, mentions, loadProfile]);

  const getRepliesForPost = (postId: string) => {
    const postReplies = replies.filter((reply) =>
      reply.tags.some((tag) => tag[0] === "e" && tag[1] === postId),
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
      <div key={event.id} className="w-full">
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

  const filteredPosts = filterEvents(allPosts);
  const postsToShow = maxElements
    ? filteredPosts.slice(0, maxElements)
    : filteredPosts;

  return (
    <div className="flex flex-col items-center overflow-x-hidden sm:gap-5">
      {postsToShow.map(renderPost)}

      {hasMorePosts && !maxElements && (
        <div ref={loadingRef} className="flex items-center justify-center py-8">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Loading more posts...
              </span>
            </div>
          ) : (
            <div className="h-10" /> // Invisible div to trigger intersection
          )}
        </div>
      )}

      {!hasMorePosts && !maxElements && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No more posts to load
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
