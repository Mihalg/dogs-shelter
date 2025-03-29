import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import bigPaw from "@/public/greenPawBig.png";
import Image from "next/image";
import ImagesView from "../../_components/ImagesView";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId: id } = await params;

  const supabase = browserClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", +id)
    .single();

  if (event) {
    const date = new Date(event.created_at);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();

    return (
      <div className="mx-auto max-w-[1200px] px-4 py-2 text-dark-300 lg:py-10">
        <div className="w-full">
          <div className="relative h-[600px] w-full">
            <ImagesView
              src={[event.image!]}
              fill={true}
              quality={100}
              className="object-cover"
              alt={`Główne zdjęcia wydarzenia ${event?.title}`}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-baseline gap-4 md:gap-10">
          <h2 className="flex items-center gap-4 text-4xl font-semibold capitalize text-primary-100 lg:text-5xl">
            <Image src={bigPaw} height={38} width={38} alt="" /> {event.title}
          </h2>
          <p className="lg:text-lg">
            {day} {month} {year}
          </p>
        </div>
        <div className="mt-6">
          <p>{event.content}</p>
        </div>
      </div>
    );
  }
}
