import * as React from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
}

/** Standard spaced section wrapper with an optional centered heading block. */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-5 md:px-8",
          containerClassName
        )}
      >
        {(eyebrow || title || subtitle) && (
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base font-medium text-ink/60 md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
