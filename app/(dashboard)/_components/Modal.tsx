"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../../_components/Button";

type ModalContextTypes = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextTypes | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModalContext has to be used within <modalContext.Provider>",
    );
  }

  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) router.push(pathname);
  }, [isOpen, pathname, router]);

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, isLoading, setIsLoading }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function ModalTrigger({
  loading = false,
  children,
  className,
  onClick,
}: {
  loading?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { setIsOpen, setIsLoading } = useModalContext();

  return (
    <Button
      className={className}
      onClick={() => {
        setIsOpen((open) => !open);
        onClick?.();
        setIsLoading(loading);
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
