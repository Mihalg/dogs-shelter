import Image from "next/image";
import RowDropdownMenu from "@/app/(dashboard)/_components/RowDropdownMenu";
import { Facebook } from "lucide-react";
import { deletePost } from "@/app/_lib/actions";

function PostsRow({
  post,
}: {
  post: {
    id: number;
    link: string | null;
    type: string | null;
    image: string | null;
    content: string | null;
    title: string | null;
    created_at: string;
  };
}) {
  const date = new Date(post.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      className={`grid min-h-[60px] grid-cols-[1fr_1fr_1fr_1fr_0.4fr] items-center gap-x-2 py-2`}
    >
      <div>
        {post.image ? (
          <Image
            height={50}
            width={70}
            src={post.image}
            alt="Główne zdjęcie posta"
          />
        ) : (
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-sm bg-blue-500 text-white">
            <Facebook />
          </div>
        )}
      </div>
      <div>{post.type === "facebook" ? "facebook" : "zwykły"}</div>
      <div>{post.title}</div>
      <div>
        {day < 10 ? `0${day}` : day}-{month < 10 ? `0${month}` : month}-{year}
      </div>
      <div>
        <RowDropdownMenu
          id={post.id}
          paramName="postId"
          deleteFn={deletePost}
        />
      </div>
    </div>
  );
}

export default PostsRow;
