import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/heroImage.jpg";

export default function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden py-12 px-6">
      <Image
        src={heroImage}
        fill
        placeholder="blur"
        alt="Pies w lesie jako tło nagłówka"
        className="absolute -z-10 object-cover object-[40%_45%]"
      />
      <div className="mx-auto max-w-[1200px] text-light-100">
        <div className="space-y-6 lg:space-y-8 md:w-1/2">
          <h1 className="text-4xl font-bold lg:max-w-[450px] lg:text-6xl lg:leading-[70px]">
            Daj dom, podaruj miłość!
          </h1>
          <p className="text-xl font-semibold lg:text-2xl">
            Setki czworonogów czekają na swoją szansę na lepsze życie. Adoptuj,
            wspieraj, zmieniaj los bezdomnych zwierząt razem z nami!
          </p>
          <Link
            href="adopcja"
            className="font-semibold block w-fit rounded-md bg-primary-100 px-8 py-2 text-light-100 hover:bg-primary-100/90"
          >
            Adoptuj
          </Link>
        </div>
      </div>
    </header>
  );
}
