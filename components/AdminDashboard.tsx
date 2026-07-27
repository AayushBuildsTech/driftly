"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Calculator,
  Sparkles,
  DollarSign,
} from "lucide-react";

const DESTINATIONS = ["Thailand 🇹🇭", "Dubai 🇦🇪", "Bali 🇮🇩"];
const DURATIONS = ["5 Days / 4 Nights", "6 Days / 5 Nights"];
const INCLUSION_OPTIONS = [
  "Private Driver",
  "Daily Breakfast",
  "Airport Transfers",
  "Water Sports",
  "Visa Support",
];
const MARKUP_PRESETS = [10, 12, 15, 18];

export default function AdminDashboard() {
  // Calculator State
  const [flightNet, setFlightNet] = useState<number>(30000);
  const [hotelNet, setHotelNet] = useState<number>(51454);
  const [groundNet, setGroundNet] = useState<number>(12000);
  const [markupPercent, setMarkupPercent] = useState<number>(12);

  // Itinerary Metadata State
  const [customerName, setCustomerName] = useState<string>("Rahul Sharma");
  const [destination, setDestination] = useState<string>("Bali 🇮🇩");
  const [duration, setDuration] = useState<string>("6 Days / 5 Nights");
  const [travelDates, setTravelDates] = useState<string>(
    "18th Dec - 23rd Dec 2026",
  );
  const [paxDetails, setPaxDetails] = useState<string>("2 Adults, 1 Child");
  const [hotelName, setHotelName] = useState<string>(
    "Kuta Paradiso Hotel (4★ Resort)",
  );
  const [inclusions, setInclusions] = useState<string[]>([
    "Private Driver",
    "Daily Breakfast",
    "Airport Transfers",
    "Visa Support",
  ]);

  const [copied, setCopied] = useState(false);

  // Calculations
  const totalNet = flightNet + hotelNet + groundNet;
  const profitMargin = Math.round(totalNet * (markupPercent / 100));
  const finalCustomerQuote = totalNet + profitMargin;
  // Public OTA (MakeMyTrip) retail benchmark — typically ~18% above net rate.
  const estimatedOTA = Math.round(totalNet * 1.18);
  const clientSavings = estimatedOTA - finalCustomerQuote;

  const toggleInclusion = (item: string) => {
    setInclusions((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item],
    );
  };

  // Gemini Prompt Synthesis
  const inclusionsLine =
    inclusions.length > 0 ? inclusions.join(", ") : "As per standard package";
  const numDays = duration.charAt(0);

  const generatedGeminiPrompt = `Act as an elite international travel consultant for "Driftly Travels".

Generate a beautifully formatted, highly persuasive day-wise holiday itinerary that I can send directly to my client on WhatsApp or export as a PDF.

TRIP DETAILS:
- Client Name: ${customerName}
- Destination: ${destination}
- Duration: ${duration}
- Dates: ${travelDates}
- Group Size: ${paxDetails}
- Selected Hotel/Resort: ${hotelName}
- Total Customized Package Price: ₹${finalCustomerQuote.toLocaleString(
    "en-IN",
  )} total (Inclusive of all taxes, private driver, hotels, flights & tours).

INCLUSIONS TO HIGHLIGHT:
${inclusionsLine}
1. Return Flights & Airport Pick/Drop in Dedicated Private Vehicle.
2. Stay at ${hotelName} with Daily Breakfast included.
3. 24/7 Dedicated Private Driver & Air-Conditioned Cab (No shared buses).
4. All entry tickets, visa assistance, and 24/7 WhatsApp ground support.

FORMATTING REQUIREMENTS:
- Structure the response with clean headers, bullet points, and appropriate emojis.
- Provide a day-by-day breakdown (Day 1 to Day ${numDays}) keeping travel flow smooth and unhurried.
- Include a strong, high-trust call-to-action at the end: "To lock in this B2B rate voucher, reply 'CONFIRM' or call Driftly Travels."
- Keep the tone warm, professional, and luxurious.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedGeminiPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputCls =
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
              Live B2B Rate Markup Calculator &amp; Gemini Prompt Generator
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
            Status: B2B Operational
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Live Calculator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" /> 1. B2B Cost &amp;
              Markup Calculator
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Flight Net Cost (Tripjack)
                </label>
                <input
                  type="number"
                  value={flightNet}
                  onChange={(e) => setFlightNet(Number(e.target.value))}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Hotel Net Cost (Tripjack / TBO)
                </label>
                <input
                  type="number"
                  value={hotelNet}
                  onChange={(e) => setHotelNet(Number(e.target.value))}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Ground Transfers &amp; Tours Net (DMC / TBO)
                </label>
                <input
                  type="number"
                  value={groundNet}
                  onChange={(e) => setGroundNet(Number(e.target.value))}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Select Profit Markup %
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

            {/* Calculations Display */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Total Wholesale Cost (B2B):</span>
                <span className="font-mono">
                  ₹{totalNet.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-emerald-400 font-medium">
                <span>Your Profit ({markupPercent}%):</span>
                <span className="font-mono">
                  +₹{profitMargin.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  Quote to Client:
                </span>
                <span className="text-2xl font-bold text-amber-400 font-mono">
                  ₹{finalCustomerQuote.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {clientSavings > 0 ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-medium">
                🎉 You save the client{" "}
                <strong>₹{clientSavings.toLocaleString("en-IN")}</strong>{" "}
                compared to MakeMyTrip! (Est. OTA retail ₹
                {estimatedOTA.toLocaleString("en-IN")})
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-medium">
                ⚠️ At {markupPercent}% markup your quote (₹
                {finalCustomerQuote.toLocaleString("en-IN")}) is at or above the
                est. MakeMyTrip retail rate (₹
                {estimatedOTA.toLocaleString("en-IN")}). Consider a lower markup.
              </div>
            )}
          </div>

          {/* RIGHT: Gemini Itinerary Prompt Generator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> 2. Generate Gemini
              Prompt for PDF/WA
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-medium text-slate-600">Client Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={metaInputCls}
                />
              </div>

              <div>
                <label className="font-medium text-slate-600">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={metaInputCls}
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
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
                <label className="font-medium text-slate-600">Travel Dates</label>
                <input
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  className={metaInputCls}
                />
              </div>

              <div>
                <label className="font-medium text-slate-600">Pax Details</label>
                <input
                  type="text"
                  value={paxDetails}
                  onChange={(e) => setPaxDetails(e.target.value)}
                  className={metaInputCls}
                />
              </div>

              <div>
                <label className="font-medium text-slate-600">Hotel Name</label>
                <input
                  type="text"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className={metaInputCls}
                />
              </div>
            </div>

            {/* Inclusions */}
            <div>
              <label className="text-xs font-medium text-slate-600">
                Inclusions to Highlight
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {INCLUSION_OPTIONS.map((item) => {
                  const active = inclusions.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInclusion(item)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        active
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {active ? "✓ " : ""}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Prompt Output Box */}
            <div className="relative">
              <textarea
                readOnly
                rows={10}
                value={generatedGeminiPrompt}
                className="w-full p-3 pt-12 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl border border-slate-800 focus:outline-none resize-none"
              />
              <button
                onClick={handleCopyPrompt}
                className="absolute top-3 right-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all shadow-md"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied Prompt!" : "Copy Gemini Prompt"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
