"use client";

import { useState } from "react";
import { ModalTrigger } from "./Modal";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { usePathname, useRouter } from "next/navigation";

function RowDropdownMenu({ id }: { id: number }) {
  const [open, setIsOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild title="Menu">
        <button className="font-bold">&#xB7;&#xB7;&#xB7;</button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex flex-col gap-1">
          <ModalTrigger
            loading={true}
            onClick={() => {
              router.replace(`${pathName}?id=${id}`);
              setIsOpen(false);
            }}
            className="w-full bg-transparent text-dark-200 shadow-none transition-colors hover:bg-primary-100 hover:text-white"
          >
            Edytuj
          </ModalTrigger>
          <ModalTrigger
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-full bg-transparent text-dark-200 shadow-none transition-colors hover:bg-primary-100 hover:text-white"
          >
            Usuń
          </ModalTrigger>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default RowDropdownMenu;
