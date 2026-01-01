"use client";

import { useEffect, useState } from "react";
import ButtonLink from "../buttons/ButtonLink";
import MobileNavMenu from "./MobileNavMenu";
import NavbarLogo from "./NavbarLogo";
import PillNavbarMenu from "./PillNavbarMenu";

interface Navbar {
  homeRef: React.RefObject<HTMLElement | null>;
  portfolioRef: React.RefObject<HTMLElement | null>;
  techStackRef: React.RefObject<HTMLElement | null>;
  aboutMeRef: React.RefObject<HTMLElement | null>;
  contactRef: React.RefObject<HTMLElement | null>;
  menuType: "homepage" | "software" | "fashion";
}

export default function Navbar({
  homeRef,
  portfolioRef,
  techStackRef,
  aboutMeRef,
  contactRef,
  menuType,
}: Navbar) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: homeRef },
        { id: "portfolio", ref: portfolioRef },
        { id: "tech-stack", ref: techStackRef },
        { id: "about-me", ref: aboutMeRef },
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

  const getMenuLinks = () => {
    if (menuType === "software") {
      return [
        { href: "#home", text: "Home", sectionId: "home" },
        { href: "#portfolio", text: "Portfolio", sectionId: "portfolio" },
        { href: "#tech-stack", text: "Tech Stack", sectionId: "tech-stack" },
        { href: "#about-me", text: "About Me", sectionId: "about-me" },
      ];
    }

    if (menuType === "fashion") {
      return [
        { href: "#", text: "", sectionId: "" },
        { href: "#", text: "", sectionId: "" },
        { href: "#", text: "", sectionId: "" },
        { href: "#", text: "", sectionId: "" },
      ];
    }

    return [];
  };

  return (
    <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-center">
      <div className="mx-20 my-3 hidden w-full items-center justify-between min-[810px]:container max-[900px]:mx-12 min-[810px]:flex">
        <NavbarLogo />

        <PillNavbarMenu
          links={getMenuLinks()}
          activeSection={activeSection}
          onNavLinkClick={handleNavLinkClick}
        />

        <div className="flex w-[105px] justify-end">
          <ButtonLink
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick("contact");
            }}
            variant="primary_glow"
            rounded="full"
            className="pointer-events-auto"
          >
            Contact
          </ButtonLink>
        </div>
      </div>

      <div className="pointer-events-auto w-full min-[810px]:hidden">
        <MobileNavMenu menuType={menuType} />
      </div>
    </nav>
  );
}
