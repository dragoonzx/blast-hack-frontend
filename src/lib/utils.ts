import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumberCompact(number: number) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
}

export const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
  return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
};