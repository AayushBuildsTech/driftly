/**
 * Temporary Unsplash fallbacks used until the AI-generated files listed in
 * ai_prompts.md are dropped into /public/images/. Once real assets exist, the
 * local paths load and these are never requested. Safe to delete this file and
 * the ImageWithFallback fallback prop after the images are added.
 */
const UNSPLASH = {
  beach:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=70",
  thailand:
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=70",
  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=70",
  bali:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=70",
} as const;

/** Picks a sensible Unsplash fallback based on the local image filename. */
export function fallbackFor(src: string): string {
  if (src.includes("thailand")) return UNSPLASH.thailand;
  if (src.includes("dubai")) return UNSPLASH.dubai;
  if (src.includes("bali")) return UNSPLASH.bali;
  return UNSPLASH.beach;
}
