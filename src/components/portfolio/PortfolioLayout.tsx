"use client";

import Image from "next/image";
import { PortfolioMeta } from "../../types/portfolio";
import PortfolioHeader from "./PortfolioHeader";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useContext } from "react";
import {
  ImageOverlayContext,
  ImageOverlayProvider,
} from "../ImageOverlayProvider";

interface PortfolioLayoutProps {
  meta: PortfolioMeta;
  children: React.ReactNode;
  tableOfContents?: React.ReactNode;
}

const PortfolioLayoutContent: React.FC<PortfolioLayoutProps> = ({
  meta,
  children,
  tableOfContents,
}) => {
  const { setOverlayImage } = useContext(ImageOverlayContext);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between bg-white/80 backdrop-blur-lg dark:bg-black">
        <div className="mx-3 my-3 w-full items-center justify-between sm:mx-20">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex flex-col items-start text-start font-bold leading-snug opacity-50 transition hover:opacity-100"
            >
              Frederik
              <br />
              Handberg
            </Link>
            <ChevronRight className="opacity-50" />
            <Link
              href="/#portfolio"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              Portfolio
            </Link>
            <ChevronRight className="opacity-50" />
            <Link
              href={`/portfolio/${meta.slug}`}
              className="font-semibold opacity-50 hover:opacity-100"
            >
              {meta.title}
            </Link>
          </div>
        </div>
      </nav>

      <article className="mx-auto mt-10 max-w-4xl hyphens-auto px-4 py-10 sm:px-6 lg:px-8">
        <PortfolioHeader meta={meta} />

        {meta.excerpt && (
          <p className="mb-3">
            {meta.excerpt.split(/(\*\*.*?\*\*)/).map((part, index) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        )}

        {meta.coverImage && (
          <div className="relative mb-3 max-h-[1000px] w-full overflow-hidden rounded-lg">
            <Image
              src={meta.coverImage}
              alt={meta.title}
              onClick={() => setOverlayImage(meta.coverImage || "")}
              width={1000}
              height={500}
              className="h-auto w-full scale-100 cursor-pointer rounded-2xl transition hover:opacity-90 active:scale-[0.98]"
            />
          </div>
        )}

        <div className="flex flex-col gap-10 md:flex-row">
          <div className="prose prose-lg dark:prose-invert prose-a:text-blue-600 max-w-none break-words md:w-3/4">
            {children}
          </div>

          {tableOfContents && (
            <aside className="mt-2.5 hidden md:block md:w-1/4">
              <div className="sticky top-20">{tableOfContents}</div>
            </aside>
          )}
        </div>
      </article>
    </>
  );
};

const PortfolioLayout: React.FC<PortfolioLayoutProps> = (props) => {
  return (
    <ImageOverlayProvider>
      <PortfolioLayoutContent {...props} />
    </ImageOverlayProvider>
  );
};

export default PortfolioLayout;
