import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Badge / chip primitive. Replaces the hand-inlined `.chip` markup so status,
 * stack tags and categories all share one shape, one border and one text size.
 */
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-tag border font-medium leading-none",
  {
    variants: {
      variant: {
        muted: "border-linesoft bg-white/[0.03] text-muted",
        outline: "border-line bg-transparent text-muted",
        accent: "border-accent/30 bg-accent/10 text-accent",
        solid: "border-transparent bg-accent text-[color:var(--on-accent)]",
        success: "border-success/30 bg-success/10 text-success",
      },
      size: {
        sm: "px-2 py-1 text-[10px] tracking-[0.08em] uppercase",
        default: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "muted", size: "default" },
  },
);

const Badge = forwardRef(function Badge(
  { className, variant, size, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
});

export { Badge };
export default Badge;
