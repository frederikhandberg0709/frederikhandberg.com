import { useTheme } from "next-themes";
import { useState } from "react";

export default function Header() {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => () => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const getTextColor = () => {
    if (theme === "dark") {
      return `rgba(242, 243, 244, ${hovered ? 0.3 : 1})`;
    } else {
      return `rgba(17, 24, 39, ${hovered ? 0.3 : 1})`;
    }
  };

  const hoveredTextColor = () => {
    if (theme === "dark") {
      return "rgba(242, 243, 244, 1)";
    } else {
      return "rgba(17, 24, 39, 1)";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[15px]">
      <h1
        style={{ color: getTextColor() }}
        className="transition-color text-center text-4xl font-bold leading-normal text-black duration-300 max-[810px]:text-2xl dark:text-white"
      >
        Building fun{" "}
        <div className="relative inline-block">
          <span
            className="transition-color emoji-hover font-bold duration-300"
            style={{
              color:
                hovered === "projects" ? hoveredTextColor() : getTextColor(),
            }}
            data-emoji="💻 🚀"
            onMouseEnter={handleMouseEnter("projects")}
            onMouseLeave={handleMouseLeave}
          >
            software projects
          </span>
        </div>{" "}
        while studying
        <br />
        for a degree in{" "}
        <div className="relative inline-block">
          <span
            className="transition-color emoji-hover font-bold duration-300"
            style={{
              color:
                hovered === "engineering" ? hoveredTextColor() : getTextColor(),
            }}
            data-emoji="📚 🏫"
            onMouseEnter={handleMouseEnter("engineering")}
            onMouseLeave={handleMouseLeave}
          >
            Software Engineering
          </span>
        </div>
        .
      </h1>

      <style jsx>{`
        .emoji-hover::after {
          content: attr(data-emoji);
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, -120%);
          font-size: larger;
          white-space: nowrap;
          opacity: 0;
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
          pointer-events: none;
        }
        .emoji-hover:hover::after {
          opacity: 1;
          transform: translate(-50%, -100%);
        }
      `}</style>
    </div>
  );
}
