import { Suspense } from "react";
import EventsCards from "../_components/EventsCards";
import Spinner from "@/app/_components/Spinner";
import Image from "next/image";
import paw from "@/public/greenPawBig.png";
import PostsFilters from "../_components/PostsFilters";

function EventsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 lg:min-h-[550px]">
        <div className="flex flex-col items-center justify-between gap-6">
          <h2 className="flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
            <Image src={paw} alt="" height={55} width={55} />
            Wydarzenia
          </h2>
          <Suspense>
            <PostsFilters />
          </Suspense>
        </div>
        <Suspense fallback={<Spinner />}>
          <div className="flex flex-col items-center gap-6">
            <EventsCards searchParams={searchParams} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default EventsPage;
