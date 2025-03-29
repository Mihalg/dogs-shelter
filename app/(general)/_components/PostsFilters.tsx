"use client";

import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { ArrowDown, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PostsFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  function handleFilter() {
    const params = new URLSearchParams(searchParams);
    params.set("dataDo", toDate);
    params.set("dataOd", fromDate);
    router.replace(`${path}?${params.toString()}`);
  }

  return (
    <div className={"w-full px-6"}>
      <Button
        className="ml-auto flex lg:hidden"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        <ArrowDown />
        Filtry
      </Button>
      <div
        className={`flex ${isOpen ? "max-h-[1000px] pt-4" : "max-h-0 py-0"} flex-col gap-4 overflow-hidden px-4 transition-all lg:ml-auto lg:max-h-[1000px] lg:w-fit lg:flex-row lg:py-4`}
      >
        <Input
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
          placeholder="Data do"
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <Input
          value={fromDate}
          onChange={(e) => {
            setFromDate(e.target.value);
          }}
          placeholder="Data od"
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <Button onClick={handleFilter}>
          <Search /> Szukaj
        </Button>
      </div>
    </div>
  );
}
