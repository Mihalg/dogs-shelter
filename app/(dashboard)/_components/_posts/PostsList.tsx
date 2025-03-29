import { browserClient } from "@/app/_utils/supabase/client";
import PostsRow from "./PostsRow";

async function PostsList({
  searchParams,
}: {
  searchParams?: Promise<{
    tytul?: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  const supabase = browserClient();

  let { data: posts } = await supabase
    .from("posts")
    .select("id, link, type, image, content, title, created_at");

  const params = await searchParams;
  const {
    tytul: title,
    dataDo: toDate,
    dataOd: fromDate,
  } = params ? params : {};

  if (toDate) {
    posts =
      posts?.filter(
        (post) =>
          new Date(toDate).getTime() - new Date(post.created_at).getTime() >= 0,
      ) || null;
  }

  if (fromDate) {
    posts =
      posts?.filter(
        (post) =>
          new Date(fromDate).getTime() - new Date(post.created_at).getTime() <=
          0,
      ) || null;
  }

  if (title) {
    posts = posts?.filter((post) => post.title?.includes(title)) || null;
  }

  return posts?.length ? (
    posts
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((post) => <PostsRow key={post.id} post={post} />)
  ) : (
    <p className="mt-10 w-full text-center text-2xl">Brak postów</p>
  );
}

export default PostsList;
