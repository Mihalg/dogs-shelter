import { browserClient } from "@/app/_utils/supabase/client";
import AnnouncementsRow from "./AnnouncementsRow";

async function AnnouncementsList() {
  const supabase = browserClient();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, main_image, name, breed, sex, age, created_at");

  return announcements?.length ? (
    announcements?.map((announcement) => (
      <AnnouncementsRow
        key={announcement.id}
        announcement={announcement}
      />
    ))
  ) : (
    <p className="mt-10 w-full text-center text-2xl">Brak ogłoszeń</p>
  );
}

export default AnnouncementsList;
