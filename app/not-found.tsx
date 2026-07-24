import Link from "next/link";
import { Compass } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 max-w-sm text-base font-medium text-ink/60">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back on the journey.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-btn bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Back to {BRAND.name}
      </Link>
    </main>
  );
}
