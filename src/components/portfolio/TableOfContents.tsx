"use client";

import { useEffect, useState } from "react";
import { TOCItem } from "../../types/portfolio";
import { formatId } from "@/utils/mdx-utils";

interface TableOfContentsProps {
  items: TOCItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string | null>("introduction");
  const navbarHeight = 68;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string | null,
  ) => {
    e.preventDefault();

    if (id === null || id === "introduction") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      history.pushState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      setActiveId("introduction");
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteElementTop = rect.top + window.scrollY;
      const offsetPosition = absoluteElementTop - navbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  useEffect(() => {
    const headingElements: HTMLElement[] = [];
    const formattedIds = items.map((item) => formatId(item.text));

    const timer = setTimeout(() => {
      formattedIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          headingElements.push(element);
        }
      });

      headingElements.sort((a, b) => {
        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
      });

      const firstHeadingPosition =
        headingElements.length > 0
          ? headingElements[0].getBoundingClientRect().top + window.scrollY
          : Number.MAX_SAFE_INTEGER;

      const determineActiveSection = throttle(() => {
        const scrollPosition = window.scrollY;

        if (scrollPosition + navbarHeight < firstHeadingPosition) {
          setActiveId("introduction");
          return;
        }

        const headingPositions = headingElements.map((el) => ({
          id: el.id,
          top: el.getBoundingClientRect().top + scrollPosition,
        }));

        const currentSectionHeading = headingPositions
          .filter(
            (heading) => heading.top <= scrollPosition + navbarHeight + 20,
          )
          .slice(-1)[0];

        if (currentSectionHeading) {
          setActiveId(currentSectionHeading.id);
        } else {
          setActiveId("introduction");
        }
      }, 100);

      determineActiveSection();

      window.addEventListener("scroll", determineActiveSection, {
        passive: true,
      });

      return () => {
        window.removeEventListener("scroll", determineActiveSection);
      };
    }, 500);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <nav className="text-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        <li key="introduction">
          <a
            href="#"
            onClick={(e) => handleClick(e, null)}
            className={`pl-3 hover:text-blue-700 dark:hover:text-blue-400 ${activeId === "introduction" ? "text-blue-600" : "text-gray-600 dark:text-gray-400"}`}
          >
            Introduction
          </a>
        </li>

        {items.map((item) => {
          const itemId = formatId(item.text);
          return (
            <li
              key={itemId}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            >
              <a
                href={`#${itemId}`}
                onClick={(e) => handleClick(e, itemId)}
                className={`hover:text-blue-700 dark:hover:text-blue-400 ${activeId === item.id ? "text-blue-600" : "text-gray-600 dark:text-gray-400"}`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
