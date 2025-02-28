import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

function RowDropdownMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild title="Menu">
        <button className="font-bold">&#xB7;&#xB7;&#xB7;</button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex flex-col gap-1">
          <button className="hover:bg-light-100 rounded-md px-3 py-1 w-full transition-colors">Edytuj</button>
          <button className="hover:bg-light-100 rounded-md px-3 py-1 w-full transition-colors">Usuń</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default RowDropdownMenu;
