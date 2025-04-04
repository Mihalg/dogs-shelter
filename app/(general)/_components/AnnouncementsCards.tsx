import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import calendar from "@/public/calendar.png";
import female from "@/public/female.png";
import paw from "@/public/greenPaw.png";
import male from "@/public/male.png";
import Image from "next/image";
import Link from "next/link";

export default async function AnnouncementsCards({
  range,
  className,
  searchParams,
}: {
  range?: number;
  className?: string;
  searchParams?: Promise<{
    imie?: string;
    plec: string;
    wiek: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  const supabase = browserClient();
  const { data: announcements } = range
    ? await supabase
        .from("announcements")
        .select("id, main_image, name, sex, age, breed, created_at")
        .order("created_at", { ascending: false })
        .limit(range)
    : await supabase
        .from("announcements")
        .select("id, main_image, name, sex, age, breed, created_at");

  let announcementsToRender = announcements?.sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  if (searchParams) {
    const params = await searchParams;
    const {
      imie: name,
      plec: sex,
      wiek: age,
      dataDo: toDate,
      dataOd: fromDate,
    } = params ? params : {};

    if (name) {
      announcementsToRender = announcementsToRender?.filter((announcement) => {
        if (announcement.name.toLowerCase().includes(name)) return announcement;
      });
    }

    if (sex !== "0") {
      switch (sex) {
        case "samica":
          announcementsToRender = announcementsToRender?.filter(
            (announcement) => announcement.sex === "samica",
          );
          break;
        case "samiec":
          announcementsToRender = announcementsToRender?.filter(
            (announcement) => announcement.sex === "samiec",
          );
      }
    }

    if (age !== "0") {
      switch (age) {
        case "1":
          announcementsToRender = announcementsToRender?.filter(
            (announcement) => announcement.age === 1,
          );
          break;
        case "2":
          console.log("2");
          announcementsToRender = announcementsToRender?.filter(
            (announcement) => announcement.age > 1 && announcement.age < 5,
          );
          break;
        case "3":
          announcementsToRender = announcementsToRender?.filter(
            (announcement) => announcement.age > 4 && announcement.age < 10,
          );
          break;
        case "4":
          announcementsToRender = announcementsToRender?.filter(
            (announcement) => announcement.age >= 10,
          );
      }
    }

    if (toDate) {
      announcementsToRender = announcementsToRender?.filter(
        (announcement) =>
          new Date(toDate).getTime() -
            new Date(announcement.created_at).getTime() >=
          0,
      );
    }

    if (fromDate) {
      announcementsToRender = announcementsToRender?.filter(
        (announcement) =>
          new Date(fromDate).getTime() -
            new Date(announcement.created_at).getTime() <=
          0,
      );
    }
  }
  return announcements?.length ? (
    <>
      <p className={`${range ? "hidden" : "block"} text-lg text-dark-200`}>
        Znaleziono: {announcementsToRender?.length}
      </p>
      <div className={className}>
        {announcementsToRender?.map((announcement) => {
          let age: string;

          if (announcement.age === 1) {
            age = "rok";
          } else if (announcement.age < 5) {
            age = "lata";
          } else {
            age = "lat";
          }

          const date = new Date(announcement.created_at);
          const day = date.getDate();
          const month = getMonthName(date.getMonth() + 1);

          return (
            <Link
              href={`/adopcja/${announcement.id}`}
              className="w-fit justify-self-center overflow-hidden rounded-md object-cover text-dark-200 shadow-md transition-all hover:shadow-lg hover:saturate-[120%]"
              key={announcement.id}
            >
              <div className="relative h-[300px] w-[300px] overflow-hidden object-center">
                <Image
                  fill
                  className="object-cover object-top"
                  src={announcement.main_image}
                  alt={`Główne zdjęcie ogłoszenia ${announcement.name}`}
                />
              </div>
              <div className="space-y-2 px-4 py-2">
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl">{announcement.name}</p>
                  <p>
                    {day} {month}
                  </p>
                </div>
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
            </Link>
          );
        })}
      </div>
    </>
  ) : (
    <p className="text-center text-2xl font-semibold text-dark-200">
      Brak ogłoszeń
    </p>
  );
}
