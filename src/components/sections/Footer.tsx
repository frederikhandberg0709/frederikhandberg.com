import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center gap-[15px] text-white">
      <p className="text-center text-lg">
        Visit my GitHub profile (
        <Link
          href={"https://github.com/frederikhandberg0709"}
          className="text-blue-500 transition-colors hover:text-blue-700 hover:underline"
        >
          @frederikhandberg0709
        </Link>
        ):
      </p>
      <Link
        href="https://github.com/frederikhandberg0709"
        target="_blank"
        className="group mt-[15px] flex items-center gap-[5px] rounded-lg border-[3px] border-solid border-white px-[10px] py-[10px] text-[17px] font-medium transition-all ease-in-out hover:bg-white hover:drop-shadow-[0_5px_40px_rgba(255,255,255,0.35)]"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[40px] fill-white group-hover:fill-black"
        >
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
        </svg>
        <p className="text-[20px] font-medium group-hover:text-black">GitHub</p>
      </Link>
      <p className="text-sm font-semibold">Made by Frederik Handberg</p>
    </div>
  );
}
