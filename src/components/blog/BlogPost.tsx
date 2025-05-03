"use client";

import { convertTimestamp, NostrEvent } from "@/utils/convertTimestamp";
import {
  extractNostrNoteIds,
  processNostrContent,
} from "@/utils/processNostrContent";
import styleHashtags from "@/utils/styleHashtags";
import { useImageOverlay } from "@/utils/useImageOverlay";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QuotedPost } from "./QuotedPost";
import { useProfileContext } from "@/context/ProfileContext";

interface BlogPostProps {
  profilePicture?: string;
  displayName?: string;
  username?: string;
  content: string;
  timestamp: NostrEvent | { created_at: number };
  pubkey?: string;
}

export default function BlogPost({
  profilePicture,
  displayName,
  username,
  content,
  timestamp,
  pubkey,
}: BlogPostProps) {
  const { setOverlayImage } = useImageOverlay();
  // const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [noteIds, setNoteIds] = useState<string[]>([]);
  const { mediaUrls, textContent } = processNostrContent(content);

  const { loadProfile, getProfile, isLoadingProfile } = useProfileContext();

  useEffect(() => {
    if (pubkey) {
      loadProfile(pubkey);
    }
  }, [pubkey, loadProfile]);

  const profileData = pubkey ? getProfile(pubkey) : null;
  const isLoadingProfileData = pubkey ? isLoadingProfile(pubkey) : false;

  const actualProfilePicture = profilePicture || profileData?.picture;
  const actualDisplayName = displayName || profileData?.display_name;
  const actualUsername = username || profileData?.name;

  useEffect(() => {
    const extractedIds = extractNostrNoteIds(content);
    setNoteIds(extractedIds);
  }, [content]);

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

  const hasTextContent = textContent.trim().length > 0;

  return (
    <div className="flex flex-col gap-2.5 border-gray-200 p-4 transition duration-200 hover:border-gray-300 dark:border-gray-900 dark:bg-black dark:hover:border-gray-800 sm:w-[600px] sm:rounded-2xl sm:border">
      <div className="flex items-center justify-between">
        <div className="group flex gap-[10px]">
          {actualProfilePicture && !imageError ? (
            <Image
              src={actualProfilePicture}
              alt={`${actualDisplayName}'s profile picture`}
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
              {/* {isLoadingProfileData ? (
                <span className="animate-pulse">Loading...</span>
              ) : ( */}
              {/* actualDisplayName || `${pubkey?.substring(0, 8)}...` */}
              {/* )} */}
              {isLoadingProfileData ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                actualDisplayName ||
                (pubkey ? `${pubkey.substring(0, 8)}...` : "Unknown")
              )}
            </p>
            <p className="text-sm text-gray-500">
              @
              {actualUsername ||
                (pubkey ? pubkey.substring(0, 8) : "anonymous")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[15px] max-sm:gap-2.5">
          <p className="text-right text-sm text-gray-500">
            {convertTimestamp(timestamp)}
          </p>
        </div>
      </div>

      {hasTextContent && (
        <div className="hyphens-auto whitespace-pre-wrap leading-normal">
          {styleHashtags(textContent)}
        </div>
      )}

      {noteIds.length > 0 && (
        <div className="mt-4">
          {noteIds.map((id) => (
            <QuotedPost key={id} noteId={id} />
          ))}
        </div>
      )}

      {renderMedia(mediaUrls)}
    </div>
  );
}
