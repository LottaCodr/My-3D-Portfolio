import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Close } from "./Icons";
import { cn } from "../../lib/utils";

/**
 * Dialog primitive (Radix) with the shadcn/ui composition.
 *
 * Radix owns the modal contract: focus is trapped, the page behind is made
 * inert for assistive tech, Escape closes, and focus returns to the trigger.
 * The panel is centred with `left/top + translate`, while the entrance
 * animation only animates the independent `scale` property, so the two never
 * fight over `transform`.
 */
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-overlay bg-bg/80 backdrop-blur-md",
        "data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out",
        className,
      )}
      {...props}
    />
  );
});

const DialogContent = forwardRef(function DialogContent(
  { className, children, showClose = true, ...props },
  ref,
) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-dialog w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
          "max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-line bg-card shadow-lift",
          "focus:outline-none data-[state=open]:animate-panel-in data-[state=closed]:animate-panel-out",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-control text-muted transition-colors hover:bg-white/[0.06] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Close width={18} height={18} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

const DialogHeader = forwardRef(function DialogHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 px-5 pb-2 pt-6 sm:px-6", className)}
      {...props}
    />
  );
});

const DialogFooter = forwardRef(function DialogFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse gap-2 px-5 pb-6 pt-4 sm:flex-row sm:justify-end sm:px-6", className)}
      {...props}
    />
  );
});

const DialogTitle = forwardRef(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold tracking-tight text-fg", className)}
      {...props}
    />
  );
});

const DialogDescription = forwardRef(function DialogDescription(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm leading-relaxed text-muted", className)}
      {...props}
    />
  );
});

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
export default Dialog;
