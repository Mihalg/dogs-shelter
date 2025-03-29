import paw from "@/public/greenPawBig.png";
import photo1 from "@/public/MonikaMiszczak.jpg";
import photo2 from "@/public/BlankaMichalak.jpg";
import photo3 from "@/public/JuliaRakowska.jpg";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 text-dark-300 lg:min-h-[550px]">
        <h2 className="mx-auto flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="" height={55} width={55} />O nas
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Image
              src={photo1}
              width={140}
              height={140}
              alt="Zdjęcie Moniki Miszczak - głównej opiekunki i administrator tiktoka"
            />
            <div>
              <p className="text-lg font-semibold">Monika Miszczak</p>
              <p>główna opiekunka i administratorka tiktoka</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Image
              src={photo2}
              width={140}
              height={140}
              alt="Zdjęcie Moniki Miszczak - głównej opiekunki i administrator tiktoka"
            />
            <div>
              <p className="text-lg font-semibold">Blanka Michalak</p>
              <p className="text-lg">administrator instagrama, wolontariusz</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Image
              src={photo3}
              width={140}
              height={140}
              alt="Zdjęcie Moniki Miszczak - głównej opiekunki i administrator tiktoka"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Julia Rakowska</p>
              <p className="text-lg">administrator Facebooka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
