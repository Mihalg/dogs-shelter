import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function EventsCards({
  range,
  searchParams,
}: {
  range?: number;
  searchParams?: Promise<{
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  const supabase = browserClient();
  const { data: events } = range
    ? await supabase
        .from("events")
        .select("id, image, title, content, created_at")
        .order("created_at", { ascending: false })
        .limit(range)
    : await supabase
        .from("events")
        .select("id, image, title, content, created_at");

  let eventsToRender = events?.sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const params = await searchParams;
  const { dataDo: toDate, dataOd: fromDate } = params ? params : {};

  if (toDate) {
    eventsToRender = eventsToRender?.filter(
      (event) =>
        new Date(toDate).getTime() - new Date(event.created_at).getTime() >= 0,
    );
  }

  if (fromDate) {
    eventsToRender = eventsToRender?.filter(
      (event) =>
        new Date(fromDate).getTime() - new Date(event.created_at).getTime() <=
        0,
    );
  }

  return events?.length ? (
    <div>
      {eventsToRender?.map((event) => {
        const date = new Date(event.created_at);
        const day = date.getDate();
        const month = getMonthName(date.getMonth() + 1);
        const year = date.getFullYear();

        return (
          <Link
            href={`/wydarzenia/${event.id}`}
            className="flex w-fit max-w-[600px] flex-col justify-self-center overflow-hidden rounded-md bg-light-100 text-dark-200 shadow-md transition-all hover:shadow-lg hover:saturate-[120%] lg:max-h-[400px] lg:max-w-[1000px] lg:flex-row"
            key={event.id}
          >
            <Image
              width={600}
              height={400}
              src={event.image}
              alt={`Główne zdjęcie wydarzenia ${event.title}`}
            />
            <div className="space-y-2 px-6 py-4 lg:w-[400px]">
              <p className="text-4xl font-semibold">{event.title}</p>
              <p className="text-lg">
                {day} {month} {year}
              </p>
              <p className="max-h-[250px] text-lg">
                {event.content.length < 400
                  ? event.content
                  : `${event.content.slice(0, 350)}...`}
              </p>
              <p
                role="button"
                className="ml-auto flex w-fit items-center gap-2 text-primary-100 hover:underline"
              >
                Zobacz więcej <ArrowRight />
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  ) : (
    <p className="text-center text-2xl font-semibold text-dark-200">
      Brak wydarzeń
    </p>
  );
}

export default EventsCards;
