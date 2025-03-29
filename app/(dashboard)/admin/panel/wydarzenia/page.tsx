import EventModalContent from "@/app/(dashboard)/_components/_events/EventModalContent";
import EventsList from "@/app/(dashboard)/_components/_events/EventsList";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/Modal";
import Table from "@/app/(dashboard)/_components/Table";
import TableFilters from "@/app/(dashboard)/_components/TableFilters";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

function EventsPanelPage() {
  return (
    <Modal>
      <ModalContent>
        <EventModalContent />
      </ModalContent>
      <div>
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex gap-6">
            <p className="text-2xl lg:basis-auto lg:text-3xl">Wydarzenia</p>
            <ModalTrigger>Dodaj wydarzenie</ModalTrigger>
          </div>
          <TableFilters placeholder="Wyszukaj po tytule" paramName="tytul" />
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="[1fr_1fr_1fr_0.4fr]"
            columnsTitles={["", "Tytuł", "Data dodania"]}
          >
            <Suspense fallback={<Spinner />}>
              <EventsList />
            </Suspense>
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default EventsPanelPage;
