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
      className="relative block w-full overflow-hidden rounded-3xl transition-all duration-200 ease-in-out max-sm:active:scale-[1.02] sm:hover:scale-[1.02] sm:hover:shadow-[0px_0px_40px_20px_rgba(0,0,0,0.25)] sm:active:scale-[0.98]"
    >
      <div className="relative pb-[56.25%] sm:pb-[75%]">
        <Image src={imageURL} alt={title} fill className="object-cover" />

        <div className="absolute bottom-0 z-[2] h-1/2 w-full bg-gradient-to-b from-transparent to-black opacity-75"></div>

        <div className="absolute bottom-8 left-10 right-10 z-[3]">
          <h2 className="text-base font-bold text-white sm:text-2xl">
            {title}
          </h2>
          <p className="test-xs text-white/75 sm:text-base">{description}</p>
        </div>
      </div>
    </Link>
  );
}
