"use client";

import { convertTimestamp, NostrEvent } from "@/utils/convertTimestamp";
import { extractNostrNoteIds } from "@/utils/processNostrContent";
import { MessageCircle, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useProfileContext } from "@/context/ProfileContext";
import { ContentRenderer } from "./ContentRenderer";
import { ReplyContentRenderer } from "./ReplyContentRenderer";

interface BlogPostProps {
  profilePicture?: string;
  displayName?: string;
  username?: string;
  content: string;
  showReplies?: boolean;
  replies?: NostrEvent[];
  onToggleReplies?: () => void;
  timestamp: NostrEvent | { created_at: number };
  pubkey?: string;
}

export default function BlogPost({
  profilePicture,
  displayName,
  username,
  content,
  showReplies = false,
  replies = [],
  onToggleReplies,
  timestamp,
  pubkey,
}: BlogPostProps) {
  const [imageError, setImageError] = useState(false);
  const [noteIds, setNoteIds] = useState<string[]>([]);

  const { loadProfile, getProfile } = useProfileContext();

  useEffect(() => {
    if (pubkey) {
      loadProfile(pubkey);
    }
  }, [pubkey, loadProfile]);

  const profileData = pubkey ? getProfile(pubkey) : null;

  const actualProfilePicture = profilePicture || profileData?.picture;
  const actualDisplayName = displayName || profileData?.display_name;
  const actualUsername = username || profileData?.name;

  useEffect(() => {
    const extractedIds = extractNostrNoteIds(content);
    setNoteIds(extractedIds);
  }, [content]);

  const buildReplyTree = (
    replies: NostrEvent[],
    parentId?: string,
  ): NostrEvent[] => {
    return replies
      .filter((reply) => {
        const eTags = reply.tags.filter((tag) => tag[0] === "e");

        if (eTags.length === 0) return false;

        const directParentTag = eTags[eTags.length - 1];

        return directParentTag && directParentTag[1] === parentId;
      })
      .sort((a, b) => a.created_at - b.created_at);
  };

  const renderReply = (reply: NostrEvent, depth: number = 0) => {
    const replyUserData = getProfile(reply.pubkey);

    const maxDepth = 6;
    const actualDepth = Math.min(depth, maxDepth);

    const nestedReplies = buildReplyTree(replies, reply.id);

    return (
      <div key={reply.id}>
        <div
          style={{ marginLeft: `${actualDepth * 16}px` }}
          className={`border-l-2 border-gray-300 py-3 pl-3 dark:border-gray-600`}
        >
          <div className="flex items-start gap-3">
            {replyUserData?.picture ? (
              <Image
                src={replyUserData.picture}
                alt={`${replyUserData.display_name}'s profile picture`}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                <User size={16} className="text-gray-400" />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-semibold">
                  {replyUserData?.display_name ||
                    `@${replyUserData?.name}` ||
                    reply.pubkey.substring(0, 8)}
                </span>
                <span>•</span>
                <span>{convertTimestamp(reply)}</span>
              </div>

              <div className="mt-1">
                {<ReplyContentRenderer content={reply.content} />}
              </div>
            </div>
          </div>
        </div>

        {nestedReplies.length > 0 && (
          <div className="relative">
            <div
              className="absolute bottom-0 top-0 w-0.5 bg-gray-300 dark:bg-gray-600"
              style={{ left: `${actualDepth * 16}px` }}
            />

            <div>
              {nestedReplies.map((nestedReply) =>
                renderReply(nestedReply, depth + 1),
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const hasTextContent = content.trim().length > 0;
  const hasReplies = replies.length > 0;

  return (
    <div className="flex flex-col gap-2.5 border-gray-200 px-4 py-4 transition duration-200 hover:border-gray-300 dark:border-gray-900 dark:bg-black dark:hover:border-gray-800 max-sm:py-5 sm:w-[600px] sm:rounded-2xl sm:border">
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
              {actualDisplayName || (
                <span className="animate-pulse">Loading...</span>
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

      {hasTextContent && <ContentRenderer content={content} />}

      {hasReplies && onToggleReplies && (
        <div className="mt-4 flex items-center justify-start">
          <button
            onClick={onToggleReplies}
            className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <MessageCircle size={16} />
            <span>{replies.length}</span>
            <span>{replies.length === 1 ? "reply" : "replies"}</span>
            <svg
              className={`h-4 w-4 transition-transform ${showReplies ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}

      {showReplies && hasReplies && (
        <div className="mt-4 space-y-3 rounded-lg">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {replies.length} {replies.length === 1 ? "reply" : "replies"}:
          </div>
          {buildReplyTree(replies, (timestamp as NostrEvent).id).map((reply) =>
            renderReply(reply, 0),
          )}
        </div>
      )}
    </div>
  );
}
