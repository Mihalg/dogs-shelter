import { MailIcon, MapPin, PhoneIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-dark-200 px-6 py-6 text-light-200">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 lg:grid-cols-[0.4fr_1fr_1fr]">
        <div className="flex flex-col gap-2">
          <p>logo</p>
          <p>Przytulisko dla Bezdomnych Zwierząt w Kłodawie</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold">KONTAKT</p>
          <div className="flex gap-2">
            <MapPin fill="#e3e3e3" color="#3f3f3f" strokeWidth={2} />
            <p>Ul.Cegielniana 15, 62-650 Kłodawa</p>
          </div>
          <div className="flex gap-2">
            <MailIcon fill="#e3e3e3" color="#3f3f3f" />
            <p>PrzytuliskoKlodawa@interia.pl</p>
          </div>
          <div className="flex gap-2">
            <PhoneIcon fill="#e3e3e3" strokeWidth={0} />
            <p>632-730-622 - kontakt w sprawie odłowienia bezdomnych psów</p>
          </div>
          <div className="flex gap-2">
            <PhoneIcon fill="#e3e3e3" strokeWidth={0} />
            <p>783-803-199 - adopcja oraz informacje o psach z Przytuliska</p>
          </div>

          <div className="mt-auto border-b-[1px] flex items-center border-t-[1px] border-light-200 py-1 text-xl font-semibold">
            <p>Obserwuj nas</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 ml-auto">
          <p className="text-xl font-semibold">JAK DOJECHAĆ</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.0112927953833!2d18.90377707651778!3d52.261339971994545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471b6d98f338b2b7%3A0x588b2e403ea23558!2sCegielniana%2015%2C%2062-650%20K%C5%82odawa!5e0!3m2!1spl!2spl!4v1742137746551!5m2!1spl!2spl"
            width="360"
            height="225"
            style={{
              border: "0",
            }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
