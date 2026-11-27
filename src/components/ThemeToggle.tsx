import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = ({ alwaysDisplayLabel = false }) => {
  const { setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const toggleTheme = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTheme(
        document.documentElement.classList.contains("dark") ? "light" : "dark",
      );
    }
  };

  const iconTransition = isAnimating
    ? "motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:ease-in-out"
    : "";

  return (
    <div className="relative flex flex-col items-center gap-6">
      <button
        type="button"
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 ${isAnimating ? "pointer-events-none motion-safe:transition-colors motion-safe:duration-300" : ""}`}
      >
        <span className="sr-only dark:hidden">Switch to dark mode</span>
        <span className="sr-only hidden dark:inline">Switch to light mode</span>
        <div
          aria-hidden="true"
          className="relative flex size-full items-center justify-center"
        >
          <div
            className={`absolute rotate-0 scale-100 opacity-100 dark:rotate-180 dark:scale-0 dark:opacity-0 ${iconTransition}`}
          >
            <Sun size={24} className="text-amber-500" />
          </div>

          <div
            className={`absolute rotate-180 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100 ${iconTransition}`}
          >
            <Moon size={24} className="text-indigo-400" />
          </div>
        </div>
      </button>

      {!alwaysDisplayLabel && isHovering && (
        <div className="pointer-events-none absolute top-full mt-2 w-fit overflow-hidden text-ellipsis whitespace-nowrap rounded bg-black/50 px-2.5 py-1.5 text-center text-sm text-white backdrop-blur-md">
          Current theme: <span className="dark:hidden">Light</span>
          <span className="hidden dark:inline">Dark</span>
        </div>
      )}

      {alwaysDisplayLabel && (
        <p className="text-center">
          Current theme:{" "}
          <strong className="dark:hidden">Light Mode</strong>
          <strong className="hidden dark:inline">Dark Mode</strong>
        </p>
      )}
    </div>
  );
};

export default ThemeToggle;
