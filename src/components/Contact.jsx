import { useState } from "react";
import { SectionWrapper } from "../hoc";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { profile, socials } from "../constants";
import { Alert, ArrowUpRight, Check, Mail, Pin, Whatsapp } from "./ui/Icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please tell me what to call you.";
  if (!email.trim()) errors.email = "An email address is required so I can reply.";
  else if (!EMAIL_RE.test(email.trim()))
    errors.email = "That email address doesn't look right — check for a typo.";
  if (!message.trim()) errors.message = "A sentence or two about the project is enough.";
  else if (message.trim().length < 12)
    errors.message = "Just a little more detail so I can reply usefully.";
  return errors;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-fg"
      >
        {label}
        {hint && <span className="text-xs font-normal text-faint">{hint}</span>}
      </label>
      {children}
      {/* Error is text, never colour alone, and is wired via aria-describedby.
          WCAG 3.3.1 / 3.3.3 */}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-sm text-[#f0a1a1]"
        >
          <Alert width={15} height={15} className="mt-0.5 flex-none" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white/[0.02] px-4 py-3 text-fg placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none ${
    hasError ? "border-[#f0a1a1]/60" : "border-line"
  }`;

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sent

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    // Clear a field's error as soon as it becomes valid, not on blur only.
    if (errors[key] && !validate(next)[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      // Move focus to the first invalid control.
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    /* No backend on a static portfolio — compose the mail client instead.
       Honest, and it works offline. */
    const subject = encodeURIComponent(`Project enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  const shared = {
    // 16px minimum, or iOS zooms the page on focus. See docs/ux-research.md §1.2
    style: { fontSize: "16px" },
    required: true,
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field id="name" label="Your name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={values.name}
          onChange={set("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass(!!errors.name)}
          {...shared}
        />
      </Field>

      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={set("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(!!errors.email)}
          {...shared}
        />
      </Field>

      <Field
        id="message"
        label="What are you building?"
        hint="A few lines is plenty"
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Timeline, scope, and what success looks like…"
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass(!!errors.message)} resize-y`}
          {...shared}
        />
      </Field>

      <button type="submit" className="btn btn--primary btn--lg btn--block">
        <Mail width={18} height={18} />
        Send message
      </button>

      {/* WCAG 4.1.3 — status announced without stealing focus. */}
      <p aria-live="polite" role="status" className="text-sm text-muted">
        {status === "sent" ? (
          <span className="flex items-center gap-2 text-accent">
            <Check width={16} height={16} />
            Opening your mail app… if nothing happens, write to{" "}
            <a
              href={`mailto:${profile.email}`}
              className="underline underline-offset-4"
            >
              {profile.email}
            </a>
            .
          </span>
        ) : (
          "Replies usually land within 24 hours."
        )}
      </p>
    </form>
  );
}

function Contact() {
  const iconFor = (label) =>
    label === "WhatsApp" ? Whatsapp : label === "GitHub" ? ArrowUpRight : Mail;

  return (
    <>
      <SectionHeading
        eyebrow="Get in touch"
        title="Tell me what you're building."
        lede="Freelance projects, full-time roles, or a build you're stuck on — the fastest way to reach me is the form, or WhatsApp if it's urgent."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal className="space-y-8">
          <ul className="space-y-3">
            {socials.map((s) => {
              const Icon = iconFor(s.label);
              const external = !s.href.startsWith("mailto:");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex min-h-[44px] items-center gap-4 rounded-lg border border-linesoft p-4 transition-colors duration-200 hover:border-accent/40 hover:bg-accent/[0.04]"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-accent">
                      <Icon width={18} height={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-fg">
                        {s.label}
                      </span>
                      <span className="block truncate text-sm text-muted">
                        {s.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="flex-none text-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="space-y-3 border-t border-linesoft pt-7 text-sm text-muted">
            <p className="flex items-center gap-2.5">
              <Pin width={16} height={16} className="flex-none text-accent" />
              {profile.location} — remote-first, overlapping with GMT/BST and US East
            </p>
            <p className="flex items-center gap-2.5">
              <Check width={16} height={16} className="flex-none text-accent" />
              {profile.availability}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="card p-6 sm:p-8">
          <ContactForm />
        </Reveal>
      </div>
    </>
  );
}

export default SectionWrapper(Contact, "contact");
