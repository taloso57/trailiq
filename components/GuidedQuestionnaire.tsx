"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import RecommendationGrid, { type WeatherData } from "./RecommendationGrid";
import type { Product } from "@/lib/products";

interface Recommendation {
  product_id: string;
  reason_hebrew: string;
  reason_english: string;
}

interface ChatResponse {
  products: Product[];
  recommendations: Recommendation[];
  summary_hebrew: string;
  summary_english: string;
  weather?: WeatherData | null;
}

// Maps questionnaire option labels → weather API destination keys
const DEST_LABEL_TO_KEY: Record<string, string> = {
  "ישראל":        "israel",
  "Israel":       "israel",
  "אירופה":       "alps",
  "Europe":       "alps",
  "דרום אמריקה": "patagonia",
  "South America":"patagonia",
  "אסיה":         "nepal",
  "Asia":         "nepal",
  "אפריקה":       "kilimanjaro",
  "Africa":       "kilimanjaro",
};

type Answers = Record<string, string | string[]>;
type QuestionKind = "single" | "multi" | "freetext";

interface Question {
  key: string;
  question_he: string;
  question_en: string;
  kind: QuestionKind;
  options_he?: string[];
  options_en?: string[];
  placeholder_he?: string;
  placeholder_en?: string;
  climateNote?: boolean;
}

const QUESTIONS: Question[] = [
  {
    key: "destination",
    question_he: "לאן אתה נוסע?",
    question_en: "Where are you going?",
    kind: "single",
    options_he: ["ישראל", "אירופה", "דרום אמריקה", "אסיה", "אפריקה", "אחר"],
    options_en: ["Israel", "Europe", "South America", "Asia", "Africa", "Other"],
  },
  {
    key: "season",
    question_he: "באיזה עונה?",
    question_en: "What season?",
    kind: "single",
    options_he: ["קיץ", "חורף", "אביב", "סתיו"],
    options_en: ["Summer", "Winter", "Spring", "Fall"],
    climateNote: true,
  },
  {
    key: "days",
    question_he: "כמה ימים?",
    question_en: "How many days?",
    kind: "single",
    options_he: ["1-2 ימים", "3-5 ימים", "שבוע", "יותר מ-10 ימים"],
    options_en: ["1-2 days", "3-5 days", "One week", "More than 10 days"],
  },
  {
    key: "gear",
    question_he: "איזה ציוד צריך?",
    question_en: "What gear do you need?",
    kind: "multi",
    options_he: ["תרמיל גב", "שק שינה", "אוהל", "מזרן", "בגדים"],
    options_en: ["Backpack", "Sleeping bag", "Tent", "Sleeping pad", "Apparel"],
  },
  {
    key: "priority",
    question_he: "מה הכי חשוב לך?",
    question_en: "What matters most?",
    kind: "freetext",
    placeholder_he: "למשל: משקל קל, עמידות למים, תקציב נמוך...",
    placeholder_en: "e.g. light weight, waterproof, tight budget...",
  },
  {
    key: "budget",
    question_he: "מה התקציב?",
    question_en: "What's your budget?",
    kind: "single",
    options_he: ["עד $500", "$500-1000", "$1000-2000", "ללא הגבלה"],
    options_en: ["Up to $500", "$500-1000", "$1000-2000", "No limit"],
  },
];

// Climate summary shown below the season question based on destination
const DEST_CLIMATE_HE: Record<string, string> = {
  "ישראל": "חם ויבש בקיץ, מתון בחורף",
  "אירופה": "ממוזג עם גשמים, משתנה לפי אזור",
  "דרום אמריקה": "טרופי בצפון, קר ורטוב בדרום (פטגוניה)",
  "אסיה": "חם ולח בטרופיקה, אלפיני קר בהרים",
  "אפריקה": "חם, עם עונות גשמים",
  "אחר": "בדוק לפי יעד ספציפי",
};

const DEST_CLIMATE_EN: Record<string, string> = {
  "Israel": "Hot dry summers, mild winters",
  "Europe": "Temperate, rainy — varies by region",
  "South America": "Tropical north, cold/wet south (Patagonia)",
  "Asia": "Tropical humid or alpine cold (Himalayas)",
  "Africa": "Hot, seasonal rains",
  "Other": "Check your specific destination",
};

function budgetToValue(opt: string): string {
  if (!opt || opt === "ללא הגבלה" || opt === "No limit") return "";
  if (/עד/.test(opt)) return opt.replace("עד ", "").trim();
  if (/Up to/.test(opt)) return opt.replace("Up to ", "").trim();
  const m = opt.match(/\$(\d+)-(\d+)/);
  if (m) return `$${m[2]}`;
  return opt;
}

