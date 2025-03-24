import AnnouncementModalContent from "@/app/(dashboard)/_components/AnnouncementModalContent";
import AnnouncementsList from "@/app/(dashboard)/_components/AnnouncementsList";
import { Input } from "@/app/(dashboard)/_components/Input";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/Modal";
import Spinner from "@/app/(dashboard)/_components/Spinner";
import Table from "@/app/(dashboard)/_components/Table";
import { Suspense } from "react";

function Announcements() {
  return (
    <Modal>
      <ModalContent>
        <AnnouncementModalContent />
      </ModalContent>
      <div>
        <div className="mb-6 flex items-center gap-6">
          <p className="text-2xl lg:text-3xl">Zwierzęta do adopcji</p>
          <ModalTrigger>Dodaj ogłoszenie</ModalTrigger>
          <Input placeholder="Wyszukaj po imieniu" className="w-[200px]" />
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="[1fr_1fr_1fr_1fr_1fr_0.4fr]"
            columnsTitles={["", "Imię", "Płeć", "Wiek", "Data dodania"]}
          >
            <Suspense fallback={<Spinner />}>
              <AnnouncementsList />
            </Suspense>
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default Announcements;
