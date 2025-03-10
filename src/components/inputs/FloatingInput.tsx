import { cn } from "@/utils/cn";
import React, { useState } from "react";
import "./input.css";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  type?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      label,
      id,
      value,
      onChange,
      className,
      inputClassName,
      labelClassName,
      containerClassName,
      type = "text",
      required,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    const isLabelActive = isFocused || value.length > 0;

    return (
      <div className={cn("floating-input relative w-full", containerClassName)}>
        <input
          ref={ref}
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={cn(
            "h-[52px] w-[400px] rounded-xl bg-black/5 px-[20px] py-5 text-black outline-none transition duration-200 ease-in-out hover:bg-black/15 focus:bg-black/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/15",
            inputClassName,
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

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
