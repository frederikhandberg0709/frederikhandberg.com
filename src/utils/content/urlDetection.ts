export class UrlDetector {
  private static readonly URL_REGEX = /https?:\/\/[^\s\n]+/g;

  static isMediaUrl(url: string): boolean {
    return this.isImageUrl(url) || this.isVideoUrl(url);
  }

  static isImageUrl(url: string): boolean {
    const imageRegex = /https:\/\/.*?\.(jpeg|jpg|png|webp)/i;
    return imageRegex.test(url);
  }

  static isVideoUrl(url: string): boolean {
    const videoRegex = /https:\/\/.*?\.(mp4|avi|mov)/i;
    return videoRegex.test(url);
  }

  static isPreviewableUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);

      const skipDomains = ["localhost", "127.0.0.1"];
      const skipExtensions = [
        ".pdf",
        ".zip",
        ".tar",
        ".gz",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".txt",
        ".csv",
      ];

      const shouldSkip =
        skipDomains.includes(urlObj.hostname) ||
        skipExtensions.some((ext) => url.toLowerCase().endsWith(ext));

      return (
        !shouldSkip &&
        (urlObj.protocol === "http:" || urlObj.protocol === "https:")
      );
    } catch {
      return false;
    }
  }

  static extractUrls(content: string): string[] {
    return content.match(this.URL_REGEX) || [];
  }

  static cleanUrl(url: string): string {
    return url.replace(/[.,;!?]*$/, "");
  }
}
