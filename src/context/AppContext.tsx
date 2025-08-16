"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type FlowStatus = { flowName: string; status: string; state?: Record<string, any> } | null;

type AppState = {
  selectedCustomer: any | null;
  setSelectedCustomer: (c: any | null) => void;
  selectedReservation: any | null;
  setSelectedReservation: (r: any | null) => void;
  lastFlowStatus: FlowStatus;
  setLastFlowStatus: (s: FlowStatus) => void;
};

const Ctx = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);
  const [lastFlowStatus, setLastFlowStatus] = useState<FlowStatus>(null);

  const value = useMemo(
    () => ({ selectedCustomer, setSelectedCustomer, selectedReservation, setSelectedReservation, lastFlowStatus, setLastFlowStatus }),
    [selectedCustomer, selectedReservation, lastFlowStatus]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within AppProvider");
  return v;
}
