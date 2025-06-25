"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import NavbarLogo from "@/components/NavbarLogo";
import BlogTimeline from "@/components/blog/BlogTimeline";
import { NostrProvider } from "nostr-react";
import { ProfileProvider } from "@/context/ProfileContext";
import { ImageOverlayProvider } from "@/components/ImageOverlayProvider";

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const relayUrls = ["wss://relay.primal.net", "wss://relay.damus.io"];

  return (
    <>
      <nav className="pointer-events-none fixed z-30 flex w-full justify-center">
        <div className="mx-20 my-1.5 flex w-full items-center justify-between max-[900px]:mx-12">
          <NavbarLogo />

          <div className="flex gap-0.5">
            <Link
              href="/software"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="pointer-events-auto scale-100 rounded-lg px-5 py-3 text-base font-black text-neutral-500 transition hover:bg-black/10 hover:text-black active:scale-95 dark:hover:bg-white/10 dark:hover:text-white"
            >
              SOFTWARE
            </Link>
            <Link
              href="/fashion"
              className="pointer-events-auto scale-100 rounded-lg px-5 py-3 text-base font-black text-neutral-500 transition hover:bg-black/10 hover:text-black active:scale-95 dark:hover:bg-white/10 dark:hover:text-white"
            >
              FASHION
            </Link>
          </div>
          <div className="pointer-events-auto w-[105px]">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {isHovering && (
        <div className="fixed z-20 flex h-full w-full items-center justify-center backdrop-blur-xl">
          <h1 className="text-center text-4xl font-bold leading-normal max-[810px]:text-2xl">
            Building fun software projects while studying
            <br />
            for a degree in Software Engineering
          </h1>
        </div>
      )}

      <ImageOverlayProvider>
        <div
          className="flex min-h-screen flex-col items-center"
          style={{ gap: "4rem" }}
        >
          <div className="pointer-events-none fixed top-0 z-10 h-32 w-full bg-gradient-to-b from-white to-transparent dark:from-black"></div>
          <div className="mt-52 max-w-3xl">
            <div className="flex flex-col items-start justify-center gap-2.5">
              <h1 className="text-2xl font-medium">
                Hello and welcome to my personal website!
              </h1>
              <p className="leading-relaxed">
                My name is <span className="font-bold">Frederik Handberg</span>.
                I’m 22 years old and currently studying{" "}
                <span className="font-bold">Software Engineering</span> in
                Horsens, Denmark.
                <br />
                <br />
                I’m passionate about developing full-stack web applications and
                native apps mainly for the Apple platforms. I enjoy building
                beautiful, thoughtful user interfaces and working on scalable
                server architectures.
                <br />
                <Link href="/software" className="font-semibold text-blue-500">
                  Read more about my software development projects
                </Link>
                <br />
                <br />
                In addition to doing software development, I’m also exploring
                fashion design. However, this is purely for fun and just a
                personal hobby. I suppose there are two reasons why I enjoy
                fashion design. Firsly, finding clothes that fit my body, has
                always been a challenge for me. Secondly, I&apos;m a creative
                person who loves good style, so I often get an idea about a nice
                design of a jacket or similar. I create garment concepts in 3D,
                draft patterns, and bring my designs to life through sewing.
              </p>
            </div>
          </div>

          <section className="flex flex-col gap-5 items-center">
            <h1 className="text-center text-xl">CONTACT</h1>
            <p>🚧 UNDER CONSTRUCTION 🚧</p>
          </section>

          <section className="flex flex-col items-center gap-5">
            <h1 className="text-center text-xl">BLOG</h1>

            <div>
              <NostrProvider relayUrls={relayUrls} debug={false}>
                <ProfileProvider>
                  <BlogTimeline filterType="all" maxElements={10} />
                </ProfileProvider>
              </NostrProvider>
            </div>
          </section>>
        </div>
      </ImageOverlayProvider>
    </>
  );
}
