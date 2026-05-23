"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

interface BagContextValue {
  items: Product[];
  addItem: (p: Product) => void;
  removeItem: (id: string) => void;
  clearBag: () => void;
  hasItem: (id: string) => boolean;
  totalWeight: number;
  totalCostUsd: number;
}

const BagContext = createContext<BagContextValue | null>(null);
const STORAGE_KEY = "trailiq.bag";

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? (JSON.parse(s) as Product[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((p: Product) => {
    setItems((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, p]));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearBag = useCallback(() => setItems([]), []);

  const hasItem = useCallback(
    (id: string) => items.some((x) => x.id === id),
    [items],
  );

  const totalWeight = useMemo(
    () => items.reduce((s, p) => s + p.weight_grams, 0),
    [items],
  );
  const totalCostUsd = useMemo(
    () => items.reduce((s, p) => s + p.price_usd, 0),
    [items],
  );

  const value = useMemo<BagContextValue>(
    () => ({ items, addItem, removeItem, clearBag, hasItem, totalWeight, totalCostUsd }),
    [items, addItem, removeItem, clearBag, hasItem, totalWeight, totalCostUsd],
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside BagProvider");
  return ctx;
}
