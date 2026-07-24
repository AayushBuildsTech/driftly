import { BRAND, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

/**
 * Opens a WhatsApp chat with the brand number and a pre-filled message.
 * Falls back to the default CTA message when none is provided.
 */
export function openWhatsApp(message: string = DEFAULT_WHATSAPP_MESSAGE): void {
  const url = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/** Builds the pre-filled enquiry message for a specific package. */
export function packageMessage(packageName: string): string {
  return `Hi ${BRAND.name}!\n\nI am interested in your ${packageName} package.\n\nPlease send me a custom quote.`;
}
