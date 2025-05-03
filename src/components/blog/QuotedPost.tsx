"use client";

import { convertTimestamp } from "@/utils/convertTimestamp";
import { processNostrContent } from "@/utils/processNostrContent";
import styleHashtags from "@/utils/styleHashtags";
import { User } from "lucide-react";
import Image from "next/image";
import { useNostrEvents } from "nostr-react";
import { useEffect, useState } from "react";
import { nip19 } from "nostr-tools";
import { useProfileContext } from "@/context/ProfileContext";

interface QuotedPostProps {
  noteId: string;
}

export const QuotedPost: React.FC<QuotedPostProps> = ({ noteId }) => {
  const [imageError, setImageError] = useState(false);
  const hexNoteId = convertBech32ToHex(noteId);

  const { loadProfile, getProfile } = useProfileContext();

  const { events, isLoading } = useNostrEvents({
    filter: {
      ids: hexNoteId ? [hexNoteId] : [],
      kinds: [1],
      limit: 1,
    },

    enabled: Boolean(hexNoteId),
  });

  const embeddedEvent = events.length > 0 ? events[0] : null;

  useEffect(() => {
    if (embeddedEvent?.pubkey) {
      console.log("Loading profile for quoted post:", embeddedEvent.pubkey);
      loadProfile(embeddedEvent.pubkey);
    }
  }, [embeddedEvent?.pubkey, loadProfile]);

  const authorData = embeddedEvent?.pubkey
    ? getProfile(embeddedEvent.pubkey)
    : null;

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-md border bg-gray-50 p-3 dark:bg-gray-800">
        <div className="mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  if (!hexNoteId) {
    return (
      <div className="rounded-md border bg-gray-50 p-4 dark:bg-gray-800">
        <div className="text-sm text-red-500">Invalid note ID format</div>
      </div>
    );
  }

  if (!embeddedEvent) return null;

  const { mediaUrls, textContent } = processNostrContent(embeddedEvent.content);
  const hasTextContent = textContent.trim().length > 0;

  return (
    <div className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300">
      <div className="mb-2 flex items-center">
        <div className="group flex items-center gap-2">
          {authorData?.picture && !imageError ? (
            <Image
              src={authorData.picture}
              alt={`${authorData.display_name}'s profile`}
              width={30}
              height={30}
              onError={() => setImageError(true)}
              className="h-[30px] w-[30px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <User size={16} className="text-gray-400" />
            </div>
          )}
          <div className="flex items-center gap-2.5">
            <div className="text-sm font-semibold text-black group-hover:text-blue-500 dark:text-white">
              {authorData?.display_name ||
                authorData?.name ||
                `${embeddedEvent.pubkey.substring(0, 8)}...`}
            </div>
            <div className="text-sm text-gray-500">@{authorData?.name}</div>
          </div>
        </div>
        <div className="ml-auto text-right text-xs text-gray-500">
          {convertTimestamp(embeddedEvent)}
        </div>
      </div>

      {hasTextContent && (
        <div className="hyphens-auto whitespace-pre-wrap text-sm leading-normal">
          {styleHashtags(textContent)}
        </div>
      )}

      {mediaUrls.images && mediaUrls.images.length > 0 && (
        <div className="mt-2">
          <Image
            src={mediaUrls.images[0]}
            alt="Embedded media"
            width={300}
            height={200}
            className="max-h-[150px] w-auto rounded-md object-cover"
          />
        </div>
      )}
    </div>
  );
};

function convertBech32ToHex(noteId: string): string {
  try {
    if (noteId.startsWith("note1")) {
      const { data } = nip19.decode(noteId);
      if (typeof data === "string" && /^[a-f0-9]{64}$/.test(data)) {
        return data;
      } else {
        console.error(
          "Decoded note ID is not in the expected hex format:",
          data,
        );
        return "";
      }
    }
    if (/^[a-f0-9]{64}$/.test(noteId)) {
      return noteId;
    }
    console.error("Note ID is not in a recognized format:", noteId);
    return "";
  } catch (error) {
    console.error("Error decoding note ID:", error);
    return "";
  }
}
