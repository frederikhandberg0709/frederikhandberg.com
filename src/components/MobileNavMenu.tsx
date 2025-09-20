import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ThemeToggle from "./ThemeToggle";

export default function MobileNavMenu({
  menuType,
}: {
  menuType: "homepage" | "software" | "fashion";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", selector: "#home" },
        { id: "portfolio", selector: "#portfolio" },
        { id: "techstack", selector: "#tech-stack" },
        { id: "aboutme", selector: "#about-me" },
        { id: "contact", selector: "#contact" },
      ];

      const currentSection = sections.find((section) => {
        const element = document.querySelector(section.selector);
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (sectionId: string) => {
    const sectionMap: Record<string, string> = {
      home: "#home",
      portfolio: "#portfolio",
      techstack: "#tech-stack",
      aboutme: "#about-me",
      contact: "#contact",
    };

    const selector = sectionMap[sectionId];
    const section = document.querySelector(selector);

    if (section) {
      const yOffset = 5;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const linkStyles = (section?: string) => {
    return twMerge(
      "w-full text-center py-2.5 text-3xl font-bold transition duration-200 ease-in-out active:bg-white/10",
      activeSection === section
        ? "text-white"
        : "text-white/50 hover:text-white/80",
    );
  };

  return (
    <>
      <div className="flex h-full w-full items-center justify-between gap-2.5 bg-white/80 px-4 py-3 backdrop-blur-lg dark:bg-black/80">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick("home");
          }}
          className="flex flex-col items-start text-start font-bold leading-snug"
        >
          Frederik
          <br />
          Handberg
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-white/20 p-2 backdrop-blur-xl dark:bg-black/50"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="text-black dark:text-white" />
          ) : (
            <Menu size={24} className="text-black dark:text-white" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black/75 backdrop-blur-md"
          style={{ height: "100dvh", width: "100%" }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2"
            aria-label="Close menu"
          >
            <X size={24} className="text-white" />
          </button>

          <div className="flex w-full flex-col items-center justify-center gap-5">
            {menuType === "homepage" && (
              <>
                <Link href="/software" className={linkStyles()}>
                  Software
                </Link>
                <Link href="/fashion" className={linkStyles()}>
                  Fashion
                </Link>
                <Link href="/blog" className={linkStyles()}>
                  Blog
                </Link>
                <ThemeToggle />
              </>
            )}

            {menuType === "software" && (
              <>
                <Link
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("home");
                  }}
                  className={linkStyles("home")}
                >
                  Home
                </Link>

                <Link
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("portfolio");
                  }}
                  className={linkStyles("portfolio")}
                >
                  Portfolio
                </Link>

                <Link
                  href="#tech-stack"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("techstack");
                  }}
                  className={linkStyles("techstack")}
                >
                  Tech Stack
                </Link>

                <Link
                  href="#about-me"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("aboutme");
                  }}
                  className={linkStyles("aboutme")}
                >
                  About Me
                </Link>

                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick("contact");
                  }}
                  className={linkStyles("contact")}
                >
                  Contact
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
