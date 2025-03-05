import { cn } from "@/utils/cn";
import Link from "next/link";

interface RoundedButtonLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export default function RoundedButtonLink({
  children,
  href,
  ...props
}: RoundedButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "linear scale-100 rounded-full bg-gradient-to-br from-[#339DFF] to-[#312fad] px-5 py-2 font-bold shadow-none transition duration-200 hover:scale-105 hover:shadow-[0_5px_25px_15px_rgba(47,67,173,0.35)] active:scale-95",
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
