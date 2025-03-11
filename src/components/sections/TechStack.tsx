"use client";

import {
  ReactLogo,
  TypeScriptLogo,
  NextJSLogo,
  ViteLogo,
  PostgreSQLLogo,
  PrismaLogo,
  NodeJSLogo,
  JavaLogo,
  SpringLogo,
  CSharpLogo,
  ASPNetCoreLogo,
  BlazorLogo,
} from "@/assets/TechStackLogos";
import TechStackBadge from "../TechStackBadge";
import { useEffect, useRef } from "react";
import "../card.css";

export default function TechStack() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cards.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cards.style.setProperty("--mouse-x", `${x}px`);
      cards.style.setProperty("--mouse-y", `${y}px`);

      const cardElements = cards.getElementsByClassName("card");
      for (let i = 0; i < cardElements.length; i++) {
        const card = cardElements[i] as HTMLElement;
        const cardRect = card.getBoundingClientRect();
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        card.style.setProperty("--mouse-x", `${cardX}px`);
        card.style.setProperty("--mouse-y", `${cardY}px`);
      }
    };

    cards.addEventListener("mousemove", handleMouseMove);

    return () => {
      cards.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex h-fit flex-col">
      <h2 className="text-center text-lg font-bold tracking-wider">
        TECH STACK
      </h2>
      <div
        ref={cardsRef}
        id="cards"
        className="grid justify-center gap-5 p-20 md:grid-cols-2 lg:grid-cols-3"
      >
        <TechStackBadge
          logo={JavaLogo}
          name="Java"
          description="Object-oriented programming language."
          hasDetails={true}
          detailedInfo={{
            title: "Java",
            description:
              "Java is a high-level object-oriented programming language.",
            keyFeatures: [
              "Platform Independent – Runs on any OS with JVM.",
              "Object-Oriented – Supports concepts like inheritance, polymorphism, and encapsulation.",
              "Robust & Secure – Strong memory management, exception handling, and security features.",
              "Multithreading – Supports concurrent execution for better performance.",
              "Garbage Collection – Automatic memory management via the JVM.",
            ],
            personalExperience: (
              <p>
                During the first semester of my{" "}
                <b>Software Engineering degree</b> in the{" "}
                <b>Software Development with Java (SDJ1)</b> course, I learned
                the fundamentals of Java programming and object-oriented
                programming in general. More specifically, I learned
                object-oriented programming fundamentals including
                encapsulation, inheritance, and polymorphism. I learned to
                design classes, implement relationships (association,
                aggregation, composition), handle exceptions, and build GUI
                applications in JavaFX.
                <br />
                <br />
                In the second semester of <b>SDJ2</b>, I learned to create
                client/server applications using Sockets and RMI (Remote Method
                Invocation). I also got experience with implementing design and
                architectural patterns such as State Pattern, Observer Pattern,
                and MVVM. In addition, I learned using interfaces for flexible
                code, and using a Java testing framework called JUnit.
                <br />
                <br />
                In the third semester, we got a new course called{" "}
                <b>Programming 1 (PRO1)</b>, which focused on learning to design
                and develop larger distributed systems and securing them with
                authorization. For this, we used the Spring Framework in Java,
                more specifically Spring Boot to build a backend REST servers.
                <br />
                <br />
                In our semester project of the third semester, a requirement was
                that our distributed system must have two independent servers.
                One of our servers in the distributed system was using a REST
                backend implemented in Spring Boot. The other server was a
                SignalR server implemented in ASP.NET to handle
                live-notifications. For the frontend, we decided to build a
                JavaFX GUI for administrators and a Blazor webapplication for
                customers.
                <br />
                <br />
                The project was about a real-estate company that wanted their
                own webapplication to show their properties and a dedicated
                desktop application to manage the properties (add, update, and
                delete properties).
              </p>
            ),
          }}
        />

        <TechStackBadge
          logo={SpringLogo}
          name="Spring"
          description="Java framework."
          hasDetails={true}
          detailedInfo={{
            title: "Spring Framework",
            description:
              "Spring is a Java framework for building applications. It provides some features such as dependency injection, security, and more. A drawback, is that it requires manual configuration to setup.",
            keyFeatures: [
              "Dependency Injection (DI) – Manages object dependencies and uses Inversion of Control (IoC) for loose coupling.",
              "Spring MVC – Powerful framework for building web applications.",
              "Spring Boot – Simplifies application setup with auto-configuration and embedded servers.",
              "Security – Spring Security handles authentication and authorization.",
            ],
            personalExperience: (
              <p>
                On third semester in <b>Programming 3 (PRO3)</b>, we learned
                about the Spring framework and the helpful features it comes
                with, while also exploring Spring Boot to build backend REST
                servers and implement authorization using Spring Security.
                <br />
                <br />
                In my semester project of third semester, we built a distributed
                system using a REST backend server implemented in Spring Boot.
                The server included all the necessary endpoints for our system,
                including endpoint security using Spring Security for the
                endpoints where only logged-in users were allowed to access.
                <br />
                <br />
                We implemented a user registration and login system, where users
                could register and login to the system. For each request, we
                chose to send a JWT token in the header, which was validated by
                the server. We did this to verify if the user was logged-in,
                before they could access the protected endpoints.
              </p>
            ),
          }}
        />

        <TechStackBadge
          logo={CSharpLogo}
          name="C#"
          description="Object-oriented programming language."
          hasDetails={true}
          detailedInfo={{
            title: "C#",
            description:
              "C# is a high-level object-oriented programming language.",
            keyFeatures: [
              "Object-Oriented – Supports encapsulation, inheritance, and polymorphism.",
              "Type-Safe – Prevents type errors with strong type checking.",
              "Garbage Collection – Automatic memory management via the .NET runtime.",
              "Platform Independent – Runs on Windows, Linux, and macOS via .NET Core.",
              "Good Library Support – Many .NET libraries to build various applications.",
              "Multithreading – Built-in support for parallel and asynchronous programming.",
            ],
            personalExperience: (
              <p>
                In my third semester, we had a course called{" "}
                <b>.NET Programming (DNP1)</b>, where we learned C# programming
                and various ASP.NET Core technologies to build both server and
                client-side applications.
                <br />
                <br />
                We started with fundamental console applications and later
                learned to build advanced web applications and web services. The
                course covered comprehensive server and client-side C#
                programming, implementing data persistence using
                object-relational mapping (ORM), and developing robust user
                management systems with authentication and authorization.
                <br />
                <br />
                For client-side development, we used Blazor to create
                interactive and responsive web applications. On the server side,
                we implemented RESTful services using ASP.NET Web API.
              </p>
            ),
          }}
        />

        <TechStackBadge
          logo={ASPNetCoreLogo}
          name="ASP.NET Core"
          description="C# framework."
          hasDetails={true}
          detailedInfo={{
            title: "ASP.NET Core",
            description:
              "ASP.NET Core is a cross-platform C# framework for building modern web applications, APIs, and cloud-based services. Similar to Spring Framework in Java, it provides features like built-in dependency injection, security, and database integration.",
            keyFeatures: [
              "Cross-Platform – Runs on Windows, Linux, and macOS via .NET Core.",
              "Built-in Dependency Injection – Enables loose coupling and better testability.",
              "Asynchronous Programming – Uses async/await for scalable web applications.",
              "Web API Support – Easily build RESTful APIs with built-in routing and serialization.",
              "Entity Framework Core – Simplifies database access with ORM support.",
            ],
            personalExperience: (
              <p>
                In third semester during our course called{" "}
                <b>.NET Programming (DNP1)</b> in my{" "}
                <b>Software Engineering degree</b>, we learned to develop web
                applications in ASP.NET using Blazor as frontend and Web API for
                the backend.
                <br />
                <br />
                In my semester project of third semester, we built a distributed
                system. One of the subsystems was a SignalR server in ASP.NET
                Core. The SignalR server acted as a bridge between a RESTful
                Java backend made in Spring Boot and a Blazor frontend, to serve
                live notifications in real-time when price updates were made in
                a JavaFX admin GUI. Our goal was to notify customers instantly
                about price changes without requiring a page refresh in Blazor.
              </p>
            ),
          }}
        />

        <TechStackBadge
          logo={BlazorLogo}
          name="Blazor"
          description="C# framework for building interactive web UIs."
          hasDetails={true}
          detailedInfo={{
            title: "Blazor",
            description:
              "Blazor is a C# framework for building interactive web UIs using C# and Razor syntax. It allows developers to build web applications using C# and .NET instead of using JavaScript. It is essentially the C# version of React.",
            keyFeatures: [
              "Component-Based – Build reusable UI components with C# and Razor syntax (same concept as in React).",
              "Razor Syntax – Mix C# with HTML to create dynamic web pages.",
              "Blazor Server – Real-time web applications with server-side processing.",
              "Blazor WebAssembly – Run C# code directly in the browser.",
            ],
            personalExperience: (
              <p>
                We learned to develop Blazor web applications in my third
                semester during our course called <b>.NET Programming (DNP1)</b>{" "}
                in my <b>Software Engineering degree</b>.
                <br />
                <br />
                One of the assignment was to build a Blazor web application that
                worked a bit like Reddit. Users would create an account, login,
                and could then publish a post.
                <br />
                For the authentication, we used the Authorization package from
                ASP.NET Core. We used it to check if a user was logged-in and to
                protect certain pages from being accessed by a user who was not
                logged-in.
                <br />
                <br />
                The backend was built using the Web API from ASP.NET Core.
              </p>
            ),
          }}
        />

        <TechStackBadge
          logo={TypeScriptLogo}
          name="TypeScript"
          description="JavaScript but now with static typing."
        />

        <TechStackBadge
          logo={NodeJSLogo}
          name="NodeJS"
          description="Runtime environment that executes JavaScript server-side."
        />

        <TechStackBadge
          logo={ReactLogo}
          name="React"
          description="Front-end library."
        />

        <TechStackBadge
          logo={NextJSLogo}
          name="Next.js"
          description="React framework."
          hasDetails={true}
          detailedInfo={{
            title: "Next.js",
            description:
              "Next.js is a fullstack React framework. It allows the developer to work super fast and effeciently by providing all the features a developer needs to build a complex web application, by including both the frontend and server in the same project.",
            keyFeatures: [
              "API Routes – Built-in API routes to create API endpoints.",
              "File-based Routing – Automatic route generation based on the file structure.",
              "Static Site Generation (SSG) – Pre-render pages at build time for better performance.",
              "Server-Side Rendering (SSR) – Pre-render pages on each request for dynamic content.",
              "TypeScript Support – Built-in TypeScript support for type-safe code.",
              "Fast Refresh – Instantly see changes in the browser without losing component state.",
            ],
            personalExperience: (
              <p>
                React is not something we have learned in class as of writing
                this, but we are supposed to learn it later during our course
                called <b>WEB2</b> on 4th semester that I am currently doing.
                However, I really wanted to learn building complex React web
                application.
                <br />
                The React documentation recommends choosing a framework such as
                Next.js and Remix. I decided to go with Next.js.
                <br />
                <br />I have always been fascinated by social networks due to
                their complexity. I think the best way to learn something is
                just to jump into it and start building, so I decided to build a
                social network using Next.js.
                <br />
                <br />
                There&apos;s no doubt that building a social network as a first
                project without a solid understanding of React and Next.js was a
                challenge. I knew how to use the most common hooks like useState
                and useEffect and how components worked, as I had built a few
                small projects in React. I had to redo a lot of things as my
                knowledge grew.
                <br />
                <br />I started out with many rookie mistakes like using
                useEffect&apos;s every time I wanted to fetch data. Later, I
                learned about React Query. A library that makes fetching,
                caching, synchronizing and updating server state in a React
                applications much easier.
                <br />
                <br />
                User authentication was implemented using Next Auth (now known
                as Auth.js). This turned out to be a mistake, as Next Auth
                intentionally makes it difficult to implement sign-in using
                credentials like username and password. Instead, they want
                developers to use OAuth. I did make it work eventually, but in
                hindsight, I should have chosen a different authentication
                library.
                <br />
                <br />
                Notifications are an important part of social networks. Users
                want to be notified of certain events, like when someone they
                follow publish a new post. I implemented notifications using
                Socket.io. My decision for Socket.io, was mostly due to me
                needing the notifications to be served in real-time without the
                user needing to refresh the page. I already had experience with
                SignalR, which is quite similar, so Socket.io seemed like the
                obvious choice.
                <br />
                Instead of implementing Socket.io directly inside of Next.js, I
                decided to build a secondary server running express.js, which
                would then handle the Socket.io connections. Implementing
                Socket.io directly inside of Next.js would require me to setup a
                custom server, which means I would lose the benefits that makes
                NextJS great like the automatic optimization.
                <br />
                <br />
                One of the things I really enjoy about Next.js, is being able to
                run both the frontend and backend in the same project. You can
                work very fast this way. I have all my HTTP endpoints inside of
                the API folder of my Next.js project. No need for a separate
                REST server. This does come with its own set of problems, as
                having a separate frontend and backend means you can scale them
                independently, whereas on Next.js (if used as a fullstack
                framework), it&apos;s in the same project. Or, if also having a
                mobile application, it makes much more sense to have a fully
                independent backend server.
              </p>
            ),
          }}
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
          hasDetails={true}
          detailedInfo={{
            title: "PostgreSQL",
            description:
              "PostgreSQL is a very popular relational database management system (RDBMS).",
            personalExperience: (
              <p>
                During my second semester in the <b>Database Systems (DBS1)</b>{" "}
                course of my <b>Software Engineering degree</b>, we learned how
                to design and build databases using PostgreSQL.
                <br />
                <br />
                The course covered concepts such as relational database design,
                normalization, indexing, and writing optimized SQL queries.
                <br />
                <br />
                PostgreSQL has been my database language of choice for every
                project I have worked on, both in school and in my personal
                projects
              </p>
            ),
          }}
        />

        <TechStackBadge
          logo={PrismaLogo}
          name="Prisma ORM"
          description="Database schemas with type-safety."
          hasDetails={true}
        />
      </div>
    </div>
  );
}
