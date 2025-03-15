import Image from "next/image";
import NameWithHoverImage from "../NameWithHoverImage";

export default function AboutMe() {
  return (
    <div className="flex h-fit w-full max-w-7xl flex-col gap-8 px-6 md:px-8">
      <h2 className="text-center text-lg font-bold tracking-wider">ABOUT ME</h2>
      <div className="max-w-none space-y-6">
        <p>
          Hello, my name is{" "}
          <NameWithHoverImage
            imageSrc="/photo-of-me.jpg"
            className="hidden sm:inline-block"
          >
            Frederik Handberg
          </NameWithHoverImage>
          <span className="inline-block sm:hidden">Frederik Handberg</span> and
          I am 22 years old. I am born and raised in Horsens, in a family of
          five.
        </p>

        <Image
          src="/photo-of-me.jpg"
          alt="Image of me"
          width={0}
          height={0}
          unoptimized
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
      </div>
    </div>
  );
}
