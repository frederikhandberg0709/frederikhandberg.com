"use client";

import { useImageOverlay } from "@/utils/useImageOverlay";
import { extractMediaUrls } from "@/utils/extractMediaUrls";
import { NostrEvent } from "@/utils/convertTimestamp";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface BlogMediaGridProps {
  posts: NostrEvent[];
}

interface MediaItem {
  type: "image" | "video";
  url: string;
}

function normalizeMediaUrl(url: string) {
  try {
    const normalizedUrl = new URL(url);
    normalizedUrl.hash = "";
    return normalizedUrl.toString();
  } catch {
    return url;
  }
}

export default function BlogMediaGrid({ posts }: BlogMediaGridProps) {
  const { setOverlayImage } = useImageOverlay();
  const [failedMedia, setFailedMedia] = useState<Set<string>>(new Set());

  const media = useMemo(() => {
    const uniqueMedia = new Map<string, MediaItem>();

    posts.forEach((post) => {
      const { images, videos } = extractMediaUrls(post.content);
      const postMedia: MediaItem[] = [
        ...images.map((url) => ({ type: "image" as const, url })),
        ...videos.map((url) => ({ type: "video" as const, url })),
      ];

      postMedia.forEach((item) => {
        const normalizedUrl = normalizeMediaUrl(item.url);

        if (!uniqueMedia.has(normalizedUrl)) {
          uniqueMedia.set(normalizedUrl, item);
        }
      });
    });

    return [...uniqueMedia.values()];
  }, [posts]);

  if (media.length === 0) {
    return (
      <div className="flex min-h-48 w-full items-center justify-center px-4 text-sm text-gray-500 sm:w-[600px]">
        No media found in the loaded posts.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-3 gap-0.5 px-0 sm:w-[600px] sm:gap-1">
      {media.map((item, index) => {
        if (failedMedia.has(item.url)) return null;

        return (
          <button
            key={item.url}
            type="button"
            onClick={() => setOverlayImage(item.url)}
            aria-label={`Open media ${index + 1}`}
            className="group relative aspect-square overflow-hidden bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-gray-900 dark:focus-visible:ring-offset-black"
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, 196px"
                className="object-cover transition duration-500 ease-out group-hover:scale-105 group-hover:brightness-75 group-focus-visible:scale-105 group-focus-visible:brightness-75"
                onError={() =>
                  setFailedMedia((current) => new Set(current).add(item.url))
                }
              />
            ) : (
              <video
                src={`${item.url}#t=0.1`}
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105 group-hover:brightness-75 group-focus-visible:scale-105 group-focus-visible:brightness-75"
                onLoadedMetadata={(event) => {
                  const video = event.currentTarget;

                  if (video.seekable.length > 0) {
                    video.currentTime = Math.min(0.1, video.duration || 0.1);
                  }
                }}
                onError={() =>
                  setFailedMedia((current) => new Set(current).add(item.url))
                }
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition duration-300 group-hover:bg-black/10 group-hover:opacity-100 group-focus-visible:bg-black/10 group-focus-visible:opacity-100">
              <Maximize2 aria-hidden="true" size={22} strokeWidth={1.75} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
