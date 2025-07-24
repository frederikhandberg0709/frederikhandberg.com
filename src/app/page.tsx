"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import NavbarLogo from "@/components/NavbarLogo";
import BlogTimeline from "@/components/blog/BlogTimeline";
import { NostrProvider } from "nostr-react";
import { ProfileProvider } from "@/context/ProfileContext";
import { ImageOverlayProvider } from "@/components/ImageOverlayProvider";
import ContactForm from "@/components/ContactForm";
import NameWithHoverImage from "@/components/NameWithHoverImage";
import ButtonLink from "@/components/buttons/ButtonLink";
import MobileNavMenu from "@/components/MobileNavMenu";
import { HomeScrollIndicator } from "@/components/HomeScrollIndicator";

export default function HomePage() {
  const [isHoveringSoftware, setIsHoveringSoftware] = useState(false);
  const [isHoveringFashion, setIsHoveringFashion] = useState(false);
  const relayUrls = ["wss://relay.primal.net", "wss://relay.damus.io"];

  return (
    <>
      <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex w-full justify-center">
        <div className="mx-20 my-3 hidden w-full items-center justify-between min-[810px]:container min-[810px]:flex">
          <NavbarLogo />

          <div className="flex gap-0.5">
            <Link
              href="/software"
              onMouseEnter={() => setIsHoveringSoftware(true)}
              onMouseLeave={() => setIsHoveringSoftware(false)}
              className="pointer-events-auto scale-100 rounded-lg px-5 py-3 text-base font-black tracking-wide text-neutral-500 transition hover:bg-black/10 hover:text-black active:scale-95 dark:hover:bg-white/10 dark:hover:text-white"
            >
              SOFTWARE
            </Link>
            <Link
              href="/fashion"
              onMouseEnter={() => setIsHoveringFashion(true)}
              onMouseLeave={() => setIsHoveringFashion(false)}
              className="pointer-events-auto scale-100 rounded-lg px-5 py-3 text-base font-black tracking-wide text-neutral-500 transition hover:bg-black/10 hover:text-black active:scale-95 dark:hover:bg-white/10 dark:hover:text-white"
            >
              FASHION
            </Link>
          </div>
          <div className="pointer-events-auto w-[105px]">
            <ThemeToggle />
          </div>
        </div>

        <div className="pointer-events-auto w-full min-[810px]:hidden">
          <MobileNavMenu menuType={"homepage"} />
        </div>
      </nav>

      {isHoveringSoftware && (
        <div className="fixed z-20 flex h-full w-full items-center justify-center backdrop-blur-xl">
          <h1 className="text-center text-4xl font-bold leading-normal max-[810px]:text-2xl">
            Building fun software projects while studying
            <br />
            for a degree in Software Engineering
          </h1>
        </div>
      )}

      {isHoveringFashion && (
        <div className="fixed z-20 flex h-full w-full items-center justify-center backdrop-blur-xl">
          <h1 className="max-w-3xl text-center text-4xl font-bold leading-normal max-[810px]:text-2xl">
            Bringing my ideas to life through fashion design, pattern drafting,
            and sewing
          </h1>
        </div>
      )}

      <ImageOverlayProvider>
        <div
          className="relative flex min-h-screen flex-col items-center overflow-x-hidden"
          style={{ gap: "4rem" }}
        >
          <div className="pointer-events-none fixed top-0 z-10 h-32 w-full bg-gradient-to-b from-white to-transparent dark:from-black max-[809px]:hidden"></div>

          <div className="hidden lg:block">
            <HomeScrollIndicator />
          </div>

          <section
            id="introduction"
            className="mt-24 max-w-3xl max-lg:mx-4 md:pt-24"
          >
            <div className="flex flex-col items-start justify-center gap-2.5">
              <h1 className="text-2xl font-medium">
                Hello and welcome to my personal website! 👋
              </h1>
              <p className="leading-relaxed">
                My name is{" "}
                <NameWithHoverImage
                  imageSrc="/photo-of-me.JPG"
                  className="hidden sm:inline-block"
                >
                  Frederik Handberg
                </NameWithHoverImage>
                . I&apos;m 22 years old and currently studying{" "}
                <div className="relative inline-block">
                  <span className="emoji-hover font-bold" data-emoji="💻 🚀">
                    Software Engineering
                  </span>
                </div>{" "}
                in Horsens, Denmark 🇩🇰
                <br />
                <br />
                I&apos;m passionate about developing full-stack web applications
                and native apps mainly for the Apple platforms. I enjoy building
                beautiful, thoughtful user interfaces and working on scalable
                server architectures.
                <br />
                <Link
                  href="/software"
                  className="font-semibold text-blue-500 transition-colors hover:text-blue-700 hover:underline"
                >
                  Read more about my software development projects
                </Link>
                <br />
                <br />
                In addition to doing software development, I&apos;m also
                exploring{" "}
                <div className="relative inline-block">
                  <span className="emoji-hover font-bold" data-emoji="🪡 🧵">
                    Fashion Design
                  </span>
                </div>
                . However, this is purely for fun and just a personal hobby. I
                suppose there are two reasons why I enjoy fashion design.
                Firstly, finding clothes that fit my body, has always been a
                challenge for me. So being able to design and sew my own
                garments is rewarding. Secondly, I&apos;m a creative person who
                loves good style, so I often get an idea about a nice design of
                a jacket or similar. I create garment concepts in 3D, draft
                patterns, and bring my designs to life through sewing.
                <br />
                <Link
                  href="/fashion"
                  className="font-semibold text-blue-500 transition-colors hover:text-blue-700 hover:underline"
                >
                  Read more about my fashion design hobby
                </Link>
              </p>
            </div>
          </section>

          <section
            id="contact"
            className="flex flex-col items-center gap-5 max-lg:mx-4 sm:pt-24 md:w-[450px]"
          >
            <h2 className="text-center text-xl font-bold tracking-wider">
              CONTACT
            </h2>

            <p className="text-center">
              Please use the form below to send me a message, or reach out
              directly via email at{" "}
              <Link
                href="mailto:hello@frederikhandberg.com"
                aria-label="Email hello@frederikhandberg.com"
                className="font-semibold text-blue-500 transition-colors hover:text-blue-700 hover:underline"
              >
                hello@frederikhandberg.com
              </Link>
            </p>

            <ContactForm />
          </section>

          <section
            id="blog"
            className="flex flex-col items-center gap-5 sm:pt-24"
          >
            <h2 className="text-center text-xl font-bold tracking-wider">
              BLOG
            </h2>

            <div className="mb-10 flex flex-col items-center gap-8">
              <NostrProvider relayUrls={relayUrls} debug={false}>
                <ProfileProvider>
                  <BlogTimeline filterType="all" maxElements={10} />
                </ProfileProvider>
              </NostrProvider>

              <ButtonLink href="/blog" variant="primary_glow" rounded="full">
                Show all
              </ButtonLink>
            </div>
          </section>
        </div>
      </ImageOverlayProvider>
    </>
  );
}
