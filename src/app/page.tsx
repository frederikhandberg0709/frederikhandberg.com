"use client";

import NavbarMenu from "@/components/NavbarMenu";
import "../components/input.css";
import RoundedButton from "@/components/RoundedButton";
import { useRef } from "react";
import Portfolio from "@/components/sections/Portfolio";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <NavbarMenu
        homeRef={homeRef}
        portfolioRef={portfolioRef}
        techStackRef={techStackRef}
        aboutMeRef={aboutMeRef}
        contactRef={contactRef}
      />

      <div ref={homeRef} id="home" className="flex h-[100vh] justify-center">
        <h1 className="mt-96 text-center text-4xl font-bold leading-normal">
          Building fun software projects while studying
          <br />
          for a degree in Software Engineering
        </h1>
      </div>

      <div
        ref={portfolioRef}
        id="portfolio"
        className="flex h-[100vh] items-center justify-center"
      >
        <div className="gap-full flex h-fit flex-col">
          <h2 className="text-center text-lg font-bold tracking-wider">
            PORTFOLIO
          </h2>
          <Portfolio />
        </div>
      </div>

      <div
        ref={techStackRef}
        id="tech-stack"
        className="flex items-center justify-center"
      >
        <div className="flex h-fit flex-col gap-8">
          <h2 className="text-center text-lg font-bold tracking-wider">
            TECH STACK
          </h2>

          <TechStack />
        </div>
      </div>

      <div
        ref={aboutMeRef}
        id="about-me"
        className="flex h-[100vh] items-center justify-center"
      >
        <div className="flex h-fit flex-col gap-8">
          <h2 className="text-center text-lg font-bold tracking-wider">
            ABOUT ME
          </h2>
        </div>
      </div>

      <div
        ref={contactRef}
        id="contact"
        className="flex h-[100vh] items-center justify-center"
      >
        <div className="flex h-fit flex-col gap-8">
          <h2 className="text-center text-lg font-bold tracking-wider">
            CONTACT
          </h2>
          <form action="" className="flex flex-col items-center gap-6">
            <div className="floating-input relative w-full">
              <input
                type="email"
                id="email"
                name="email"
                // value={this.state.email}
                // onChange={this.handleChange}
                // className="sm:full h-16 w-full rounded-[15px] border-2 border-gray-800 bg-transparent px-[20px] py-5 outline-none transition-all duration-300 ease-in-out hover:border-[#418DFF] focus:border-[#418DFF]"
                className="h-[52px] w-[400px] rounded-xl bg-black/5 px-[20px] py-5 text-black outline-none transition duration-200 ease-in-out hover:bg-black/15 focus:bg-black/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/15"
                placeholder="name@example.com"
                autoComplete="off"
                required
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute left-0 top-0 h-full origin-left transform px-[25px] py-3.5 text-gray-400 transition-all duration-150 ease-in-out"
              >
                Email (required)
              </label>
            </div>

            <div className="floating-input relative w-full">
              <input
                type="subject"
                id="subject"
                name="subject"
                // value={this.state.email}
                // onChange={this.handleChange}
                // className="sm:full h-16 w-full rounded-[15px] border-2 border-gray-800 bg-transparent px-[20px] py-5 outline-none transition-all duration-300 ease-in-out hover:border-[#418DFF] focus:border-[#418DFF]"
                className="h-[52px] w-[400px] rounded-xl bg-black/5 px-[20px] py-5 text-black outline-none transition duration-200 ease-in-out hover:bg-black/15 focus:bg-black/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/15"
                placeholder="name@example.com"
                autoComplete="off"
                required
              />
              <label
                htmlFor="subject"
                className="pointer-events-none absolute left-0 top-0 h-full origin-left transform px-[25px] py-3.5 text-gray-400 transition-all duration-150 ease-in-out"
              >
                Subject
              </label>
            </div>

            <div className="floating-input relative w-full">
              <textarea
                name="message"
                placeholder="Message"
                className="min-h-[200px] w-[400px] rounded-xl bg-black/5 px-[20px] py-5 text-black outline-none transition duration-200 ease-in-out hover:bg-black/15 focus:bg-black/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/15"
                // value={this.state.message}
                // onChange={this.handleChange}
                required
              />
              <label
                htmlFor="message"
                className="pointer-events-none absolute left-0 top-0 h-full origin-left transform px-[25px] py-3.5 text-gray-400 transition-all duration-150 ease-in-out"
              >
                Message (required)
              </label>
            </div>

            <RoundedButton href="#">Send</RoundedButton>
          </form>
        </div>
      </div>
    </div>
  );
}
