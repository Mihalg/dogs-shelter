import Spinner from "@/app/(dashboard)/_components/Spinner";
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
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-12 lg:min-h-[600px]">
      <div className="flex flex-col items-center justify-between gap-6">
        <h2 className="flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="łapa" height={55} width={55} />
          Aktualności
        </h2>
        <PostsFilters />
      </div>
      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-center">
          <PostCards searchParams={searchParams} />
        </div>
      </Suspense>
    </div>
  );
}

export default News;
