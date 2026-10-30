import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 *
 * This is the shadcn/ui convention: every local UI primitive accepts a
 * `className` prop that is merged last, so a call site can override any
 * utility without specificity fights.
 *
 * @param {...any} inputs class values accepted by clsx
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
