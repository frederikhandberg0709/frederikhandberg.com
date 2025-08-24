import Link from "next/link";
import { useEffect, useState } from "react";

interface LinkPreview {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
}

interface LinkPreviewProps {
  url: string;
  fallback?: React.ReactNode;
}

const extractYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

const isYouTubeUrl = (url: string): boolean => {
  return /(?:youtube\.com|youtu\.be)/.test(url);
};

export default function LinkPreview({ url, fallback }: LinkPreviewProps) {
  const [preview, setPreview] = useState<LinkPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        if (isYouTubeUrl(url)) {
          await fetchYouTubeMetadata(url);
        } else {
          await fetchGeneralMetadata(url);
        }
      } catch (err) {
        console.error("Failed to fetch metadata:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchYouTubeMetadata = async (youtubeUrl: string) => {
      const videoId = extractYouTubeVideoId(youtubeUrl);

      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      try {
        const oembedResponse = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeUrl)}&format=json`,
        );

        if (oembedResponse.ok) {
          const oembedData = await oembedResponse.json();

          if (oembedData.thumbnail_url) {
            try {
              const thumbResponse = await fetch(oembedData.thumbnail_url, {
                method: "HEAD",
              });
              if (!thumbResponse.ok) {
                throw new Error("Thumbnail not accessible");
              }
            } catch {
              throw new Error("Thumbnail not accessible");
            }
          }

          const preview: LinkPreview = {
            title: oembedData.title || "YouTube Video",
            description: oembedData.author_name
              ? `By ${oembedData.author_name}`
              : `Watch this video on ${oembedData.provider_name}`,
            image: oembedData.thumbnail_url || "",
            url: youtubeUrl,
            siteName: oembedData.provider_name || "YouTube",
          };

          setPreview(preview);
          return;
        }
      } catch (error) {
        console.log("oEmbed failed or thumbnail not accessible");
      }

      const thumbnailUrls = [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      ];

      let workingThumbnail = "";

      for (const thumbUrl of thumbnailUrls) {
        try {
          const response = await fetch(thumbUrl, { method: "HEAD" });
          if (response.ok) {
            workingThumbnail = thumbUrl;
            break;
          }
        } catch {
          continue;
        }
      }

      if (!workingThumbnail) {
        throw new Error("No accessible thumbnail found");
      }

      let title = "YouTube Video";
      let description = "Watch this video on YouTube";

      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(youtubeUrl)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();

        const titleMatch = data.contents.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          const extractedTitle = titleMatch[1].replace(" - YouTube", "").trim();
          if (extractedTitle && extractedTitle !== "YouTube") {
            title = extractedTitle;
          }
        }

        const descMatch = data.contents.match(
          /<meta[^>]+name="description"[^>]+content="([^"]*)"[^>]*>/i,
        );
        if (descMatch && descMatch[1]) {
          description = descMatch[1];
        }
      } catch (scrapeError) {
        console.log("Scraping failed, using basic info");
      }

      const preview: LinkPreview = {
        title,
        description,
        image: workingThumbnail,
        url: youtubeUrl,
        siteName: "YouTube",
      };

      setPreview(preview);
    };

    const fetchGeneralMetadata = async (generalUrl: string) => {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(generalUrl)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/html");

      const getMetaContent = (property: string): string => {
        const ogElement = doc.querySelector(`meta[property="og:${property}"]`);
        const nameElement = doc.querySelector(`meta[name="${property}"]`);
        const twitterElement = doc.querySelector(
          `meta[name="twitter:${property}"]`,
        );

        return (
          ogElement?.getAttribute("content") ||
          nameElement?.getAttribute("content") ||
          twitterElement?.getAttribute("content") ||
          ""
        );
      };

      const preview: LinkPreview = {
        title: getMetaContent("title") || doc.title || "No title",
        description: getMetaContent("description") || "",
        image: getMetaContent("image") || "",
        url: getMetaContent("url") || generalUrl,
        siteName: getMetaContent("site_name") || "",
      };

      setPreview(preview);
    };

    fetchMetadata();
  }, [url]);

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-48 rounded-t-lg bg-gray-200 dark:bg-gray-500"></div>
        <div className="space-y-3 rounded-b-lg border border-gray-200 p-4 dark:border-gray-500">
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-500"></div>
          <div className="h-3 rounded bg-gray-200 dark:bg-gray-500"></div>
          <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-500"></div>
        </div>
      </div>
    );
  }

  if (error || !preview) {
    return (
      fallback || (
        <a
          href={url}
          className="break-all text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      )
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-900 dark:bg-gray-900"
    >
      {preview.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={preview.image}
            alt={preview.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500">
          {preview.title}
        </h3>

        {preview.description && (
          <p className="mb-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {preview.description}
          </p>
        )}

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          {preview.siteName && (
            <span className="font-medium">{preview.siteName}</span>
          )}
          <span className="ml-auto max-w-xs truncate">
            {new URL(url).hostname}
          </span>
        </div>
      </div>
    </Link>
  );
}
