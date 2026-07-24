"use client";

import * as React from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DESTINATIONS, MONTHS } from "@/lib/constants";
import { submitLead } from "@/lib/formsubmit";
import { openWhatsApp } from "@/lib/whatsapp";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  phone: string;
  destination: string;
  travel_month: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = {
  name: "",
  phone: "",
  destination: "",
  travel_month: "",
};

function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name (min 2 characters).";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = "Enter a valid phone number (10–15 digits).";
  }

  if (!DESTINATIONS.includes(values.destination)) {
    errors.destination = "Please select a destination.";
  }

  if (!MONTHS.includes(values.travel_month)) {
    errors.travel_month = "Please select a preferred month.";
  }

  return errors;
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [values, setValues] = React.useState<FormValues>(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const firstFieldRef = React.useRef<HTMLInputElement>(null);
  const titleId = React.useId();

  // Reset everything when the modal is (re)opened.
  React.useEffect(() => {
    if (isOpen) {
      setValues(EMPTY);
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen]);

  // Lock body scroll while open.
  React.useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Focus the first field on open.
  React.useEffect(() => {
    if (isOpen && status === "idle") {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, status]);

  // Escape to close + basic focus trap.
  React.useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    const result = await submitLead(values);
    setStatus(result.success ? "success" : "error");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-black/65 backdrop-blur-sm"
          />

          {/* Dialog */}
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl md:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-ink/50 transition-colors hover:bg-line hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {status === "success" ? (
              <SuccessState onClose={onClose} titleId={titleId} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2
                  id={titleId}
                  className="text-2xl font-bold text-ink"
                >
                  Request a Callback
                </h2>
                <p className="mt-1.5 text-sm font-medium text-ink/60">
                  Share a few details and a travel specialist will call you back.
                </p>

                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-4 rounded-btn border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
                  >
                    <p>
                      Something went wrong. Please try again or contact us on
                      WhatsApp.
                    </p>
                    <Button
                      variant="whatsapp"
                      size="md"
                      className="mt-3 w-full"
                      onClick={() => openWhatsApp()}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Chat on WhatsApp
                    </Button>
                  </div>
                )}

                <div className="mt-5 space-y-4">
                  <Field
                    label="Full Name"
                    error={errors.name}
                    htmlFor="cb-name"
                  >
                    <input
                      ref={firstFieldRef}
                      id="cb-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      className={inputClass(!!errors.name)}
                      placeholder="Jane Doe"
                    />
                  </Field>

                  <Field label="Phone" error={errors.phone} htmlFor="cb-phone">
                    <input
                      id="cb-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      className={inputClass(!!errors.phone)}
                      placeholder="+91 99999 99999"
                    />
                  </Field>

                  <Field
                    label="Destination"
                    error={errors.destination}
                    htmlFor="cb-destination"
                  >
                    <select
                      id="cb-destination"
                      name="destination"
                      value={values.destination}
                      onChange={(e) => update("destination", e.target.value)}
                      aria-invalid={!!errors.destination}
                      className={inputClass(!!errors.destination)}
                    >
                      <option value="" disabled>
                        Select a destination
                      </option>
                      {DESTINATIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Preferred Month"
                    error={errors.travel_month}
                    htmlFor="cb-month"
                  >
                    <select
                      id="cb-month"
                      name="travel_month"
                      value={values.travel_month}
                      onChange={(e) => update("travel_month", e.target.value)}
                      aria-invalid={!!errors.travel_month}
                      className={inputClass(!!errors.travel_month)}
                    >
                      <option value="" disabled>
                        Select a month
                      </option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="mt-6 w-full"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Request Callback"
                  )}
                </Button>
              </form>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-btn border bg-white px-3.5 py-3 text-sm font-medium text-ink",
    "outline-none transition-colors placeholder:text-ink/40",
    "focus:border-primary focus:ring-2 focus:ring-primary/20",
    hasError ? "border-red-400" : "border-line",
  ].join(" ");
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-ink"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}

function SuccessState({
  onClose,
  titleId,
}: {
  onClose: () => void;
  titleId: string;
}) {
  return (
    <div className="py-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        <CheckCircle2 className="h-9 w-9 text-accent" aria-hidden />
      </div>
      <h2 id={titleId} className="mt-5 text-2xl font-bold text-ink">
        Callback Request Received!
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-sm font-medium text-ink/60">
        One of our travel specialists will contact you shortly.
      </p>
      <Button size="lg" className="mt-6 w-full" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
