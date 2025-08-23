export class TextProcessor {
  static cleanText(content: string): string {
    let processed = content;

    processed = processed
      .split("\n")
      .map((line) => (line.trim() === "" ? "" : line))
      .join("\n");

    processed = processed
      .split("\n")
      .map((line) => {
        return line.replace(/(\S)[ ]{2,}/g, "$1 ");
      })
      .join("\n");

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
