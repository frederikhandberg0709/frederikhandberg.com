import React, { useEffect, useRef } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="fixed inset-0 z-50" onClick={() => onOpenChange(false)} />
      <div
        ref={dialogRef}
        className="z-50 max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg border border-neutral-300 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`${className}`}>{children}</div>;
};

export const DialogHeader: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};

export const DialogClose: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <button
      className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-neutral-800 hover:text-white"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
};
