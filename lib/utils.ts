import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isClientSide() {
  try {
    const clientSide = window != undefined
    return true
  } catch (_) {
    return false
  }
}