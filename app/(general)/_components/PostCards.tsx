import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import FacebookPost from "./FacebookPost";

async function PostCards({
  range,
  searchParams,
}: {
  range?: number;
  searchParams?: Promise<{
    dataDo?: string;
    dataOd?: string;
  }>;
}) {


  const supabase = browserClient();
  const { data: posts } = range
    ? await supabase
        .from("posts")
        .select("id, created_at, link, type, image, content, title")
        .order("created_at", { ascending: false })
        .limit(range)
    : await supabase
        .from("posts")
        .select("id, created_at, link, type, image, content, title");

  let postsToRender = posts?.sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const params = await searchParams;
  const { dataDo: toDate, dataOd: fromDate } = params ? params : {};

  if (toDate) {
    postsToRender = postsToRender?.filter(
      (post) =>
        new Date(toDate).getTime() - new Date(post.created_at).getTime() >= 0,
    );
  }

  if (fromDate) {
    postsToRender = postsToRender?.filter(
      (post) =>
        new Date(fromDate).getTime() - new Date(post.created_at).getTime() <= 0,
    );
  }

  return postsToRender?.map((post) => {
    const date = new Date(post.created_at);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1);

    return post.type && post.type !== "custom" && post.link ? (
      <FacebookPost link={post.link} />
    ) : (
      <Link
        href={`/aktualnosci/${post.id}`}
        className="relative h-[350px] w-full max-w-[400px] justify-self-center overflow-hidden rounded-md text-white shadow-md transition-all hover:shadow-lg hover:saturate-[120%]"
        key={post.id}
      >
        <Image
          fill
          src={post.image!}
          alt={`Główne zdjęcie posta ${post.title}`}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute left-4 top-4 w-fit rounded-full bg-primary-200 px-4 py-1">
          <p className="text-lg font-semibold capitalize">
            {day} {month}
          </p>
        </div>
        <p className="absolute bottom-0 w-full bg-primary-200 px-4 py-2 text-center text-2xl">
          {post.title}
        </p>
      </Link>
    );
  });
}

export default PostCards;
