import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Card } from "@repo/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}