import * as React from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 " +
          "text-xs font-semibold text-primary shadow-sm backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
