"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const logoRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = () => {
    setIsDropdownClicked(!isDropdownClicked);
  };

  useEffect(() => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [isDropdownClicked]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(event.target as Node) &&
        !logoRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownClicked(false);
      }
    };

    if (isDropdownClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownClicked]);

  return (
    <>
      <nav className="pointer-events-none fixed z-30 flex w-full justify-center">
        <div className="mx-20 my-1.5 flex w-full justify-between max-[900px]:mx-12">
          <div
            ref={logoRef}
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
            className="pointer-events-auto flex w-[105px] items-center justify-start gap-3"
          >
            <Link
              href="/"
              className="flex flex-col items-start text-start font-bold leading-snug opacity-50 transition hover:opacity-100"
            >
              Frederik
              <br />
              Handberg
            </Link>

            {(isHoveringLogo || isDropdownClicked) && (
              <button
                onClick={handleDropdownClick}
                className={`inset-2 rounded-full bg-white bg-white/15 transition duration-300 ease-in-out hover:bg-white/20 active:bg-white/25 ${isDropdownClicked ? "rotate-180" : "rotate-0"}`}
              >
                <ChevronDown />
              </button>
            )}
          </div>
          <div className="flex gap-0.5">
            <Link
              href="/software"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="pointer-events-auto scale-100 rounded-md px-5 py-3 text-base font-black text-neutral-500 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              SOFTWARE
            </Link>
            <Link
              href="/fashion"
              className="pointer-events-auto scale-100 rounded-md px-5 py-3 text-base font-black text-neutral-500 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              FASHION
            </Link>
            <Link
              href="#"
              className="pointer-events-auto scale-100 rounded-md px-5 py-3 text-base font-black text-neutral-500 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              BLOG
            </Link>
            <Link
              href="#"
              className="pointer-events-auto scale-100 rounded-md px-5 py-3 text-base font-black text-neutral-500 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              ABOUT
            </Link>
          </div>
          <div className="w-[105px]"></div>
        </div>
      </nav>

      {isDropdownClicked && (
        <div
          ref={dropdownRef}
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
          className="fixed z-[25] space-y-1.5 rounded-xl border border-white bg-black p-1.5"
        >
          <Link
            href="/"
            className="flex flex-col rounded-xl px-2.5 py-1.5 text-xl font-bold hover:bg-white/10"
          >
            <span className="text-sm font-normal opacity-50">
              frederikhandberg.com
            </span>
            Home
          </Link>
          <Link
            href="/software"
            className="flex flex-col rounded-xl px-2.5 py-1.5 text-xl font-bold hover:bg-white/10"
          >
            <span className="text-sm font-normal opacity-50">
              software.frederikhandberg.com
            </span>
            Software
          </Link>
          <Link
            href="/fashion"
            className="flex flex-col rounded-xl px-2.5 py-1.5 text-xl font-bold hover:bg-white/10"
          >
            <span className="text-sm font-normal opacity-50">
              fashion.frederikhandberg.com
            </span>
            Fashion
          </Link>
        </div>
      )}

      {isHovering && (
        <div className="fixed z-20 flex h-full w-full items-center justify-center backdrop-blur-xl">
          <h1 className="text-center text-4xl font-bold leading-normal max-[810px]:text-2xl">
            Building fun software projects while studying
            <br />
            for a degree in Software Engineering
          </h1>
        </div>
      )}

      <div className="flex min-h-screen flex-col items-center">
        <div className="pointer-events-none fixed top-0 z-10 h-32 w-full bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mt-52">
          <div className="flex flex-col items-center justify-center gap-2.5">
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
              fashion design. I create garment concepts in 3D, draft patterns,
              and bring my designs to life through sewing. I’m a creative person
              full of ideas always looking to learn something new and level up
              my skills.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
