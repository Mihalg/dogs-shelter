import { browserClient } from "@/app/_utils/supabase/client";
import EventRow from "./EventRow";

async function EventsList({
  searchParams,
}: {
  searchParams?: Promise<{
    tytul?: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  const supabase = browserClient();

  let { data: events } = await supabase
    .from("events")
    .select("id, image, title, created_at");

  const params = await searchParams;
  const {
    tytul: title,
    dataDo: toDate,
    dataOd: fromDate,
  } = params ? params : {};

  if (toDate) {
    events =
      events?.filter(
        (event) =>
          new Date(toDate).getTime() - new Date(event.created_at).getTime() >=
          0,
      ) || null;
  }

  if (fromDate) {
    events =
      events?.filter(
        (event) =>
          new Date(fromDate).getTime() - new Date(event.created_at).getTime() <=
          0,
      ) || null;
  }

  if (title) {
    events = events?.filter((event) => event.title?.includes(title)) || null;
  }

  return events?.length ? (
    events
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((event) => <EventRow key={event.id} event={event} />)
  ) : (
    <p className="mt-10 w-full text-center text-2xl">Brak Wydarzeń</p>
  );
}

export default EventsList;
