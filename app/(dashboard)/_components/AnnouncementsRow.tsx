import Image from "next/image";
import RowDropdownMenu from "./RowDropdownMenu";

function AnnouncementsRow({
  announcement,
  columnsTemplate,
}: {
  announcement: {
    id: number;
    main_image: string;
    name: string;
    animal: string;
    gender: string;
    age: number;
    created_at: string;
  };
  columnsTemplate: string;
}) {
  const date = new Date(announcement.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      className={`grid gap-x-2 grid-cols-[${columnsTemplate}] items-center py-2`}
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
      <div>{announcement.gender}</div>
      <div>{announcement.animal}</div>
      <div>{announcement.age}</div>
      <div>
        {day}-{month < 10 ? `0${month}` : month}-{year}
      </div>
      <div>
        <RowDropdownMenu />
      </div>
    </div>
  );
}

export default AnnouncementsRow;
