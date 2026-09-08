/* Small reusable surfaces: chips, stat blocks, the availability pill. */

export function Chip({ children, className = "", ...rest }) {
  return (
    <span className={`chip ${className}`} {...rest}>
      {children}
    </span>
  );
}

/** Live availability indicator with an animated ring. */
export function AvailabilityPill({ text }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-2 pl-3 pr-4 text-sm text-muted">
      <span className="relative flex h-2 w-2 flex-none">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {text}
    </span>
  );
}

/** Metric block — used in the hero and inside case studies. */
export function Metric({ value, label, suffix = "" }) {
  return (
    <div>
      <p className="tnum text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {value}
        {suffix && <span className="text-accent">{suffix}</span>}
      </p>
      <p className="mt-1 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}
