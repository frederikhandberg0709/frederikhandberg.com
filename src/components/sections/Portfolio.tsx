import { getAllPostsMeta } from "../../../lib/api";
import PortfolioCard from "../portfolio/PortfolioCard";

export default function Portfolio() {
  const projects = getAllPostsMeta();

  return (
    <div className="flex h-fit w-full max-w-4xl flex-col gap-8 max-lg:px-6">
      <h2 className="text-center text-lg font-bold tracking-wider">
        PORTFOLIO
      </h2>
      {projects.map((project) => (
        <PortfolioCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
