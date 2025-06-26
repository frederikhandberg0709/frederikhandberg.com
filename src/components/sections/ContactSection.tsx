import Link from "next/link";
import ContactForm from "../ContactForm";

export default function ContactSection() {
  return (
    <section className="flex w-[450px] flex-col items-center gap-8">
      <h2 className="text-center text-lg font-bold tracking-wider">CONTACT</h2>
      <p className="text-center">
        Please use the form below to send me a message, or reach out directly
        via email at{" "}
        <Link
          href="mailto:hello@frederikhandberg.com"
          aria-label="Email hello@frederikhandberg.com"
          className="font-semibold text-blue-500 transition-colors hover:text-blue-700 hover:underline"
        >
          hello@frederikhandberg.com
        </Link>
      </p>

      <ContactForm />
    </section>
  );
}
