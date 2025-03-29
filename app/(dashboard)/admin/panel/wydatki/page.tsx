import ExpensesList from "@/app/(dashboard)/_components/_expenses/ExpensesList";
import ExpensesModalContent from "@/app/(dashboard)/_components/_expenses/ExpensesModalContent";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/Modal";
import Table from "@/app/(dashboard)/_components/Table";
import TableFilters from "@/app/(dashboard)/_components/TableFilters";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

function EventsPanelPage({
  searchParams,
}: {
  searchParams?: Promise<{
    tytul?: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  return (
    <Modal>
      <ModalContent>
        <ExpensesModalContent />
      </ModalContent>
      <div>
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex gap-6">
            <p className="text-2xl lg:basis-auto lg:text-3xl">Wydatki</p>
            <ModalTrigger>Dodaj wydatek</ModalTrigger>
          </div>
          <TableFilters placeholder="Wyszukaj po tytule" paramName="tytul" />
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="[1fr_1fr_0.4fr]"
            columnsTitles={["Tytuł", "Data dodania"]}
          >
            <Suspense fallback={<Spinner />}>
              <ExpensesList searchParams={searchParams} />
            </Suspense>
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default EventsPanelPage;
