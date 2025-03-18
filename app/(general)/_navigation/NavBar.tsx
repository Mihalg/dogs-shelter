"use client";

import { useState } from "react";
import Hamburger from "./Hamburger";
import MainNav from "./MainNav";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  function toggleMenu() {
    setIsActive((state) => !state);
  }

  return (
    <div className="z-10 flex items-center justify-between px-3 py-0 lg:h-fit lg:px-0 xl:block">
      <Hamburger onClick={toggleMenu} isActive={isActive} />
      <MainNav isActive={isActive} toggleMenu={toggleMenu}>
        <MainNav.NavRow href="home">
          <span>Aktualności</span>
        </MainNav.NavRow>

        <MainNav.NavRow href="adpocja">
          <span>Adoptuj</span>
        </MainNav.NavRow>

        <MainNav.NavRow href="o-nas">
          <span>O nas</span>
        </MainNav.NavRow>
        <MainNav.NavRow href="kontakt">
          <span>Kontakt</span>
        </MainNav.NavRow>
      </MainNav>
    </div>
  );
}
