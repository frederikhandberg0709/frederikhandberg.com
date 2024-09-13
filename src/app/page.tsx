import TechStackBadge from "@/components/TechStackBadge";
import {
  ReactLogo,
  TypeScriptLogo,
  NextJSLogo,
  ViteLogo,
  PostgreSQLLogo,
  PrismaLogo,
  RemixLogo,
} from "@/assets/TechStackLogos";
import NavbarMenu from "@/components/NavbarMenu";

export default function Home() {
  return (
    <div>
      <NavbarMenu />
      <div className="flex h-[100vh] justify-center">
        <h1 className="mt-96 text-center text-4xl font-bold leading-normal">
          Building fun software projects while studying
          <br />
          for a degree in Software Engineering
        </h1>
      </div>
      <div className="flex h-[100vh] items-center justify-center">
        <div className="flex h-fit flex-col gap-8">
          <h2 className="text-center text-lg font-bold tracking-wider">
            PORTFOLIO
          </h2>
        </div>
      </div>

      <div className="flex h-[100vh] items-center justify-center">
        <div className="flex h-fit flex-col gap-8">
          <h2 className="text-center text-lg font-bold tracking-wider">
            TECH STACK
          </h2>
          <div className="grid grid-cols-3 justify-center gap-5">
            <TechStackBadge
              logo={TypeScriptLogo}
              name="TypeScript"
              description="JavaScript but now with static typing."
            />
            <TechStackBadge
              logo={ReactLogo}
              name="React"
              description="Front-end library."
            />
            <TechStackBadge
              logo={NextJSLogo}
              name="NextJS"
              description="React framework."
            />
            <TechStackBadge
              logo={RemixLogo}
              name="Remix"
              description="React framework."
            />
            <TechStackBadge
              logo={ViteLogo}
              name="Vite"
              description="Development environment."
            />
            <TechStackBadge
              logo={PostgreSQLLogo}
              name="PostgreSQL"
              description="Relational database management system."
            />
            <TechStackBadge
              logo={PrismaLogo}
              name="Prisma ORM"
              description="Database schemas with type-safety."
            />
          </div>
        </div>
      </div>

      <div className="flex h-[100vh] items-center justify-center">
        <div className="flex h-fit flex-col gap-8">
          <h2 className="text-center text-lg font-bold tracking-wider">
            ABOUT ME
          </h2>
        </div>
      </div>

      <div className="flex h-[100vh] items-center justify-center">
        <div className="flex h-fit flex-col gap-8">
          <h2 className="text-center text-lg font-bold tracking-wider">
            CONTACT
          </h2>
        </div>
      </div>
    </div>
  );
}
