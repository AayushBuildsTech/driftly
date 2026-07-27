"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Calculator,
  Sparkles,
  DollarSign,
  ShieldCheck,
  MapPin,
  Receipt,
} from "lucide-react";

type VisaPreset = {
  status: string;
  note: string;
  net: number; // actual net cost per pax (₹)
  charge: number; // what we charge the client per pax (₹)
};

// Destination-wise visa strategy — actual Driftly Travels pricing.
const VISA_PRESETS: Record<string, VisaPreset> = {
  "Thailand 🇹🇭": {
    status: "Visa-Exempt (30-day) + TDAC",
    note: "Visa-Exempt for Indians (30-day stay). Requires a free online arrival declaration (TDAC). Charge is a pure assistance fee for TDAC completion & travel checklist.",
    net: 0,
    charge: 999,
  },
  "Bali 🇮🇩": {
    status: "e-VoA + Tourist Levy",
    note: "e-VoA (Visa on Arrival) + Tourist Levy, applied online (IDR 500k VoA + IDR 150k Levy ≈ ₹3,500). Charge includes official visa + processing.",
    net: 3500,
    charge: 4999,
  },
  "Dubai 🇦🇪": {
    status: "30-Day Tourist e-Visa",
    note: "30-Day Tourist e-Visa processed via a B2B portal (Tripjack / Riya). Net runs ₹6,500–₹7,200; charged ₹8,500–₹8,999.",
    net: 7000,
    charge: 8999,
  },
};

