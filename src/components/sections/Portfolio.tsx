import PortfolioCard from "../PortfolioCard";

export default function Portfolio() {
  return (
    <div className="flex h-fit w-full max-w-5xl flex-col gap-8 max-lg:px-6">
      <h2 className="text-center text-lg font-bold tracking-wider">
        PORTFOLIO
      </h2>
      <PortfolioCard
        linkURL="/portfolio/social-network"
        title="Social Network"
        description="Building a social media platform from the ground up using Next.js. This project demonstrates fullstack development with modern web technologies, focusing on authentication, real-time interactions, and scalable architecture. A hands-on learning journey through practical implementation."
        imageURL="/home.jpeg"
      />
      <PortfolioCard
        linkURL="/portfolio/pokemon-project"
        title="Pokémon Project"
        description="This project is the second assignment for my WEB2 course. It is a
              Pokémon web app designed to display all Pokémon and their
              information such as height, weight, stats, and abilities."
        imageURL="/pokemon-list.png"
      />
      <PortfolioCard
        linkURL="/portfolio/semester-project-3"
        title="Semester Project 3"
        description="This project was developed as part of our third semester project
              (SEP3) for my Software Engineering degree."
        imageURL="/Blazor_Properties.jpeg"
      />
    </div>
  );
}
