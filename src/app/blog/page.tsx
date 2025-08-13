"use client";

import BlogTimeline from "@/components/blog/BlogTimeline";
import { ImageOverlayProvider } from "@/components/ImageOverlayProvider";
import { ProfileProvider } from "@/context/ProfileContext";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { NostrProvider } from "nostr-react";

export default function Blog() {
  const relayUrls = ["wss://relay.primal.net", "wss://relay.damus.io"];

  return (
    <div>
      <ImageOverlayProvider>
        <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between bg-white/80 backdrop-blur-lg dark:bg-black/80">
          <div className="mx-3 my-3 w-full items-center justify-between sm:mx-20">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex flex-col items-start text-start font-bold leading-snug opacity-50 transition hover:opacity-100"
              >
                Frederik
                <br />
                Handberg
              </Link>
              <ChevronRight className="opacity-50" />
              <Link
                href="/blog"
                className="font-semibold opacity-50 hover:opacity-100"
              >
                Blog
              </Link>
            </div>
          </div>
        </nav>

        <div className="mb-10 mt-24 flex flex-col items-center gap-8">
          <div className="max-w-lg space-y-3">
            <h2 className="text-center text-lg font-bold tracking-wider">
              Welcome to my Blog 🚀
            </h2>
            <p className="text-sm text-neutral-600">
              On my short-form blog, I write about the software projects
              I&apos;m working on. I share the progress I make and the struggles
              I face along the way.
              <br />
              <br />
              Besides that, I also share whatever I&apos;m passionate about like
              sewing garments as part of my fashion design hobby, nature, and
              technology including AI, large language models, privacy, and
              decentralized open protocols.
            </p>
          </div>

          <NostrProvider relayUrls={relayUrls} debug={false}>
            <ProfileProvider>
              <BlogTimeline filterType="all" />
            </ProfileProvider>
          </NostrProvider>
        </div>
      </ImageOverlayProvider>
    </div>
  );
}
