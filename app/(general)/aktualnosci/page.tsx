import Spinner from "@/app/_components/Spinner";
import paw from "@/public/greenPawBig.png";
import Image from "next/image";
import { Suspense } from "react";
import PostCards from "../_components/PostCards";
import PostsFilters from "../_components/PostsFilters";

function News({
  searchParams,
}: {
  searchParams?: Promise<{
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-10 lg:min-h-[550px]">
      <div className="flex flex-col items-center justify-between gap-6">
        <h2 className="flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="" height={55} width={55} />
          Aktualności
        </h2>
        <Suspense>
          <PostsFilters />
        </Suspense>
      </div>
      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PostCards searchParams={searchParams} />
        </div>
      </Suspense>
    </div>
  );
}

export default News;
