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
  private static readonly NOSTR_NPROFILE_REGEX =
    /nostr:nprofile1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+/;

  static createCombinedRegex(): RegExp {
    const urlPattern = "https?:\\/\\/[^\\s\\n]+";

    const notePattern = this.BECH32_NOTE_REGEX.source.slice(1, -1);
    const neventPattern = this.NEVENT_REGEX.source.slice(1, -1);
    const nostrNotePattern = this.NOSTR_BECH32_NOTE_REGEX.source.slice(1, -1);
    const nostrNeventPattern = this.NOSTR_NEVENT_REGEX.source.slice(1, -1);

    const combinedPattern = `(${urlPattern}|${notePattern}|${neventPattern}|${nostrNotePattern}|${nostrNeventPattern})`;
    return new RegExp(combinedPattern, "g");
  }

  static isNostrReference(text: string): boolean {
    const trimmed = text.trim();

    this.BECH32_NOTE_REGEX.lastIndex = 0;
    this.NEVENT_REGEX.lastIndex = 0;
    this.NOSTR_BECH32_NOTE_REGEX.lastIndex = 0;
    this.NOSTR_NEVENT_REGEX.lastIndex = 0;

    return (
      this.BECH32_NOTE_REGEX.test(trimmed) ||
      this.NEVENT_REGEX.test(trimmed) ||
      this.NOSTR_BECH32_NOTE_REGEX.test(trimmed) ||
      this.NOSTR_NEVENT_REGEX.test(trimmed)
    );
  }

  static extractNoteIdFromReference(reference: string): string {
    const trimmed = reference.trim();

    return trimmed.replace(/^nostr:/, "");
  }

  static convertToHex(noteId: string): string {
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

      if (noteId.startsWith("nevent1")) {
        const { type, data } = nip19.decode(noteId);
        if (type === "nevent") {
          const eventPointer = data as {
            id: string;
            relays?: string[];
            author?: string;
          };

          if (eventPointer.id && /^[a-f0-9]{64}$/.test(eventPointer.id)) {
            return eventPointer.id;
          } else {
            console.error(
              "nevent ID field is not in the expected hex format:",
              eventPointer.id,
            );
            return "";
          }
        } else {
          console.error("Decoded nevent is not of type 'nevent':", type);
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

  static removeNostrReferences(content: string): string {
    let processed = content;

    processed = processed.replace(this.NOSTR_PROFILE_REGEX, "");
    processed = processed.replace(this.NOSTR_NPROFILE_REGEX, "");

    processed = processed
      .split("\n")
      .map((line) => {
        return line.replace(/(\S)[ \t]{2,}/g, "$1 ");
      })
      .join("\n");

    return processed;
  }
}
