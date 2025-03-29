"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Hamburger from "./Hamburger";
import { redirect, usePathname } from "next/navigation";
import { logout } from "@/app/_lib/actions";

export default function NavBar() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const ref = useOutsideClick(() => {
    if (isActive) toggleMenu();
  });

  function toggleMenu() {
    setIsActive((state) => !state);
  }

  return (
    <div className="z-10 flex items-center justify-between py-0 xl:block xl:h-fit xl:px-0">
      <Hamburger onClick={toggleMenu} isActive={isActive} />
      <nav
        ref={ref}
        className={`absolute left-0 top-0 h-dvh w-72 border-r-[1px] border-r-dark-100 py-3 backdrop-blur-md ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between transition-transform xl:static xl:translate-x-0 xl:border-none xl:bg-light-100 xl:p-0`}
      >
        <div className="mx-auto mt-4 flex w-4/5 flex-col space-y-2">
          <Link
            className={`x-4 gap-4 rounded-md py-2 text-center text-2xl text-dark-200 transition-colors hover:bg-primary-100 hover:text-light-100 ${pathname.includes("aktualnosci") ? "bg-primary-100 text-light-100" : ""}`}
            onClick={toggleMenu}
            href="aktualnosci"
          >
            Aktualności
          </Link>
          <Link
            className={`x-4 gap-4 rounded-md py-2 text-center text-2xl text-dark-200 transition-colors hover:bg-green-600 hover:text-light-100 ${pathname.includes("ogloszenia") ? "bg-primary-100 text-light-100" : ""}`}
            onClick={toggleMenu}
            href="ogloszenia"
          >
            Ogłoszenia
          </Link>
          <Link
            className={`x-4 gap-4 rounded-md py-2 text-center text-2xl text-dark-200 transition-colors hover:bg-green-600 hover:text-light-100 ${pathname.includes("wydarzenia") ? "bg-primary-100 text-light-100" : ""}`}
            onClick={toggleMenu}
            href="wydarzenia"
          >
            Wydarzenia
          </Link>
          <Link
            className={`x-4 gap-4 rounded-md py-2 text-center text-2xl text-dark-200 transition-colors hover:bg-green-600 hover:text-light-100 ${pathname.includes("zbiorki") ? "bg-primary-100 text-light-100" : ""}`}
            onClick={toggleMenu}
            href="zbiorki"
          >
            Zbiórki
          </Link>
          <Link
            className={`x-4 gap-4 rounded-md py-2 text-center text-2xl text-dark-200 transition-colors hover:bg-green-600 hover:text-light-100 ${pathname.includes("wydatki") ? "bg-primary-100 text-light-100" : ""}`}
            onClick={toggleMenu}
            href="wydatki"
          >
            Wydatki
          </Link>
        </div>
        <div className="mb-16 flex w-full items-center justify-center gap-8 shadow-none">
          <Settings
            size={30}
            role="button"
            onClick={() => {
              redirect("/admin/panel/ustawienia");
            }}
          />
          <LogOut size={30} role="button" onClick={logout} />
        </div>
      </nav>
    </div>
  );
}
