"use client";

import { convertTimestamp } from "@/utils/convertTimestamp";
import { User } from "lucide-react";
import Image from "next/image";
import { useNostrEvents } from "nostr-react";
import { useEffect, useState } from "react";
import { useProfileContext } from "@/context/ProfileContext";
import { NostrProcessor } from "@/utils/content/NostrProcessor";
import { ContentRenderer } from "./ContentRenderer";

interface QuotedPostProps {
  noteId: string;
}

export const QuotedPost: React.FC<QuotedPostProps> = ({ noteId }) => {
  const [imageError, setImageError] = useState(false);

  const hexNoteId = NostrProcessor.convertToHex(noteId);

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
      loadProfile(embeddedEvent.pubkey);
    }
  }, [embeddedEvent?.pubkey, loadProfile]);

  const authorData = embeddedEvent?.pubkey
    ? getProfile(embeddedEvent.pubkey)
    : null;

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-md border bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800">
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

  const hasContent = embeddedEvent.content.trim().length > 0;

  return (
    <div className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 dark:border-gray-900 dark:bg-black dark:hover:border-gray-800">
      <div className="mb-2 flex items-center">
        <div className="group flex items-center gap-2">
          {authorData?.picture && !imageError ? (
            <Image
              src={authorData.picture}
              alt={`${authorData.display_name}'s profile`}
              width={35}
              height={35}
              onError={() => setImageError(true)}
              className="h-[35px] w-[35px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <User size={16} className="text-gray-400" />
            </div>
          )}
          <div className="flex flex-col gap-px">
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

      {hasContent && <ContentRenderer content={embeddedEvent.content} />}
    </div>
  );
};
