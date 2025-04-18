import TechStackMiniBadge from "@/components/TechStackMiniBadge";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PokemonProject() {
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
              href="/portfolio/pokemon-project"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              Pokémon Project
            </Link>
          </div>
        </div>
      </nav>

      <main className="mb-14 mt-20 flex min-h-screen flex-col items-center justify-start">
        <div className="flex w-full max-w-5xl flex-col gap-3">
          <h1 className="text-3xl font-bold max-sm:mx-3">Pokémon Project</h1>
          <div className="my-2.5 flex items-start gap-2.5 overflow-x-auto max-sm:px-3">
            <TechStackMiniBadge name="Vite" />
            <TechStackMiniBadge name="TypeScript" />
            <TechStackMiniBadge name="React Router v7" />
            <TechStackMiniBadge name="React Query" />
            <TechStackMiniBadge name="TailwindCSS" />
          </div>
          <div className="flex max-w-5xl flex-col gap-5 max-lg:mx-3">
            <p>
              This project is the second assignment for my WEB2 course. It is a
              Pokémon web app designed to display all Pokémon and their
              information such as height, weight, stats, and abilities.
            </p>
            <Image
              src="/pokemon-list.png"
              alt="List of Pokémon"
              width={1000}
              height={500}
              className="h-auto w-full rounded-2xl"
              layout="responsive"
            />

            <p>
              GitHub repository:{" "}
              <a
                href="https://github.com/frederikhandberg0709/pokemon-project"
                target="_blank"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                https://github.com/frederikhandberg0709/pokemon-project
              </a>
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Tech Stack</h2>
                <ul className="ml-5 list-disc">
                  <li>
                    <b>Build Tool:</b> Vite
                  </li>
                  <li>
                    <b>Language:</b> TypeScript
                  </li>
                  <li>
                    <b>Routing:</b> React Router V7
                  </li>
                  <li>
                    <b>Data Fetching:</b> React Query
                  </li>
                  <li>
                    <b>Styling:</b> TailwindCSS
                  </li>
                  <li>
                    <b>API:</b>{" "}
                    <a
                      href="https://pokeapi.co/"
                      className="text-blue-500 hover:text-blue-600 hover:underline"
                    >
                      PokéAPI
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Implementation</h2>
                <p>
                  I have two React Query hooks that I use to fetch Pokémon
                  information from the PokéAPI.
                  <br />
                  <br />
                  The first hook is called `usePokemonList`. I use this to fetch
                  all Pokémon. I also added support for pagination in this hook,
                  as implementing pagination was one of the requirements for the
                  assignment.
                  <br />
                  <br />I set the limit to 20, so that 20 Pokémon are displayed
                  on each page. The user can click on the &quot;Next&quot;
                  button to go to the next page.
                  <br />
                  <br />
                  The second React Query hook I implement is called
                  `usePokemonDetails`. The purpose of this hook is to fetch
                  information for a specific Pokémon by providing its ID. One
                  caveat of the PokéAPI is that it does not provide the ID in
                  the JSON objects. Instead, the ID can be extracted from the
                  URL. I achieved this by implementing a utility function that I
                  called `getPokemonIdFromUrl`.
                  <br />
                  <br />
                  This is not the only utility function I implemented. I ended
                  up creating three utility functions in total.
                  <br />
                  <br />
                  `getColorByPokemonId` is a utility function that assigns a
                  color to each Pokémon depending on its ID. This function is
                  being used in the Pokémon list. The color is simply assigned
                  by calculation the remainder when dividing the ID by the
                  number of types (which is 18).
                  <br />
                  <br />
                  The last utility function I implement is called
                  `getPokemonImageUrl`. I wanted to display an image of the
                  Pokémon. This can be done using the URL
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$
                  {"{id}"}.png`. Since I had already implemented the
                  `getPokemonIdFromUrl` function, I was able to reuse it to
                  extract the correct ID for the image URL.
                  <br />
                  <br />
                  The Pokémon cards all have the same layout, so for this I
                  implemented a component called `PokemonCard`. The component
                  needs five pieces of information:
                </p>

                <ul className="ml-5 list-disc">
                  <li>
                    <b>id</b> – The ID of the Pokémon, used to fetch the correct
                    information for that specific Pokémon.
                  </li>
                  <li>
                    <b>number</b> – The ID displayed in the format of #5 if the
                    ID is 5.
                  </li>
                  <li>
                    <b>name</b> – The name of the Pokémon.
                  </li>
                  <li>
                    <b>imageSrc</b> – The URL for the Pokémon&apos;s image.
                  </li>
                  <li>
                    <b>cardColor</b> – The background color of the card, based
                    on the Pokémon&apos;s ID.
                  </li>
                </ul>

                <br />
                <br />

                <p>
                  Besides supporting pagination, another requirement was to
                  include at least two routes in our web app and use React
                  Router to switch between the routes. Therefore, I added a
                  second page to display detailed information about a specific
                  Pokémon.
                </p>

                <Image
                  src="/pokemon-details.png"
                  alt="Detailed information for a specific Pokémon"
                  width={1000}
                  height={500}
                  className="h-auto w-full rounded-2xl"
                  layout="responsive"
                />

                <p>
                  On this page, I use the `usePokemonDetails` hook to fetch
                  additional information about the Pokémon, beyond just the name
                  and URL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
