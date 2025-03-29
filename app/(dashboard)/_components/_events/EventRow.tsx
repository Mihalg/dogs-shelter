import { deleteEvent } from "@/app/_lib/actions";
import Image from "next/image";
import RowDropdownMenu from "../RowDropdownMenu";

function EventRow({
  event,
}: {
  event: {
    id: number;
    image: string;
    title: string;
    created_at: string;
  };
}) {
  const date = new Date(event.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      className={`grid h-[60px] grid-cols-[1fr_1fr_1fr_0.4fr] items-center gap-x-2 py-2`}
    >
      <div>
        <Image
          height={50}
          width={70}
          src={event.image}
          alt="Główne zdjęcie wydarzenia"
        />
      </div>
      <div>{event.title}</div>
      <div>
        {day < 10 ? `0${day}` : day}-{month < 10 ? `0${month}` : month}-{year}
      </div>
      <div>
        <RowDropdownMenu
          id={event.id}
          paramName="eventId"
          deleteFn={deleteEvent}
        />
      </div>
    </div>
  );
}

export default EventRow;
