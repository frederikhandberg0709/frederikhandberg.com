import Link from "next/link";
import LinkPreview from "../LinkPreview";
import Image from "next/image";
import styleHashtags from "@/utils/styleHashtags";
import { useImageOverlay } from "@/utils/useImageOverlay";
import { useState } from "react";
import { SequentialContentProcessor } from "@/utils/content/sequentialProcessor";
import { QuotedPost } from "./QuotedPost";
import { ContentBlock } from "@/types/content";

interface ContentRendererProps {
  content: string;
  className?: string;
}

export function ContentRenderer({
  content,
  className = "",
}: ContentRendererProps) {
  const { setOverlayImage } = useImageOverlay();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const processedContent = SequentialContentProcessor.process(content);
  const { blocks } = processedContent;

  const handleImageError = (url: string) => {
    setImageErrors((prev) => new Set(prev).add(url));
  };

  const renderBlock = (
    block: ContentBlock,
    index: number,
    totalBlocks: number,
  ) => {
    const isLastBlock = index === totalBlocks - 1;

    switch (block.type) {
      case "text":
        return (
          <div key={block.index} className="whitespace-pre-wrap leading-normal">
            {styleHashtags(block.content)}
          </div>
        );

      case "image":
        if (imageErrors.has(block.content)) return null;

        return (
          <div
            key={block.index}
            className={`relative ${isLastBlock ? "mt-3" : "my-3"}`}
          >
            <Image
              src={block.content}
              alt="Media content"
              onClick={() => setOverlayImage(block.content)}
              width={1000}
              height={1000}
              className="w-full scale-100 cursor-pointer rounded-xl transition hover:opacity-90 active:scale-[0.98]"
              onError={() => handleImageError(block.content)}
            />
          </div>
        );

      case "video":
        return (
          <video
            key={block.index}
            src={block.content}
            className={`w-full rounded-[10px] ${isLastBlock ? "mt-3" : "my-3"}`}
            controls
            autoPlay
            muted
          />
        );

      case "link":
        return (
          <div key={block.index} className={isLastBlock ? "mt-3" : "my-3"}>
            <LinkPreview
              url={block.content}
              fallback={
                <Link
                  href={block.content}
                  className="break-all text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {block.content}
                </Link>
              }
            />
          </div>
        );

      case "nostr_note":
        return (
          <div key={block.index} className={isLastBlock ? "mt-3" : "my-3"}>
            <QuotedPost noteId={block.content} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {blocks.map((block, index) => renderBlock(block, index, blocks.length))}
    </div>
  );
}
