"use client";

import { Button } from "@/app/(dashboard)/_components/Button";
import ImagesUpload from "@/app/(dashboard)/_components/ImageUpload";
import { Input } from "@/app/(dashboard)/_components/Input";
import { Label } from "@/app/(dashboard)/_components/Label";
import { Textarea } from "@/app/(dashboard)/_components/Textarea";
import { createAnnouncement } from "@/app/_lib/actions";
import { getAnnouncementData } from "@/app/_lib/services";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useModalContext } from "./Modal";
import Spinner from "./Spinner";

export default function AccountModalContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const { isLoading, setIsLoading } = useModalContext();

  const [announcement, setAnnouncement] = useState<{
    name: string;
    age: number;
    animal: string;
    gender: string;
    description: string;
    main_image: string;
    images: string[];
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAnnouncementData(id);
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
      action={createAnnouncement}
      className="grid grid-cols-1 gap-x-8 gap-y-4 px-4 py-4 lg:grid-cols-2"
    >
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
          defaultValue={announcement?.gender}
          id="gender"
          name="gender"
          className="h-[36px] rounded-md border-[1px] border-neutral-200 bg-white px-3"
        >
          <option value="samica">Samica</option>
          <option value="samiec">Samiec</option>
        </select>
      </div>

      <div>
        <Label htmlFor="animal">Zwierzę</Label>
        <Input
          defaultValue={announcement?.animal}
          required
          id="animal"
          name="animal"
          type="text"
          maxLength={25}
        />
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
      <div className="lg:col-start-1 lg:col-end-3">
        <Label htmlFor="description">Opis</Label>
        <Textarea
          defaultValue={announcement?.description}
          name="description"
          id="description"
        ></Textarea>
      </div>
      <div>
        <Label className="mb-4 block w-full text-center">Główne zdjęcie</Label>
        <ImagesUpload id="main_image" />
      </div>
      <div>
        <Label className="mb-4 block w-full text-center">
          Dodatkowe zdjęcia
        </Label>
        <ImagesUpload id="images" multiple={true} />
      </div>
      <Button className="ml-auto mt-auto w-40 lg:col-start-1 lg:col-end-3">
        Zapisz
      </Button>
    </form>
  );
}
