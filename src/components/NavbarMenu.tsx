"use client";

import Link from "next/link";
import NavbarLink from "./NavbarLink";
import { useEffect, useState } from "react";
import ButtonLink from "./buttons/ButtonLink";
import MobileNavMenu from "./MobileNavMenu";
import NavbarLogo from "./NavbarLogo";

interface NavbarMenuProps {
  homeRef: React.RefObject<HTMLElement | null>;
  portfolioRef: React.RefObject<HTMLElement | null>;
  techStackRef: React.RefObject<HTMLElement | null>;
  aboutMeRef: React.RefObject<HTMLElement | null>;
  contactRef: React.RefObject<HTMLElement | null>;
}

export default function NavbarMenu({
  homeRef,
  portfolioRef,
  techStackRef,
  aboutMeRef,
  contactRef,
}: NavbarMenuProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: homeRef },
        { id: "portfolio", ref: portfolioRef },
        { id: "techstack", ref: techStackRef },
        { id: "aboutme", ref: aboutMeRef },
        { id: "contact", ref: contactRef },
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [homeRef, portfolioRef, techStackRef, aboutMeRef, contactRef]);

  const handleNavLinkClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = 5;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const linkClass = (section: string) =>
    `${
      activeSection === section
        ? "text-black dark:text-white"
        : "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
    }`;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between">
      <div className="mx-20 my-3 hidden w-full items-center justify-between max-[900px]:mx-12 min-[810px]:flex">
        <NavbarLogo />

        <div className="rounded-full bg-white/20 backdrop-blur-xl dark:bg-black/50">
          <div className="m-2 flex gap-2.5">
            <NavbarLink
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick("home");
              }}
              className={linkClass("home")}
              text="Home"
            />
            <NavbarLink
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick("portfolio");
              }}
              className={linkClass("portfolio")}
              text="Portfolio"
            />
            <NavbarLink
              href="#tech-stack"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick("tech-stack");
              }}
              text="Tech Stack"
              className={linkClass("techstack")}
            />
            <NavbarLink
              href="#about-me"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick("about-me");
              }}
              className={linkClass("aboutme")}
              text="About Me"
            />
          </div>
        </div>

        <div className="flex w-[105px] justify-end">
          <ButtonLink
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick("contact");
            }}
            variant="primary_glow"
            rounded="full"
          >
            Contact
          </ButtonLink>
        </div>
      </div>

      <div className="w-full min-[810px]:hidden">
        <MobileNavMenu />
      </div>
    </nav>
  );
}
