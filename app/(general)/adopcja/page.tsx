import Spinner from "@/app/(dashboard)/_components/Spinner";
import paw from "@/public/greenPaw.png";
import Image from "next/image";
import { Suspense } from "react";
import AnnouncementsCards from "../_components/AnnouncementsCards";
import Filters from "../_components/Fitlers";
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
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-12 lg:min-h-[600px]">
      <div className="flex flex-col items-center justify-between gap-6">
        <h2 className="flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="łapa" height={55} width={55} />
          Zwierzęta do adopcji
        </h2>
        <Filters />
      </div>
      <Suspense fallback={<Spinner />}>
        <AnnouncementsCards
          searchParams={searchParams}
          className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-3 lg:w-full lg:grid-cols-4 lg:gap-6"
        />
      </Suspense>
    </div>
  );
}

export default AdoptPage;
