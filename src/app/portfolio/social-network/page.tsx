import Image from "next/image";

export default function SocialNetwork() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <div className="flex w-full max-w-5xl flex-col gap-5">
        <h1 className="text-3xl font-bold">Social Network</h1>
        <p>
          BLOP is a social network I created as a portfolio project, designed to
          closely mirror the functionality of modern social media platforms. My
          goal was to make it as realistic and feature-rich as possible,
          providing users with an experience they would expect from today&apos;s
          social networks.
          {/* My social network is a fully functional web application developed with
          Next.js. It incorporates most of the essential features you&apos;d
          expect from a modern social network, including post creation, liking,
          sharing, commenting, and replying. */}
        </p>
        <Image
          src="/home.jpeg"
          alt="Description"
          width={1000}
          height={500}
          className="h-auto w-full rounded-xl"
          layout="responsive"
        />
        <div>
          <h2 className="text-2xl font-bold">Project Structure</h2>
          <p>
            This project is twofold, as it includes a Next.js project and an
            Express.js server.
          </p>
          <h3 className="text-xl font-bold">Frontend & API (Next.js)</h3>
          <h3 className="text-xl font-bold">
            Notification Service (Express.js)
          </h3>
        </div>
        <div>
          <h2 className="text-xl font-bold">Project Features</h2>
        </div>
        <div>
          <h2 className="text-xl font-bold">Future Development</h2>
        </div>
      </div>
    </div>
  );
}
