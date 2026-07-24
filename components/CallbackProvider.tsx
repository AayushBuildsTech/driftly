"use client";

import * as React from "react";
import { domAnimation, LazyMotion } from "framer-motion";
import { CallbackModal } from "@/components/CallbackModal";
import { useModal } from "@/hooks/useModal";

interface CallbackContextValue {
  openCallback: () => void;
}

const CallbackContext = React.createContext<CallbackContextValue | null>(null);

/** Access the app-wide callback modal opener. */
export function useCallbackModal() {
  const ctx = React.useContext(CallbackContext);
  if (!ctx) {
    throw new Error("useCallbackModal must be used within <CallbackProvider>");
  }
  return ctx;
}

export function CallbackProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, open, close } = useModal(false);
  const value = React.useMemo(() => ({ openCallback: open }), [open]);

  return (
    <CallbackContext.Provider value={value}>
      <LazyMotion features={domAnimation} strict>
        {children}
        <CallbackModal isOpen={isOpen} onClose={close} />
      </LazyMotion>
    </CallbackContext.Provider>
  );
}
