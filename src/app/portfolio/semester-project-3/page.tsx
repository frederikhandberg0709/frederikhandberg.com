import TechStackMiniBadge from "@/components/TechStackMiniBadge";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SemesterProject3() {
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between bg-white dark:bg-black">
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
              href="/portfolio/semester-project-3"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              Semester Project 3
            </Link>
          </div>
        </div>
      </nav>

      <main className="mb-14 mt-20 flex min-h-screen flex-col items-center justify-start">
        <div className="flex w-full max-w-5xl flex-col gap-3">
          <h1 className="text-3xl font-bold max-sm:mx-3">Semester Project 3</h1>
          <div className="my-2.5 flex items-start gap-2.5 overflow-x-auto max-sm:px-3">
            <TechStackMiniBadge name="Blazor" />
            <TechStackMiniBadge name="JavaFX" />
            <TechStackMiniBadge name="Java Spring Boot" />
            <TechStackMiniBadge name="SignalR" />
            <TechStackMiniBadge name="PostgreSQL" />
          </div>
          <div className="flex max-w-5xl flex-col gap-5 max-sm:mx-3">
            <p>
              This project was developed as part of our third semester project
              (SEP3) for our <b>Software Engineering</b> degree.
              <br />
              <br />
              The goal of the semester project was to design and implement a
              distributed system consisting of at least two servers. Our team
              chose to build a system for a fictional real estate agency called{" "}
              <b>Real Estate Plus</b>.
            </p>
            <Image
              src="/Blazor_Properties.jpeg"
              alt="Properties page of the Blazor web application"
              width={1000}
              height={500}
              className="h-auto w-full rounded-2xl"
              layout="responsive"
            />

            <p>
              GitHub repository:{" "}
              <a
                href="https://github.com/frederikhandberg0709/SEP3"
                target="_blank"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                https://github.com/frederikhandberg0709/SEP3
              </a>
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Project Structure</h2>
                <p>The project is structured as follows:</p>
                <ul className="ml-5 list-disc">
                  <li>`/Blazor`: A Blazor web application for customers.</li>
                  <li>
                    `/GUI`: A JavaFX desktop application designed for
                    administrative users.
                  </li>
                  <li>
                    `/restful-server`: A Java Spring Boot REST server that
                    handles backend operations and API requests.
                  </li>
                  <li>
                    `/signalr-server`: A SignalR server that delivers real-time
                    notifications to the Blazor web application.
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Functional Requirements</h3>
                <p>
                  The system was designed to meet the following functional
                  requirements defined through user stories. Each user story
                  represents a specific feature or capability written to reflect
                  the user&apos;s goals and interactions with the system.
                </p>
                <p>
                  <b>Create user account:</b> As a customer, I want to have the
                  ability to create an account, so that I can access extra
                  features like save bookmarks and book an agent.
                </p>
                <p>
                  <b>Create administrator account:</b> As an administrator, I
                  want to have the ability to create an account, so that I can
                  manage properties, bookings, and agents.
                </p>
                <p>
                  <b>Update user information:</b> As a customer, I want to be
                  able to update my user account details, so that the agency can
                  still contact me if my information changes.
                </p>
                <p>
                  <b>Property filters:</b> As a customer, I want to have the
                  ability to use filters such as, property type, so that I can
                  find a property that matches my needs.
                </p>
                <p>
                  <b>Book agent:</b> As a customer, I want to be able to book an
                  appointment with an agent, so that I can receive further
                  information and ask questions about a specific property.
                </p>
                <p>
                  <b>Bookmark property listings:</b> As a customer, I want to be
                  able to bookmark listings, so that I can easily revisit and
                  review them later.
                </p>
                <p>
                  <b>Real-time notifications:</b> As a customer, I want to
                  receive notifications about my bookmarked properties, so that
                  I can stay updated on any changes to them.
                </p>
                <p>
                  <b>Search in admin dashboard:</b> As an administrator, I want
                  to be able to search for property listings, so that I can
                  quickly find the specific property I&apos;m looking for.
                </p>
                <p>
                  <b>Create property listing:</b> As an administrator, I want to
                  be able to create new property listings, so that they can be
                  added to the website.
                </p>
                <p>
                  <b>Upload property images:</b> As an administrator, I want to
                  be able to upload images of properties, so that customers can
                  visually assess whether they are interested in a property.
                </p>
                <p>
                  <b>Update property details:</b> As an administrator, I want to
                  be able to update the details of property listings, so that I
                  can ensure all information remains accurate and up to date.
                </p>
                <p>
                  <b>Delete property listing:</b> As an administrator, I want to
                  be able to delete property listings, so that outdated or
                  irrelevant listings no longer appear to customers.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">System Architecture</h2>
                <p>This project consists of five subsystems:</p>
                <Image
                  src="/High_level_system_architecture.png"
                  alt="High-level system architecture diagram"
                  width={1000}
                  height={500}
                  className="h-auto w-full rounded-2xl"
                  layout="responsive"
                />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p>
                      <b>PostgreSQL database</b>
                      <br />
                      The PostgreSQL database is he data store for the entire
                      system. It sores all the domain data such as:
                    </p>
                    <ul className="ml-5 list-disc">
                      <li>User accounts.</li>
                      <li>Property listings.</li>
                      <li>Bookmarks.</li>
                      <li>Bookings.</li>
                      <li>Agents.</li>
                    </ul>
                    <p>
                      The database is exclusively accessed by the Spring Boot
                      REST server.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <b>Spring Boot REST server</b>
                      <br />
                      The REST server built with Java Spring Boot is the backend
                      of the system.
                    </p>
                    <p> It acts as the middleman and is responsible for:</p>
                    <ul className="ml-5 list-disc">
                      <li>
                        Handling HTTP requests from the Blazor web app and the
                        JavaFX desktop app.
                      </li>
                      <li>
                        Performs authentication and authorization using Spring
                        Security.
                      </li>
                      <li>Writing and fetching data from the database.</li>
                      <li>
                        Notifies the SignalR server when prices of a property
                        changes.
                      </li>
                    </ul>
                    <p>
                      The database is exclusively accessed by the Spring Boot
                      REST server.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <b>SignalR notification server</b>
                      <br />
                      The SignalR server is responsible for handling real-time
                      communication with the Blazor web application.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <b>JavaFX desktop application</b>
                      <br />
                      The JavaFX desktop application is made for administrators
                      of the real estate agency who manage the backend data.
                    </p>
                    <p> The app provides a GUI to:</p>
                    <ul className="ml-5 list-disc">
                      <li>Create new accounts for admins.</li>
                      <li>Create, update, and delete property listings.</li>
                      <li>Manage agents.</li>
                      <li>View booking appointments.</li>
                    </ul>
                    <p>
                      The JavaFX desktop app is communicating with the REST API
                      for all HTTP requests. Administrator accounts are assigned
                      the `ADMIN` role.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">System Implementation</h2>
                <h3 className="text-xl font-bold">Tech Stack</h3>
                <ul className="ml-5 list-disc">
                  <li>
                    <b>Frontend (Web):</b> Blazor
                  </li>
                  <li>
                    <b>Frontend (Desktop):</b> JavaFX
                  </li>
                  <li>
                    <b>Backend (REST API):</b> Java Spring Boot
                  </li>
                  <li>
                    <b>Real-time notifications:</b> SignalR
                  </li>
                  <li>
                    <b>Database:</b> PostgreSQL
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
