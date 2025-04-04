import Spinner from "@/app/_components/Spinner";
import paw from "@/public/greenPawBig.png";
import Image from "next/image";
import { Suspense } from "react";
import AnnouncementsCards from "../_components/AnnouncementsCards";
import Filters from "../_components/AnnouncementsFitlers";
function AdoptPage({
  searchParams,
}: {
  searchParams?: Promise<{
    imie?: string;
    plec: string;
    wiek: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-10 lg:min-h-[550px]">
      <div className="flex flex-col items-center justify-between gap-6">
        <h2 className="flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="" height={55} width={55} />
          Zwierzęta do adopcji
        </h2>
        <Suspense>
          <Filters />
        </Suspense>
      </div>
      <Suspense fallback={<Spinner />}>
        <AnnouncementsCards
          searchParams={searchParams}
          className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:w-full lg:grid-cols-3 lg:gap-6"
        />
      </Suspense>
    </div>
  );
}

export default AdoptPage;
