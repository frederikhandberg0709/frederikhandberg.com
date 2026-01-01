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
        "scale-100 rounded-full px-5 py-2 font-bold transition ease-linear hover:bg-black/10 hover:text-black active:scale-[0.98] active:bg-black/30 dark:hover:bg-white/10 dark:hover:text-white dark:active:bg-white/30",
        className,
      )}
    >
      {text}
    </Link>
  );
}
