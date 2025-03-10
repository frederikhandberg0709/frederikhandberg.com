import { ChangeEvent, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "../buttons/Button";
import Link from "next/link";
import FloatingInput from "../inputs/FloatingInput";
import FloatingTextArea from "../inputs/FloatingTextArea";

interface FormData {
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      const templateParams = {
        name: formData.user_name,
        from_email: formData.user_email,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey,
      );

      if (response.status === 200) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I will get back to you soon.",
        });
        setFormData({
          user_name: "",
          user_email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-fit w-[450px] flex-col items-center gap-8">
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

      {submitStatus && (
        <div
          className={`rounded-xl p-4 text-center ${submitStatus.success ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}`}
        >
          {submitStatus.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex w-fit flex-col items-center gap-6"
      >
        <FloatingInput
          id="user_name"
          label="Name"
          value={formData.user_name}
          onChange={handleChange}
          placeholder="John Doe"
          autoComplete="off"
        />

        <FloatingInput
          id="user_email"
          type="email"
          label="Email"
          value={formData.user_email}
          onChange={handleChange}
          placeholder="name@example.com"
          autoComplete="off"
          required
        />

        <FloatingInput
          id="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          autoComplete="off"
        />

        {/* <div className="floating-input relative w-full">
          <textarea
            name="message"
            placeholder="Message"
            className="min-h-[200px] w-[400px] rounded-xl bg-black/5 px-[20px] py-5 text-black outline-none transition duration-200 ease-in-out hover:bg-black/15 focus:bg-black/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/15"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="message"
            className={`pointer-events-none absolute left-0 top-0 h-full origin-left transform px-[25px] py-3.5 text-gray-400 transition-all duration-150 ease-in-out ${
              formData.message
                ? "translate-y-[-12px] scale-75 text-blue-500"
                : ""
            }`}
          >
            Message <span className="ml-1 text-red-500">*</span>
          </label>
        </div> */}
        <FloatingTextArea
          id="message"
          name="message"
          label="Message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="primary_glow"
          rounded="full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
