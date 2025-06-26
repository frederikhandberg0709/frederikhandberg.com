import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = ({ alwaysDisplayLabel = false }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  };

  const isDarkMode = mounted && resolvedTheme === "dark";

  if (!mounted) {
    return <div className="h-12 w-12 rounded-full bg-gray-200"></div>;
  }

  return (
    <div className="relative flex flex-col items-center gap-6">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 dark:bg-gray-800 ${isAnimating ? "pointer-events-none" : ""}`}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="relative flex size-full items-center justify-center">
          <div
            className={`absolute transition-all duration-500 ease-in-out ${
              isDarkMode
                ? "rotate-180 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          >
            <Sun size={24} className="text-amber-500" />
          </div>

          <div
            className={`absolute transition-all duration-500 ease-in-out ${
              isDarkMode
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-180 scale-0 opacity-0"
            }`}
          >
            <Moon size={24} className="text-indigo-400" />
          </div>
        </div>
      </button>

      {!alwaysDisplayLabel && isHovering && (
        <div className="pointer-events-none absolute top-full mt-2 w-fit overflow-hidden text-ellipsis whitespace-nowrap rounded bg-black/50 px-2.5 py-1.5 text-center text-sm text-white backdrop-blur-md">
          Current theme: {isDarkMode ? "Dark" : "Light"}
        </div>
      )}

      {alwaysDisplayLabel && (
        <p className="text-center">
          Current theme:{" "}
          <strong>{isDarkMode ? "Dark Mode" : "Light Mode"}</strong>
        </p>
      )}
    </div>
  );
};

export default ThemeToggle;
