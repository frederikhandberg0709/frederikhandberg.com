import { cn } from "@/utils/cn";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ButtonLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "primary_glow" | "secondary";
  size?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      children,
      href,
      variant = "primary",
      size = "md",
      rounded = "md",
      isLoading,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700",
      primary_glow:
        "bg-gradient-to-br from-[#339DFF] to-[#312fad] text-white hover:shadow-[0_5px_20px_10px_rgba(47,67,173,0.35)] dark:hover:shadow-[0_5px_25px_15px_rgba(47,67,173,0.35)]",
      secondary: "",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2 text-base",
      lg: "px-7 py-3 text-lg",
    };

    const roundedStyles = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "linear scale-100 rounded-full font-bold shadow-none transition duration-200 hover:scale-105 active:scale-95",
          disabled && "cursor-not-allowed",
          variants[variant],
          sizes[size],
          roundedStyles[rounded],
          className,
        )}
        {...props}
      >
        {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </Link>
    );
  },
);

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
