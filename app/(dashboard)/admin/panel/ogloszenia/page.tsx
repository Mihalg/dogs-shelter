import AnnouncementModalContent from "@/app/(dashboard)/_components/_announcements/AnnouncementModalContent";
import AnnouncementsList from "@/app/(dashboard)/_components/_announcements/AnnouncementsList";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/Modal";
import Table from "@/app/(dashboard)/_components/Table";
import TableFilters from "@/app/(dashboard)/_components/TableFilters";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

function Announcements({
  searchParams,
}: {
  searchParams?: Promise<{
    imie?: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  return (
    <Modal>
      <ModalContent>
        <AnnouncementModalContent />
      </ModalContent>
      <div>
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-6 sm:flex-row flex-col">
              <p className="w-fit text-2xl lg:basis-auto lg:text-3xl">
                Zwierzęta do adopcji
              </p>
              <ModalTrigger>Dodaj ogłoszenie</ModalTrigger>
            </div>
            <TableFilters placeholder="Wyszukaj po imieniu" paramName="imie" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="[1fr_1fr_1fr_1fr_1fr_0.4fr]"
            columnsTitles={["", "Imię", "Płeć", "Wiek", "Data dodania"]}
          >
            <Suspense fallback={<Spinner />}>
              <AnnouncementsList searchParams={searchParams} />
            </Suspense>
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default Announcements;
