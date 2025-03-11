import { cn } from "@/utils/cn";
import React, { useState } from "react";
import "./input.css";

interface FloatingTextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  textAreaClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const FloatingTextArea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingTextAreaProps
>(
  (
    {
      label,
      id,
      value,
      onChange,
      className,
      textAreaClassName,
      labelClassName,
      containerClassName,
      required,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    const isLabelActive = isFocused || value.length > 0;

    return (
      <div
        className={cn(
          "floating-input relative w-full px-4 sm:px-0",
          containerClassName,
        )}
      >
        <textarea
          ref={ref}
          id={id}
          name={id}
          placeholder={label}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={cn(
            "min-h-[200px] w-full rounded-xl bg-black/10 px-[20px] py-5 text-black outline-none transition duration-200 ease-in-out hover:bg-black/15 focus:bg-black/15 active:bg-black/20 min-[415px]:w-[400px] dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/15",
            textAreaClassName,
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-0 top-0 h-full origin-left transform px-[25px] py-3.5 text-gray-400 transition-all duration-150 ease-in-out",
            isLabelActive && "translate-y-[-12px] scale-75 text-blue-500",
            labelClassName,
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>
    );
  },
);

FloatingTextArea.displayName = "FloatingTextArea";

export default FloatingTextArea;
