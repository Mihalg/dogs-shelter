import FundraiserModalContent from "@/app/(dashboard)/_components/_fundraisers/FundraiserModalContent";
import FundraisersList from "@/app/(dashboard)/_components/_fundraisers/FundraisersList";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/Modal";
import Spinner from "@/app/_components/Spinner";
import Table from "@/app/(dashboard)/_components/Table";
import { Suspense } from "react";
import TableFilters from "@/app/(dashboard)/_components/TableFilters";

function Fundraisers() {
  return (
    <Modal>
      <ModalContent>
        <FundraiserModalContent />
      </ModalContent>
      <div>
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex gap-6">
            <p className="text-2xl lg:basis-auto lg:text-3xl">Zbiórki</p>
            <ModalTrigger>Dodaj zbiórkę</ModalTrigger>
          </div>
          <TableFilters />
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="[1fr_1fr_0.4fr]"
            columnsTitles={["Link", "Data dodania"]}
          >
            <Suspense fallback={<Spinner />}>
              <FundraisersList />
            </Suspense>
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default Fundraisers;
