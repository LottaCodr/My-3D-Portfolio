import { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils";

/**
 * Radix Label binds to its control with a real `for`/`id` pair, and clicking
 * it focuses the field, which is what makes the visible label a genuine hit
 * target instead of decoration.
 */
const Label = forwardRef(function Label({ className, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "flex items-baseline justify-between gap-3 text-sm font-medium text-fg",
        className,
      )}
      {...props}
    />
  );
});

export { Label };
export default Label;
