"use client";

import { Button } from "./(dashboard)/_components/Button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-dark-200">
      <p className="text-3xl text-white">Coś poszło nie tak...</p>
      <Button size="lg" onClick={() => reset()}>
        Spróbuj jeszcze raz
      </Button>
    </div>
  );
}
