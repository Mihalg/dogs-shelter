import { deleteFundraiser } from "@/app/_lib/actions";
import RowDropdownMenu from "../RowDropdownMenu";

function FundraiserRow({
  fundraiser,
}: {
  fundraiser: {
    id: number;
    link: string;
    created_at: string;
  };
}) {
  const date = new Date(fundraiser.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      className={`grid h-[60px] grid-cols-[1fr_1fr_0.4fr] items-center gap-x-2 py-2`}
    >
      <div>
        <a href={fundraiser.link}>{fundraiser.link}</a>
      </div>
      <div>
        {day < 10 ? `0${day}` : day}-{month < 10 ? `0${month}` : month}-{year}
      </div>
      <div>
        <RowDropdownMenu
          id={fundraiser.id}
          paramName="fundraiserId"
          deleteFn={deleteFundraiser}
        />
      </div>
    </div>
  );
}

export default FundraiserRow;
