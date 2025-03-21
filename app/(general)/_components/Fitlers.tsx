"use client";

import { Button } from "@/app/(dashboard)/_components/Button";
import { Input } from "@/app/(dashboard)/_components/Input";
import { ArrowDown, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("0");
  const [age, setAge] = useState("0");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  function handleFilter() {
    const params = new URLSearchParams(searchParams);
    params.set("imie", name);
    params.set("plec", sex);
    params.set("wiek", age);
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
        className={`flex ${isOpen ? "max-h-[1000px] pt-4" : "max-h-0 py-0"} flex-col gap-4 overflow-hidden px-4 transition-all lg:max-h-[1000px] lg:flex-row lg:py-4`}
      >
        <Input
          type="text"
          placeholder="Imię"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <select
          id="sex"
          name="sex"
          className="h-[36px] rounded-md border-[1px] border-neutral-200 bg-white px-3"
          value={sex}
          onChange={(e) => {
            setSex(e.target.value);
          }}
        >
          <option value="0">Płeć</option>
          <option value="samica">Samica</option>
          <option value="samiec">Samiec</option>
        </select>
        <select
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          id="sex"
          name="sex"
          className="h-[36px] rounded-md border-[1px] border-neutral-200 bg-white px-3"
        >
          <option value="0">Wiek</option>
          <option value="1">do 1 roku</option>
          <option value="2">1-4 lata</option>
          <option value="3">5-9 lat</option>
          <option value="4">10 lat i więcej</option>
        </select>
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
