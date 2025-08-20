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

export default function LinkPreview({ url, fallback }: LinkPreviewProps) {
  const [preview, setPreview] = useState<LinkPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // TODO: Fetch YouTube thumbnail
    const fetchMetadata = async () => {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();

        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");

        const getMetaContent = (property: string): string => {
          const ogElement = doc.querySelector(
            `meta[property="og:${property}"]`,
          );
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
          url: getMetaContent("url") || url,
          siteName: getMetaContent("site_name") || "",
        };

        setPreview(preview);
      } catch (err) {
        console.error("Failed to fetch metadata:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-48 rounded-t-lg bg-gray-200"></div>
        <div className="space-y-3 rounded-b-lg border border-gray-200 p-4">
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="h-3 rounded bg-gray-200"></div>
          <div className="h-3 w-5/6 rounded bg-gray-200"></div>
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
      className="group block w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
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
        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {preview.title}
        </h3>

        {preview.description && (
          <p className="mb-3 line-clamp-3 text-sm text-gray-600">
            {preview.description}
          </p>
        )}

        <div className="flex items-center text-xs text-gray-500">
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
