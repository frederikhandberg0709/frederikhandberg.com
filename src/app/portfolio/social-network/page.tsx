import TechStackMiniBadge from "@/components/TechStackMiniBadge";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SocialNetwork() {
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
              href="/portfolio/social-network"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              Social Network
            </Link>
          </div>
        </div>
      </nav>
      <div className="mb-14 mt-20 flex min-h-screen flex-col items-center justify-start">
        <div className="flex w-full max-w-5xl flex-col gap-3">
          <h1 className="text-3xl font-bold max-sm:mx-3">Social Network</h1>
          <div className="my-2.5 flex items-start gap-2.5 overflow-x-auto max-sm:px-3">
            <TechStackMiniBadge name="Next.js" />
            <TechStackMiniBadge name="TypeScript" />
            <TechStackMiniBadge name="Prisma ORM" />
            <TechStackMiniBadge name="Express" />
            <TechStackMiniBadge name="Socket.IO" />
          </div>
          <div className="flex max-w-5xl flex-col gap-5 max-sm:mx-3">
            <p>
              <b>BLOP</b> is a social network I created as a portfolio project,
              designed to closely mirror the functionality of modern social
              media platforms. My goal was to make it as realistic and
              feature-rich as possible, providing users with an experience they
              would expect from today&apos;s social networks.
            </p>
            <Image
              src="/home.jpeg"
              alt="Home page of the social network"
              width={1000}
              height={500}
              className="h-auto w-full rounded-2xl"
              layout="responsive"
            />
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Project Structure</h2>
                <p>
                  This project is twofold, as it includes a <b>Next.js</b>{" "}
                  project and an <b>Express.js</b> server.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Frontend & API (Next.js)</h3>
                <p>
                  The frontend was built using Next.js. There are two main
                  reasons for why I chose Next.js. First of all, it&apos;s a
                  fullstack framework that makes it easy for a small team (in my
                  case, just me), to work quickly and efficiently since it comes
                  with most of the necessary tools out of the box. Secondly, the
                  React documentations specifically recommend using Next.js.
                  <br />
                  <br />
                  Instead of setting up a separate server (such as Express or
                  Spring Boot), Next.js lets me build a REST server directly in
                  the same project by using API routes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Notification Service (Express.js)
                </h3>
                <p>
                  I mentioned earlier that one of the advantages of Next.js is
                  that you might not need a separate server since it provides
                  API routes. I did use API routes for all my HTTP calls.
                  <br />
                  <br />
                  However, I wanted a notification service using Socket.IO.
                  Technically, I could have built it directly in Next.js, but
                  that would mean I couldn&apos;t use the default Next.js server
                  – I would have to set up my own custom server in Next.js
                  instead. Because of this, I decided it was better to have a
                  separate Express.js server for the notification service.
                  <br />
                  <br />I chose Socket.IO mainly because I already have
                  experience with SignalR from my third-semester project, and
                  since Socket.IO is very similar to SignalR, it seemed like the
                  obvious choice.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Project Features</h2>
                <p>
                  I have tried implementing the features that people expect from
                  a modern social network. This includes the basic features such
                  as being able to like and comment on posts, but also more
                  advanced features, such as being able to switch accounts.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-bold">User Authentication</p>
                <p>
                  I used NextAuth to build the authentication system, allowing
                  users to log in with either their email or username and a
                  password. For security, passwords are hashed using Argon2
                  before being stored in the database.
                </p>
                <Image
                  src="/login.jpeg"
                  alt="Login page"
                  width={1000}
                  height={500}
                  className="h-auto w-full rounded-2xl"
                  layout="responsive"
                />
              </div>

              <div className="space-y-2">
                <p className="font-bold">Reset Password</p>
                <p>
                  The reset password functionality ensures that users can update
                  their passwords if they forget it. Before submitting, the form
                  performs validation checks:
                  <ul className="ml-5 list-disc">
                    <li>If the new password meets security requirements</li>
                    <li>
                      If the confirmation password matches the new password
                    </li>
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
                  more securely. Instead of allowing users to reset their
                  password directly by providing their email or username, the
                  system should send a reset link to the user&apos;s email with
                  a token.
                </p>
                <Image
                  src="/reset-password.jpeg"
                  alt="Page to reset password"
                  width={1000}
                  height={500}
                  className="h-auto w-full rounded-2xl"
                  layout="responsive"
                />
              </div>

              <div className="space-y-2">
                <p className="font-bold">Bookmarks</p>
                <p>
                  Users can bookmark posts and comments they want to save for
                  later. Bookmarks are stored in the database with a reference
                  to the user who bookmarked it, so that the user can view their
                  bookmarks on any device.
                </p>
                <Image
                  src="/my-bookmarks.jpeg"
                  alt="Page to view bookmarks"
                  width={1000}
                  height={500}
                  className="h-auto w-full rounded-2xl"
                  layout="responsive"
                />
              </div>

              <div className="space-y-2">
                <p className="font-bold">Link Accounts</p>
                <p>
                  Users can link multiple accounts together. This allows
                  switching between accounts without having to log in and out.
                </p>
                <Image
                  src="/link-new-account.jpeg"
                  alt="Page to link a new account"
                  width={1000}
                  height={500}
                  className="h-auto w-full rounded-2xl"
                  layout="responsive"
                />

                <p>
                  Users can easily switch between their linked accounts by
                  clicking on their profile menu and selecting the &apos;Switch
                  Account&apos; option, which will then display a list of all
                  linked accounts.
                </p>

                <Image
                  src="/profile-menu_(switch-account).png"
                  alt="Page to link a new account"
                  width={1000}
                  height={500}
                  className="h-auto w-auto rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <p className="font-bold">User Profile</p>
                <p>
                  The profile page includes a profile picture, banner, name,
                  username, and a biography.
                  <br />
                  This page also includes a timeline of the user&apos;s posts
                  and counters for the number of followers, how many people the
                  user is following, and the total number of posts from the
                  user.
                </p>

                <Image
                  src="/profile_(follower).jpeg"
                  alt="Profile page as follower"
                  width={1000}
                  height={500}
                  className="h-auto w-auto rounded-2xl"
                />

                <p>
                  The user interface will slightly change depending on whether
                  the user is the author of the profile or a follower. For
                  example, if the user is the author, they will not see the
                  &apos;Follow&apos; button or notifications button. Instead,
                  they will see an &apos;Edit Profile&apos; button.
                </p>

                <Image
                  src="/profile_(author).jpeg"
                  alt="Profile page as author"
                  width={1000}
                  height={500}
                  className="h-auto w-auto rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <p className="font-bold">Quote Posts</p>
                <p>
                  Users can quote posts, which is similar to retweeting on
                  Twitter. The original post is embedded in the new post.
                </p>

                <Image
                  src="/quoted-post.jpeg"
                  alt="Quoted post"
                  width={1000}
                  height={500}
                  className="h-auto w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <p className="font-bold">Notification System</p>
                <p>
                  Clicking the bell icon on a user profile, will show the
                  notification settings to enable notifications whenever a user
                  publishes a new post.
                  <br />
                  <br />
                  Clicking the &apos;Specific notifications&apos; option, should
                  allow the user to select which notifications they want to
                  receive. Currently, only the &apos;New post&apos; notification
                  is working, but in the future, more options should be added.
                </p>

                <Image
                  src="/profile-notification-settings.png"
                  alt="Profile notification settings"
                  width={1000}
                  height={500}
                  className="h-auto w-auto rounded-2xl"
                />

                <p>
                  Socket.IO is only for sending notifications in real-time. This
                  means, that the notifications would be lost if the user is not
                  on the site. Therefore, notifications are also stored in the
                  database, so that the user can see them when they return to
                  the site.
                  <br />
                  <br />
                  Initially, notifications are shown as unread. The user can
                  then click on the notification to mark it as read.
                  <br />
                  <br />I should implement a dropdown menu to mark the
                  notifications as read or delete them. Then clicking on the
                  notification, should redirect the user to the post.
                </p>

                <Image
                  src="/notification-panel.png"
                  alt="Notification panel"
                  width={1000}
                  height={500}
                  className="h-auto w-auto rounded-2xl"
                />

                <p>
                  The notification panel could use some design improvements,
                  particularly regarding timestamp formatting. Currently,
                  timestamps display in a verbose format (e.g. &quot;9 seconds
                  ago&quot;), which uses too much space in the compact panel.
                  These should be converted to abbreviated formats (e.g.
                  &quot;9s&quot;) to take up less space.
                  <br />
                  <br />
                  The current implementation uses the same `formatDate` function
                  that I developed for posts and comments. However, since the
                  notification panel has more limited space than the posts, it
                  requires a more concise timestamp format specifically made for
                  the notification panel.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Future Development</h2>
                <p>
                  There are a some features I would like to implement in the
                  future.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-bold">Search functionality</p>
                <p>
                  There is currently a search input on the web application, but
                  this is not functional. Users should be able to search for
                  posts by keywords and hashtags, and to search for other users
                  either by their profile name or username.
                  <br />
                  <br />
                  It should not be too difficult to implement this feature. I
                  think one approach to implement this feature is by using URL
                  params with the user&apos;s search input, then querying the
                  database for posts or users that match the search input.
                  <br />
                  <br />
                  However, the way I have set up the search input as of now, I
                  would like the search results to update live as the user
                  types. For this, the URL params approach would not be ideal.
                  <br />
                  <br />
                  The search functionality could be implemented client-side
                  where the search results update in real-time as the user
                  types, rather than using URL parameters.
                  <br />
                  <br />
                  First of all, I should make sure to prevent excessive API
                  calls as the user types. A small delay of about 300ms after
                  the user has stopped typing could be made before sending the
                  request to the API.
                  <br />
                  I already use React Query for data fetching, so I should just
                  continue using that for the search functionality as well. It
                  gives me caching and state management capabilities to handle
                  search requests. This provides automatic loading states, error
                  handling, and data caching.
                  <br />
                  <br />
                  Lastly, I will need to create a dedicated API route for
                  searching posts and users, with filtering logic based on the
                  search term.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-bold">Media upload</p>
                <p>
                  Users can add media (images and videos) to their posts.
                  <br />
                  However, they must do this by linking to the media they want
                  to include in their post or comment.
                  <br />
                  This is because it is not currently possible to upload media
                  directly from the platform.
                  <br />
                  <br />
                  The media must be hosted elsewhere.
                  <br />
                  It would be much more ideal to allow users to upload their
                  media directly on the platform.
                  <br />
                  <br />
                  How could this be implemented? Instead of storing the media
                  files directly in the database, it’s best to store only
                  metadata and file URLs.
                  <br />
                  <br />
                  So, we need a database table for the metadata and file URLs.
                  And, it’s very important that the database table is storing a
                  foreign key to the users table (who uploaded it) and a foreign
                  key to the posts table (if attached to a post) or a foreign
                  key to the comments table (if attached to a comment).
                  <br />
                  <br />
                  We need these foreign keys because otherwise, the system has
                  no idea who uploaded the media or which post or comment it
                  should be included in.
                  <br />
                  <br />
                  As stated earlier, storing media directly in a database table
                  is less than ideal. This means, the system needs a storage
                  solution. In a real-world application, this could be done
                  using AWS S3 as the storage solution.
                  <br />
                  <br />
                  The steps to upload media would be something like:
                  <ol className="list-decimal pl-8">
                    <li>
                      The user uploads a file (this file is sent via
                      `multipart/form-data`).
                    </li>
                    <li>Server should then process the file.</li>
                  </ol>
                  <br />
                  The server would need to make sure the file follows some
                  guidelines. For instance, there might be implemented a limit
                  on how large the files are allowed to be, e.g. 5GB.
                  <br />
                  <br />
                  The server would also need to make sure the file type is
                  allowed. Since this is for media uploads, it does not make
                  sense to allow users to upload a `.txt` file.
                  <br />
                  <br />
                  Lastly, the server should make sure to save the metadata in
                  the database table.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-bold">User interface improvements</p>
                <p>
                  When I started working on this project, my goal was not to
                  build a beautiful user interface. Instead, I wanted to focus
                  on learning the technical aspects of building a modern and
                  complex web application.
                  <br />
                  <br />
                  I focused on understanding how to implement user
                  authentication, efficiently fetch and mutate data, how to
                  structure a large project, and leverage the features provided
                  by React (e.g. hooks) and Next.js (e.g. API routes and the App
                  Router).
                  <br />
                  <br />
                  However, if I were to improve the visual design of the
                  application, I would focus on implementing a light mode and
                  ensuring that the UI looks good on all screen sizes.
                  <br />
                  <br />
                  Currently, the UI is optimized for desktop screens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
