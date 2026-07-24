"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { fallbackFor } from "@/lib/images";
import { asset } from "@/lib/constants";

/**
 * next/image wrapper that (a) prefixes local paths with the GitHub Pages base
 * path — needed because unoptimized images don't get basePath automatically —
 * and (b) swaps to an Unsplash fallback if the local asset isn't present yet.
 */
export function ImageWithFallback({ src, alt, ...props }: ImageProps) {
  const original = typeof src === "string" ? src : "";
  const resolved: ImageProps["src"] = original.startsWith("/")
    ? asset(original)
    : src;

  const [current, setCurrent] = React.useState<ImageProps["src"]>(resolved);
  const [errored, setErrored] = React.useState(false);

  // Reset if the source prop changes.
  React.useEffect(() => {
    setCurrent(resolved);
    setErrored(false);
  }, [resolved]);

  return (
    <Image
      {...props}
      alt={alt}
      src={current}
      onError={() => {
        if (!errored && original) {
          setErrored(true);
          setCurrent(fallbackFor(original));
        }
      }}
    />
  );
}
