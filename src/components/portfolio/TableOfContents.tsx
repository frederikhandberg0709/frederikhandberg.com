"use client";

import { TOCItem } from "../../types/portfolio";

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
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
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 68;

      const offsetPosition =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight -
        20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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

        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
