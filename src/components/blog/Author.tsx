"use client";

import { useProfileContext } from "@/context/ProfileContext";
import { useImageOverlay } from "@/utils/useImageOverlay";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AuthorProps {
  profilePicture?: string;
  displayName?: string;
  username?: string;
}

export default function Author({
  profilePicture,
  displayName,
  username,
}: AuthorProps) {
  const pubkey =
    "9c9f81ed795f0f5efa558932824687d84fc7e6a4cfa6db5d6d3b50fcb7ffaec2";
  const [imageError, setImageError] = useState(false);

  const { loadProfile, getProfile } = useProfileContext();
  const { setOverlayImage } = useImageOverlay();

  useEffect(() => {
    if (pubkey) {
      loadProfile(pubkey);
    }
  }, [pubkey, loadProfile]);

  const profileData = pubkey ? getProfile(pubkey) : null;

  const actualProfilePicture = profilePicture || profileData?.picture;
  const actualDisplayName = displayName || profileData?.display_name;
  const actualUsername = username || profileData?.name;
  const actualDescription = profileData?.about;

  return (
    <div className="flex flex-col items-center px-4 sm:w-[600px]">
      {actualProfilePicture && !imageError ? (
        <Image
          src={actualProfilePicture}
          alt={`${actualDisplayName}'s profile picture`}
          width={140}
          height={140}
          onError={() => setImageError(true)}
          onClick={() => setOverlayImage(actualProfilePicture)}
          className="h-[140px] w-[140px] cursor-pointer rounded-full object-cover opacity-100 transition hover:opacity-90 active:scale-[0.98]"
        />
      ) : (
        <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
          <User size={24} className="text-gray-400" />
        </div>
      )}

      <div className="mt-2 flex flex-col items-center">
        {actualDisplayName && (
          <span className="text-xl font-semibold">{actualDisplayName}</span>
        )}
        {actualUsername && (
          <span className="text-gray-500">@{actualUsername}</span>
        )}

        {actualDescription && (
          <span className="mt-5 whitespace-pre-wrap text-center text-sm leading-relaxed">
            {actualDescription}
          </span>
        )}
      </div>
    </div>
  );
}
