import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SocialNetwork() {
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between bg-white dark:bg-black">
        <div className="mx-20 my-3 w-full items-center justify-between">
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
              href="/portfolio/social-network"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              Social Network
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-20 flex min-h-screen flex-col items-center justify-start">
        <div className="flex w-full max-w-5xl flex-col gap-5">
          <h1 className="text-3xl font-bold">Social Network</h1>
          <p>
            BLOP is a social network I created as a portfolio project, designed
            to closely mirror the functionality of modern social media
            platforms. My goal was to make it as realistic and feature-rich as
            possible, providing users with an experience they would expect from
            today&apos;s social networks.
          </p>
          <Image
            src="/home.jpeg"
            alt="Description"
            width={1000}
            height={500}
            className="h-auto w-full rounded-2xl"
            layout="responsive"
          />
          <div>
            <h2 className="text-2xl font-bold">Project Structure</h2>
            <p>
              This project is twofold, as it includes a Next.js project and an
              Express.js server.
            </p>
            <div>
              <h3 className="mt-2.5 text-xl font-bold">
                Frontend & API (Next.js)
              </h3>
              <p>
                The frontend was built using Next.js. There are two main reasons
                for why I chose Next.js. First of all, it&apos;s a fullstack
                framework that makes it easy for a small team (in my case, just
                me), to work quickly and efficiently since it comes with most of
                the necessary tools out of the box. Secondly, the React
                documentations specifically recommend using Next.js.
                <br />
                <br />
                Instead of setting up a separate server (such as Express or
                Spring Boot), Next.js lets me build a REST server directly in
                the same project by using API routes.
              </p>
            </div>
            <div>
              <h3 className="mt-2.5 text-xl font-bold">
                Notification Service (Express.js)
              </h3>
              <p>
                I mentioned earlier that one of the advantages of Next.js is
                that you might not need a separate server since it provides API
                routes. I did use API routes for all my HTTP calls.
                <br />
                <br />
                However, I wanted a notification service using Socket.IO.
                Technically, I could have built it directly in Next.js, but that
                would mean I couldn&apos;t use the default Next.js server – I
                would have to set up my own custom server in Next.js instead.
                Because of this, I decided it was better to have a separate
                Express.js server for the notification service.
                <br />
                <br />I chose Socket.IO mainly because I already have experience
                with SignalR from my third-semester project, and since Socket.IO
                is very similar to SignalR, it seemed like the obvious choice.
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <h2 className="text-xl font-bold">Project Features</h2>
            <p>
              I have tried implementing the features that people expect from a
              modern social network. This includes the basic features such as
              being able to like and comment on posts, but also more advanced
              features, such as being able to switch accounts.
            </p>
            <div className="space-y-2.5">
              <p className="font-bold">User Authentication</p>
              <p>
                I used NextAuth to build the authentication system, allowing
                users to log in with either their email or username and a
                password. For security, passwords are hashed using Argon2 before
                being stored in the database.
              </p>
              <Image
                src="/login.jpeg"
                alt="Description"
                width={1000}
                height={500}
                className="h-auto w-full rounded-2xl"
                layout="responsive"
              />
            </div>

            <div className="space-y-2.5">
              <p className="font-bold">Reset Password</p>
              <p>
                The reset password functionality ensures that users can update
                their passwords if they forget it. Before submitting, the form
                performs validation checks:
                <ul className="ml-5 list-disc">
                  <li>If the new password meets security requirements</li>
                  <li>If the confirmation password matches the new password</li>
                </ul>
                If the validation passes, the request is sent to the API with
                the identifier (email or username) and the new password.
                <br />
                <br />
                On the backend, in the API route, it searches for a user
                matching the provided identifier. If no user is found, it will
                return a &quot;User not found&quot; error.
                <br />
                <br />
                If the user exists:
                <ul className="ml-5 list-disc">
                  <li>The new password is securely hashed using</li>
                  Argon2.
                  <li>
                    The hashed password is stored in the database, replacing
                  </li>
                  the old one.
                  <li>A success response is sent back.</li>
                </ul>
                <br />
                <br />
                In a real-world application, password resets should be handled
                more securely. Instead of allowing users to reset their password
                directly by providing their email or username, the system should
                send a reset link to the user&apos; email with a token.
              </p>
              <Image
                src="/reset password.jpeg"
                alt="Description"
                width={1000}
                height={500}
                className="h-auto w-full rounded-2xl"
                layout="responsive"
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Future Development</h2>
            <p>Search functionality</p>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}
