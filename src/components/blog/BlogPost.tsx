"use client";

import { convertTimestamp } from "@/utils/convertTimestamp";
import { extractMediaUrls } from "@/utils/extractMediaUrls";
import styleHashtags from "@/utils/styleHashtags";
import { useImageOverlay } from "@/utils/useImageOverlay";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface BlogPostProps {
  profilePicture?: string;
  displayName?: string;
  username?: string;
  content: string;
  timestamp?: number;
}

export default function BlogPost({
  profilePicture,
  displayName,
  username,
  content,
  timestamp,
}: BlogPostProps) {
  const { setOverlayImage } = useImageOverlay();
  // const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hideMediaLinks = (content: string) => {
    const regex = /https:\/\/.*\.(jpg|png|mp4|avi|mov|webp)/gi;
    return content.replace(regex, "");
  };

  const processContent = (content: string) => {
    const mediaUrls = extractMediaUrls(content);
    const textContent = hideMediaLinks(content);
    return { mediaUrls, textContent };
  };

  const { mediaUrls, textContent } = processContent(content);

  const renderMedia = ({
    images,
    videos,
  }: {
    images: string[];
    videos: string[];
  }) => {
    if (!images?.length && !videos?.length) {
      return null;
    }

    return (
      <div className="flex flex-col gap-4">
        {images.map((imgUrl, index) => (
          <div key={`img-${index}`} className="relative">
            {/* {!imageLoaded && (
              <div className="flex h-40 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-900">
                <span className="animate-pulse">Loading image...</span>
              </div>
            )} */}
            <Image
              src={imgUrl}
              alt={`Media content ${index + 1}`}
              onClick={() => setOverlayImage(imgUrl)}
              width={1000}
              height={1000}
              className={`w-full scale-100 cursor-pointer rounded-xl transition hover:opacity-90 active:scale-[0.98]`}
              // className={`w-full scale-100 cursor-pointer rounded-xl transition hover:opacity-90 active:scale-[0.98] ${imageLoaded ? "block" : "hidden"}`}
              // onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        ))}
        {videos.map((videoUrl, index) => (
          <video
            key={`video-${index}`}
            src={videoUrl}
            className="w-full rounded-[10px]"
            controls
            autoPlay
            muted
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2.5 border-gray-200 p-4 transition duration-200 hover:border-gray-300 dark:border-gray-900 dark:bg-black dark:hover:border-gray-800 sm:w-[600px] sm:rounded-2xl sm:border">
      <div className="flex items-center justify-between">
        <div className="group flex gap-[10px]">
          {profilePicture && !imageError ? (
            <Image
              src={profilePicture || ""}
              alt={`${displayName}'s profile picture`}
              width={40}
              height={40}
              onError={() => setImageError(true)}
              className="h-[40px] w-[40px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
              <User size={24} className="text-gray-400" />
            </div>
          )}
          <div className="flex flex-col gap-px">
            <p className="text-sm font-bold group-hover:text-blue-500">
              {displayName}
            </p>
            <p className="text-sm text-gray-500">@{username}</p>
          </div>
        </div>
        <div className="flex items-center gap-[15px] max-sm:gap-2.5">
          <p className="text-right text-sm text-gray-500">
            {convertTimestamp(timestamp)}
          </p>
        </div>
      </div>
      <div className="hyphens-auto whitespace-pre-wrap leading-normal">
        {styleHashtags(textContent)}
      </div>

      {renderMedia(mediaUrls)}
    </div>
  );
}
