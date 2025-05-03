"use client";

import { useNostrEvents } from "nostr-react";
import BlogPost from "./BlogPost";
import { extractMediaUrls } from "@/utils/extractMediaUrls";
import { NostrEvent } from "@/utils/convertTimestamp";
import { useProfileContext } from "@/context/ProfileContext";
import { useEffect } from "react";

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
  const { events } = useNostrEvents({
    filter: {
      authors: [
        "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2",
      ],
      since: 0,
      kinds: [1],
      limit: 20,
    },
  });

  const { getProfile, loadProfile } = useProfileContext();

  useEffect(() => {
    if (events.length > 0) {
      const uniquePubkeys = [...new Set(events.map((event) => event.pubkey))];

      uniquePubkeys.forEach((pubkey) => {
        loadProfile(pubkey);
      });
    }
  }, [events, loadProfile]);

  const filterEvents = (events: NostrEvent[]) => {
    return events.filter((event) => {
      const { images, videos } = extractMediaUrls(event.content);

      if (filterType === "image" && images.length > 0) return true;
      if (filterType === "video" && videos.length > 0) return true;
      if (filterType === "text" && images.length === 0 && videos.length === 0)
        return true;
      if (filterType === "all") return true;
      return false;
    });
  };

  return (
    <div className="flex flex-col items-center gap-[20px] overflow-x-hidden sm:gap-[10px]">
      {filterEvents(events)
        .slice(0, maxElements)
        .map((event) => {
          const userData = getProfile(event.pubkey);

          console.log("User data:", userData);

          return (
            <div key={event.id}>
              <BlogPost
                profilePicture={userData?.picture}
                displayName={userData?.display_name}
                username={userData?.name}
                timestamp={event}
                content={event.content}
                pubkey={event.pubkey}
              />

              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:h-0"></div>
            </div>
          );
        })}
    </div>
  );
}
