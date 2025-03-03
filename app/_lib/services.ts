import { browserClient } from "../_utils/supabase/client";

export async function getAnnouncementData(id: string | null) {
  if (!id) return null;

  const supabase = browserClient();

  const { data: announcement, error } = await supabase
    .from("announcements")
    .select("name, age, animal, gender, description, main_image, images")
    .eq("id", +id)
    .single();

  if (error) console.log(error);

  return announcement;
}
