"use client";

import { login } from "@/app/_lib/actions";
import { browserClient } from "@/app/_utils/supabase/client";
import { redirect } from "next/navigation";
import { useActionState, useLayoutEffect, useState } from "react";
import { Button } from "../../_components/Button";
import { Input } from "../../_components/Input";
import { Label } from "../_components/Label";
import Spinner from "../../_components/Spinner";

function LoginPage() {
  const [state, action, pending] = useActionState(login, null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    (async () => {
      const supabase = browserClient();
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        redirect("/admin/panel/aktualnosci");
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="flex h-svh items-center justify-center bg-dark-200">
      <form
        action={action}
        className="absolute flex w-fit min-w-[320px] flex-col gap-4 rounded-md bg-light-100 px-6 py-4 text-dark-200"
      >
        {pending || isLoading ? (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-100/40">
            <Spinner />
          </div>
        ) : null}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={pending}
            className="rounded-md px-2 py-1"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="mt-2 text-red-800">{state?.errors.email}</p>
        </div>
        <div>
          <Label htmlFor="password">Hasło</Label>
          <Input
            disabled={pending}
            className="rounded-md px-2 py-1"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="mt-2 text-red-800">{state?.errors.password}</p>
          <p className="mt-2 text-red-800">{state?.errors.authStatus}</p>
        </div>
        <Button disabled={pending} type="submit">
          Zaloguj
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
