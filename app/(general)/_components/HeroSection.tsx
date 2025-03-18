import Link from "next/link";

export default function HeroSection() {
  return (
    <header className="mx-auto w-full max-w-[1200px] py-8">
      <div className="space-y-6 text-dark-200 lg:w-1/2">
        <h1 className="text-4xl font-bold lg:max-w-[450px] lg:text-6xl lg:leading-[70px]">
          Daj dom, podaruj miłość!
        </h1>
        <p className="text-xl font-semibold lg:text-2xl">
          Setki czworonogów czekają na swoją szansę na lepsze życie. Adoptuj,
          wspieraj, zmieniaj los bezdomnych zwierząt razem z nami!
        </p>
        <Link
          href="adoptuj"
          className="block w-fit rounded-md bg-primary-100 px-8 py-2 text-light-100"
        >
          Adoptuj
        </Link>
      </div>
    </header>
  );
}
