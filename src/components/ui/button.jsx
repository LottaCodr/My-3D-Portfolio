import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * The single button primitive for the whole site (shadcn/ui pattern).
 *
 * Behaviour notes:
 * - `asChild` hands the styling to the child element through Radix Slot, so an
 *   anchor can look like a button without an <a> inside a <button>.
 * - Rendered <button>s default to `type="button"`; the contact form opts into
 *   `type="submit"` explicitly. This prevents accidental form submissions.
 * - Default and large sizes are at least 44px tall (WCAG 2.5.8 / Apple HIG).
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-[color:var(--on-accent)] shadow-[0_12px_32px_-14px_rgba(207,169,110,.65)] hover:bg-accentsoft",
        secondary:
          "border border-control bg-white/[0.04] text-fg hover:border-accent hover:bg-white/[0.07]",
        outline:
          "border border-control text-fg hover:border-accent hover:text-accent",
        ghost: "text-muted hover:bg-white/[0.06] hover:text-fg",
        link: "h-auto min-h-0 rounded-none p-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-3.5 text-[13px]",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px] sm:h-[52px] sm:px-7 sm:text-base",
        icon: "h-11 w-11",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", class: "h-auto min-h-0 px-0" },
      { variant: "link", size: "default", class: "h-auto min-h-0 px-0" },
      { variant: "link", size: "lg", class: "h-auto min-h-0 px-0" },
    ],
    defaultVariants: { variant: "primary", size: "default" },
  },
);

const Button = forwardRef(function Button(
  { className, variant, size, asChild = false, type, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

export { Button };
export default Button;
