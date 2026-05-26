"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const FALLBACK_RATE = 3.76; // USD → ILS

interface ExchangeRateCtx {
  rate: number;
  usdToIls: (usd: number) => number;
}

const ExchangeRateContext = createContext<ExchangeRateCtx>({
  rate: FALLBACK_RATE,
  usdToIls: (usd) => Math.round(usd * FALLBACK_RATE),
});

export function ExchangeRateProvider({ children }: { children: React.ReactNode }) {
  const [rate, setRate] = useState(FALLBACK_RATE);

  useEffect(() => {
    fetch("/api/exchange-rate")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (typeof data?.rate === "number" && data.rate > 0) setRate(data.rate);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  const usdToIls = useCallback(
    (usd: number) => Math.round(usd * rate),
    [rate]
  );

  return (
    <ExchangeRateContext.Provider value={{ rate, usdToIls }}>
      {children}
    </ExchangeRateContext.Provider>
  );
}

export function useExchangeRate() {
  return useContext(ExchangeRateContext);
}

/** Convenience: returns a usdToIls converter bound to the live rate */
export function useUsdToIls() {
  return useContext(ExchangeRateContext).usdToIls;
}
