"use client";

import NavbarMenu from "@/components/NavbarMenu";
import "../components/input.css";
import { useRef } from "react";
import Portfolio from "@/components/sections/Portfolio";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AboutMe from "@/components/sections/AboutMe";

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <NavbarMenu
        homeRef={homeRef}
        portfolioRef={portfolioRef}
        techStackRef={techStackRef}
        aboutMeRef={aboutMeRef}
        contactRef={contactRef}
      />

      <div ref={homeRef} id="home" className="flex min-h-screen justify-center">
        <h1 className="mt-96 text-center text-4xl font-bold leading-normal">
          Building fun software projects while studying
          <br />
          for a degree in Software Engineering
        </h1>
      </div>

      <section
        ref={portfolioRef}
        id="portfolio"
        className="flex min-h-screen items-center justify-center"
      >
        <Portfolio />
      </section>

      <section
        ref={techStackRef}
        id="tech-stack"
        className="flex min-h-screen items-center justify-center py-40"
      >
        <TechStack />
      </section>

      <section
        ref={aboutMeRef}
        id="about-me"
        className="flex min-h-screen items-center justify-center"
      >
        <AboutMe />
      </section>

      <section
        ref={contactRef}
        id="contact"
        className="flex min-h-screen items-center justify-center"
      >
        <Contact />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}
