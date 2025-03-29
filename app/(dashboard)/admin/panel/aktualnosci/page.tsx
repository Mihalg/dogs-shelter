import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/Modal";
import PostsList from "@/app/(dashboard)/_components/_posts/PostsList";
import NewsModalContent from "@/app/(dashboard)/_components/_posts/PostsModalContent";
import Spinner from "@/app/_components/Spinner";
import Table from "@/app/(dashboard)/_components/Table";
import { Suspense } from "react";
import TableFilters from "@/app/(dashboard)/_components/TableFilters";

function News({
  searchParams,
}: {
  searchParams?: Promise<{
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  return (
    <Modal>
      <ModalContent>
        <NewsModalContent />
      </ModalContent>
      <div>
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex gap-6">
            <p className="text-2xl lg:basis-auto lg:text-3xl">Aktualności</p>
            <ModalTrigger>Dodaj post</ModalTrigger>
          </div>
          <TableFilters placeholder="Wyszukaj po tytule" paramName="tytul" />
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="[1fr_1fr_1fr_1fr_0.4fr]"
            columnsTitles={["", "typ", "tytuł", "Data dodania"]}
          >
            <Suspense fallback={<Spinner />}>
              <PostsList searchParams={searchParams} />
            </Suspense>
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default News;
