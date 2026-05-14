import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function getLevelDots(level: number, maxLevel: number): string[] {
  return Array.from({ length: maxLevel }, (_, i) =>
    i < level ? "filled" : "empty"
  );
}