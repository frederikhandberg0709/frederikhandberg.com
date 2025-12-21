import { cn } from "@/utils/cn";
import Image from "next/image";
import { ImageOverlayContext } from "./ImageOverlayProvider";
import { useContext } from "react";

export default function RoundedImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { setOverlayImage } = useContext(ImageOverlayContext);

  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      onClick={() => setOverlayImage(src || "")}
      className={cn(
        "h-auto w-full cursor-pointer rounded-3xl opacity-100 transition hover:opacity-90 active:scale-[0.98]",
        className,
      )}
    />
  );
}
