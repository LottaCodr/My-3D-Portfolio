import { forwardRef } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../../lib/utils";

/**
 * Segmented filter control built on the Radix ToggleGroup.
 *
 * `type="multiple"` is intentional: it renders each item as a
 * `<button aria-pressed>`, which is the correct affordance for a filter set
 * (radio semantics would announce a single choice when the user is really
 * toggling views). Arrow-key roving focus and the pressed state come from the
 * primitive, so the visual `data-state` and the announced state cannot drift.
 */
const ToggleGroup = forwardRef(function ToggleGroup({ className, ...props }, ref) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
});

const ToggleGroupItem = forwardRef(function ToggleGroupItem(
  { className, ...props },
  ref,
) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-control px-4",
        "bg-white/[0.02] text-sm font-medium text-muted transition-colors duration-200",
        "hover:border-accent/50 hover:text-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-[color:var(--on-accent)]",
        className,
      )}
      {...props}
    />
  );
});

export { ToggleGroup, ToggleGroupItem };
export default ToggleGroup;
