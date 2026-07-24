import { BRAND } from "@/lib/constants";

export interface LeadPayload {
  name: string;
  phone: string;
  destination: string;
  travel_month: string;
}

export interface SubmitResult {
  success: boolean;
  message?: string;
}

/** Removes control characters and trims a user-supplied string. */
function sanitize(value: string): string {
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    // Drop C0 control chars (0-31) and DEL (127); keep everything else.
    if (code > 31 && code !== 127) {
      out += ch;
    }
  }
  return out.trim();
}

/**
 * Submits a callback lead to FormSubmit (https://formsubmit.co) — a free,
 * key-less form backend that emails submissions to BRAND.email.
 *
 * NOTE: The first time a submission is sent, FormSubmit emails BRAND.email a
 * one-time "Activate Form" confirmation. Click it once and every submission
 * after that is delivered automatically.
 */
export async function submitLead(lead: LeadPayload): Promise<SubmitResult> {
  try {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(
      BRAND.email
    )}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "NEW LEAD: Driftly Travels Callback Request",
        _template: "table",
        _captcha: "false",
        name: sanitize(lead.name),
        phone: sanitize(lead.phone),
        destination: sanitize(lead.destination),
        travel_month: sanitize(lead.travel_month),
      }),
    });

    const data = await response.json();
    // FormSubmit returns success as the string "true" (or boolean true).
    if (response.ok && (data.success === true || data.success === "true")) {
      return { success: true };
    }
    return { success: false, message: data.message ?? "Submission failed." };
  } catch {
    return { success: false, message: "Network error." };
  }
}
