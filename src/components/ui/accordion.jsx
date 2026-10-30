import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "./Icons";
import { cn } from "../../lib/utils";

/**
 * Accordion, built on the Radix primitive (shadcn/ui pattern).
 *
 * Radix supplies the WAI-ARIA accordion keyboard model (Up/Down/Home/End,
 * Enter/Space to toggle), `aria-expanded` / `aria-controls` wiring and the
 * heading/region relationship. The height animation is driven by the
 * `--radix-accordion-content-height` custom property it publishes, which is
 * why it never needs a measured pixel value in JavaScript.
 */
const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef(function AccordionItem(
  { className, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b border-linesoft last:border-b-0", className)}
      {...props}
    />
  );
});

const AccordionTrigger = forwardRef(function AccordionTrigger(
  { className, children, headerClassName, indicator, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Header className={cn("flex", headerClassName)}>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-start gap-4 rounded-md text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg",
          className,
        )}
        {...props}
      >
        {children}
        {indicator ?? (
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-control text-muted transition-colors duration-200 group-hover:border-accent/50 group-hover:text-accent group-data-[state=open]:border-accent group-data-[state=open]:bg-accent group-data-[state=open]:text-[color:var(--on-accent)]"
          >
            <ChevronDown
              width={16}
              height={16}
              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
          </span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

const AccordionContent = forwardRef(function AccordionContent(
  { className, children, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm",
        "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export default Accordion;
