import { ContentBlock, ProcessedNostrContent } from "@/types/content";
import { NostrProcessor } from "./NostrProcessor";
import { TextProcessor } from "./textProcessing";
import { UrlDetector } from "./urlDetection";

export class SequentialContentProcessor {
  static process(content: string): ProcessedNostrContent {
    const blocks: ContentBlock[] = [];
    let currentIndex = 0;

    const noteIds = NostrProcessor.extractNoteIds(content);

    const parts = content.split(/(\s+)/);
    let textBuffer = "";

    const flushTextBuffer = () => {
      if (textBuffer.trim()) {
        let processedText = NostrProcessor.removeNostrReferences(textBuffer);
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
      if (/^\s+$/.test(part)) {
        if (textBuffer) textBuffer += part;
        return;
      }

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
