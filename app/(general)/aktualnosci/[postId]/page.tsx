import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import bigPaw from "@/public/greenPawBig.png";
import Image from "next/image";
import ImagesView from "../../_components/ImagesView";

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId: id } = await params;

  const supabase = browserClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", +id)
    .single();

  if (post) {
    const date = new Date(post.created_at);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();

    return (
      <div className="mx-auto max-w-[1200px] px-4 py-2 text-dark-400 lg:py-10">
        <div className="w-full">
          <div className="relative h-[600px] w-full">
            <ImagesView
              src={[post.image!]}
              fill={true}
              quality={100}
              className="object-cover"
              alt={`Główne zdjęcia wydarzenia ${post?.title}`}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-baseline gap-4 md:gap-10">
          <h2 className="flex items-center gap-4 text-4xl font-semibold capitalize text-primary-100 lg:text-5xl">
            <Image src={bigPaw} height={38} width={38} alt="" /> {post.title}
          </h2>
          <p className="lg:text-lg">
            {day} {month} {year}
          </p>
        </div>
        <div className="mt-6">
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
}
