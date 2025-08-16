"use client";

import { useNostrEvents } from "nostr-react";
import BlogPost from "./BlogPost";
import { extractMediaUrls } from "@/utils/extractMediaUrls";
import { NostrEvent } from "@/utils/convertTimestamp";
import { useProfileContext } from "@/context/ProfileContext";
import { useEffect, useMemo, useState } from "react";

interface BlogTimelineProps {
  filterType: string;
  activeSection?: string;
  maxElements?: number;
}

export default function BlogTimeline({
  filterType,
  // activeSection,
  maxElements,
}: BlogTimelineProps) {
  const [visibleReplies, setVisibleReplies] = useState<Set<string>>(new Set());

  const { events: originalPosts } = useNostrEvents({
    filter: {
      authors: [
        "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2",
      ],
      since: 0,
      kinds: [1],
      limit: 20,
    },
  });

  const originalPostIds = useMemo(
    () => originalPosts.map((event) => event.id),
    [originalPosts],
  );

  const { events: replies } = useNostrEvents({
    filter: {
      kinds: [1],
      "#e": originalPostIds,
      since: 0,
      limit: 100,
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

    console.log("events: ", allEvents);
  }, [originalPosts, replies, mentions, loadProfile]);

  const filterEvents = (events: NostrEvent[]) => {
    return events.filter((event) => {
      const isReply = event.tags.some((tag) => {
        if (tag[0] === "e" && originalPostIds.includes(tag[1])) {
          return true;
        }
        if (
          tag[0] === "p" &&
          tag[1] ===
            "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2"
        ) {
          const hasEventTags = event.tags.some((t) => t[0] === "e");
          return hasEventTags;
        }
        return false;
      });

      if (isReply) return false;

      const { images, videos } = extractMediaUrls(event.content);

      if (filterType === "image" && images.length > 0) return true;
      if (filterType === "video" && videos.length > 0) return true;
      if (filterType === "text" && images.length === 0 && videos.length === 0)
        return true;
      if (filterType === "all") return true;
      return false;
    });
  };

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
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-[20px] overflow-x-hidden sm:gap-[10px]">
      {filterEvents(originalPosts).slice(0, maxElements).map(renderPost)}
    </div>
  );
}
