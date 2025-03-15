import Image from "next/image";
import RowDropdownMenu from "./RowDropdownMenu";
import { Facebook } from "lucide-react";

function PostsRow({
  post,
  columnsTemplate,
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

  columnsTemplate: string;
}) {
  const date = new Date(post.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      className={`grid h-[60px] gap-x-2 grid-cols-[${columnsTemplate}] items-center py-2`}
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
      <div>{post.type === "photo" ? "facebook" : "zwykły"}</div>
      <div>{post.title}</div>
      <div>
        {day < 10 ? `0${day}` : day}-{month < 10 ? `0${month}` : month}-{year}
      </div>
      <div>
        <RowDropdownMenu id={post.id} />
      </div>
    </div>
  );
}

export default PostsRow;
