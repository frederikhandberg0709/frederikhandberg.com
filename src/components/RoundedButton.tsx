import Link from "next/link";

export default function RoundedButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className="linear scale-100 rounded-full bg-gradient-to-br from-[#339DFF] to-[#312fad] px-5 py-2 font-bold shadow-none transition duration-200 hover:scale-105 hover:shadow-[0_5px_25px_15px_rgba(47,67,173,0.35)] active:scale-95"
    >
      {children}
    </Link>
  );
}
