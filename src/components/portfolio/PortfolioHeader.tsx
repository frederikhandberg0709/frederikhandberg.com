"use client";

import { format } from "date-fns";
import { PortfolioMeta } from "../../types/portfolio";
import TechStackMiniBadge from "../TechStackMiniBadge";

interface PortfolioHeaderProps {
  meta: PortfolioMeta;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ meta }) => {
  return (
    <div className="mb-3">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
        {meta.title}
      </h1>

      <div className="mt-3 flex items-center space-x-4 text-gray-600 dark:text-gray-400">
        <time dateTime={meta.date}>
          {format(new Date(meta.date), "MMMM d, yyyy")}
        </time>
        <span>•</span>
        <span>{meta.readingTime}</span>
        <span>•</span>
        <span>By {meta.author}</span>
      </div>

      {meta.tags.length > 0 && (
        <div className="my-3 flex items-start gap-2.5 overflow-x-auto">
          {meta.tags.map((tag) => (
            <div key={tag} className="">
              <TechStackMiniBadge name={tag} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioHeader;
