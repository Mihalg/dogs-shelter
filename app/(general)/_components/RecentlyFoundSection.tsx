import paw from "@/public/greenPawBig.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import AnnouncementsCards from "./AnnouncementsCards";

export default function RecentlyFound() {
  return (
    <section className="flex w-full flex-col bg-light-100 px-6 py-10">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="mb-10 flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="łapa" height={55} width={55} /> Ostatnio
          znalezieni
        </h2>
        <div>
          <Suspense
            fallback={
              <div className="mx-auto grid w-full grid-cols-1 gap-10 lg:w-full lg:grid-cols-3 lg:gap-6">
                <div className="w-fit justify-self-center overflow-hidden rounded-md shadow-md">
                  <div className="h-[180px] w-[280px] animate-pulse bg-dark-100" />
                  <div className="flex h-[116px] flex-col gap-1 px-4 py-2">
                    <div className="h-[24px] w-[80px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[60px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[60px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[50px] animate-pulse rounded-md bg-dark-100"></div>
                  </div>
                </div>
                <div className="w-fit justify-self-center overflow-hidden rounded-md shadow-md">
                  <div className="h-[180px] w-[280px] animate-pulse bg-dark-100" />
                  <div className="flex h-[116px] flex-col gap-1 px-4 py-2">
                    <div className="h-[24px] w-[80px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[60px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[60px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[50px] animate-pulse rounded-md bg-dark-100"></div>
                  </div>
                </div>
                <div className="w-fit justify-self-center overflow-hidden rounded-md shadow-md">
                  <div className="h-[180px] w-[280px] animate-pulse bg-dark-100" />
                  <div className="flex h-[116px] flex-col gap-1 px-4 py-2">
                    <div className="h-[24px] w-[80px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[60px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[60px] animate-pulse rounded-md bg-dark-100"></div>
                    <div className="h-[20px] w-[50px] animate-pulse rounded-md bg-dark-100"></div>
                  </div>
                </div>
              </div>
            }
          >
            <AnnouncementsCards range={3} className="mx-auto grid w-full grid-cols-1 gap-10 lg:w-full lg:grid-cols-3 lg:gap-6" />
          </Suspense>
        </div>
        <Link
          href="/adopcja"
          className="mx-auto mt-8 block w-fit rounded-full bg-primary-100 px-6 py-2 font-semibold text-white hover:bg-primary-200"
        >
          Zobacz więcej
        </Link>
      </div>
    </section>
  );
}
