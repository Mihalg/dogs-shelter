"use client";

import Image from "next/image";
import { useState, useRef, SetStateAction, Dispatch } from "react";

type SingleImageUploadProps = {
  multiple?: false;
  id: string;
  defaultUrls?: string[] | undefined;
  setImages: Dispatch<SetStateAction<File[]>>;
  maxFiles?: 1;
  images: File[];
};

type MultipleImagesUploadProps = {
  multiple: true;
  id: string;
  defaultUrls?: string[] | undefined;
  setImages: Dispatch<SetStateAction<File[]>>;
  maxFiles?: number;
  images: File[];
};

type ImageUploadProps = SingleImageUploadProps | MultipleImagesUploadProps;

const ImageUpload = ({
  multiple = false,
  id,
  defaultUrls,
  maxFiles = 5,
  setImages,
  images,
}: ImageUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    defaultUrls ? defaultUrls : [],
  );
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    if (fileArray.length > maxFiles) return;

    setImages((prev) => [...prev, ...fileArray]);

    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => (multiple ? [...prev, ...urls] : urls));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleFiles(event.target.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={dropzoneRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex h-32 w-64 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 text-gray-500 transition hover:border-primary-100"
      >
        <label htmlFor={id} className="cursor-pointer text-center">
          Przeciągnij i upuść zdjęci{multiple ? "a" : "e"} tutaj lub{" "}
          <span className="text-blue-500 underline">wybierz pliki</span>
        </label>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleImageChange}
        className="hidden"
        id={id}
      />

      <div className="flex flex-wrap gap-2">
        {previewUrls.map((url, index) => (
          <div key={index} className="group relative">
            <Image
              width={80}
              height={60}
              src={url}
              alt={`Podgląd ${index}`}
              className="h-24 w-24 rounded-md border object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-80 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
