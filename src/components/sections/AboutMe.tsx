import Image from "next/image";
import NameWithHoverImage from "../NameWithHoverImage";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type VisibilityState = {
  educationSection: boolean;
};

export default function AboutMe() {
  const [visibility, setVisibility] = useState<VisibilityState>({
    educationSection: false,
  });

  const toggleVisibility = (section: keyof VisibilityState) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [section]: !prevVisibility[section],
    }));
  };

  return (
    <div className="flex h-fit w-full max-w-5xl flex-col gap-8 px-6 md:px-8">
      <h2 className="text-center text-lg font-bold tracking-wider">ABOUT ME</h2>
      <div className="max-w-none space-y-6">
        <p>
          Hello, my name is{" "}
          <NameWithHoverImage
            imageSrc="/photo-of-me.JPG"
            className="hidden sm:inline-block"
          >
            Frederik Handberg
          </NameWithHoverImage>
          <span className="inline-block sm:hidden">Frederik Handberg</span> and
          I am 22 years old. I am born and raised in Horsens, in a family of
          five.
        </p>

        <Image
          src="/photo-of-me.JPG"
          alt="Image of me"
          width={0}
          height={0}
          className="h-auto w-full rounded-lg sm:hidden"
        />

        <p>
          Since a young age, I have always been interested in technology and
          electronics. Naturally, I started gaining an interest in coding
          (simple Hello World websites in HTML and CSS), which later evolved
          into programming in JavaScript to make my little websites interactive.
        </p>

        <p>
          In 2023, I began studying for a degree in Software Engineering at VIA
          Horsens. I am now doing my 4th semester.
        </p>

        <p>
          In my spare time, I like to work on my own projects like my social
          network. Of course, I don&apos;t code all the time. But when I
          don&apos;t, I usually still do something related to technology.
          Whether that&apos;s to build and fly drones, or make small diecast
          models of police vehicles with emergency lighting. This usually
          involves some programming of Arduino microcontrollers, to make the
          flash patterns. And sometimes, I also like to play video games, mostly
          Dirt Rally 2.0 and WRC 24 (I am a big rally-fan!)
        </p>

        <div className="flex flex-col gap-2.5">
          <div
            className={`flex cursor-pointer select-none gap-5 transition duration-150 ease-in-out ${
              visibility.educationSection
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
            onClick={() => toggleVisibility("educationSection")}
          >
            <h3 className="text-xl font-semibold">Education</h3>
            <ChevronDown
              className={`${
                visibility.educationSection ? "rotate-180" : ""
              } transform transition-transform duration-300 ease-in-out`}
            />
          </div>
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              visibility.educationSection
                ? "grid-rows-[1fr]"
                : "grid-rows-[0fr]"
            }`}
          >
            <div className="space-y-6 overflow-hidden">
              <div className="space-y-2.5">
                <div>
                  <h4>
                    <span className="text-lg font-bold">Software Engineer</span>{" "}
                    — VIA Horsens
                  </h4>
                  <p className="text-gray-500">2023 August – Now</p>
                </div>
                <p className="space-y-5">
                  <ul className="list-disc space-y-0.5 pl-5">
                    <li>Software Development with Java — Semester 1 and 2</li>
                    <li className="list-inside">
                      Developed both frontend and backend applications in Java.
                    </li>
                    <li className="list-inside">
                      Worked with network technologies such as Spring Boot
                      (RESTful), gRPC, RabbitMQ, RMI, and Sockets.
                    </li>
                  </ul>

                  <ul className="list-disc space-y-0.5 pl-5">
                    <li>Database Systems — Semester 2</li>
                    <li className="list-inside">
                      Worked with PostgreSQL for database design and management.
                    </li>
                    <li className="list-inside">
                      Gained experience with SQL queries, indexing, and
                      optimization.
                    </li>
                  </ul>

                  <ul className="list-disc space-y-0.5 pl-5">
                    <li>Software Engineering — Semester 2</li>
                    <li className="list-inside">
                      Applied agile methodologies, including the Unified Process
                      and Scrum, to software development projects.
                    </li>
                    <li className="list-inside">
                      Design and implemented software following SOLID principles
                      and common design patterns.
                    </li>
                    <li className="list-inside">
                      Focused on test-driven development and continuos
                      integration to ensure code quality and maintainability.
                    </li>
                  </ul>

                  <ul className="list-disc space-y-0.5 pl-5">
                    <li>.NET Programming — Semester 3</li>
                    <li className="list-inside">
                      Developed full-stack applications using Blazor and ASP.NET
                      Core (Web API and SignalR).
                    </li>
                  </ul>

                  <ul className="list-disc space-y-0.5 pl-5">
                    <li>WEB2 — Semester 4 (Current)</li>
                    <li className="list-inside">
                      Developing dynamic and interactive web applications using
                      JavaScript and React.
                    </li>
                  </ul>

                  <ul className="list-disc space-y-0.5 pl-5">
                    <li>Embedded Software – Semester 4 (Current)</li>
                    <li className="list-inside">
                      Learning to program in C using APIs and hardware driver
                      libraries.
                    </li>
                  </ul>

                  <ul className="list-disc space-y-0.5 pl-5">
                    <li>DevOps & Cloud – Semester 4 (Current)</li>
                    <li className="list-inside">
                      Working with Git and GitHub for version control and good
                      collaboration techniques in shared repositories.
                    </li>
                  </ul>
                </p>
              </div>
              <div className="space-y-2.5">
                <div>
                  <h4>
                    <span className="text-lg font-bold">
                      Adgangskursus til ingeniøruddannelserne
                    </span>{" "}
                    — VIA Horsens
                  </h4>
                  <p className="text-gray-500">2022 August – 2023 August</p>
                </div>

                <p>
                  Danish A, Mathmatics A, Physics B, English B, and Chemistry C.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
