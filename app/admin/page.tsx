import type { Metadata } from "next";
import AdminGate from "@/components/AdminGate";
import AdminDashboard from "@/components/AdminDashboard";

// Private internal tool — keep it out of search engines and social previews.
// (Note: as a static GitHub Pages export there is no server-side auth; the
// route is simply unlinked and non-indexed, not access-controlled.)
export const metadata: Metadata = {
  title: "Agent Quote Dashboard | Driftly Travels (Internal)",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  );
}
