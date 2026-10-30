import { forwardRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Text input. 16px type is a hard requirement, not a preference: iOS zooms the
 * whole page when a focused field is smaller. Errors are styled from
 * `aria-invalid`, so the visual state cannot drift from the announced one.
 */
const Input = forwardRef(function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-control bg-white/[0.02] px-4 text-[16px] text-fg",
        "placeholder:text-faint transition-colors duration-200",
        "hover:border-line focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        "aria-[invalid=true]:border-danger/70 aria-[invalid=true]:focus-visible:ring-danger/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

export { Input };
export default Input;
