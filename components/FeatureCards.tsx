"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";

export default function FeatureCards() {
  const { t } = useLang();
  return (
    <section className="bg-black border-t border-white/5 py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-20">
          <p className="section-label mb-4">{t.features.title}</p>
          <div className="w-8 h-px bg-cyan" />
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {t.features.items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black px-10 py-12 flex flex-col gap-6 group hover:bg-[#080808] transition-colors duration-300"
            >
              {/* Step number */}
              <div className="flex items-end gap-4">
                <span
                  className="text-6xl font-black leading-none text-white/8 group-hover:text-white/12 transition-colors duration-500"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-1 h-1 rounded-full bg-cyan mb-3" />
              </div>

              <div>
                <h3 className="text-white font-bold text-base mb-3 tracking-tight">{f.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed font-light">{f.body}</p>
              </div>

              {/* Bottom accent line — reveals on hover */}
              <div className="w-0 group-hover:w-8 h-px bg-cyan transition-all duration-500 ease-out mt-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
