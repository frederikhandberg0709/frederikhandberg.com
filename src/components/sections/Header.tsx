import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

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
    <div className="relative flex h-screen flex-col items-center justify-center gap-[15px]">
      <h1
        style={{ color: getTextColor() }}
        className="mx-5 text-center text-4xl font-bold leading-normal transition-colors duration-300 max-[810px]:text-2xl"
      >
        Building fun{" "}
        <div className="relative inline-block">
          <span
            className="transition-color emoji-tooltip font-bold duration-300"
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
            className="transition-color emoji-tooltip font-bold duration-300"
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

      <div className="group absolute bottom-10 flex animate-scrollhint flex-col items-center">
        <IoIosArrowDown className="size-7 cursor-pointer" />

        <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Scroll down 👇
        </span>
      </div>
    </div>
  );
}
