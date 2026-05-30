"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";

export default function FeatureCards() {
  const { t } = useLang();
  return (
    <section className="bg-section-deep border-t border-blue/10 py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-20">
          <p className="section-label mb-5">{t.features.title}</p>
          <div className="w-12 h-0.5 bg-blue-gradient rounded-full" />
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-px bg-blue/8">
          {t.features.items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#030811] px-10 py-12 flex flex-col gap-6 group hover:bg-[#060F1E] transition-colors duration-400 cursor-default"
            >
              {/* Step number */}
              <div className="flex items-end gap-4">
                <span
                  className="text-7xl font-black leading-none tracking-[-0.03em] transition-all duration-500"
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    background: "linear-gradient(135deg, rgba(0,102,255,0.18) 0%, rgba(0,212,255,0.10) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan mb-3 group-hover:bg-blue transition-colors duration-300" />
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-3 tracking-tight leading-snug">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-light">{f.body}</p>
              </div>

              {/* Bottom accent line — reveals on hover */}
              <div className="w-0 group-hover:w-10 h-px bg-blue-gradient transition-all duration-500 ease-out mt-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
