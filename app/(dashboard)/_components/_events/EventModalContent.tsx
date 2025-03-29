"use client";

import { Button } from "@/app/_components/Button";
import ImagesUpload from "@/app/(dashboard)/_components/ImageUpload";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/(dashboard)/_components/Label";
import { Textarea } from "@/app/(dashboard)/_components/Textarea";
import { createEditAnnouncement } from "@/app/_lib/actions";
import { getEventData, getImage } from "@/app/_lib/services";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "../Modal";
import Spinner from "../../../_components/Spinner";

type Event = {
  id: number;
  image: string;
  title: string;
  content: string;
};

export default function EventModalContent() {
  //get search params to fetch default data for editing
  // if id===null user is adding new event
  const params = useSearchParams();
  const id = params.get("eventId");

  const { isLoading, setIsLoading, setIsOpen } = useModalContext();
  const [isPending, setIsPending] = useState(false);

  // variables for handling images
  const formRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<File[]>([]);

  const [event, setEvent] = useState<Event | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //adding image to formData
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    if (image) {
      formData.append("image", image[0]);
    }

    setIsPending(true);
    await createEditAnnouncement(formData);
    setIsPending(false);
    setIsOpen(false);
  };

  //fetches event if editing
  useEffect(() => {
    async function fetchData() {
      const data = await getEventData(id);
      const image = await getImage("events-images", id);

      if (image) {
        setImage([image]);
      }
      setEvent(data);
      setIsLoading(false);
    }

    if (id) fetchData();
  }, [id, setIsLoading]);

  return isLoading ? (
    <div className="flex min-h-full items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <>
      {isPending ? (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-100/40">
          <Spinner />
        </div>
      ) : null}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-y-4 px-4 py-4"
      >
        <input
          className="hidden"
          type="text"
          name="id"
          id="id"
          defaultValue={event?.id}
        />
        <div>
          <Label htmlFor="name">Tytuł</Label>
          <Input
            defaultValue={event?.title}
            required
            id="name"
            name="name"
            type="text"
            maxLength={25}
          />
        </div>

        <div>
          <Label htmlFor="description">Opis</Label>
          <Textarea
            defaultValue={event?.content}
            name="description"
            id="description"
          ></Textarea>
        </div>

        <div>
          <Label className="mb-4 block w-full text-center">
            Główne zdjęcie
          </Label>
          <ImagesUpload
            id="image"
            defaultUrls={event?.image ? [event.image] : undefined}
            setImages={setImage}
            maxFiles={1}
            images={image}
          />
        </div>

        <Button disabled={isPending} className="ml-auto mt-auto w-40">
          Zapisz
        </Button>
      </form>
    </>
  );
}
