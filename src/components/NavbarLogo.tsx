import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function NavbarLogo() {
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const logoRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [isDropdownClicked]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(event.target as Node) &&
        !logoRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownClicked(false);
      }
    };

    if (isDropdownClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownClicked]);

  const handleDropdownClick = () => {
    setIsDropdownClicked(!isDropdownClicked);
  };

  return (
    <>
      <div
        ref={logoRef}
        onMouseEnter={() => setIsHoveringLogo(true)}
        onMouseLeave={() => setIsHoveringLogo(false)}
        className="pointer-events-auto flex w-[105px] items-center justify-start gap-3"
      >
        <Link
          href="/"
          className="flex flex-col items-start text-start font-bold leading-snug opacity-50 transition hover:opacity-100"
        >
          Frederik
          <br />
          Handberg
        </Link>

        {(isHoveringLogo || isDropdownClicked) && (
          <button
            onClick={handleDropdownClick}
            className={`inset-2 rounded-full bg-black/10 transition duration-300 ease-in-out hover:bg-black/20 active:bg-black/30 dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/30 ${isDropdownClicked ? "rotate-180" : "rotate-0"}`}
          >
            <ChevronDown />
          </button>
        )}
      </div>

      {isDropdownClicked && (
        <div
          ref={dropdownRef}
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
          className="pointer-events-auto fixed z-[25] space-y-1.5 rounded-2xl border border-black/10 bg-white p-1.5 transition hover:border-black/20 dark:border-white/10 dark:bg-black dark:hover:border-white/20"
        >
          <Link
            href="/"
            className="flex flex-col rounded-xl px-2.5 py-1.5 text-xl font-bold hover:bg-black/10 dark:hover:bg-white/10"
          >
            <span className="text-sm font-normal opacity-50">
              frederikhandberg.com
            </span>
            Home
          </Link>
          <Link
            href="/software"
            className="flex flex-col rounded-xl px-2.5 py-1.5 text-xl font-bold hover:bg-black/10 dark:hover:bg-white/10"
          >
            <span className="text-sm font-normal opacity-50">
              software.frederikhandberg.com
            </span>
            Software
          </Link>
          <Link
            href="/fashion"
            className="flex flex-col rounded-xl px-2.5 py-1.5 text-xl font-bold hover:bg-black/10 dark:hover:bg-white/10"
          >
            <span className="text-sm font-normal opacity-50">
              fashion.frederikhandberg.com
            </span>
            Fashion
          </Link>
        </div>
      )}
    </>
  );
}
