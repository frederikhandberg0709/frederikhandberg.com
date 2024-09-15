"use client";

import Link from "next/link";
import NavbarLink from "./NavbarLink";
import { useEffect, useState } from "react";

interface NavbarMenuProps {
  homeRef: React.RefObject<HTMLElement>;
  portfolioRef: React.RefObject<HTMLElement>;
  techStackRef: React.RefObject<HTMLElement>;
  aboutMeRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
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
      // Navbar active section
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
      const yOffset = 5; // Scroll down an additional 5px
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const linkClass = (section: string) =>
    `${
      activeSection === section
        ? "text-white"
        : "text-white/50 hover:text-white"
    }`;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between">
      <div className="mx-20 my-3 flex w-full items-center justify-between">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick("home");
          }}
          className="flex flex-col items-start text-start font-bold leading-snug opacity-50 transition hover:opacity-100"
        >
          Frederik
          <br />
          Handberg
        </Link>

        <div className="rounded-full bg-black/50 backdrop-blur-xl">
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

        <Link
          href={"#contact"}
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick("contact");
          }}
          className="linear scale-100 rounded-full bg-gradient-to-br from-[#339DFF] to-[#312fad] px-5 py-2 font-bold shadow-none transition duration-200 hover:scale-105 hover:shadow-[0_5px_25px_15px_rgba(47,67,173,0.35)] active:scale-95"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
