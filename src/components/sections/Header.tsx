import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = (id: string) => () => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const isDarkMode =
    mounted &&
    (theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  const getTextColor = () => {
    if (isDarkMode) {
      return `rgba(242, 243, 244, ${hovered ? 0.3 : 1})`;
    } else {
      return `rgba(17, 24, 39, ${hovered ? 0.3 : 1})`;
    }
  };

  const hoveredTextColor = () => {
    if (isDarkMode) {
      return "rgba(242, 243, 244, 1)";
    } else {
      return "rgba(17, 24, 39, 1)";
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center gap-[15px]">
        <h1 className="text-center text-4xl font-bold leading-normal max-[810px]:text-2xl">
          Building fun <span className="font-bold">software projects</span>{" "}
          while studying
          <br />
          for a degree in{" "}
          <span className="font-bold">Software Engineering</span>.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[15px]">
      <h1
        style={{ color: getTextColor() }}
        className="text-center text-4xl font-bold leading-normal transition-colors duration-300 max-[810px]:text-2xl"
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
