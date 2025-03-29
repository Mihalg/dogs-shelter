"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

function AnnouncementImagesView({
  mainImage,
  images,
  name,
}: {
  mainImage: string;
  images: string[];
  name: string;
}) {
  return (
    <PhotoProvider>
      <div className="relative h-[500px] w-full">
        <PhotoView src={mainImage}>
          <Image
            src={mainImage}
            fill
            quality={100}
            className="cursor-pointer object-cover"
            alt={`Główne zdjęcia ogłoszenia ${name}`}
          />
        </PhotoView>
      </div>
      <div className="grid grid-cols-4 content-start lg:grid-cols-1">
        {images?.map((image, i) => {
          return (
            <PhotoView key={i} src={image}>
              <div className="relative h-[125px] w-full">
                <Image
                  quality={100}
                  src={image}
                  fill
                  className="object-cover object-center"
                  alt={`Dodatkowe zdjęcie ogłoszenia ${name}`}
                />
              </div>
            </PhotoView>
          );
        })}
      </div>
    </PhotoProvider>
  );
}

export default AnnouncementImagesView;
