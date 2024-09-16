"use client";

import {
  ReactLogo,
  TypeScriptLogo,
  NextJSLogo,
  ViteLogo,
  PostgreSQLLogo,
  PrismaLogo,
  RemixLogo,
} from "@/assets/TechStackLogos";
import TechStackBadge from "../TechStackBadge";
import { useEffect, useRef } from "react";
import "../card.css";

export default function TechStack() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cards.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cards.style.setProperty("--mouse-x", `${x}px`);
      cards.style.setProperty("--mouse-y", `${y}px`);

      const cardElements = cards.getElementsByClassName("card");
      for (let i = 0; i < cardElements.length; i++) {
        const card = cardElements[i] as HTMLElement;
        const cardRect = card.getBoundingClientRect();
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        card.style.setProperty("--mouse-x", `${cardX}px`);
        card.style.setProperty("--mouse-y", `${cardY}px`);
      }
    };

    cards.addEventListener("mousemove", handleMouseMove);

    return () => {
      cards.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardsRef}
      id="cards"
      className="grid grid-cols-3 justify-center gap-5 p-20"
    >
      <TechStackBadge
        logo={TypeScriptLogo}
        name="TypeScript"
        description="JavaScript but now with static typing."
      />
      <TechStackBadge
        logo={ReactLogo}
        name="React"
        description="Front-end library."
      />
      <TechStackBadge
        logo={NextJSLogo}
        name="NextJS"
        description="React framework."
      />
      <TechStackBadge
        logo={RemixLogo}
        name="Remix"
        description="React framework."
      />
      <TechStackBadge
        logo={ViteLogo}
        name="Vite"
        description="Development environment."
      />
      <TechStackBadge
        logo={PostgreSQLLogo}
        name="PostgreSQL"
        description="Relational database management system."
      />
      <TechStackBadge
        logo={PrismaLogo}
        name="Prisma ORM"
        description="Database schemas with type-safety."
      />
    </div>
  );
}
