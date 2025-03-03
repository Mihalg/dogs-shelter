"use client";

import { login } from "@/app/_lib/actions";
import { useActionState } from "react";

function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex h-svh items-center justify-center bg-dark-200">
      <form
        action={action}
        className="absolute flex w-fit min-w-[320px] flex-col rounded-md bg-light-100 px-6 py-4 text-dark-200"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md px-2 py-1"
            id="email"
            name="email"
            type="email"
          />
          <p className="text-red-800">{state?.errors.email}</p>
        </div>
        <div className="mb-4 mt-2 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-md px-2 py-1"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <button
          disabled={pending}
          type="submit"
          className="rounded-md bg-primary-100"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
