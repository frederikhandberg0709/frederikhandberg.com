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
          <div className="max-w-5xl max-lg:mx-3">
            <div className="flex flex-col gap-5">
              <p>
                This project was developed as part of our third semester project
                (SEP3) for my <b>Software Engineering</b> degree.
                <br />
                <br />
                The goal of the semester project was to design and implement a
                distributed system consisting of at least two servers. Our team
                chose to build a system for a fictional real estate agency
                called <b>Real Estate Plus</b>.
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
                      `/signalr-server`: A SignalR server that delivers
                      real-time notifications to the Blazor web application.
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Functional Requirements</h3>
                  <p>
                    The system was designed to meet the following functional
                    requirements defined through user stories. Each user story
                    represents a specific feature or capability written to
                    reflect the user&apos;s goals and interactions with the
                    system.
                  </p>
                  <p>
                    <b>Create user account:</b> As a customer, I want to have
                    the ability to create an account, so that I can access extra
                    features like save bookmarks and book an agent.
                  </p>
                  <p>
                    <b>Create administrator account:</b> As an administrator, I
                    want to have the ability to create an account, so that I can
                    manage properties, bookings, and agents.
                  </p>
                  <p>
                    <b>Update user information:</b> As a customer, I want to be
                    able to update my user account details, so that the agency
                    can still contact me if my information changes.
                  </p>
                  <p>
                    <b>Property filters:</b> As a customer, I want to have the
                    ability to use filters such as, property type, so that I can
                    find a property that matches my needs.
                  </p>
                  <p>
                    <b>Book agent:</b> As a customer, I want to be able to book
                    an appointment with an agent, so that I can receive further
                    information and ask questions about a specific property.
                  </p>
                  <p>
                    <b>Bookmark property listings:</b> As a customer, I want to
                    be able to bookmark listings, so that I can easily revisit
                    and review them later.
                  </p>
                  <p>
                    <b>Real-time notifications:</b> As a customer, I want to
                    receive notifications about my bookmarked properties, so
                    that I can stay updated on any changes to them.
                  </p>
                  <p>
                    <b>Search in admin dashboard:</b> As an administrator, I
                    want to be able to search for property listings, so that I
                    can quickly find the specific property I&apos;m looking for.
                  </p>
                  <p>
                    <b>Create property listing:</b> As an administrator, I want
                    to be able to create new property listings, so that they can
                    be added to the website.
                  </p>
                  <p>
                    <b>Upload property images:</b> As an administrator, I want
                    to be able to upload images of properties, so that customers
                    can visually assess whether they are interested in a
                    property.
                  </p>
                  <p>
                    <b>Update property details:</b> As an administrator, I want
                    to be able to update the details of property listings, so
                    that I can ensure all information remains accurate and up to
                    date.
                  </p>
                  <p>
                    <b>Delete property listing:</b> As an administrator, I want
                    to be able to delete property listings, so that outdated or
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
                        The REST server built with Java Spring Boot is the
                        backend of the system.
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
                        The JavaFX desktop application is made for
                        administrators of the real estate agency who manage the
                        backend data.
                      </p>
                      <p> The app provides a GUI to:</p>
                      <ul className="ml-5 list-disc">
                        <li>Create new accounts for admins.</li>
                        <li>Create, update, and delete property listings.</li>
                        <li>Manage agents.</li>
                        <li>View booking appointments.</li>
                      </ul>
                      <p>
                        The JavaFX desktop app is communicating with the REST
                        API for all HTTP requests. Administrator accounts are
                        assigned the `ADMIN` role.
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
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Project Features</h2>
                  <div className="space-y-4">
                    <h3 lang="text-xl font-bold">User authentication</h3>
                    <div className="space-y-2">
                      <p>
                        <b>Blazor web application for customers:</b>
                      </p>
                      <div className="space-y-4">
                        <Image
                          src="/Blazor_Login.jpeg"
                          alt="Login page of the Blazor web application"
                          width={1000}
                          height={500}
                          className="h-auto w-full rounded-2xl"
                          layout="responsive"
                        />
                        <Image
                          src="/Blazor_Register.jpeg"
                          alt="Registration page of the Blazor web application"
                          width={1000}
                          height={500}
                          className="h-auto w-full rounded-2xl"
                          layout="responsive"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <b>JavaFX desktop application for administrators:</b>
                      </p>
                      <div className="space-y-4">
                        <Image
                          src="/JavaFX_Login.png"
                          alt="Login window of the JavaFX desktop application"
                          width={1000}
                          height={500}
                          className="h-auto w-full rounded-2xl"
                          layout="responsive"
                        />
                        <Image
                          src="/JavaFX_Register.png"
                          alt="Registration window of the JavaFX desktop application"
                          width={1000}
                          height={500}
                          className="h-auto w-full rounded-2xl"
                          layout="responsive"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <b>Role-based authentication</b>
                      </p>
                      <p>
                        The system uses role-based authentication to manage
                        access and permissions.
                      </p>
                      <p>
                        There are two distinct user roles: `USER` and `ADMIN`:
                      </p>
                      <ul className="ml-5 list-disc">
                        <li>
                          Customers who register for an account through the
                          Blazor web application are automatically assigned the
                          `USER` role.
                        </li>
                        <li>
                          Administrators who register through the JavaFX desktop
                          application are automatically assigned the `ADMIN`
                          role.
                        </li>
                      </ul>
                      <p>
                        Administrators have additional privileges, such as
                        managing property listings. Therefore, it is important
                        to distinguish between administrators and customers.
                        This ensures that customers cannot access API endpoints
                        they are not authorized to use.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <b>API endpoint security</b>
                      </p>
                      <p>
                        Access control is enforced by our Java REST API, which
                        uses Spring Security to handle authentication and
                        authorization.
                        <br />
                        Endpoint security is achieved by using
                        `@PreAuthorize(&quot;hasRole(&apos;ADMIN&apos;)&quot;)`
                        on endpoints that only administrators are allowed to
                        access.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">
                        Manage property listings
                      </h2>
                      <p>
                        Administrators can manage property listings through the
                        JavaFX desktop application.
                      </p>
                      <div className="space-y-2">
                        <p>
                          <b>Create property</b>
                        </p>
                        <p>
                          Administrators can add new property listings by
                          filling in the details such as price, address,
                          property type, and upload images.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <b>Update property information</b>
                        </p>
                        <p>
                          Details for existing property listings can be updated,
                          such as changing the price.
                        </p>
                        <Image
                          src="/JavaFX_Edit_Property.png"
                          alt="Edit property window of the JavaFX desktop application"
                          width={1000}
                          height={500}
                          className="h-auto w-full rounded-2xl"
                          layout="responsive"
                        />
                        <p>
                          Uploading additional images is also supported, as well
                          as deleting existing images.
                        </p>
                        <Image
                          src="/JavaFX_Edit_Property_Images.png"
                          alt="Image upload window of the JavaFX desktop application"
                          width={1000}
                          height={500}
                          className="h-auto w-full rounded-2xl"
                          layout="responsive"
                        />
                      </div>
                      <div className="space-y-2">
                        <b>Delete property</b>
                        <p>
                          Administrators can remove properties that are no
                          longer available or relevant from the system entirely.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">
                        Bookmark property listings
                      </h2>
                      <p>
                        Users can save properties as bookmarks to easily view
                        them later.
                        <br />
                        Bookmarked properties are displayed on the `Account`
                        page, where users can also remove bookmarks for listings
                        they are no longer interested in.
                      </p>
                      <Image
                        src="/Blazor_Account.jpeg"
                        alt="Account page of the Blazor web application"
                        width={1000}
                        height={500}
                        className="h-auto w-full rounded-2xl"
                        layout="responsive"
                      />
                      <p>
                        When changes happen to bookmarked properties, the user
                        will receive a notification. For example, if the price
                        is updated. In this case, the user will receive a
                        notification about the new price of the property.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">Manage agents</h2>
                      <p>
                        Administrators can manage real estate agents through the
                        JavaFX desktop application. These agents are displayed
                        in the Blazor web application, where customers can book
                        them for property viewings and appointments.
                      </p>
                      <Image
                        src="/JavaFX_Agent_List.png"
                        alt="Agent management window of the JavaFX desktop application"
                        width={1000}
                        height={500}
                        className="h-auto w-full rounded-2xl"
                        layout="responsive"
                      />
                      <p>
                        <b>Add new agent</b>
                      </p>
                      <p>
                        Administrators can register new agents by providing the
                        name and contact information. Once an agent has been
                        added, they become available for booking on the web
                        application.
                      </p>
                      <p>
                        <b>Remove agent</b>
                      </p>
                      <p>
                        Agents can be removed from the system if they are no
                        longer active. This prevents customers from booking
                        inactive agents.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">
                        Update user information
                      </h2>
                      <p>
                        Users can update their information inside the Blazor web
                        application by going to the `Account` page and then
                        clicking on `Update Profile` button.
                      </p>
                      <Image
                        src="/Blazor_Update_Profile.jpeg"
                        alt="Update profile page of Blazor web application"
                        width={1000}
                        height={500}
                        className="h-auto w-full rounded-2xl"
                        layout="responsive"
                      />
                      <p>From this view, users can change:</p>
                      <ul className="ml-5 list-disc">
                        <li>Username</li>
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Address</li>
                      </ul>

                      <p>
                        Form fields are pre-filled with the user&apos;s current
                        information, making it easy to edit.
                      </p>

                      <p>
                        As a security measure, updating sensitive data such as
                        the username or email address requires the user to enter
                        their password. This is to prevent unauthorized changes
                        in case the JWT session token is compromised.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">
                        Real-time notifications
                      </h2>
                      <p>
                        A SignalR server was implemented to handle real-time
                        notifications.
                        <br />
                        When a price change occurs, the Java REST server
                        notifies the SignalR server, which then sends the
                        real-time notification to the Blazor web application.
                        This approach allows instant updates without requiring
                        the user to refresh the page. SignalR was chosen for its
                        speed and efficiency in delivering real-time
                        notifications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
