import Image from "next/image";
import Link from "next/link";
import becomeHero from "@/public/becomeHero.webp";
import adopt from "@/public/adopt.png";
import support from "@/public/support.png";
import volunteer from "@/public/volunteer.png";
import paw from "@/public/whitePaw.png";

export default function BecomeHeroSection() {
  return (
    <section className="relative w-full overflow-hidden px-6 pb-20 pt-14">
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-primary-100/60"></div>
      <Image
        src={becomeHero}
        fill
        placeholder="blur"
        alt="Psy biegnące w stronę aparatu"
        className="absolute -z-20 object-cover object-[0_45%]"
      />
      <div className="mx-auto max-w-[1200px] text-light-100">
        <div className="mb-10 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
          <Image
            className="md:block"
            src={paw}
            height={80}
            width={80}
            alt="Łapa psa"
          />
          <p className="text-center text-6xl font-bold">Zostań Bohaterem</p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <Link
            href="adopcja"
            className="flex flex-col items-center justify-center gap-4 justify-self-center transition-transform hover:scale-105"
          >
            <div className="flex h-[240px] w-[240px] items-center justify-center rounded-full bg-light-100 shadow-lg">
              <Image src={adopt} height={150} width={150} alt="adoptuj" />
            </div>
            <p className="text-5xl font-semibold">Adoptuj</p>
          </Link>
          <Link
            href="adoptuj"
            className="flex flex-col items-center justify-center gap-4 justify-self-center transition-transform hover:scale-105"
          >
            <div className="flex h-[240px] w-[240px] items-center justify-center rounded-full bg-light-100 shadow-lg">
              <Image src={support} height={150} width={150} alt="adoptuj" />
            </div>
            <p className="text-5xl font-semibold">Wesprzyj</p>
          </Link>
          <Link
            href="adoptuj"
            className="flex flex-col items-center justify-center gap-4 justify-self-center transition-transform hover:scale-105"
          >
            <div className="flex h-[240px] w-[240px] items-center justify-center rounded-full bg-light-100 shadow-lg">
              <Image src={volunteer} height={150} width={150} alt="adoptuj" />
            </div>
            <p className="text-5xl font-semibold">Wolontariat</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
