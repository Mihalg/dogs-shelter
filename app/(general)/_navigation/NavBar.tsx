"use client";

import { useState } from "react";
import Hamburger from "./Hamburger";
import MainNav from "./MainNav";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  function toggleMenu() {
    setIsActive((state) => !state);
  }

  return (
    <div className="relative z-10 flex items-center justify-between px-3 py-0 lg:block lg:h-fit lg:px-0">
      <Hamburger onClick={toggleMenu} isActive={isActive} />
      <MainNav isActive={isActive} toggleMenu={toggleMenu}>
        <li className="absolute top-6 w-full min-w-[200px] max-w-[250px] self-center lg:static">
          <Link
            className="flex flex-col items-center gap-2"
            onClick={() => {
              setIsActive(false);
            }}
            href="/"
          >
            <Image
              className="min-h-[100px] min-w-[100px] rounded-full shadow-lg"
              src={logo}
              alt="Logo przytuliska"
              height={100}
              width={100}
            />
            <p className="text-center text-lg font-semibold text-dark-200 lg:hidden">
              Przytulisko dla Bezdomnych Zwierząt w Kłodawie
            </p>
          </Link>
        </li>
        <MainNav.NavRow href="/aktualnosci">
          <span>Aktualności</span>
        </MainNav.NavRow>
        <MainNav.NavRow href="/wydarzenia">
          <span>Wydarzenia</span>
        </MainNav.NavRow>
        <MainNav.NavRow href="/adopcja">
          <span>Adoptuj</span>
        </MainNav.NavRow>
        <MainNav.NavRow href="/wsparcie">
          <span>Wesprzyj</span>
        </MainNav.NavRow>
        <MainNav.NavRow
          nestedLinks={
            <>
              <MainNav.NavRowNested href="/o-nas">O nas</MainNav.NavRowNested>
              <MainNav.NavRowNested href="/wydatki">
                Wydatki
              </MainNav.NavRowNested>
            </>
          }
        >
          BIP
        </MainNav.NavRow>
      </MainNav>
    </div>
  );
}
