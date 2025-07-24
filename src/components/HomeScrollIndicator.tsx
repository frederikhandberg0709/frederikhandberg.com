"use client";

import { useEffect, useRef, useState } from "react";

interface Section {
  id: string;
  label: string;
}

export const HomeScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const sectionsRef = useRef<Record<string, HTMLElement>>({});

  const sections: Section[] = [
    { id: "introduction", label: "Introduction" },
    { id: "contact", label: "Contact" },
    { id: "blog", label: "Blog" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        sectionsRef.current[id] = element;
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = sectionsRef.current[id];
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 z-10 -translate-y-1/2 transform">
      <div className="flex flex-col space-y-4">
        {sections.map(({ id, label }) => (
          <div
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex cursor-pointer items-center transition-all duration-150 ease-in-out"
          >
            {/* Dot indicator */}
            <button
              className={`size-2 rounded-full duration-300 ${
                activeSection === id
                  ? "scale-150 bg-black dark:bg-white"
                  : "bg-gray-400 group-hover:scale-125 group-hover:bg-gray-600 dark:bg-gray-600 dark:group-hover:bg-gray-400"
              }`}
            />

            <span
              className={`ml-4 text-sm font-medium duration-300 ${
                activeSection === id
                  ? "text-black opacity-100 dark:text-white"
                  : "text-gray-500 opacity-70 group-hover:text-gray-900 dark:group-hover:text-gray-200"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
