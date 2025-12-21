import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function NameWithHoverImage({
  children,
  imageSrc,
  imageAlt = "Profile Image",
  className,
}: {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  const FLIP_THRESHOLD = 250;

  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  const showBelow = mousePosition.y < FLIP_THRESHOLD;

  return (
    <>
      <span
        ref={containerRef}
        className={cn(
          "relative z-10 inline-block cursor-pointer font-bold transition-colors duration-300 hover:text-blue-500",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>

      {mounted &&
        createPortal(
          <div
            ref={imageRef}
            className={`pointer-events-none fixed z-50 transition-all duration-300 ease-out ${
              isHovered ? "scale-100 opacity-100" : "scale-80 opacity-0"
            }`}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: showBelow
                ? "translate(-50%, 20px)"
                : "translate(-50%, -110%)",
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={300}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
