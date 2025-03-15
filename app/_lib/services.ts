import { browserClient } from "../_utils/supabase/client";
const supabase = browserClient();

export async function getAnnouncementData(id: string | null) {
  if (!id) return null;

  const { data: announcement, error } = await supabase
    .from("announcements")
    .select("id, name, age, animal, gender, description, main_image, images")
    .eq("id", +id)
    .single();

  if (error) console.log(error);

  return announcement;
}

export async function getImages(id: string | null) {
  if (!id) return;
  const { data, error } = await supabase.storage
    .from("announcements-images")
    .list(`${id}`);

  if (error) {
    console.log(error?.message);
    throw new Error("Wystąpił błąd");
  }

  const { data: mainImg, error: mainImageError } = await supabase.storage
    .from("announcements-images")
    .list(`${id}/main`);

  if (mainImageError) {
    console.log(mainImageError?.message);
    throw new Error("Wystąpił błąd");
  }

  const images = data
    .filter((img) => img.id)
    .map((img) => new File([img as unknown as BlobPart], img.name));

  const mainImage = new File(
    [mainImg[0] as unknown as BlobPart],
    mainImg[0].name,
  );

  return {
    images: images,
    mainImage: mainImage,
  };
}
