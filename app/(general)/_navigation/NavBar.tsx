"use client";

import { useState } from "react";
import Hamburger from "./Hamburger";
import MainNav from "./MainNav";
import Logo from "../_components/Logo";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  function toggleMenu() {
    setIsActive((state) => !state);
  }

  return (
    <div className="z-10 flex items-center justify-between px-3 py-0 lg:block lg:h-fit lg:px-0">
      <Hamburger onClick={toggleMenu} isActive={isActive} />
      <MainNav isActive={isActive} toggleMenu={toggleMenu}>
        <div className="flex w-full min-w-[200px] max-w-[250px] items-center self-center">
          <Logo className="mx-auto" />
        </div>
        <MainNav.NavRow href="/aktualnosci">
          <span>Aktualności</span>
        </MainNav.NavRow>

        <MainNav.NavRow href="/adopcja">
          <span>Adoptuj</span>
        </MainNav.NavRow>

        <MainNav.NavRow href="/o-nas">
          <span>O nas</span>
        </MainNav.NavRow>
        <MainNav.NavRow href="/wsparcie">
          <span>Wesprzyj</span>
        </MainNav.NavRow>
      </MainNav>
    </div>
  );
}
