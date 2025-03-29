"use client";

import { Button } from "@/app/_components/Button";
import ImagesUpload from "@/app/(dashboard)/_components/ImageUpload";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/(dashboard)/_components/Label";
import { createEditExpense } from "@/app/_lib/actions";
import { getExpenseData, getExpensesImages } from "@/app/_lib/services";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "../Modal";
import Spinner from "../../../_components/Spinner";

type Expense = {
  id: number;
  title: string;
  images: string[];
};

export default function ExpensesModalContent() {
  //get search params to fetch default data for editing
  // if id===null user is adding new announcement
  const params = useSearchParams();
  const id = params.get("expenseId");

  const { isLoading, setIsLoading, setIsOpen } = useModalContext();
  const [isPending, setIsPending] = useState(false);

  // variables for handling images
  const formRef = useRef<HTMLFormElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const [expense, setExpense] = useState<Expense | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //adding images to formData
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    images.forEach((file) => {
      formData.append("images", file);
    });

    setIsPending(true);
    await createEditExpense(formData);
    setIsPending(false);
    setIsOpen(false);
  };

  //fetches announcement if editing
  useEffect(() => {
    async function fetchData() {
      const data = await getExpenseData(id);
      const images = await getExpensesImages(id);
      if (images) {
        setImages(images);
      }
      setExpense(data);
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
        className="grid grid-cols-1 gap-x-8 gap-y-4 px-4 py-4"
      >
        <input
          className="hidden"
          type="text"
          name="id"
          id="id"
          defaultValue={expense?.id}
        />
        <div>
          <Label htmlFor="title">Tytuł</Label>
          <Input
            defaultValue={expense?.title}
            required
            id="title"
            name="title"
            type="text"
          />
        </div>

        <div>
          <Label className="mb-4 block w-full text-center">Zdjęcia</Label>
          <ImagesUpload
            id="images"
            multiple={true}
            defaultUrls={expense?.images}
            setImages={setImages}
            images={images}
          />
        </div>
        <Button disabled={isPending} className="ml-auto mt-auto w-40">
          Zapisz
        </Button>
      </form>
    </>
  );
}
