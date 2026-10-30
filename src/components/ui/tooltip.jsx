import { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

/**
 * Tooltip primitive (Radix). Used only for supplementary labels on icon-only
 * controls: every tooltip target also carries an accessible name, so nothing
 * is lost when a tooltip is unavailable (touch, screen reader, reduced motion).
 */
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef(function TooltipContent(
  { className, sideOffset = 8, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-dialog max-w-[16rem] rounded-tag border border-line bg-cardhi px-2.5 py-1.5",
          "text-xs font-medium leading-snug text-fg shadow-lift",
          "data-[state=delayed-open]:animate-overlay-in data-[state=instant-open]:animate-overlay-in",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
export default Tooltip;
