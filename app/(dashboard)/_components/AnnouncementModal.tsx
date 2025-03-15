"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button } from "./Button";

type ModalContextTypes = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextTypes | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModalContext has to be used within <modalContext.Provider>",
    );
  }

  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalTrigger({ children }: { children: ReactNode }) {
  const { setIsOpen } = useModalContext();

  return (
    <Button
      onClick={() => {
        setIsOpen((open) => !open);
      }}
    >
      {children}
    </Button>
  );
}

export function ModalContent({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useModalContext();

  return isOpen ? (
    <div className="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-dark-400/40 backdrop-blur-sm">
      <div className="relative h-4/5 w-4/5 overflow-auto rounded-md bg-white px-6 pb-4 pt-8">
        <button
          onClick={() => {
            setIsOpen((open) => !open);
          }}
          className="absolute right-[24px] top-[14px] text-4xl"
        >
          &#10005;
        </button>

        {children}
      </div>
    </div>
  ) : null;
}
