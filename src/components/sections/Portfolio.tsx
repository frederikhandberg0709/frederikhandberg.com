import PortfolioCard from "../PortfolioCard";

export default function Portfolio() {
  return (
    <div className="flex h-fit w-full max-w-5xl flex-col gap-8">
      <h2 className="text-center text-lg font-bold tracking-wider">
        PORTFOLIO
      </h2>
      <PortfolioCard
        linkURL="/portfolio/social-network"
        title="Social media network"
        description="Building a social media platform from the ground up using Next.js. This project demonstrates fullstack development with modern web technologies, focusing on authentication, real-time interactions, and scalable architecture. A hands-on learning journey through practical implementation."
        imageURL="/home.jpeg"
      />
    </div>
  );
}
