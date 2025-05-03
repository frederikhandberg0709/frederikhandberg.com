import { extractMediaUrls } from "./extractMediaUrls";

export function extractNostrNoteIds(content: string): string[] {
  const bech32Regex = /(note1[a-zA-Z0-9]{20,})/g;
  const noteIds: string[] = [];

  let match;
  while ((match = bech32Regex.exec(content)) !== null) {
    if (match[1]) {
      noteIds.push(match[1]);
    }
  }

  return noteIds;
}

export function processNostrContent(content: string) {
  const mediaUrls = extractMediaUrls(content);

  let processedContent = content;

  const mediaRegex = /https:\/\/.*\.(jpg|png|mp4|avi|mov|webp)/gi;
  processedContent = processedContent.replace(mediaRegex, "");

  const nostrNoteRegex = /(nostr:note[a-zA-Z0-9]{59,65})/g;
  processedContent = processedContent.replace(nostrNoteRegex, (match) => {
    const prefix = match.substring(0, 10); // "nostr:note"
    const suffix = match.substring(match.length - 6); // last 6 chars
    return `${prefix}...${suffix}`;
  });

  const nostrProfileRegex = /(nostr:npub[a-zA-Z0-9]{59,65})/g;
  processedContent = processedContent.replace(nostrProfileRegex, (match) => {
    const prefix = match.substring(0, 10); // "nostr:npub"
    const suffix = match.substring(match.length - 6); // last 6 chars
    return `${prefix}...${suffix}`;
  });

  const urlRegex = /(https?:\/\/[^\s]{30,})/g;
  processedContent = processedContent.replace(urlRegex, (match) => {
    try {
      const urlObj = new URL(match);
      const domain = urlObj.hostname;
      return `${domain}/...`;
    } catch {
      return `${match.substring(0, 25)}...`;
    }
  });

  processedContent = processedContent.replace(/\n{3,}/g, "\n\n");

  processedContent = processedContent
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : line))
    .join("\n");

  processedContent = processedContent.replace(/\n\n\n+/g, "\n\n");

  processedContent = processedContent.replace(/[ ]{2,}/g, " ");

  return {
    mediaUrls,
    textContent: processedContent.trim(),
  };
}
