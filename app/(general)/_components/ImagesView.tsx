"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

function ImagesView({
  className,
  quality,
  fill,
  src,
  width,
  height,
  alt,
}: {
  className?: string;
  quality?: number;
  fill?: boolean;
  src: string[];
  width?: number | number[];
  height?: number | number[];
  alt: string;
}) {
  return (
    <PhotoProvider>
      {src.map((src, i) => (
        <PhotoView key={i} src={src}>
          <Image
            className={`${className} cursor-pointer`}
            quality={quality}
            src={src}
            alt={alt}
            fill={fill}
            width={Array.isArray(width) ? width[i] : width}
            height={Array.isArray(height) ? height[i] : height}
          />
        </PhotoView>
      ))}
    </PhotoProvider>
  );
}

export default ImagesView;