function buildMessage(answers: Answers, lang: "he" | "en"): string {
  const parts: string[] = [];
  if (lang === "he") {
    if (answers.destination) parts.push(`יעד: ${answers.destination}`);
    if (answers.season) parts.push(`עונה: ${answers.season}`);
    if (answers.days) parts.push(`משך: ${answers.days}`);
    if (answers.gear) {
      const g = Array.isArray(answers.gear) ? answers.gear.join(", ") : answers.gear;
      if (g) parts.push(`ציוד נדרש: ${g}`);
    }
    if (answers.priority && typeof answers.priority === "string" && answers.priority.trim()) {
      parts.push(`עדיפות: ${answers.priority}`);
    }
    const bv = budgetToValue(typeof answers.budget === "string" ? answers.budget : "");
    if (bv) parts.push(`תקציב: ${bv}`);
  } else {
    if (answers.destination) parts.push(`Destination: ${answers.destination}`);
    if (answers.season) parts.push(`Season: ${answers.season}`);
    if (answers.days) parts.push(`Duration: ${answers.days}`);
    if (answers.gear) {
      const g = Array.isArray(answers.gear) ? answers.gear.join(", ") : answers.gear;
      if (g) parts.push(`Gear needed: ${g}`);
    }
    if (answers.priority && typeof answers.priority === "string" && answers.priority.trim()) {
      parts.push(`Priority: ${answers.priority}`);
    }
    const bv = budgetToValue(typeof answers.budget === "string" ? answers.budget : "");
    if (bv) parts.push(`Budget: ${bv}`);
  }
  return parts.join(". ");
}

