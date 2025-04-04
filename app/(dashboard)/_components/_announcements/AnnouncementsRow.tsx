import Image from "next/image";
import RowDropdownMenu from "../RowDropdownMenu";
import { deleteAnnouncement } from "@/app/_lib/actions";

function AnnouncementsRow({
  announcement,
}: {
  announcement: {
    id: number;
    main_image: string;
    name: string;
    breed: string;
    sex: string;
    age: number;
    created_at: string;
  };
}) {
  const date = new Date(announcement.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.4fr] items-center gap-x-2 py-2`}
    >
      <div>
        <Image
          height={50}
          width={70}
          src={announcement.main_image}
          alt="Główne zdjęcie ogłoszenia"
        />
      </div>
      <div>{announcement.name}</div>
      <div>{announcement.sex}</div>
      <div>{announcement.age}</div>
      <div>
        {day < 10 ? `0${day}` : day}-{month < 10 ? `0${month}` : month}-{year}
      </div>
      <div>
        <RowDropdownMenu
          id={announcement.id}
          paramName="announcementId"
          deleteFn={deleteAnnouncement}
        />
      </div>
    </div>
  );
}

export default AnnouncementsRow;
