"use client";

import Author from "@/components/blog/Author";
import BlogTimeline from "@/components/blog/BlogTimeline";
import { BLOG_RELAY_URLS } from "@/config/nostr";
import { ImageOverlayProvider } from "@/components/ImageOverlayProvider";
import { ProfileProvider } from "@/context/ProfileContext";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { NostrProvider } from "nostr-react";
import { useState } from "react";

type BlogView = "timeline" | "media";

export default function Blog() {
  const [activeView, setActiveView] = useState<BlogView>("timeline");

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
          <NostrProvider relayUrls={BLOG_RELAY_URLS} debug={false}>
            <ProfileProvider>
              <Author />

              <div
                className="grid w-full grid-cols-2 border-b border-gray-200 px-4 dark:border-gray-800 sm:w-[600px] sm:px-0"
                role="tablist"
                aria-label="Blog views"
              >
                {(["timeline", "media"] as const).map((view) => {
                  const isActive = activeView === view;

                  return (
                    <button
                      key={view}
                      id={`${view}-tab`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="blog-content"
                      onClick={() => setActiveView(view)}
                      className={`relative py-3 text-sm font-semibold capitalize transition-colors duration-200 ${
                        isActive
                          ? "text-gray-950 dark:text-white"
                          : "text-gray-500 hover:text-gray-950 dark:hover:text-white"
                      }`}
                    >
                      {view}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-8 bottom-[-1px] h-0.5 rounded-full bg-gray-950 transition-all duration-300 dark:bg-white ${
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <BlogTimeline filterType="all" view={activeView} />
            </ProfileProvider>
          </NostrProvider>
        </div>
      </ImageOverlayProvider>
    </div>
  );
}
