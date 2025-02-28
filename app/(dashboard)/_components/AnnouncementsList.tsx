import { browserClient } from "@/app/_utils/supabase/client";
import AnnouncementsRow from "./AnnouncementsRow";

async function AnnouncementsList() {
  const supabase = browserClient();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, main_image, name, animal, gender, age, created_at");

  return announcements ? (
    announcements?.map((announcement) => (
      <AnnouncementsRow
        key={announcement.id}
        announcement={announcement}
        columnsTemplate="1fr_1fr_1fr_1fr_1fr_1fr_0.4fr"
      />
    ))
  ) : (
    <p className="mt-8 w-full text-center text-xl">Brak ogłoszeń</p>
  );
}

export default AnnouncementsList;
