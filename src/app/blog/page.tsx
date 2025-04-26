"use client";

import BlogTimeline from "@/components/blog/BlogTimeline";
import { ImageOverlayProvider } from "@/components/ImageOverlayProvider";
import { NostrProvider } from "nostr-react";

export default function Blog() {
  const relayUrls = ["wss://relay.primal.net", "wss://relay.damus.io"];

  return (
    <div>
      <ImageOverlayProvider>
        <NostrProvider relayUrls={relayUrls} debug={true}>
          <BlogTimeline filterType="all" />
        </NostrProvider>
      </ImageOverlayProvider>
    </div>
  );
}
