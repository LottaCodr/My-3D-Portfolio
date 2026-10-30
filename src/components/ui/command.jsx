import { forwardRef } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "./Icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./dialog";
import { cn } from "../../lib/utils";

/**
 * Command palette (shadcn/ui Command, built on cmdk).
 *
 * cmdk provides the listbox keyboard model: arrow keys move the active item,
 * Enter runs it, the input is a `combobox` wired to the active option with
 * `aria-activedescendant`, and results are announced as the filter changes.
 * The palette sits inside a Radix Dialog so modality, focus trapping and focus
 * return come from the primitive rather than from bespoke code.
 */
const Command = forwardRef(function Command({ className, ...props }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-card text-fg",
        className,
      )}
      {...props}
    />
  );
});

const CommandInput = forwardRef(function CommandInput({ className, ...props }, ref) {
  return (
    <div className="flex items-center gap-3 border-b border-linesoft px-4">
      <Search width={18} height={18} className="flex-none text-faint" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-14 w-full bg-transparent text-[16px] text-fg outline-none placeholder:text-faint disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <kbd className="kbd hidden sm:inline-flex">Esc</kbd>
    </div>
  );
});

const CommandList = forwardRef(function CommandList({ className, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[min(60vh,22rem)] overflow-y-auto overflow-x-hidden p-2", className)}
      {...props}
    />
  );
});

const CommandEmpty = forwardRef(function CommandEmpty({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn("px-3 py-8 text-center text-sm text-muted", className)}
      {...props}
    />
  );
});

const CommandGroup = forwardRef(function CommandGroup({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden text-fg",
        "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2",
        "[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px]",
        "[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.16em]",
        "[&_[cmdk-group-heading]]:text-faint",
        className,
      )}
      {...props}
    />
  );
});

const CommandSeparator = forwardRef(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("my-1 h-px bg-linesoft", className)}
      {...props}
    />
  );
});

const CommandItem = forwardRef(function CommandItem({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "group relative flex cursor-pointer select-none items-center gap-3 rounded-control px-3 py-2.5",
        "text-sm text-muted outline-none transition-colors duration-150",
        "data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-fg",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "[&_svg]:flex-none [&_svg]:text-faint group-data-[selected=true]:[&_svg]:text-accent",
        className,
      )}
      {...props}
    />
  );
});

const CommandShortcut = forwardRef(function CommandShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-faint", className)}
      {...props}
    />
  );
});

function CommandDialog({ open, onOpenChange, title = "Command menu", description, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showClose={false} className="max-w-xl p-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {description ? (
          <DialogDescription className="sr-only">{description}</DialogDescription>
        ) : null}
        <Command loop>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
export default Command;
