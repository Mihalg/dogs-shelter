import paw from "@/public/whitePaw.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EventsCards from "./EventsCards";

async function EventsSection() {
  return (
    <section className="bg-primary-100 px-6">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col py-10">
        <h2 className="mb-10 flex items-center gap-6 text-4xl font-bold text-light-100 lg:text-5xl">
          <Image src={paw} alt="łapa" height={55} width={55} />
          Wydarzenia
        </h2>
        <div className="mx-auto w-full">
          <Suspense
            fallback={
              <>
                <div className="mx-auto flex h-[600px] w-full max-w-[1000px] flex-col overflow-hidden rounded-md bg-light-200 shadow-md lg:h-[400px] lg:flex-row">
                  <div className="h-full w-full animate-pulse bg-dark-100 lg:w-[600px]"></div>
                  <div className="space-y-2 px-4 py-4 lg:w-[400px]">
                    <div className="animate-pulse rounded-md bg-dark-100 px-24 py-6"></div>
                    <div className="animate-pulse rounded-md bg-dark-100 px-8 py-4"></div>
                    <div className="w-full animate-pulse rounded-md bg-dark-100 py-20 lg:py-32"></div>
                  </div>
                </div>
              </>
            }
          >
            <EventsCards range={1} />
          </Suspense>
        </div>
        <Link
          href="/wydarzenia"
          className="mx-auto mt-8 block w-fit rounded-full bg-light-100 px-6 py-2 font-semibold text-primary-100 transition-colors hover:bg-white hover:text-primary-50"
        >
          Zobacz więcej
        </Link>
      </div>
    </section>
  );
}

export default EventsSection;
