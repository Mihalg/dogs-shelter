import { browserClient } from "@/app/_utils/supabase/client";
import AnnouncementsRow from "./AnnouncementsRow";

async function AnnouncementsList({
  searchParams,
}: {
  searchParams?: Promise<{
    imie?: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  const supabase = browserClient();

  let { data: announcements } = await supabase
    .from("announcements")
    .select("id, main_image, name, breed, sex, age, created_at");

  const params = await searchParams;
  const { imie: name, dataDo: toDate, dataOd: fromDate } = params ? params : {};

  if (toDate) {
    announcements =
      announcements?.filter(
        (announcement) =>
          new Date(toDate).getTime() -
            new Date(announcement.created_at).getTime() >=
          0,
      ) || null;
  }

  if (fromDate) {
    announcements =
      announcements?.filter(
        (announcement) =>
          new Date(fromDate).getTime() -
            new Date(announcement.created_at).getTime() <=
          0,
      ) || null;
  }

  if (name) {
    announcements =
      announcements?.filter((announcement) =>
        announcement.name?.includes(name),
      ) || null;
  }

  return announcements?.length ? (
    announcements
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((announcement) => (
        <AnnouncementsRow key={announcement.id} announcement={announcement} />
      ))
  ) : (
    <p className="mt-10 w-full text-center text-2xl">Brak ogłoszeń</p>
  );
}

export default AnnouncementsList;