const DESTINATIONS = Object.keys(VISA_PRESETS);
const DURATIONS = ["5 Days / 4 Nights", "6 Days / 5 Nights"];
const MARKUP_PRESETS = [10, 12, 15, 18];

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function AdminDashboard() {
  const [destination, setDestination] = useState<string>("Bali 🇮🇩");

  // Net cost inputs
  const [flightNet, setFlightNet] = useState<number>(30000);
  const [hotelNet, setHotelNet] = useState<number>(51454);
  const [transferNet, setTransferNet] = useState<number>(6000);
  const [pax, setPax] = useState<number>(3);
  const [visaNetPerPax, setVisaNetPerPax] = useState<number>(
    VISA_PRESETS["Bali 🇮🇩"].net,
  );
  const [visaChargePerPax, setVisaChargePerPax] = useState<number>(
    VISA_PRESETS["Bali 🇮🇩"].charge,
  );
  const [markupPercent, setMarkupPercent] = useState<number>(12);

  // Itinerary metadata
  const [customerName, setCustomerName] = useState<string>("Rahul Sharma");
  const [duration, setDuration] = useState<string>("6 Days / 5 Nights");
  const [travelDates, setTravelDates] = useState<string>(
    "18th Dec - 23rd Dec 2026",
  );
  const [hotelName, setHotelName] = useState<string>(
    "Kuta Paradiso Hotel (4★ Resort)",
  );

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedBill, setCopiedBill] = useState(false);

  // Selecting a destination auto-fills that market's visa net & charge.
  const selectDestination = (dest: string) => {
    setDestination(dest);
    const preset = VISA_PRESETS[dest];
    if (preset) {
      setVisaNetPerPax(preset.net);
      setVisaChargePerPax(preset.charge);
    }
  };

  // ---- Live calculations ----
  const coreNet = flightNet + hotelNet + transferNet;
  const visaNetTotal = visaNetPerPax * pax;

  // Core markup applies only to the non-visa components; visa earns its own
  // fixed service margin (charge − net) per traveller.
  const coreMarkupProfit = Math.round(coreNet * (markupPercent / 100));
  const visaMarginPerPax = visaChargePerPax - visaNetPerPax;
  const visaServiceMargin = visaMarginPerPax * pax;

  const totalPackageNet = coreNet + visaNetTotal;
  const totalAgencyProfit = coreMarkupProfit + visaServiceMargin;
  const finalClientQuote = totalPackageNet + totalAgencyProfit;

  // Client-facing bill lines (grouped so the sum reconciles exactly).
  const clientPackagePrice = coreNet + coreMarkupProfit; // flights + hotel + transfers
  const clientVisaPrice = visaChargePerPax * pax;

  const activeVisa = VISA_PRESETS[destination];
  const numDays = duration.charAt(0);

  // ---- Client bill (WhatsApp / PDF ready) ----
  const clientBill = `🧾 DRIFTLY TRAVELS — HOLIDAY QUOTE

👤 Client: ${customerName}
📍 Destination: ${destination}
🗓️ ${duration}  |  ${travelDates}
👥 Travellers: ${pax} Pax

────────────────────────
✈️🏨🚗 Travel Package        ${inr(clientPackagePrice)}
   (Return flights, ${hotelName} with breakfast,
    private airport transfers)
🛂 Visa Assistance (${pax} pax)   ${inr(clientVisaPrice)}
   (${activeVisa.status})
────────────────────────
💰 TOTAL PAYABLE            ${inr(finalClientQuote)}
   Inclusive of all taxes & service fees.

✅ To confirm this quote, reply "CONFIRM" or call Driftly Travels.`;

  // ---- Gemini prompt synthesis ----
  const generatedGeminiPrompt = `Act as an elite international travel consultant for "Driftly Travels".

Generate a beautifully formatted, highly persuasive day-wise holiday itinerary that I can send directly to my client on WhatsApp or export as a PDF.

TRIP DETAILS:
- Client Name: ${customerName}
- Destination: ${destination}
- Duration: ${duration}
- Dates: ${travelDates}
- Travellers: ${pax} Pax
- Selected Hotel/Resort: ${hotelName}
- Total Customized Package Price: ${inr(
    finalClientQuote,
  )} total for ${pax} pax (Inclusive of all taxes, flights, hotel, transfers & visa support).

INCLUSIONS TO HIGHLIGHT:
1. Return Flights for all ${pax} travellers.
2. Stay at ${hotelName} with Daily Breakfast included.
3. Private Airport Pick-up & Drop-off in a dedicated air-conditioned vehicle (no shared buses).
4. Complete Visa Assistance & documentation support for all ${pax} pax (${activeVisa.status}).
5. 24/7 dedicated WhatsApp ground support throughout the trip.

FORMATTING REQUIREMENTS:
- Structure the response with clean headers, bullet points, and appropriate emojis.
- Provide a day-by-day breakdown (Day 1 to Day ${numDays}) keeping travel flow smooth and unhurried.
- Include a strong, high-trust call-to-action at the end: "To lock in this B2B rate voucher, reply 'CONFIRM' or call Driftly Travels."
- Keep the tone warm, professional, and luxurious.`;

  const copyText = (text: string, which: "prompt" | "bill") => {
    navigator.clipboard.writeText(text);
    if (which === "prompt") {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedBill(true);
      setTimeout(() => setCopiedBill(false), 2000);
    }
  };

  const numInputCls =
    "w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const metaInputCls =
    "w-full mt-1 p-2 border border-slate-300 rounded-md text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none";

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Driftly Travels — Agent Quote Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Live B2B Pricing Calculator, Visa Strategy &amp; Gemini Prompt
              Generator
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
            Status: B2B Operational
          </span>
        </div>

        {/* Destination selector */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" /> Select Destination
            <span className="text-xs font-normal text-slate-400">
              (auto-fills visa pricing)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DESTINATIONS.map((dest) => {
              const active = destination === dest;
              const preset = VISA_PRESETS[dest];
              return (
                <button
                  key={dest}
                  type="button"
                  onClick={() => selectDestination(dest)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    active
                      ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      {dest}
                    </span>
                    {active && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                    {preset.status}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Charge {inr(preset.charge)}/pax · Profit ~
                    {inr(preset.charge - preset.net)}/pax
                  </p>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <span className="font-semibold text-slate-700">
              {destination}:
            </span>{" "}
            {activeVisa.note}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Pricing Calculator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" /> 1. Net Cost &amp;
              Markup Calculator
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Flight Net Cost (Tripjack Net Fare)
                </label>
                <input
                  type="number"
                  value={flightNet}
                  onChange={(e) => setFlightNet(Number(e.target.value))}
                  className={numInputCls}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Hotel Net Cost (Tripjack / TBO, incl. Breakfast)
                </label>
                <input
                  type="number"
                  value={hotelNet}
                  onChange={(e) => setHotelNet(Number(e.target.value))}
                  className={numInputCls}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Airport Pick-up &amp; Drop-off Net Cost (Transfers)
                </label>
                <input
                  type="number"
                  value={transferNet}
                  onChange={(e) => setTransferNet(Number(e.target.value))}
                  className={numInputCls}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Number of Travellers / Pax
                </label>
                <input
                  type="number"
                  min={1}
                  value={pax}
                  onChange={(e) =>
                    setPax(Math.max(1, Number(e.target.value)))
                  }
                  className={numInputCls}
                />
              </div>

              {/* Visa: net vs charge → service margin (auto-filled by destination) */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Visa
                  Assistance — {destination} (per pax)
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className="text-[11px] font-medium text-slate-500">
                      Visa Net Cost / Pax
                    </label>
                    <input
                      type="number"
                      value={visaNetPerPax}
                      onChange={(e) =>
                        setVisaNetPerPax(Number(e.target.value))
                      }
                      className={numInputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-500">
                      Visa Charge / Pax
                    </label>
                    <input
                      type="number"
                      value={visaChargePerPax}
                      onChange={(e) =>
                        setVisaChargePerPax(Number(e.target.value))
                      }
                      className={numInputCls}
                    />
                  </div>
                </div>
                <p className="mt-2 text-[11px] font-medium text-slate-500">
                  Visa service margin:{" "}
                  <span
                    className={
                      visaMarginPerPax >= 0
                        ? "text-emerald-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {inr(visaMarginPerPax)}/pax × {pax} = {inr(visaServiceMargin)}
                  </span>
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Core Markup % (on flights + hotel + transfers)
                </label>
                <div className="flex gap-2 mt-1">
                  {MARKUP_PRESETS.map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setMarkupPercent(pct)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        markupPercent === pct
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-900 text-white rounded-xl">
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  Total Package Net
                </p>
                <p className="mt-1 text-lg font-bold font-mono text-white">
                  {inr(totalPackageNet)}
                </p>
              </div>
              <div className="p-4 bg-slate-900 text-white rounded-xl">
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  Total Agency Profit
                </p>
                <p className="mt-1 text-lg font-bold font-mono text-emerald-400">
                  +{inr(totalAgencyProfit)}
                </p>
              </div>
              <div className="p-4 bg-slate-900 text-white rounded-xl ring-1 ring-amber-500/40">
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  Final Client Quote
                </p>
                <p className="mt-1 text-lg font-bold font-mono text-amber-400">
                  {inr(finalClientQuote)}
                </p>
              </div>
            </div>

            {/* Profit breakdown */}
            <div className="p-4 bg-slate-100 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Core net (flights + hotel + transfers)</span>
                <span className="font-mono">{inr(coreNet)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Visa net ({inr(visaNetPerPax)} × {pax} pax)</span>
                <span className="font-mono">{inr(visaNetTotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Core markup profit ({markupPercent}%)</span>
                <span className="font-mono">+{inr(coreMarkupProfit)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Visa service margin ({pax} pax)</span>
                <span className="font-mono">+{inr(visaServiceMargin)}</span>
              </div>
            </div>
          </div>

          {/* RIGHT column */}
          <div className="space-y-8">
            {/* Client Bill */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-600" /> 2. Final Client
                Bill
              </h2>

              <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-sm">
                <div className="flex justify-between px-4 py-3">
                  <span className="text-slate-600">
                    ✈️🏨🚗 Travel Package
                  </span>
                  <span className="font-mono font-semibold text-slate-900">
                    {inr(clientPackagePrice)}
                  </span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-slate-600">
                    🛂 Visa Assistance ({pax} pax)
                  </span>
                  <span className="font-mono font-semibold text-slate-900">
                    {inr(clientVisaPrice)}
                  </span>
                </div>
                <div className="flex justify-between px-4 py-3 bg-amber-50">
                  <span className="font-semibold text-slate-800">
                    Total Payable
                  </span>
                  <span className="font-mono text-lg font-bold text-amber-600">
                    {inr(finalClientQuote)}
                  </span>
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={9}
                  value={clientBill}
                  className="w-full p-3 pt-10 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl border border-slate-800 focus:outline-none resize-none"
                />
                <button
                  onClick={() => copyText(clientBill, "bill")}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all shadow-md"
                >
                  {copiedBill ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedBill ? "Copied!" : "Copy Bill"}
                </button>
              </div>
            </div>

            {/* Gemini Prompt Generator */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" /> 3. Generate
                Gemini Prompt (PDF / WhatsApp)
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-medium text-slate-600">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={metaInputCls}
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-600">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className={metaInputCls}
                  >
                    {DURATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-600">
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    className={metaInputCls}
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-600">
                    Hotel Name
                  </label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className={metaInputCls}
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={12}
                  value={generatedGeminiPrompt}
                  className="w-full p-3 pt-12 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl border border-slate-800 focus:outline-none resize-none"
                />
                <button
                  onClick={() => copyText(generatedGeminiPrompt, "prompt")}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all shadow-md"
                >
                  {copiedPrompt ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedPrompt ? "Copied!" : "Copy Prompt"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visa strategy overview table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> Destination-Wise
            Visa Overview &amp; Profit Strategy
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-2 pr-4 font-semibold">Destination</th>
                  <th className="py-2 pr-4 font-semibold">Official Visa Status</th>
                  <th className="py-2 pr-4 font-semibold text-right">
                    Actual Cost
                  </th>
                  <th className="py-2 pr-4 font-semibold text-right">
                    Client Charge
                  </th>
                  <th className="py-2 font-semibold text-right">
                    Profit / Pax
                  </th>
                </tr>
              </thead>
              <tbody>
                {DESTINATIONS.map((dest) => {
                  const p = VISA_PRESETS[dest];
                  const active = destination === dest;
                  return (
                    <tr
                      key={dest}
                      className={`border-b border-slate-100 ${
                        active ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="py-3 pr-4 font-semibold text-slate-900 whitespace-nowrap">
                        {dest}
                      </td>
                      <td className="py-3 pr-4 text-slate-600 max-w-xs">
                        {p.note}
                      </td>
                      <td className="py-3 pr-4 text-right font-mono text-slate-700 whitespace-nowrap">
                        {p.net === 0 ? "₹0 (Free)" : `~${inr(p.net)}`}
                      </td>
                      <td className="py-3 pr-4 text-right font-mono font-semibold text-slate-900 whitespace-nowrap">
                        {inr(p.charge)}
                      </td>
                      <td className="py-3 text-right font-mono font-semibold text-emerald-600 whitespace-nowrap">
                        ~{inr(p.charge - p.net)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-slate-400">
            Costs are indicative and fluctuate with FX &amp; official fees —
            always confirm the live net rate before quoting.
          </p>
        </div>
      </div>
    </main>
  );
}
