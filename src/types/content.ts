export interface ContentBlock {
  type: "text" | "image" | "video" | "link" | "nostr_note";
  content: string;
  index: number;
  metadata?: {
    originalUrl?: string;
    noteId?: string;
    truncated?: boolean;
  };
}

export interface ProcessedNostrContent {
  blocks: ContentBlock[];
  noteIds: string[];
  hasMedia: boolean;
  hasLinks: boolean;
}
