"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAlerts, deleteAlert, type PriceAlert } from "@/lib/alertsStore";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  useEffect(() => {
    setAlerts(getAlerts());
  }, []);

  function remove(id: string) {
    deleteAlert(id);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
            🔔 התראות מחיר
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            התראות נשמרות במכשיר שלך. חיבור לשרת לשליחת מיילים — בקרוב.
          </p>
        </div>

        {alerts.length === 0 ? (
          <div className="glass border border-white/10 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">🔕</div>
            <p className="text-white font-semibold mb-1">אין התראות פעילות</p>
            <p className="text-muted text-sm">
              לחץ על 🔔 ליד מוצר כדי להוסיף התראת מחיר
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="glass border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                    <span className="text-lg">🔔</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate" dir="ltr">
                      {alert.productName}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted mt-1">
                      <span>
                        מחיר נוכחי:{" "}
                        <span className="text-white font-medium">${alert.currentPrice}</span>
                      </span>
                      <span>·</span>
                      <span>
                        יעד:{" "}
                        <span className="text-cyan font-bold">${alert.targetPrice}</span>
                      </span>
                      <span>·</span>
                      <span dir="ltr">{alert.email}</span>
                    </div>
                    <p className="text-xs text-muted/60 mt-0.5">
                      נוצר: {new Date(alert.createdAt).toLocaleDateString("he-IL")}
                    </p>
                  </div>

                  <button
                    onClick={() => remove(alert.id)}
                    className="shrink-0 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/30 transition text-base"
                    aria-label="מחק התראה"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="text-center pt-4">
              <button
                onClick={() => {
                  alerts.forEach((a) => deleteAlert(a.id));
                  setAlerts([]);
                }}
                className="text-xs text-red-400 hover:text-red-300 transition border border-red-400/20 hover:border-red-400/40 rounded-full px-4 py-1.5"
              >
                מחק הכל
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
