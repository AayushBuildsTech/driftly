import { Download } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { asset } from "@/lib/constants";
import type { TravelPackage } from "@/types/package";

interface Props
  extends Omit<ButtonProps, "onClick" | "children" | "asChild"> {
  pkg: TravelPackage;
  label?: string;
}

/** Downloads the destination's ready-made itinerary PDF from /public. */
export function DownloadItineraryButton({
  pkg,
  label = "Download Itinerary",
  ...buttonProps
}: Props) {
  return (
    <Button asChild {...buttonProps}>
      <a
        href={asset(pkg.itineraryPdf)}
        download
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download the ${pkg.name} itinerary PDF`}
      >
        <Download className="h-4 w-4" aria-hidden />
        {label}
      </a>
    </Button>
  );
}
