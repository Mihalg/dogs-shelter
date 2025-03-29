"use client";

import { Button } from "./_components/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-dark-200">
      <p className="text-3xl text-white">Coś poszło nie tak...</p>
      <p className="text-xl text-white">{error.message}</p>
      <Button size="lg" onClick={() => reset()}>
        Spróbuj jeszcze raz
      </Button>
    </div>
  );
}
