import paw from "@/public/greenPawBig.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import PostCards from "./PostCards";
import LatestPostsSkeleton from "./LatestPostsSkeleton";

function LatestPosts() {
  return (
    <section className="px-6">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col py-10">
        <h2 className="mb-10 flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="łapa" height={55} width={55} />
          Co nowego?
        </h2>
        <div className="mx-auto w-full grid grid-cols-1 gap-10 lg:w-full lg:grid-cols-3 lg:gap-6">
          <Suspense fallback={<LatestPostsSkeleton />}>
            <PostCards range={3} />
          </Suspense>
        </div>
        <Link
          href="/aktualnosci"
          className="mx-auto mt-8 block w-fit rounded-full bg-primary-100 px-6 py-2 font-semibold text-white hover:bg-primary-200"
        >
          Zobacz więcej
        </Link>
      </div>
    </section>
  );
}

export default LatestPosts;
