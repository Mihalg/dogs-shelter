"use client";

import { Button } from "@/app/(dashboard)/_components/Button";
import ImagesUpload from "@/app/(dashboard)/_components/ImageUpload";
import { Input } from "@/app/(dashboard)/_components/Input";
import { Label } from "@/app/(dashboard)/_components/Label";
import { Textarea } from "@/app/(dashboard)/_components/Textarea";
import { createEditAnnouncement } from "@/app/_lib/actions";
import { getAnnouncementData, getImages } from "@/app/_lib/services";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "./Modal";
import Spinner from "./Spinner";

type Announcement = {
  id: number;
  name: string;
  age: number;
  breed: string;
  sex: string;
  description: string;
  main_image: string;
  images: string[];
};

export default function AccountModalContent() {
  //get search params to fetch default data for editing
  // if id===null user is adding new announcement
  const params = useSearchParams();
  const id = params.get("id");

  const { isLoading, setIsLoading, setIsOpen } = useModalContext();
  const [isPending, setIsPending] = useState(false);

  // variables for handling images
  const formRef = useRef<HTMLFormElement>(null);
  const [mainImage, setMainImage] = useState<File[]>([]);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //adding images to formData
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    if (mainImage) {
      formData.append("main_image", mainImage[0]);
    }

    additionalImages.forEach((file) => {
      formData.append("images", file);
    });

    setIsPending(true);
    await createEditAnnouncement(formData);
    setIsPending(false);
    setIsOpen(false);
  };

  //fetches announcement if editing
  useEffect(() => {
    async function fetchData() {
      const data = await getAnnouncementData(id);
      const images = await getImages(id);

      if (images) {
        setMainImage([images?.mainImage]);
        setAdditionalImages(images.images);
      }
      setAnnouncement(data);
      setIsLoading(false);
    }

    if (id) fetchData();
  }, [id, setIsLoading]);

  return isLoading ? (
    <div className="flex min-h-full items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-8 gap-y-4 px-4 py-4 lg:grid-cols-4"
    >
      <input
        className="hidden"
        type="text"
        name="id"
        id="id"
        defaultValue={announcement?.id}
      />
      <div>
        <Label htmlFor="name">Imię</Label>
        <Input
          defaultValue={announcement?.name}
          required
          id="name"
          name="name"
          type="text"
          maxLength={25}
        />
      </div>
      <div className="flex flex-col justify-end gap-1">
        <Label htmlFor="gender">Płeć</Label>
        <select
          defaultValue={announcement?.sex}
          id="sex"
          name="sex"
          className="h-[36px] rounded-md border-[1px] border-neutral-200 bg-white px-3"
        >
          <option value="samica">Samica</option>
          <option value="samiec">Samiec</option>
        </select>
      </div>
      <div>
        <Label htmlFor="age">Wiek</Label>
        <Input
          defaultValue={announcement?.age}
          required
          id="age"
          type="number"
          name="age"
        />
      </div>
      <div>
        <Label htmlFor="breed">Typ rasy</Label>
        <Input
          defaultValue={announcement?.breed}
          required
          id="breed"
          type="text"
          name="breed"
        />
      </div>
      <div className="lg:col-start-1 lg:col-end-5">
        <Label htmlFor="description">Opis</Label>
        <Textarea
          defaultValue={announcement?.description}
          name="description"
          id="description"
        ></Textarea>
      </div>
      <div className="grid grid-cols-2 lg:col-start-1 lg:col-end-5">
        <div>
          <Label className="mb-4 block w-full text-center">
            Główne zdjęcie
          </Label>
          <ImagesUpload
            id="main_image"
            defaultUrls={
              announcement?.main_image ? [announcement.main_image] : undefined
            }
            setImages={setMainImage}
            maxFiles={1}
            images={mainImage}
          />
        </div>
        <div>
          <Label className="mb-4 block w-full text-center">
            Dodatkowe zdjęcia
          </Label>
          <ImagesUpload
            id="images"
            multiple={true}
            defaultUrls={announcement?.images}
            setImages={setAdditionalImages}
            images={additionalImages}
          />
        </div>
      </div>
      <Button
        disabled={isPending}
        className="ml-auto mt-auto w-40 lg:col-start-1 lg:col-end-5"
      >
        Zapisz
      </Button>
    </form>
  );
}
