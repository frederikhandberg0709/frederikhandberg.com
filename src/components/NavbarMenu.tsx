import Link from "next/link";

export default function NavbarMenu() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between">
      <div className="mx-20 my-3 flex w-full items-center justify-between">
        <Link
          href={"#"}
          className="flex flex-col items-center text-center font-bold leading-snug opacity-50 transition hover:opacity-100"
        >
          Frederik
          <br />
          Handberg
        </Link>
        <Link
          href={"#contact"}
          className="shadow-red linear scale-100 rounded-full bg-gradient-to-br from-[#339DFF] to-[#312fad] px-5 py-2 font-bold shadow-none transition duration-200 hover:scale-105 hover:shadow-[0_5px_25px_15px_rgba(47,67,173,0.35)]"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
