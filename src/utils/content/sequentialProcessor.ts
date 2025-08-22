import { ContentBlock, ProcessedNostrContent } from "@/types/content";
import { NostrProcessor } from "./NostrProcessor";
import { TextProcessor } from "./textProcessing";
import { UrlDetector } from "./urlDetection";

export class SequentialContentProcessor {
  static process(content: string): ProcessedNostrContent {
    const blocks: ContentBlock[] = [];
    let currentIndex = 0;

    const noteIds = NostrProcessor.extractNoteIds(content);

    const combinedRegex = NostrProcessor.createCombinedRegex();

    const parts: string[] = [];
    let lastIndex = 0;
    let match;

    while ((match = combinedRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        const textPart = content.substring(lastIndex, match.index);
        if (textPart) parts.push(textPart);
      }

      parts.push(match[0]);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      const remainingText = content.substring(lastIndex);
      if (remainingText) parts.push(remainingText);
    }

    let textBuffer = "";

    const flushTextBuffer = () => {
      if (textBuffer.trim()) {
        let processedText = NostrProcessor.removeNostrReferences(textBuffer);

        processedText = processedText.replace(
          /(nostr:)?(note1[a-zA-Z0-9]{20,}|nevent1[a-zA-Z0-9]{20,})/g,
          "",
        );

        processedText = TextProcessor.truncateUrls(processedText);
        processedText = TextProcessor.cleanText(processedText);

        if (processedText) {
          blocks.push({
            type: "text",
            content: processedText,
            index: currentIndex++,
          });
        }
        textBuffer = "";
      }
    };

    parts.forEach((part) => {
      const trimmedPart = part.trim();

      if (/^https?:\/\/[^\s]+$/.test(part)) {
        const cleanUrl = UrlDetector.cleanUrl(part);

        if (UrlDetector.isMediaUrl(cleanUrl)) {
          flushTextBuffer();

          const isVideo = UrlDetector.isVideoUrl(cleanUrl);
          blocks.push({
            type: isVideo ? "video" : "image",
            content: cleanUrl,
            index: currentIndex++,
            metadata: { originalUrl: part },
          });
        } else if (UrlDetector.isPreviewableUrl(cleanUrl)) {
          flushTextBuffer();

          blocks.push({
            type: "link",
            content: cleanUrl,
            index: currentIndex++,
            metadata: { originalUrl: part },
          });
        } else {
          textBuffer += part;
        }
      } else if (NostrProcessor.isNostrReference(trimmedPart)) {
        flushTextBuffer();

        const noteId = NostrProcessor.extractNoteIdFromReference(trimmedPart);

        blocks.push({
          type: "nostr_note",
          content: noteId,
          index: currentIndex++,
          metadata: { originalUrl: trimmedPart },
        });
      } else {
        textBuffer += part;
      }
    });

    flushTextBuffer();

    const hasMedia = blocks.some(
      (block) => block.type === "image" || block.type === "video",
    );
    const hasLinks = blocks.some((block) => block.type === "link");

    return {
      blocks,
      noteIds,
      hasMedia,
      hasLinks,
    };
  }
}
