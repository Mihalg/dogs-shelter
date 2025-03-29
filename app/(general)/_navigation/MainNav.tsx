"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useOutsideClick } from "../../_hooks/useOutsideClick";

type MainNavContext = {
  toggleMenu: () => void;
};

type MainNavProps = PropsWithChildren & {
  isActive: boolean;
  toggleMenu: () => void;
};

type NavRowWithTo = {
  children: ReactNode;
  href: string;
  nestedLinks?: never;
};

type NavRowWithLinks = {
  children: ReactNode;
  href?: never;
  nestedLinks: ReactElement;
};

type NavRowProps = NavRowWithTo | NavRowWithLinks;

type NavRowNested = {
  children: ReactNode;
  href: string;
};

const MainNavContext = createContext<MainNavContext | null>(null);

const useMainNavContext = () => {
  const context = useContext(MainNavContext);

  if (!context) {
    throw new Error(
      "useMainNavContext has to be used within <MainNavContext.Provider>",
    );
  }

  return context;
};

export default function MainNav({
  children,
  isActive,
  toggleMenu,
}: MainNavProps) {
  const ref = useOutsideClick(() => {
    if (isActive) toggleMenu();
  });

  return (
    <MainNavContext.Provider value={{ toggleMenu }}>
      <nav
        ref={ref}
        className={`fixed left-0 top-0 z-10 h-dvh w-72 border-r-[1px] border-r-dark-100 bg-light-100/50 py-3 backdrop-blur-xl ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } flex transition-transform lg:relative lg:h-[50px] lg:w-full lg:translate-x-0 lg:border-none lg:bg-light-100 lg:p-0`}
      >
        <ul className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-2 lg:w-full lg:flex-row lg:space-y-0 lg:px-4">
          {children}
        </ul>
      </nav>
    </MainNavContext.Provider>
  );
}

function NavRow({ children, href, nestedLinks }: NavRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { toggleMenu } = useMainNavContext();
  const pathname = usePathname();

  function toggle() {
    setIsOpen(true);
  }

  if (!href)
    return (
      <li
        onClick={toggle}
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        className={`has-active-child h-[50px] w-full min-w-[150px] max-w-[200px] cursor-default rounded-md text-xl text-dark-200 transition-colors hover:bg-primary-100 hover:text-light-100`}
      >
        <span className="flex flex-col items-center">
          <div className="flex h-full w-full items-center justify-center gap-4 px-4 py-3">
            {children}
          </div>

          <ul
            className={`-mt-[2px] w-full overflow-hidden pl-4 lg:px-0 lg:pl-4 ${isOpen ? "max-h-96" : "max-h-0"} transition-all`}
          >
            {nestedLinks}
          </ul>
        </span>
      </li>
    );

  return (
    <li className="h-[50px] w-full min-w-[150px] max-w-[200px] rounded-md text-center">
      <Link
        href={href}
        className={`flex h-full items-center justify-center gap-4 rounded-md px-4 py-2 text-xl text-dark-200 transition-colors hover:bg-primary-100 hover:text-white ${pathname.includes(href) ? "bg-primary-100 text-white" : ""}`}
        onClick={toggleMenu}
      >
        {children}
      </Link>
    </li>
  );
}

function NavRowNested({ children, href }: NavRowNested) {
  const { toggleMenu } = useMainNavContext();
  const pathname = usePathname();

  return (
    <li
      className={`ml-auto overflow-hidden rounded-r-md border-l-[2px] border-l-dark-100 bg-light-100 text-dark-200 transition-colors hover:border-l-primary-100 hover:bg-light-200 lg:ml-0 lg:text-xl ${pathname.includes(href) ? "active border-l-primary-100 bg-light-200 text-primary-100" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleMenu();
      }}
    >
      <Link className="block w-full px-2 py-2" href={href}>
        {children}
      </Link>
    </li>
  );
}

MainNav.NavRow = NavRow;
MainNav.NavRowNested = NavRowNested;
