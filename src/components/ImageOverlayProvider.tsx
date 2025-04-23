"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

interface ImageOverlayContextType {
  overlayImage: string | null;
  setOverlayImage: (src: string | null) => void;
}

export const ImageOverlayContext = createContext<ImageOverlayContextType>({
  overlayImage: null,
  setOverlayImage: () => {},
});

interface ImageOverlayProviderProps {
  children: ReactNode;
}

export const ImageOverlayProvider: React.FC<ImageOverlayProviderProps> = ({
  children,
}) => {
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  const handleSetOverlayImage = (src: string | null) => {
    setOverlayImage(src);
    if (src) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && overlayImage) {
        handleSetOverlayImage(null);
      }
    };

    if (overlayImage) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [overlayImage]);

  return (
    <ImageOverlayContext.Provider
      value={{
        overlayImage,
        setOverlayImage: handleSetOverlayImage,
      }}
    >
      {children}
      {overlayImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleSetOverlayImage(null);
            }
          }}
        >
          <div className="relative max-h-full max-w-full overflow-hidden">
            <button
              className="absolute right-0 top-0 m-4 rounded-full bg-black/50 px-2 py-1 font-semibold text-white hover:bg-black/95"
              onClick={() => handleSetOverlayImage(null)}
            >
              Close
            </button>
            <img
              src={overlayImage}
              alt="Fullscreen"
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
            />
          </div>
        </div>
      )}
    </ImageOverlayContext.Provider>
  );
};
