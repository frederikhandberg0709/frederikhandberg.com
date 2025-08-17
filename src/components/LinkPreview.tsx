import Link from "next/link";
import { useState } from "react";

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

  if (loading) {
    return (
      <div className="max-w-md animate-pulse">
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
      className="group block max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    ></Link>
  );
}
