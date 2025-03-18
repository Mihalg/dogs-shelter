import { Suspense } from "react";
import RecentlyFoundCards from "./RecentlyFoundCards";
import Link from "next/link";

export default function RecentlyFound() {
  return (
    <section className="flex w-full flex-col bg-light-100 px-6 py-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="mb-10 text-3xl font-bold text-primary-100 lg:text-5xl">
          Ostatnio znalezieni
        </h2>
        <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:w-full lg:grid-cols-3">
          <Suspense fallback={<div>Ładowanie</div>}>
            <RecentlyFoundCards />
          </Suspense>
        </div>
        <Link
          href="/aktualnosci"
          className="mx-auto mt-8 block w-fit rounded-full bg-primary-100 px-6 py-2 text-light-100"
        >
          Zobacz więcej
        </Link>
      </div>
    </section>
  );
}
