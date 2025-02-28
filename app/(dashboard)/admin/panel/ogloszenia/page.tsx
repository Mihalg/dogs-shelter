import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/app/(dashboard)/_components/AnnouncementModal";
import AnnouncementsList from "@/app/(dashboard)/_components/AnnouncementsList";
import { Button } from "@/app/(dashboard)/_components/Button";
import ImagesUpload from "@/app/(dashboard)/_components/ImageUpload";
import { Input } from "@/app/(dashboard)/_components/Input";
import { Label } from "@/app/(dashboard)/_components/Label";
import Spinner from "@/app/(dashboard)/_components/Spinner";
import Table from "@/app/(dashboard)/_components/Table";
import { Textarea } from "@/app/(dashboard)/_components/Textarea";
import { Suspense } from "react";

function Announcements() {
  return (
    <Modal>
      <ModalContent>
        <form className="grid grid-cols-1 gap-x-8 gap-y-4 px-4 py-4 lg:grid-cols-2">
          <div>
            <Label htmlFor="name">Imię</Label>
            <Input required id="name" type="text" />
          </div>
          <div className="flex flex-col justify-end gap-1">
            <Label htmlFor="bmi">Płeć</Label>
            <select
              id="pal"
              className="h-[36px] rounded-md border-[1px] border-neutral-200 bg-white px-3"
            >
              <option value="samica">Samica</option>
              <option value="samiec">Samiec</option>
            </select>
          </div>

          <div>
            <Label htmlFor="animal">Zwierzę</Label>
            <Input required id="animal" type="text" />
          </div>
          <div>
            <Label htmlFor="age">Wiek</Label>
            <Input required id="age" type="number" />
          </div>
          <div className="lg:col-start-1 lg:col-end-3">
            <Label htmlFor="description">Opis</Label>
            <Textarea name="description" id="description"></Textarea>
          </div>
          <div>
            <Label className="mb-4 block w-full text-center">
              Główne zdjęcie
            </Label>
            <ImagesUpload id="main-image" />
          </div>
          <div>
            <Label className="mb-4 block w-full text-center">
              Dodatkowe zdjęcia
            </Label>
            <ImagesUpload id="images" multiple={true} />
          </div>
          <Button className="ml-auto mt-auto w-40 lg:col-start-1 lg:col-end-3">
            Zapisz
          </Button>
        </form>
      </ModalContent>
      <div>
        <div className="mb-6 flex items-center gap-6">
          <p className="text-2xl lg:text-3xl">Zwierzęta do adopcji</p>
          <ModalTrigger>Dodaj ogłoszenie</ModalTrigger>
        </div>
        <div className="overflow-x-auto">
          <Table
            columnsTemplate="1fr_1fr_1fr_1fr_1fr_1fr_0.4fr"
            columnsTitles={[
              "",
              "Imię",
              "Płeć",
              "Zwierzę",
              "Wiek",
              "Data dodania",
            ]}
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
