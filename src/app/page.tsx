"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import NavbarLogo from "@/components/nav/NavbarLogo";
import BlogTimeline from "@/components/blog/BlogTimeline";
import { NostrProvider } from "nostr-react";
import { ProfileProvider } from "@/context/ProfileContext";
import { ImageOverlayProvider } from "@/components/ImageOverlayProvider";
import ContactForm from "@/components/ContactForm";
import NameWithHoverImage from "@/components/NameWithHoverImage";
import ButtonLink from "@/components/buttons/ButtonLink";
import MobileNavMenu from "@/components/nav/MobileNavMenu";
import RoundedImage from "@/components/Image";
import PillNavbarMenu from "@/components/nav/PillNavbarMenu";
import UnderConstruction from "@/components/UnderConstruction";

export default function Home() {
  const [isHoveringSoftware, setIsHoveringSoftware] = useState(false);
  const [isHoveringFashion, setIsHoveringFashion] = useState(false);
  const [isHoveringNameText, setIsHoveringNameText] = useState(false);
  const [isHoveringSoftwareText, setIsHoveringSoftwareText] = useState(false);
  const [isHoveringFashionText, setIsHoveringFashionText] = useState(false);
  const relayUrls = ["wss://relay.primal.net", "wss://relay.damus.io"];

  const [showSecondText, setShowSecondText] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("");

  const [underConstructionDialogOpen, setUnderConstructionDialogOpen] =
    useState(false);

  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);

  const firstParagraph =
    "My name is Frederik Handberg. I'm 23 years old and studying Software Engineering in Horsens, Denmark 🇩🇰";
  const secondParagraph =
    "\nI'm passionate about building cool and useful apps 🚀\n\nMost recently, I've taken on a massive task to build the best notes app for thinking and brainstorming. So now, I'm learning AppKit for the macOS app, and UIKit once I begin the iOS/iPadOS app.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondText(true);
    }, 1900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "about", ref: aboutRef },
        { id: "contact", ref: contactRef },
        { id: "blog", ref: blogRef },
      ];

      const currentSection = sections.find((section) => {
        const element = section.ref.current;
        if (!element) return false;

        const { top, bottom } = element.getBoundingClientRect();
        const isInView =
          top + window.pageYOffset < window.scrollY + 5 &&
          bottom + window.pageYOffset > window.scrollY + 5;
        return isInView;
      });

      setActiveSection(currentSection ? currentSection.id : "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showSecondText) return;

    // Calculate total animation duration
    const charCount = (firstParagraph + secondParagraph).length;
    const animationDuration = charCount * 15; // 15ms per char

    const timer = setTimeout(() => {
      setTextAnimationComplete(true);
    }, animationDuration + 500); // Add 500ms buffer

    return () => clearTimeout(timer);
  }, [showSecondText]);

  const renderAnimatedText = (text: string, startCharIndex = 0) => {
    const lines = text.split("\n");
    let charIndex = startCharIndex;

    const isAnyHovered = isHoveringNameText || isHoveringSoftwareText;
    const regularDimmingClass = `transition-all duration-400 ease-in-out ${
      isAnyHovered ? "opacity-30 blur-[1px]" : "opacity-100"
    }`;

    const nameDimmingClass = `transition-all duration-400 ease-in-out ${
      isHoveringSoftwareText ? "opacity-30 blur-[1px]" : "opacity-100"
    }`;

    const engineeringDimmingClass = `transition-all duration-400 ease-in-out ${
      isHoveringNameText ? "opacity-30 blur-[1px]" : "opacity-100"
    }`;

    // Helper function to render text and check for "Software Engineering"
    const renderTextWithSoftwareEngineering = (text: string) => {
      if (text.includes("Software Engineering")) {
        const engineeringParts = text.split("Software Engineering");

        return (
          <>
            {/* Text before "Software Engineering" */}
            {engineeringParts[0].split(" ").map((word, wordIndex) => {
              if (!word) return null;
              const segmenter = new Intl.Segmenter("en", {
                granularity: "grapheme",
              });
              const chars = Array.from(
                segmenter.segment(word),
                (s) => s.segment,
              );

              const wordChars = chars.map((char, i) => {
                const currentIndex = charIndex++;
                return (
                  <span
                    key={i}
                    className="inline-block animate-char-reveal leading-relaxed opacity-0"
                    style={{
                      animationDelay: `${currentIndex * 15}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              });

              charIndex++;

              return (
                <span
                  key={`se-before-${wordIndex}`}
                  className={`inline-block ${regularDimmingClass}`}
                >
                  {wordChars}
                  {wordIndex < engineeringParts[0].split(" ").length - 1 &&
                    "\u00A0"}
                </span>
              );
            })}

            {/* Space before "Software Engineering" */}

            {/* "Software Engineering" with emoji tooltip */}
            <Link
              href="/software"
              className={`relative inline-block hover:text-blue-500 ${engineeringDimmingClass}`}
              onMouseEnter={() => setIsHoveringSoftwareText(true)}
              onMouseLeave={() => setIsHoveringSoftwareText(false)}
            >
              <span
                className="emoji-tooltip sm:emoji-hover font-bold"
                data-emoji="💻 🚀"
              >
                {"Software Engineering".split("").map((char, i) => {
                  const currentIndex = charIndex++;
                  return (
                    <span
                      key={i}
                      className="inline-block animate-char-reveal leading-relaxed opacity-0"
                      style={{
                        animationDelay: `${currentIndex * 15}ms`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
                {"\u00A0"}
              </span>
            </Link>

            {/* Text after "Software Engineering" */}
            {engineeringParts[1] &&
              engineeringParts[1].split(" ").map((word, wordIndex) => {
                if (!word) return null;
                const segmenter = new Intl.Segmenter("en", {
                  granularity: "grapheme",
                });
                const chars = Array.from(
                  segmenter.segment(word),
                  (s) => s.segment,
                );

                const wordChars = chars.map((char, i) => {
                  const currentIndex = charIndex++;
                  return (
                    <span
                      key={i}
                      className="inline-block animate-char-reveal leading-relaxed opacity-0"
                      style={{
                        animationDelay: `${currentIndex * 15}ms`,
                      }}
                    >
                      {char}
                    </span>
                  );
                });

                charIndex++;

                return (
                  <span
                    key={`se-after-${wordIndex}`}
                    className={`inline-block ${regularDimmingClass}`}
                  >
                    {wordChars}
                    {wordIndex < engineeringParts[1].split(" ").length - 1 &&
                      "\u00A0"}
                  </span>
                );
              })}
          </>
        );
      }

      // Regular text rendering
      return text.split(" ").map((word, wordIndex) => {
        if (!word) return null;
        const segmenter = new Intl.Segmenter("en", {
          granularity: "grapheme",
        });
        const chars = Array.from(segmenter.segment(word), (s) => s.segment);

        const wordChars = chars.map((char, i) => {
          const currentIndex = charIndex++;
          return (
            <span
              key={i}
              className="inline-block animate-char-reveal leading-relaxed opacity-0"
              style={{
                animationDelay: `${currentIndex * 15}ms`,
              }}
            >
              {char}
            </span>
          );
        });

        charIndex++;

        return (
          <span
            key={`regular-${wordIndex}`}
            className={`inline-block ${regularDimmingClass}`}
          >
            {wordChars}
            {wordIndex < text.split(" ").length - 1 && "\u00A0"}
          </span>
        );
      });
    };

    return lines.map((line, lineIndex) => {
      // Check if this line contains "Frederik Handberg"
      if (line.includes("Frederik Handberg")) {
        const parts = line.split("Frederik Handberg");

        return (
          <span key={lineIndex}>
            {/* Render text before name */}
            {parts[0].split(" ").map((word, wordIndex) => {
              if (!word) return null;
              const segmenter = new Intl.Segmenter("en", {
                granularity: "grapheme",
              });
              const chars = Array.from(
                segmenter.segment(word),
                (s) => s.segment,
              );

              const wordChars = chars.map((char, i) => {
                const currentIndex = charIndex++;
                return (
                  <span
                    key={i}
                    className={`inline-block animate-char-reveal leading-relaxed opacity-0`}
                    style={{
                      animationDelay: `${currentIndex * 15}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              });

              charIndex++;

              return (
                <span
                  key={wordIndex}
                  className={`inline-block ${regularDimmingClass}`}
                >
                  {wordChars}
                  {wordIndex < parts[0].split(" ").length - 1 && "\u00A0"}
                </span>
              );
            })}

            <span>
              {/* Render animated name component */}
              <NameWithHoverImage
                imageSrc="/photo-of-me.JPG"
                className={`hidden sm:inline-block ${nameDimmingClass}`}
              >
                {"Frederik Handberg".split("").map((char, i) => {
                  const currentIndex = charIndex++;
                  return (
                    <span
                      key={i}
                      className={`inline-block animate-char-reveal leading-relaxed opacity-0`}
                      style={{
                        animationDelay: `${currentIndex * 15}ms`,
                      }}
                      onMouseEnter={() => setIsHoveringNameText(true)}
                      onMouseLeave={() => setIsHoveringNameText(false)}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </NameWithHoverImage>

              <span className={`sm:hidden ${nameDimmingClass}`}>
                {"Frederik Handberg".split("").map((char, i) => {
                  const currentIndex = charIndex++;
                  return (
                    <span
                      key={i}
                      className="inline-block animate-char-reveal font-bold leading-relaxed opacity-0"
                      style={{
                        animationDelay: `${currentIndex * 15}ms`,
                      }}
                      onMouseEnter={() => setIsHoveringNameText(true)}
                      onMouseLeave={() => setIsHoveringNameText(false)}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </span>
            </span>

            {/* Render text after name */}
            {parts[1] && renderTextWithSoftwareEngineering(parts[1])}

            {lineIndex < lines.length - 1 && "\n"}
          </span>
        );
      }

      // Check if this line contains "Software Engineering" (for lines without Frederik)
      if (line.includes("Software Engineering")) {
        return (
          <span key={lineIndex}>
            {renderTextWithSoftwareEngineering(line)}
            {lineIndex < lines.length - 1 && "\n"}
          </span>
        );
      }

      return (
        <span key={lineIndex}>
          {line.split(" ").map((word, wordIndex) => {
            const segmenter = new Intl.Segmenter("en", {
              granularity: "grapheme",
            });
            const chars = Array.from(segmenter.segment(word), (s) => s.segment);

            const wordChars = chars.map((char, i) => {
              const currentIndex = charIndex++;
              return (
                <span
                  key={i}
                  className="inline-block animate-char-reveal leading-relaxed opacity-0"
                  style={{
                    animationDelay: `${currentIndex * 15}ms`,
                  }}
                >
                  {char}
                </span>
              );
            });

            charIndex++;

            return (
              <span
                key={wordIndex}
                className={`inline-block ${regularDimmingClass}`}
              >
                {wordChars}
                {wordIndex < line.split(" ").length - 1 && "\u00A0"}
              </span>
            );
          })}
          {lineIndex < lines.length - 1 && "\n"}
        </span>
      );
    });
  };

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

      <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <PillNavbarMenu
          links={[
            { href: "#about", text: "About", sectionId: "about" },
            { href: "#contact", text: "Contact", sectionId: "contact" },
            { href: "#blog", text: "Blog", sectionId: "blog" },
          ]}
          activeSection={activeSection}
        />
      </div>

      {isHoveringSoftware && (
        <div className="fixed z-20 flex h-full w-full items-center justify-center backdrop-blur-xl">
          <h1 className="text-center text-4xl font-bold leading-normal max-[810px]:text-2xl">
            Building fun software projects while studying
            <br />
            for a degree in Software Engineering.
          </h1>
        </div>
      )}

      {isHoveringFashion && (
        <div className="fixed z-20 flex h-full w-full items-center justify-center backdrop-blur-xl">
          <h1 className="max-w-3xl text-center text-4xl font-bold leading-normal max-[810px]:text-2xl">
            Bringing my ideas to life through fashion design, pattern drafting,
            and sewing.
          </h1>
        </div>
      )}

      <UnderConstruction
        onOpen={underConstructionDialogOpen}
        setDialogOpen={setUnderConstructionDialogOpen}
      />

      <ImageOverlayProvider>
        <div className="pointer-events-none fixed top-0 z-10 h-32 w-full bg-gradient-to-b from-white to-transparent dark:from-black max-[809px]:hidden"></div>

        <section
          id="about"
          ref={aboutRef}
          className={`relative flex min-h-screen flex-col items-center px-4 ${showSecondText ? "justify-start" : "justify-center"}`}
        >
          <div
            className={`${!textAnimationComplete ? "animate-move-to-top [--move-to-top-dest:100px] sm:[--move-to-top-dest:200px]" : ""} flex flex-col items-center gap-[30px] ${showSecondText ? "relative top-[0px] mt-[100px] sm:mt-[200px]" : "absolute"}`}
          >
            <h1 className="animate-scale-down text-center text-4xl font-bold">
              Hello and welcome to my personal website! 👋
            </h1>
            <div
              className={`flex flex-col items-center ${showSecondText ? "max-w-4xl" : "max-w-auto"}`}
            >
              {showSecondText && (
                <>
                  <div className="max-w-3xl whitespace-pre-line text-left text-xl sm:text-center md:text-2xl">
                    {renderAnimatedText(firstParagraph)}
                  </div>

                  <div className="my-5 animate-image-opacity sm:hidden">
                    <RoundedImage src="/photo-of-me.JPG" alt="Image of me" />
                  </div>

                  <div className="max-w-3xl whitespace-pre-line text-left text-xl sm:text-center md:text-2xl">
                    {renderAnimatedText(secondParagraph, firstParagraph.length)}
                  </div>

                  <div
                    className={`flex flex-col items-center ${textAnimationComplete ? "pointer-events-auto animate-image-reveal select-auto" : "pointer-events-none select-none opacity-0"}`}
                  >
                    <div className="mt-[50px]">
                      <RoundedImage
                        src="/notes_app.png"
                        alt="Image of notes app for macOS"
                      />
                    </div>

                    <button
                      onClick={() => setUnderConstructionDialogOpen(true)}
                      className="relative mt-[20px] inline-block animate-image-reveal cursor-pointer bg-right text-center text-lg font-medium duration-400 ease-out max-sm:text-gray-500 max-sm:hover:text-blue-500 max-sm:hover:underline max-sm:active:text-blue-500 dark:max-sm:text-gray-400 sm:bg-[linear-gradient(to_right,theme(colors.blue.500)_50%,theme(colors.gray.600)_50%)] sm:bg-[length:200%_100%] sm:bg-clip-text sm:text-transparent sm:transition-[background-position] sm:before:absolute sm:before:-bottom-1 sm:before:left-0 sm:before:h-[2px] sm:before:w-full sm:before:origin-left sm:before:scale-x-0 sm:before:bg-blue-500 sm:before:transition-transform sm:before:duration-400 sm:before:ease-out sm:hover:bg-left sm:hover:before:scale-x-100 sm:dark:bg-[linear-gradient(to_right,theme(colors.blue.500)_50%,theme(colors.gray.400)_50%)]"
                      style={{
                        animationFillMode: "forwards",
                      }}
                    >
                      Read more about my notes app and my choice for going
                      native
                    </button>

                    <div className="mt-[100px] max-w-3xl whitespace-pre-line text-left text-xl sm:text-center md:text-2xl">
                      <p className="leading-relaxed">
                        <span
                          className={`transition-all duration-400 ease-in-out ${isHoveringFashionText ? "opacity-30 blur-[1px]" : "opacity-100"}`}
                        >
                          In addition to doing software development, I&apos;m
                          also learning
                        </span>{" "}
                        <div className="relative inline-block">
                          <Link
                            href="/software"
                            className="emoji-tooltip font-bold hover:text-blue-500"
                            data-emoji="🪡 🧵"
                            onMouseOver={() => setIsHoveringFashionText(true)}
                            onMouseLeave={() => setIsHoveringFashionText(false)}
                          >
                            Fashion Design
                          </Link>
                        </div>
                        <span
                          className={`transition-all duration-400 ease-in-out ${isHoveringFashionText ? "opacity-30 blur-[1px]" : "opacity-100"}`}
                        >
                          . However, this is purely for fun and just a personal
                          hobby of mine.
                          <br />
                          <br />
                          Because I like tailored and well-fitting clothing,
                          finding pieces that truly fit my body has always been
                          difficult. Designing and sewing my own garments allows
                          me to solve that problem creatively, combining my love
                          for classic design with bold design twists.
                          <br />
                          <br />I create garment concepts in 3D, draft patterns
                          with my measurements, and bring my designs to life
                          through sewing.
                        </span>
                      </p>

                      <Link
                        href="/fashion"
                        className="relative mt-[20px] inline-block animate-image-reveal cursor-pointer bg-right text-center text-lg font-medium duration-400 ease-out max-sm:text-gray-500 max-sm:hover:text-blue-500 max-sm:hover:underline max-sm:active:text-blue-500 dark:max-sm:text-gray-400 sm:bg-[linear-gradient(to_right,theme(colors.blue.500)_50%,theme(colors.gray.600)_50%)] sm:bg-[length:200%_100%] sm:bg-clip-text sm:text-transparent sm:transition-[background-position] sm:before:absolute sm:before:-bottom-1 sm:before:left-0 sm:before:h-[2px] sm:before:w-full sm:before:origin-left sm:before:scale-x-0 sm:before:bg-blue-500 sm:before:transition-transform sm:before:duration-400 sm:before:ease-out sm:hover:bg-left sm:hover:before:scale-x-100 sm:dark:bg-[linear-gradient(to_right,theme(colors.blue.500)_50%,theme(colors.gray.400)_50%)]"
                        style={{
                          animationFillMode: "forwards",
                        }}
                      >
                        Read more about my fashion design hobby
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden pt-10">
          <section
            id="contact"
            ref={contactRef}
            className="flex justify-center pb-20 pt-40"
          >
            <div className="flex flex-col items-center justify-center gap-5 max-lg:mx-4 md:w-[450px]">
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
            </div>
          </section>

          <section
            id="blog"
            ref={blogRef}
            className="flex flex-col items-center gap-5 pt-32"
          >
            <h2 className="text-center text-xl font-bold tracking-wider">
              BLOG
            </h2>

            <p className="mx-5 text-center">
              You can find all my blog posts at{" "}
              <Link
                href="/blog"
                className="max-w-lg font-semibold text-blue-500 transition-colors hover:text-blue-700 hover:underline"
              >
                frederikhandberg.com/blog
              </Link>
            </p>

            <div className="mb-10 flex flex-col items-center gap-8">
              <NostrProvider relayUrls={relayUrls} debug={false}>
                <ProfileProvider>
                  <BlogTimeline filterType="all" />
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
