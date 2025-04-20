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
  const [activeId, setActiveId] = useState<string | null>(null);
  const navbarHeight = 68;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string | null,
  ) => {
    e.preventDefault();

    if (id === null) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      history.pushState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      setActiveId(null);
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

      const determineActiveSection = throttle(() => {
        if (window.scrollY < 100) {
          setActiveId(null);
          return;
        }

        const viewportHeight = window.innerHeight;

        const visibleHeadings = headingElements.filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top >= navbarHeight && rect.top <= viewportHeight;
        });

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].id);
          return;
        }

        const headingsAboveViewport = headingElements
          .filter((el) => el.getBoundingClientRect().top <= navbarHeight)
          .sort((a, b) => {
            return (
              b.getBoundingClientRect().top - a.getBoundingClientRect().top
            );
          });

        if (headingsAboveViewport.length > 0) {
          setActiveId(headingsAboveViewport[0].id);
          return;
        }

        if (headingElements.length > 0) {
          setActiveId(headingElements[0].id);
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
            className="pl-3 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
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
                className={`text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 ${activeId === item.id ? "font-bold" : "font-normal"}`}
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
