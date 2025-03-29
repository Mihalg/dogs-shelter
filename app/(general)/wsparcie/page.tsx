import Spinner from "@/app/_components/Spinner";
import paw from "@/public/greenPawBig.png";
import Image from "next/image";
import { Suspense } from "react";
import Fundraisers from "../_components/Fundraising";
import { MailIcon, PhoneIcon } from "lucide-react";

export default function Contact() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 text-dark-300 lg:min-h-[550px]">
        <h2 className="mx-auto flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="" height={55} width={55} />
          Wesprzyj
        </h2>
        <div className="flex flex-col gap-y-8">
          <div className="mx-auto max-w-[400px] text-center">
            <p className="text- text-2xl font-semibold text-primary-100">
              Darowizny
            </p>
            <p>
              Darowizny pieniężne prosimy przelewać na Konto Przytuliska dla
              Bezdomych Zwierząt w Kłodawie 65 1020 2762 0000 1002 0143 6369
              koniecznie z tytułem „Pomoc dla Przytuliska”.
            </p>
          </div>
          <div className="mx-auto max-w-[400px] text-center">
            <p className="text- text-2xl font-semibold text-primary-100">
              Wolontariat
            </p>
            <p>Aktualnie trwa nabór wolontariuszy.</p>
            <p>Chętne osoby zapraszamy do kontaktu:</p>
            <div className="my-1 flex items-center justify-center gap-2">
              <MailIcon fill="#3f3f3f" color="#ffff" />
              <p>PrzytuliskoKlodawa@interia.pl</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <PhoneIcon fill="#3f3f3f" strokeWidth={0} />
              <p>783-803-199</p>
            </div>
          </div>
          <div className="mx-auto max-w-[400px] text-center">
            <p className="text- text-2xl font-semibold text-primary-100">
              Zbiórki
            </p>
            <Suspense fallback={<Spinner />}>
              <Fundraisers />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
