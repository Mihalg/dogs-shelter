"use client";

import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/(dashboard)/_components/Label";
import { createEditFundraiser } from "@/app/_lib/actions";
import { getFundraiserData } from "@/app/_lib/services";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useModalContext } from "../Modal";
import Spinner from "../../../_components/Spinner";

type Fundraiser = {
  id: number;
  link: string;
  created_at: string;
};

export default function FundraiserModalContent() {
  //get search params to fetch default data for editing
  // if id===null user is adding new event
  const params = useSearchParams();
  const id = params.get("fundraiserId");

  const { isLoading, setIsLoading } = useModalContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, action, pending] = useActionState(createEditFundraiser, null);

  const [fundraiser, setFundraiser] = useState<Fundraiser | null>(null);

  //fetches fundraiser if editing
  useEffect(() => {
    async function fetchData() {
      const data = await getFundraiserData(id);

      setFundraiser(data);
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
      {pending ? (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-100/40">
          <Spinner />
        </div>
      ) : null}
      <form action={action} className="grid grid-cols-1 gap-y-4 px-4 py-4">
        <input
          className="hidden"
          type="text"
          name="id"
          id="id"
          defaultValue={fundraiser?.id}
        />
        <div>
          <Label htmlFor="link">Link</Label>
          <Input
            defaultValue={fundraiser?.link}
            required
            id="link"
            name="link"
            type="text"
          />
        </div>

        <Button disabled={pending} className="ml-auto mt-auto w-40">
          Zapisz
        </Button>
      </form>
    </>
  );
}
