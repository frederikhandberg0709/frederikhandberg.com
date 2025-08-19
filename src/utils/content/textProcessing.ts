export class TextProcessor {
  static cleanText(content: string): string {
    let processed = content;

    processed = processed.replace(/\n{5,}/g, "\n\n\n\n");

    processed = processed
      .split("\n")
      .map((line) => (line.trim() === "" ? "" : line))
      .join("\n");

    processed = processed.replace(/[ ]{2,}/g, " ");

    return processed.trim();
  }

  static truncateUrls(content: string): string {
    const urlRegex = /(https?:\/\/[^\s]{30,})/g;
    return content.replace(urlRegex, (match) => {
      try {
        const urlObj = new URL(match);
        return `${urlObj.hostname}/...`;
      } catch {
        return `${match.substring(0, 25)}...`;
      }
    });
  }
}
