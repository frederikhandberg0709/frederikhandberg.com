"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import MDXComponents from "./MDXComponents";
import { useEffect, useState } from "react";
import { ImageOverlayProvider } from "../ImageOverlayProvider";

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXContent({ source }: MDXContentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
    );
  }

  return (
    <ImageOverlayProvider>
      <MDXRemote {...source} components={MDXComponents} />
    </ImageOverlayProvider>
  );
}
