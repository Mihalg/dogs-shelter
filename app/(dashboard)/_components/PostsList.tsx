import { browserClient } from "@/app/_utils/supabase/client";
import PostsRow from "./PostsRow";

async function PostsList() {
  const supabase = browserClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, link, type, image, content, title, created_at");

  return posts?.length ? (
    posts?.map((post) => (
      <PostsRow
        key={post.id}
        post={post}
        columnsTemplate="[1fr_1fr_1fr_1fr_0.4fr]"
      />
    ))
  ) : (
    <p className="mt-10 w-full text-center text-2xl">Brak postów</p>
  );
}

export default PostsList;