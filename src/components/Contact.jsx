import { useState } from "react";
import { SectionWrapper } from "../hoc";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { useCopyToClipboard } from "../lib/clipboard";
import { profile, socials } from "../constants";
import {
  Alert,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Github,
  Mail,
  Pin,
  Whatsapp,
} from "./ui/Icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please tell me what to call you.";
  if (!email.trim()) errors.email = "An email address is required so I can reply.";
  else if (!EMAIL_RE.test(email.trim()))
    errors.email = "That email address doesn't look right. Check for a typo.";
  if (!message.trim())
    errors.message = "A sentence or two about the project is enough.";
  else if (message.trim().length < 12)
    errors.message = "Just a little more detail so I can reply usefully.";
  return errors;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {hint && <span className="text-xs font-normal text-faint">{hint}</span>}
      </Label>
      <div className="mt-2">{children}</div>
      {/* Error is text, never colour alone, and is wired via aria-describedby.
          WCAG 3.3.1 / 3.3.3 */}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-sm text-danger"
        >
          <Alert width={15} height={15} className="mt-0.5 flex-none" />
          {error}
        </p>
      )}
    </div>
  );
}

function CopyEmailButton() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => copy(profile.email)}
            aria-label={`Copy email address, ${profile.email}`}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-control text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copied ? (
              <Check width={17} height={17} className="text-success" />
            ) : (
              <Copy width={17} height={17} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {copied ? "Copied to clipboard" : "Copy email address"}
        </TooltipContent>
      </Tooltip>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to the clipboard." : ""}
      </span>
    </>
  );
}

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
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    /* No backend on a static portfolio: compose the mail client instead.
       Honest, and it works offline. */
    const subject = encodeURIComponent(`Project enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field id="name" label="Your name" error={errors.name}>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={values.name}
          onChange={set("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
      </Field>

      <Field id="email" label="Email" error={errors.email}>
        <Input
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
          required
        />
      </Field>

      <Field
        id="message"
        label="What are you building?"
        hint="A few lines is plenty"
        error={errors.message}
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Timeline, scope, and what success looks like."
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="resize-y"
          required
        />
      </Field>

      <Button type="submit" size="lg" className="w-full">
        <Mail width={18} height={18} />
        Send message
      </Button>

      {/* WCAG 4.1.3: status announced without stealing focus. */}
      <p aria-live="polite" role="status" className="text-sm text-muted">
        {status === "sent" ? (
          <span className="flex flex-wrap items-center gap-2 text-accent">
            <Check width={16} height={16} />
            Opening your mail app. If nothing happens, write to{" "}
            <a
              href={`mailto:${profile.email}`}
              className="underline underline-offset-4"
            >
              {profile.email}
            </a>
          </span>
        ) : (
          "Replies usually land within 24 hours."
        )}
      </p>
    </form>
  );
}

const iconFor = (label) => {
  if (label === "WhatsApp") return Whatsapp;
  if (label === "GitHub") return Github;
  return Mail;
};

const details = [
  { icon: Clock, label: "Response time", value: "Within 24 hours, Monday to Saturday" },
  { icon: Pin, label: "Timezone", value: "UTC+1, overlapping with GMT, CET and US East" },
];

function Contact({ headingId }) {
  return (
    <>
      <SectionHeading
        index="04"
        eyebrow="Get in touch"
        headingId={headingId}
        title="Tell me what you're building."
        lede="Freelance projects, full-time roles, or a build you are stuck on. The fastest route is the form, or WhatsApp if it is urgent."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal className="space-y-4">
          <ul className="space-y-3">
            {socials.map((social) => {
              const Icon = iconFor(social.label);
              const external = !social.href.startsWith("mailto:");
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex min-h-[44px] items-center gap-4 rounded-lg border border-control bg-card p-4 transition-colors duration-200 hover:border-accent/40 hover:bg-accent/[0.04]"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-accent">
                      <Icon width={18} height={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-fg">
                        {social.label}
                      </span>
                      <span className="block truncate text-sm text-muted">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="flex-none text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <Card className="p-5">
            <p className="eyebrow">Good to know</p>
            <dl className="mt-4 space-y-4">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3">
                  <detail.icon
                    width={16}
                    height={16}
                    className="mt-0.5 flex-none text-accent"
                  />
                  <div>
                    <dt className="text-sm font-medium text-fg">{detail.label}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted">
                      {detail.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6 sm:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-fg">Start a project</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Send the outline and I will reply with next steps. No forms
                  lost to a queue.
                </p>
              </div>
              <CopyEmailButton />
            </div>

            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </>
  );
}

export default SectionWrapper(Contact, "contact");
