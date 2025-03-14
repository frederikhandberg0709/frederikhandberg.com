import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function NameWithHoverImage({
  children,
  imageSrc,
  imageAlt = "Profile Image",
}: {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  useEffect(() => {
    if (imageRef.current && isHovered) {
      imageRef.current.style.left = `${mousePosition.x}px`;
      imageRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition, isHovered]);

  return (
    <>
      <span
        ref={containerRef}
        className="relative z-10 inline-block cursor-pointer font-bold transition-colors duration-300 hover:text-blue-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>

      <div
        ref={imageRef}
        className={`pointer-events-none fixed z-50 transition-all duration-300 ease-out ${
          isHovered ? "scale-100 opacity-100" : "scale-80 opacity-0"
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -110%)",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={300}
          height={400}
          className="rounded-lg shadow-2xl"
          priority
        />
      </div>
    </>
  );
}
