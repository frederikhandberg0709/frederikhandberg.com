import Image from "next/image";
import { useContext } from "react";
import { ImageOverlayContext } from "../ImageOverlayProvider";

export const MDXImage = ({
  alt,
  src,
  title,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { setOverlayImage } = useContext(ImageOverlayContext);

  if (!src) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { width, height, ...restProps } = props;

  return (
    <figure className="my-8">
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={800}
          className="h-auto w-max cursor-pointer rounded-2xl transition hover:opacity-90"
          style={{
            maxWidth: "100%",
            objectFit: "contain",
          }}
          onClick={() => {
            if (setOverlayImage) {
              setOverlayImage(src);
              document.body.style.overflow = "hidden"; // Disable scrolling
            }
          }}
          {...restProps}
        />
      </div>
      {title && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {title}
        </figcaption>
      )}
    </figure>
  );
};
