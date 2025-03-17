import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
  linkURL: string;
  title: string;
  description: string;
  imageURL: string;
}

export default function PortfolioCard({
  linkURL,
  title,
  description,
  imageURL,
}: PortfolioCardProps) {
  return (
    <Link
      href={linkURL}
      className="relative h-[700px] w-full scale-100 overflow-hidden rounded-3xl transition-all duration-200 ease-in-out max-sm:active:scale-[1.02] sm:shadow-none sm:hover:scale-[1.02] sm:hover:shadow-[0px_0px_40px_20px_rgba(0,0,0,0.25)] sm:active:scale-[0.98]"
    >
      <div className="absolute bottom-8 left-10 right-10 z-[3]">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-white/75">{description}</p>
      </div>

      <div className="absolute bottom-0 z-[2] h-1/2 w-full bg-gradient-to-b from-transparent to-black opacity-75"></div>

      <div className="relative h-full w-full">
        <Image
          src={imageURL}
          alt={title}
          width={1000}
          height={500}
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform object-cover"
        />
      </div>
    </Link>
  );
}
