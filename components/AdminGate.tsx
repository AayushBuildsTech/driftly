"use client";

import React, { useEffect, useState } from "react";
import { Lock, ShieldAlert } from "lucide-react";
import { ADMIN_PASSWORD, BRAND } from "@/lib/constants";

const STORAGE_KEY = "driftly_admin_unlocked";

/**
 * Client-side password gate for the internal dashboard. On a static export
 * there is no server to authenticate against, so this only hides the tool from
 * casual visitors — it is deterrence, not real security.
 */
export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  // Restore unlock state for the current tab/session.
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    setReady(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Avoid a flash of the login form before we've read sessionStorage.
  if (!ready) return null;

  if (unlocked) return <>{children}</>;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold text-white">
            {BRAND.name} — Agent Access
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            This dashboard is restricted to authorised staff.
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-300" htmlFor="pw">
            Password
          </label>
          <input
            id="pw"
            type="password"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Enter access password"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 p-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-400">
              <ShieldAlert className="h-3.5 w-3.5" />
              Incorrect password. Please try again.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Unlock Dashboard
        </button>
      </form>
    </main>
  );
}
