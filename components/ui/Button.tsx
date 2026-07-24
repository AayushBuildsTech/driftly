import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold " +
  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-60 " +
  "disabled:pointer-events-none select-none";

const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-sm md:text-base",
  lg: "h-12 px-6 text-base md:h-[52px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  whatsapp: "bg-accent text-white hover:bg-accent-dark",
  ghost: "text-primary hover:bg-primary/5",
  light: "bg-white text-primary hover:bg-white/90 shadow-sm",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Render the single child element (e.g. a <Link>) with button styling. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, type, asChild, children, ...props },
    ref
  ) => {
    const classes = cn(base, sizes[size], variants[variant], className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
