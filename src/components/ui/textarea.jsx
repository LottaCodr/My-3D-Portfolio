import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[140px] w-full rounded-control border border-control bg-white/[0.02] px-4 py-3 text-[16px] text-fg",
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

export { Textarea };
export default Textarea;
