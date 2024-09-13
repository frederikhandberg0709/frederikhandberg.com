import Link from "next/link";

export default function NavbarMenu() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Link
          href={"#"}
          className="flex flex-col items-center text-center font-bold"
        >
          Frederik
          <br />
          Handberg
        </Link>
      </div>
    </div>
  );
}
