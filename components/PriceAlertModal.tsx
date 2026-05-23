"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { saveAlert, hasAlertForProduct, deleteAlert, getAlerts } from "@/lib/alertsStore";

export default function PriceAlertModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const existing = getAlerts().find((a) => a.productId === product.id);

  const [targetPrice, setTargetPrice] = useState(
    existing ? String(existing.targetPrice) : String(Math.round(product.price_usd * 0.85)),
  );
  const [email, setEmail] = useState(existing?.email ?? "");
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function handleSave() {
    const t = Number(targetPrice);
    if (!email.includes("@") || !t || t <= 0) return;
    saveAlert({
      productId: product.id,
      productName: product.name_english,
      currentPrice: product.price_usd,
      targetPrice: t,
      email,
    });
    setSaved(true);
  }

  function handleDelete() {
    if (existing) {
      deleteAlert(existing.id);
      setDeleted(true);
      setTimeout(onClose, 1200);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 glass border border-white/15 rounded-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-muted hover:text-white transition text-lg leading-none"
        >
          ×
        </button>

        {/* Bell icon */}
        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-4">
          <span className="text-xl">🔔</span>
        </div>

        <h3 className="text-white font-bold text-lg mb-1">התראת מחיר</h3>
        <p className="text-muted text-sm mb-4 leading-relaxed" dir="ltr">
          {product.name_english}
        </p>

        <div className="glass border border-white/10 rounded-xl px-4 py-3 mb-4 flex justify-between items-center">
          <span className="text-muted text-sm">מחיר נוכחי</span>
          <span className="text-white font-bold">${product.price_usd}</span>
        </div>

        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <div className="text-3xl mb-2">✅</div>
              <p className="text-green-400 font-semibold text-sm">נשמר! נודיע לך כשהמחיר ירד</p>
              <p className="text-muted text-xs mt-1">
                בשלב זה ההתראות נשמרות במכשיר שלך. חיבור לשרת בקרוב.
              </p>
              <button onClick={onClose} className="mt-4 text-xs text-muted hover:text-white transition">
                סגור
              </button>
            </motion.div>
          ) : deleted ? (
            <motion.div
              key="deleted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <div className="text-3xl mb-2">🗑️</div>
              <p className="text-red-400 font-semibold text-sm">ההתראה נמחקה</p>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-3">
              <div>
                <label className="text-muted text-xs mb-1.5 block">
                  הודע לי כשהמחיר יורד מתחת ל-
                </label>
                <div className="flex items-center gap-2 glass border border-white/10 rounded-xl px-4 py-2.5">
                  <span className="text-muted text-sm">$</span>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    min={1}
                    max={product.price_usd - 1}
                    className="flex-1 bg-transparent outline-none text-white text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted text-xs mb-1.5 block">כתובת אימייל</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  placeholder="you@example.com"
                  className="w-full glass border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none placeholder:text-muted/50 focus:border-cyan/40"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!email.includes("@") || Number(targetPrice) <= 0}
                className="cta w-full py-3 text-sm"
              >
                שמור התראה 🔔
              </button>

              {existing && (
                <button
                  onClick={handleDelete}
                  className="w-full text-xs text-red-400 hover:text-red-300 transition py-1"
                >
                  מחק התראה קיימת
                </button>
              )}

              <p className="text-muted text-[11px] text-center leading-relaxed">
                בשלב זה ההתראות נשמרות במכשיר שלך בלבד. חיבור לשרת בקרוב.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
