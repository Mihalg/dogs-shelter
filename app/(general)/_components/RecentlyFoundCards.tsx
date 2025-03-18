import { browserClient } from "@/app/_utils/supabase/client";
import Image from "next/image";

export default async function RecentlyFoundCards() {
  const supabase = browserClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, main_image, name, gender, age, race")
    .range(0, 3);

  return announcements?.map((announcement) => {
    return (
      <div className="w-fit rounded-md shadow-md overflow-hidden justify-self-center" key={announcement.id}>
        <Image
          width={280}
          height={160}
          src={announcement.main_image}
          alt={`Główne zdjęcie ogłoszenia ${announcement.name}`}
        />
        <div className="px-4 py-2">
          <p className="text-xl">{announcement.name}</p>
          <p>{announcement.race}</p>
          <p>{announcement.gender}</p>
          <p>{announcement.age}</p>
        </div>
      </div>
    );
  });
}
