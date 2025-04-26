"use client";

import { useNostrEvents, useProfile } from "nostr-react";
import BlogPost from "./BlogPost";
import { extractMediaUrls } from "@/utils/extractMediaUrls";

interface BlogTimelineProps {
  filterType: string;
  activeSection: string;
  maxElements: number;
}

export default function BlogTimeline({
  filterType,
  activeSection,
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

  const pubkey =
    "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2";
  const { data: userData } = useProfile({
    pubkey,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterEvents = (events: any[]) => {
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
          return (
            <div key={event.id}>
              <BlogPost
                profilePicture={userData?.picture}
                displayName={userData?.display_name}
                username={userData?.name}
                timestamp={event}
                content={event.content}
              />

              <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:h-0"></div>
            </div>
          );
        })}
    </div>
  );
}
