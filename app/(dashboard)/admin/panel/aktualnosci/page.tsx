import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/Modal";
import PostsList from "@/app/(dashboard)/_components/PostsList";
import NewsModalContent from "@/app/(dashboard)/_components/PostsModalContent";
import Spinner from "@/app/(dashboard)/_components/Spinner";
import Table from "@/app/(dashboard)/_components/Table";
import { Suspense } from "react";

function News() {
  return (
    <Modal>
      <ModalContent>
        <NewsModalContent />
      </ModalContent>
      <div>
        <div className="mb-6 flex items-center gap-6">
          <p className="text-2xl lg:text-3xl">Aktualności</p>
          <ModalTrigger>Dodaj post</ModalTrigger>
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="1fr_1fr_1fr_1fr_0.4fr"
            columnsTitles={["", "typ", "tytuł", "Data dodania"]}
          >
            <Suspense fallback={<Spinner />}>
              <PostsList />
            </Suspense>
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default News;
