import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function NavbarLink({
  href,
  onClick,
  className,
  text,
}: {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={twMerge(
        "rounded-full px-5 py-2 font-bold transition ease-linear hover:bg-white/10 hover:text-white active:bg-white/30",
        className,
      )}
    >
      {text}
    </Link>
  );
}
