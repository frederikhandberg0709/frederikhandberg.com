import { nip19 } from "nostr-tools";

export class NostrProcessor {
  private static readonly BECH32_NOTE_REGEX = /(note1[a-zA-Z0-9]{20,})/g;
  private static readonly NEVENT_REGEX = /(nevent1[a-zA-Z0-9]{20,})/g;
  private static readonly NOSTR_BECH32_NOTE_REGEX =
    /(nostr:note[a-zA-Z0-9]{59,65})/g;
  private static readonly NOSTR_NEVENT_REGEX =
    /(nostr:nevent1[a-zA-Z0-9]{20,})/g;
  private static readonly NOSTR_PROFILE_REGEX =
    /(nostr:npub[a-zA-Z0-9]{59,65})/g;

  static extractNoteIds(content: string): string[] {
    const noteIds: string[] = [];

    let match;
    while ((match = this.BECH32_NOTE_REGEX.exec(content)) !== null) {
      if (match[1]) {
        noteIds.push(match[1]);
      }
    }

    let neventMatch;
    while ((neventMatch = this.NEVENT_REGEX.exec(content)) !== null) {
      if (neventMatch[1]) {
        try {
          const { type, data } = nip19.decode(neventMatch[1]);
          if (type === "note") {
            const noteId = nip19.noteEncode(data as string);
            noteIds.push(noteId);
          } else if (type === "nevent") {
            const eventPointer = data as {
              id: string;
              relays?: string[];
              author?: string;
            };
            const noteId = nip19.noteEncode(eventPointer.id);
            noteIds.push(noteId);
          }
        } catch (error) {
          console.error("Error decoding nevent ID:", error);
        }
      }
    }

    const nostrNeventRegex = /nostr:(nevent1[a-zA-Z0-9]{20,})/g;
    let nostrNeventMatch;
    while ((nostrNeventMatch = nostrNeventRegex.exec(content)) !== null) {
      if (nostrNeventMatch[1]) {
        try {
          const { type, data } = nip19.decode(nostrNeventMatch[1]);
          if (type === "note") {
            const noteId = nip19.noteEncode(data as string);
            noteIds.push(noteId);
          } else if (type === "nevent") {
            const eventPointer = data as {
              id: string;
              relays?: string[];
              author?: string;
            };
            const noteId = nip19.noteEncode(eventPointer.id);
            noteIds.push(noteId);
          }
        } catch (error) {
          console.error("Error decoding nostr nevent ID:", error);
        }
      }
    }

    return [...new Set(noteIds)];
  }

  //   static truncateNostrReferences(content: string): string {
  //     let processed = content;

  //     processed = processed.replace(this.NOSTR_BECH32_NOTE_REGEX, (match) => {
  //       const prefix = match.substring(0, 10);
  //       const suffix = match.substring(match.length - 6);
  //       return `${prefix}...${suffix}`;
  //     });

  //     processed = processed.replace(this.BECH32_NOTE_REGEX, (match) => {
  //       const prefix = match.substring(0, 5);
  //       const suffix = match.substring(match.length - 6);
  //       return `${prefix}...${suffix}`;
  //     });

  //     processed = processed.replace(this.NEVENT_REGEX, (match) => {
  //       const prefix = match.substring(0, 7);
  //       const suffix = match.substring(match.length - 6);
  //       return `${prefix}...${suffix}`;
  //     });

  //     processed = processed.replace(this.NOSTR_PROFILE_REGEX, (match) => {
  //       const prefix = match.substring(0, 10);
  //       const suffix = match.substring(match.length - 6);
  //       return `${prefix}...${suffix}`;
  //     });

  //     return processed;
  //   }

  static removeNostrReferences(content: string): string {
    let processed = content;

    processed = processed.replace(this.NOSTR_BECH32_NOTE_REGEX, "");
    processed = processed.replace(this.NOSTR_NEVENT_REGEX, "");
    processed = processed.replace(this.NOSTR_PROFILE_REGEX, "");
    processed = processed.replace(this.BECH32_NOTE_REGEX, "");
    processed = processed.replace(this.NEVENT_REGEX, "");

    processed = processed.replace(/\s+/g, " ").trim();

    return processed;
  }
}
