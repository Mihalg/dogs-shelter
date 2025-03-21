import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonthName(month: number) {
  switch (month) {
    case 1:
      return "Stycznia";
    case 2:
      return "Lutego";
    case 3:
      return "Marca";
    case 4:
      return "Kwietnia";
    case 5:
      return "Maja";
    case 6:
      return "Czerwca";
    case 7:
      return "Lipca";
    case 8:
      return "Sierpnia";
    case 9:
      return "Września";
    case 10:
      return "Października";
    case 11:
      return "Listopada";
    case 12:
      return "Grudnia";
  }
}
