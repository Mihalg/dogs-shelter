"use client";

import { Input } from "../../_components/Input";
import { Button } from "@/app/_components/Button";
import { ArrowDown, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function TableFilters({
  placeholder,
  paramName,
}: {
  placeholder?: string;
  paramName?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [additionalInput, setAdditionalInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  function handleFilter() {
    const params = new URLSearchParams(searchParams);
    if (paramName) {
      params.set(paramName, additionalInput);
    }
    params.set("dataDo", toDate);
    params.set("dataOd", fromDate);
    router.replace(`${path}?${params.toString()}`);
  }

  return (
    <div>
      <Button
        className="flex md:hidden"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        <ArrowDown />
        Filtry
      </Button>
      <div
        className={`flex ${isOpen ? "max-h-[1000px] pt-4" : "max-h-0 py-0"} flex-col gap-4 overflow-hidden transition-all md:max-h-[1000px] md:flex-row md:py-1`}
      >
        {placeholder && paramName ? (
          <Input
            className="ring-inset"
            type="text"
            placeholder={placeholder}
            value={additionalInput}
            onChange={(e) => {
              setAdditionalInput(e.target.value);
            }}
          />
        ) : null}

        <Input
          className="ring-inset lg:w-[150px]"
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
          className="ring-inset lg:w-[150px]"
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

export default TableFilters;
