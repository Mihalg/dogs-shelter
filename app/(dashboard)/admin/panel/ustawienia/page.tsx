"use client";

import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { changePassword } from "@/app/_lib/actions";
import { Label } from "@radix-ui/react-label";
import { useActionState, useState } from "react";

export default function Settings() {
  const [state, action, pending] = useActionState(changePassword, null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <p className="mb-4 text-3xl">Ustawienia </p>
      <form
        action={action}
        className="flex w-full flex-col gap-4 rounded-md px-4 py-6 shadow-md xl:w-3/4 2xl:w-1/2"
      >
        <div className="flex gap-3">
          <p className="text-2xl">Zmień hasło</p>
          <p className="text-lg text-primary-100">{state?.messages.status}</p>
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
          <div className="grow">
            <Label htmlFor="password">Nowe hasło</Label>
            <Input
              disabled={pending}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="mt-2 text-red-800">
              {state?.messages.password?.at(0)}
            </p>
          </div>
          <div className="grow">
            <Label htmlFor="confirmPassword">Powtórz hasło</Label>
            <Input
              disabled={pending}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <p className="mt-2 text-red-800">
              {state?.messages.confirmPassword}
            </p>
          </div>
          <Button disabled={pending} className="grow md:self-start md:mt-6">
            Zapisz
          </Button>
        </div>
      </form>
    </>
  );
}
