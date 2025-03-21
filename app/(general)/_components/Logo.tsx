import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo({ className }: { className?: string }) {
  return (
    <Link className={`relative block h-fit ${className}`} href="/">
      <Image
        className="min-h-[100px] min-w-[100px] rounded-full shadow-2xl"
        src={logo}
        alt="logo"
        height={100}
        width={100}
      />
    </Link>
  );
}

export default Logo;
