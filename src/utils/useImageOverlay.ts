import { ImageOverlayContext } from "@/components/ImageOverlayProvider";
import { useContext } from "react";

export const useImageOverlay = () => {
  const context = useContext(ImageOverlayContext);

  if (context === undefined) {
    throw new Error(
      "useImageOverlay must be used within an ImageOverlayProvider",
    );
  }

  return context;
};