export default function GuidedQuestionnaire({ onBack }: { onBack: () => void }) {
  const { lang } = useLang();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weatherPreview, setWeatherPreview] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const question = lang === "he" ? current.question_he : current.question_en;
  const options = lang === "he" ? current.options_he ?? [] : current.options_en ?? [];
  const placeholder = lang === "he" ? current.placeholder_he ?? "" : current.placeholder_en ?? "";

  // Destination-based climate note for season question
  const dest = answers.destination as string | undefined;
  const climateHint = dest
    ? (lang === "he" ? DEST_CLIMATE_HE[dest] : DEST_CLIMATE_EN[dest])
    : null;

  async function fetchWeatherForDest(destLabel: string) {
    const destKey = DEST_LABEL_TO_KEY[destLabel];
    if (!destKey) return;
    setWeatherLoading(true);
    try {
      const res = await fetch(`/api/weather?destination=${encodeURIComponent(destKey)}`);
      if (res.ok) setWeatherPreview(await res.json());
    } catch {
      // silent — weather is optional
    } finally {
      setWeatherLoading(false);
    }
  }

  async function doSubmit(finalAnswers: Answers) {
    const msg = buildMessage(finalAnswers, lang);
    if (!msg.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setResult((await res.json()) as ChatResponse);
    } catch {
      setError(
        lang === "he" ? "אופס, משהו השתבש. נסה שוב." : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function selectOption(option: string) {
    if (current.kind === "multi") {
      const prev = (answers[current.key] as string[]) ?? [];
      const next = prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option];
      setAnswers({ ...answers, [current.key]: next });
      return;
    }
    const newAnswers = { ...answers, [current.key]: option };
    setAnswers(newAnswers);
    // After destination selection, kick off a background weather fetch
    if (current.key === "destination") {
      fetchWeatherForDest(option);
    }
    if (isLast) {
      setTimeout(() => doSubmit(newAnswers), 180);
    } else {
      setTimeout(() => setStep((s) => s + 1), 180);
    }
  }

  function isSelected(option: string): boolean {
    const val = answers[current.key];
    if (Array.isArray(val)) return val.includes(option);
    return val === option;
  }

  function advanceFromMulti() {
    setStep((s) => s + 1);
  }

  function advanceFromFreetext() {
    if (isLast) {
      doSubmit(answers);
    } else {
      setStep((s) => s + 1);
    }
  }

  if (result && !loading) {
    return (
      <div className="w-full">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-muted hover:text-white transition text-sm group"
        >
          <svg
            className="w-4 h-4 transition group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {lang === "he" ? "חזרה" : "Back"}
        </button>
        <p className="text-muted mb-6 leading-relaxed">
          {lang === "he" ? result.summary_hebrew : result.summary_english}
        </p>
        <RecommendationGrid
          products={result.products}
          recommendations={result.recommendations}
          summaryHe={result.summary_hebrew}
          summaryEn={result.summary_english}
          weather={result.weather}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-muted hover:text-white transition text-sm group"
      >
        <svg
          className="w-4 h-4 transition group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {lang === "he" ? "חזרה" : "Back"}
      </button>

      {/* Progress bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex gap-1.5">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < step ? "w-6 bg-cyan" : i === step ? "w-6 bg-white" : "w-3 bg-white/20"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted">{step + 1} / {QUESTIONS.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: lang === "he" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: lang === "he" ? -20 : 20 }}
          transition={{ duration: 0.22 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">{question}</h2>

          {/* Climate / weather note on season question */}
          {current.climateNote && dest && (
            <div className="mb-5">
              {weatherLoading && (
                <p className="text-cyan/60 text-xs flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 border border-cyan/40 border-t-cyan rounded-full animate-spin" />
                  {lang === "he" ? "טוען מזג אוויר..." : "Loading weather..."}
                </p>
              )}

              {!weatherLoading && weatherPreview && (
                <div className="flex flex-wrap items-center gap-4 bg-cyan/5 border border-cyan/15 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherPreview.icon}.png`}
                      alt={weatherPreview.description}
                      width={32}
                      height={32}
                      className="opacity-90"
                    />
                    <div>
                      <div className="text-[10px] text-cyan/70 uppercase tracking-wide font-semibold">
                        {lang === "he" ? weatherPreview.city : weatherPreview.city}
                      </div>
                      <div className="text-white/60 text-xs">
                        {lang === "he" ? weatherPreview.description_he : weatherPreview.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-white/70">
                    <span>🌡 <strong className="text-white">{weatherPreview.day_high_c}°C</strong> / {weatherPreview.night_low_c}°C</span>
                    <span>💧 {weatherPreview.humidity}%</span>
                    <span>🌧 {weatherPreview.rain_probability}%</span>
                    <span>💨 {weatherPreview.wind_speed_kmh} km/h</span>
                  </div>
                </div>
              )}

              {!weatherLoading && !weatherPreview && climateHint && (
                <p className="text-cyan/80 text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" />
                  </svg>
                  {lang === "he"
                    ? `מנתח מזג אוויר לפי היעד שבחרת — ${climateHint}`
                    : `Climate for ${dest}: ${climateHint}`}
                </p>
              )}
            </div>
          )}

          {/* Button options (single or multi) */}
          {current.kind !== "freetext" && (
            <div className="flex flex-wrap gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => selectOption(option)}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    isSelected(option)
                      ? "bg-cyan/20 border-cyan text-cyan shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                      : "glass border-white/10 text-white hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Free text input */}
          {current.kind === "freetext" && (
            <input
              type="text"
              dir="auto"
              value={(answers[current.key] as string) ?? ""}
              onChange={(e) => setAnswers({ ...answers, [current.key]: e.target.value })}
              onKeyDown={(e) => { if (e.key === "Enter") advanceFromFreetext(); }}
              placeholder={placeholder}
              className="w-full glass border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-muted/60 outline-none text-base focus:border-cyan/40 transition"
            />
          )}

          {/* Multi-select → Next button */}
          {current.kind === "multi" && (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={advanceFromMulti}
                className="cta-blue px-6 py-3"
              >
                {lang === "he" ? "המשך" : "Next"}
              </button>
              <button
                onClick={advanceFromMulti}
                className="text-muted hover:text-white text-sm transition"
              >
                {lang === "he" ? "דלג" : "Skip"}
              </button>
            </div>
          )}

          {/* Freetext → Next / Find Gear */}
          {current.kind === "freetext" && (
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={advanceFromFreetext}
                className="cta-blue px-6 py-3"
              >
                {isLast
                  ? lang === "he" ? "מצא ציוד" : "Find Gear"
                  : lang === "he" ? "המשך" : "Next"}
              </button>
              <button
                onClick={advanceFromFreetext}
                className="text-muted hover:text-white text-sm transition"
              >
                {lang === "he" ? "דלג" : "Skip"}
              </button>
            </div>
          )}

          {/* Back button within questionnaire */}
          {step > 0 && current.kind === "single" && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 text-muted hover:text-white text-sm transition"
            >
              {lang === "he" ? "שאלה קודמת" : "Previous question"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

      {loading && (
        <div className="mt-6 flex items-center gap-3 text-muted">
          <span className="compass" />
          <span>{lang === "he" ? "מחפש ציוד מושלם..." : "Finding perfect gear..."}</span>
        </div>
      )}
    </div>
  );
}
