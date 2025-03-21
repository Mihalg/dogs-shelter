import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import FacebookPost from "./FacebookPost";

async function PostCards({ range }: { range?: number }) {
  const supabase = browserClient();
  const { data: posts } = range
    ? await supabase
        .from("posts")
        .select("id, created_at, link, type, image, content, title")
        .range(0, range)
    : await supabase
        .from("posts")
        .select("id, created_at, link, type, image, content, title");

  return posts?.map((post) => {
    const date = new Date(post.created_at);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1);

    return post.type && post.type !== "custom" && post.link ? (
      <FacebookPost link={post.link} type={post.type} />
    ) : (
      <Link
        href="asd"
        className="relative h-[350px] w-full justify-self-center overflow-hidden rounded-md text-white shadow-md transition-all hover:shadow-lg hover:saturate-[120%]"
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
