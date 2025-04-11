import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import calendar from "@/public/calendar.png";
import female from "@/public/female.png";
import paw from "@/public/greenPaw.png";
import bigPaw from "@/public/greenPawBig.png";
import male from "@/public/male.png";
import Image from "next/image";
import AnnouncementImagesView from "../../_components/AnnouncementImagesView";

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ announcementId: string }>;
}) {
  const { announcementId: id } = await params;

  const supabase = browserClient();
  const { data: announcement } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", +id)
    .single();

  if (announcement) {
    const date = new Date(announcement.created_at);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();

    let age: string;

    if (announcement.age === 1) {
      age = "rok";
    } else if (announcement.age < 5) {
      age = "lata";
    } else {
      age = "lat";
    }

    return (
      <div className="mx-auto max-w-[1200px] px-4 py-2 text-dark-400 lg:py-10">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[3fr_1fr]">
          <AnnouncementImagesView
            mainImage={announcement.main_image}
            images={announcement.images}
            name={announcement.name}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-baseline gap-4 md:gap-10">
          <h2 className="flex items-center gap-4 text-4xl font-semibold text-primary-100 lg:text-5xl">
            <Image src={bigPaw} height={32} width={32} alt="" />{" "}
            {announcement.name}
          </h2>
          <p className="lg:text-lg">
            {day} {month} {year}
          </p>
          <div className="mt-1 flex w-fit items-center justify-center gap-4 rounded-full bg-light-100 px-4 py-1 lg:text-lg">
            <div className="flex items-center gap-2">
              <Image src={paw} height={18} width={18} alt="rasa" />
              <p className="capitalize">{announcement.breed}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={announcement.sex === "samica" ? female : male}
                height={18}
                width={18}
                alt="płeć"
              />
              <p className="capitalize">{announcement.sex}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src={calendar} height={18} width={18} alt="wiek" />
              <p>
                {announcement.age} {age}
              </p>
            </div>
          </div>
        </div>
        <div className="py-4">
          <p>{announcement.description}</p>
        </div>
      </div>
    );
  }
}
