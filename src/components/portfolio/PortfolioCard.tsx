import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { PortfolioMeta } from "../../types/portfolio";
import TechStackMiniBadge from "../TechStackMiniBadge";

interface PortfolioCardProps {
  project: PortfolioMeta;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 transition-all hover:shadow-lg dark:border-gray-800"
    >
      {project.coverImage && (
        <div className="overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={1200}
            height={800}
            className="h-auto w-max transition-transform duration-300 group-hover:scale-105"
            style={{
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {project.title}
        </h2>

        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={project.date}>
            {format(new Date(project.date), "MMM d, yyyy")}
          </time>
          <span>•</span>
          <span>{project.readingTime}</span>
        </div>

        {project.excerpt && (
          <p className="my-3 text-gray-700 dark:text-gray-300">
            {project.excerpt.split(/(\*\*.*?\*\*)/).map((part, index) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        )}

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <TechStackMiniBadge key={tag} name={tag} />
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PortfolioCard;
