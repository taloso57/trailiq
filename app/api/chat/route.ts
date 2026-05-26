import { NextResponse } from "next/server";
import { products, type Product, type Category } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── OpenWeatherMap integration ───────────────────────────────────────────────

const DEST_TO_CITY: Record<string, string> = {
  "israel":             "Tel Aviv,IL",
  "wadi rum":           "Aqaba,JO",
  "grand canyon":       "Flagstaff,US",
  "patagonia":          "Puerto Natales,CL",
  "mont blanc":         "Chamonix-Mont-Blanc,FR",
  "tour du mont blanc": "Chamonix-Mont-Blanc,FR",
  "everest":            "Namche Bazar,NP",
  "kilimanjaro":        "Moshi,TZ",
  "annapurna":          "Pokhara,NP",
  "atlas":              "Marrakech,MA",
  "laugavegur":         "Reykjavik,IS",
  "iceland":            "Reykjavik,IS",
  "milford track":      "Te Anau,NZ",
  "banff":              "Banff,CA",
  "mount fuji":         "Fujiyoshida,JP",
  "camino":             "Santiago de Compostela,ES",
  "alps":               "Innsbruck,AT",
  "nepal":              "Kathmandu,NP",
  "colorado":           "Denver,US",
  "india":              "New Delhi,IN",
  "thailand":           "Bangkok,TH",
  "japan":              "Tokyo,JP",
};

const WEATHER_DESC_HE: Record<string, string> = {
  "clear sky": "שמים בהירים",
  "few clouds": "מעט עננים",
  "scattered clouds": "עננים מפוזרים",
  "broken clouds": "עננות חלקית",
  "overcast clouds": "מעונן",
  "light rain": "גשם קל",
  "moderate rain": "גשם מתון",
  "heavy intensity rain": "גשם כבד",
  "thunderstorm": "סופת רעמים",
  "snow": "שלג",
  "light snow": "שלג קל",
  "mist": "ערפל",
  "fog": "ערפל כבד",
  "drizzle": "טפטוף",
  "light intensity drizzle": "טפטוף קל",
};

export interface WeatherData {
  city: string;
  day_high_c: number;
  night_low_c: number;
  humidity: number;
  rain_probability: number;
  wind_speed_kmh: number;
  description: string;
  description_he: string;
  icon: string;
}

async function fetchLiveWeather(destination: string): Promise<WeatherData | null> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = DEST_TO_CITY[destination];
  if (!apiKey || !city) return null;

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${encodeURIComponent(city)}&units=metric&cnt=16&appid=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = await res.json();
    const list: any[] = data.list ?? [];
    if (list.length === 0) return null;

    const slice = list.slice(0, 8);
    const dayHigh   = Math.round(Math.max(...slice.map((x: any) => x.main.temp_max)));
    const nightLow  = Math.round(Math.min(...slice.map((x: any) => x.main.temp_min)));
    const humidity  = Math.round(slice.reduce((s: number, x: any) => s + x.main.humidity, 0) / slice.length);
    const rainProb  = Math.round(slice.reduce((s: number, x: any) => s + (x.pop ?? 0), 0) / slice.length * 100);
    const windSpeed = Math.round(list[0].wind.speed * 3.6);

    const desc = list[0].weather[0].description as string;
    return {
      city: data.city?.name ?? city.split(",")[0],
      day_high_c: dayHigh,
      night_low_c: nightLow,
      humidity,
      rain_probability: rainProb,
      wind_speed_kmh: windSpeed,
      description: desc,
      description_he: WEATHER_DESC_HE[desc.toLowerCase()] ?? desc,
      icon: list[0].weather[0].icon as string,
    };
  } catch {
    return null;
  }
}

type Season = "summer" | "winter" | "spring" | "fall";

interface Extracted {
  destination: string | null;
  duration_days: number | null;
  budget_usd: number | null;
  weight_priority: number;
  waterproof_priority: number;
  season: Season | null;
  climate: string | null;
  night_low_c: number | null;
  day_high_c: number | null;
  requested_categories: Category[] | null;
}

interface Recommendation {
  product_id: string;
  reason_hebrew: string;
  reason_english: string;
}

// ─── Parameter extraction ────────────────────────────────────────────────────

function extractBudget(msg: string): number | null {
  const usdSign = msg.match(/\$\s*(\d[\d,]*)/);
  if (usdSign) return parseInt(usdSign[1].replace(/,/g, ""));

  const usdWord = msg.match(/(\d[\d,]*)\s*(?:usd|dollars?)/i);
  if (usdWord) return parseInt(usdWord[1].replace(/,/g, ""));

  const ils = msg.match(/(\d[\d,]*)\s*(?:₪|ils|שקל|ש"ח|שח)/i);
  if (ils) return Math.round(parseInt(ils[1].replace(/,/g, "")) / 3.76);

  return null;
}

function extractDays(msg: string): number | null {
  const m = msg.match(/(\d+)\s*(?:days?|ימים|יום)/i);
  return m ? parseInt(m[1]) : null;
}

function detectSeason(msg: string): Season | null {
  const l = msg.toLowerCase();
  if (/summer|קיץ|july|august|june|יולי|אוגוסט|יוני/.test(l)) return "summer";
  if (/winter|חורף|december|january|february|דצמבר|ינואר|פברואר/.test(l)) return "winter";
  if (/spring|אביב|march|april|may|מרץ|אפריל|מאי/.test(l)) return "spring";
  if (/fall|autumn|סתיו|october|november|september|אוקטובר|נובמבר|ספטמבר/.test(l)) return "fall";
  return null;
}

interface ClimateProfile {
  night_low_c: number;
  day_high_c: number;
  climate: string;
}

type DestinationSeasons = Partial<Record<Season, ClimateProfile>> & { default: ClimateProfile };

const CLIMATE_MAP: Record<string, DestinationSeasons> = {
  israel: {
    summer: { night_low_c: 24, day_high_c: 37, climate: "hot desert" },
    winter: { night_low_c: 8,  day_high_c: 18, climate: "temperate cool" },
    spring: { night_low_c: 12, day_high_c: 24, climate: "temperate" },
    fall:   { night_low_c: 12, day_high_c: 24, climate: "temperate" },
    default:{ night_low_c: 12, day_high_c: 24, climate: "temperate" },
  },
  "wadi rum": {
    summer: { night_low_c: 22, day_high_c: 38, climate: "hot desert" },
    winter: { night_low_c: 3,  day_high_c: 18, climate: "cool dry" },
    default:{ night_low_c: 15, day_high_c: 28, climate: "desert" },
  },
  "grand canyon": {
    summer: { night_low_c: 24, day_high_c: 42, climate: "extreme hot" },
    spring: { night_low_c: 10, day_high_c: 24, climate: "warm" },
    fall:   { night_low_c: 10, day_high_c: 24, climate: "warm" },
    default:{ night_low_c: 14, day_high_c: 26, climate: "warm" },
  },
  patagonia: {
    summer: { night_low_c: 4,  day_high_c: 13, climate: "temperate cool wet" },
    default:{ night_low_c: 0,  day_high_c: 8,  climate: "cold wet" },
  },
  "mont blanc": {
    summer: { night_low_c: -10, day_high_c: 6,  climate: "high alpine" },
    default:{ night_low_c: -20, day_high_c: -2, climate: "alpine winter" },
  },
  "tour du mont blanc": {
    summer: { night_low_c: 8,  day_high_c: 18, climate: "alpine cool" },
    default:{ night_low_c: 2,  day_high_c: 12, climate: "alpine cool" },
  },
  everest: {
    default:{ night_low_c: -15, day_high_c: -3, climate: "high alpine cold" },
  },
  kilimanjaro: {
    default:{ night_low_c: -15, day_high_c: 5,  climate: "alpine cold" },
  },
  annapurna: {
    default:{ night_low_c: -12, day_high_c: 6,  climate: "alpine cold" },
  },
  atlas: {
    spring: { night_low_c: 0,  day_high_c: 12, climate: "cold mountain" },
    default:{ night_low_c: -5, day_high_c: 8,  climate: "cold mountain" },
  },
  laugavegur: {
    summer: { night_low_c: 5,  day_high_c: 12, climate: "cool wet" },
    default:{ night_low_c: 2,  day_high_c: 8,  climate: "cold wet" },
  },
  iceland: {
    summer: { night_low_c: 4,  day_high_c: 12, climate: "cool wet" },
    default:{ night_low_c: -2, day_high_c: 5,  climate: "cold wet" },
  },
  "milford track": {
    default:{ night_low_c: 7,  day_high_c: 16, climate: "temperate wet" },
  },
  banff: {
    summer: { night_low_c: 6,  day_high_c: 18, climate: "cool mountain" },
    default:{ night_low_c: -12, day_high_c: -2, climate: "cold mountain" },
  },
  "mount fuji": {
    summer: { night_low_c: 4,  day_high_c: 12, climate: "cool alpine" },
    default:{ night_low_c: -5, day_high_c: 4,  climate: "cold alpine" },
  },
  camino: {
    spring: { night_low_c: 11, day_high_c: 18, climate: "temperate" },
    summer: { night_low_c: 16, day_high_c: 28, climate: "warm" },
    default:{ night_low_c: 10, day_high_c: 18, climate: "temperate" },
  },
  alps: {
    summer: { night_low_c: 2,  day_high_c: 15, climate: "alpine cool" },
    default:{ night_low_c: -10, day_high_c: 3, climate: "alpine cold" },
  },
  nepal: {
    default:{ night_low_c: -12, day_high_c: 6, climate: "himalayan cold" },
  },
  colorado: {
    summer: { night_low_c: 4,  day_high_c: 20, climate: "cool mountain" },
    default:{ night_low_c: -6, day_high_c: 6,  climate: "cold mountain" },
  },
  india: {
    summer:  { night_low_c: 26, day_high_c: 40, climate: "hot humid" },
    winter:  { night_low_c: 14, day_high_c: 28, climate: "warm dry" },
    default: { night_low_c: 22, day_high_c: 35, climate: "tropical warm" },
  },
  thailand: {
    default: { night_low_c: 24, day_high_c: 35, climate: "tropical hot humid" },
  },
  japan: {
    summer:  { night_low_c: 22, day_high_c: 32, climate: "hot humid" },
    winter:  { night_low_c: -2, day_high_c: 8,  climate: "cold temperate" },
    default: { night_low_c: 10, day_high_c: 20, climate: "temperate" },
  },
};

const DEST_KEYWORDS: { keywords: RegExp; key: string }[] = [
  { keywords: /israel|ישראל|שביל.?ישראל|negev|נגב|galil|גליל|judaean|יהודה/i, key: "israel" },
  { keywords: /wadi.?rum|ואדי.?רום/i, key: "wadi rum" },
  { keywords: /grand.?canyon|גרנד.?קניון/i, key: "grand canyon" },
  { keywords: /patagonia|פטגוניה/i, key: "patagonia" },
  { keywords: /tour.?du.?mont.?blanc|tmb/i, key: "tour du mont blanc" },
  { keywords: /mont.?blanc|מון.?בלאן/i, key: "mont blanc" },
  { keywords: /everest|אוורסט/i, key: "everest" },
  { keywords: /kilimanjaro|קילימנ/i, key: "kilimanjaro" },
  { keywords: /annapurna|אנאפורנה/i, key: "annapurna" },
  { keywords: /atlas|toubkal|אטלס|טובקל|morocco|מרוקו/i, key: "atlas" },
  { keywords: /laugavegur|לאוגבגור/i, key: "laugavegur" },
  { keywords: /iceland|איסלנד/i, key: "iceland" },
  { keywords: /milford|מילפורד|new.?zealand|ניו.?זילנד/i, key: "milford track" },
  { keywords: /banff|בנף|canadian.?rockies/i, key: "banff" },
  { keywords: /fuji|פוג[י']/i, key: "mount fuji" },
  { keywords: /camino|קמינו/i, key: "camino" },
  { keywords: /dolomites|דולומיטים|alps|אלפים/i, key: "alps" },
  { keywords: /nepal|נפאל|himalaya|הימלאיה/i, key: "nepal" },
  { keywords: /colorado|קולורדו|rockies|רוקי/i, key: "colorado" },
  { keywords: /india|הודו|rajasthan|gujarat|goa|גוא|delhi|mumbai|מומבאי|bangalore/i, key: "india" },
  { keywords: /thailand|תאילנד|bangkok|phuket|פוקט|chiang.?mai/i, key: "thailand" },
  { keywords: /japan|יפן|tokyo|טוקיו|kyoto|osaka/i, key: "japan" },
];

function detectDestination(msg: string): string | null {
  for (const { keywords, key } of DEST_KEYWORDS) {
    if (keywords.test(msg)) return key;
  }
  return null;
}

function inferClimate(destination: string | null, season: Season | null): ClimateProfile {
  if (destination && CLIMATE_MAP[destination]) {
    const map = CLIMATE_MAP[destination];
    if (season && map[season]) return map[season]!;
    return map.default;
  }
  // Generic fallback by season
  if (season === "summer") return { night_low_c: 15, day_high_c: 28, climate: "warm summer" };
  if (season === "winter") return { night_low_c: -5, day_high_c: 8,  climate: "cold winter" };
  if (season === "spring") return { night_low_c: 8,  day_high_c: 20, climate: "temperate spring" };
  if (season === "fall")   return { night_low_c: 6,  day_high_c: 17, climate: "cool fall" };
  return { night_low_c: 8, day_high_c: 20, climate: "temperate" };
}

function detectPriorities(msg: string): { weight: number; waterproof: number } {
  const l = msg.toLowerCase();
  let weight = 5;
  let waterproof = 5;

  if (/ultralight|ultra.?light|\bul\b|קל.?מאד|מינימלי/.test(l)) weight = 9;
  else if (/lightweight|light.?weight|\blight\b|קל\b/.test(l)) weight = 7;
  else if (/heavy|כבד|comfort(able)?|נוח/.test(l)) weight = 3;

  if (/rain|wet|waterproof|גשם|גשום|עמיד.?מים|רטוב/.test(l)) waterproof = 8;
  else if (/dry|desert|arid|יבש|מדבר/.test(l)) waterproof = 2;

  return { weight, waterproof };
}

function extractCategories(msg: string): Category[] | null {
  const found = new Set<Category>();
  if (/תרמיל|תיק|backpack/i.test(msg))           found.add("backpack");
  if (/שק.?שינה|sleeping.?bag/i.test(msg))        found.add("sleeping_bag");
  if (/\bמזרן\b|sleeping.?pad/i.test(msg))        found.add("sleeping_pad");
  if (/\bאוהל\b|\btent\b/i.test(msg))             found.add("tent");
  if (/ביגוד|בגדים|\bapparel\b/i.test(msg))       found.add("apparel");
  // Motorcycle / urban travel — infer backpack + apparel when no gear is explicit
  if (found.size === 0 && /אופנוע|motorcycle|\bmoto\b/i.test(msg)) {
    found.add("backpack");
    found.add("apparel");
  }
  return found.size > 0 ? [...found] : null;
}

// ─── Product selection ───────────────────────────────────────────────────────

function score(
  p: Product,
  budgetCap: number | null,
  weightPri: number,
  waterproofPri: number,
  bonusTags: string[],
): number {
  let s = p.rating * 10;

  if (budgetCap !== null && p.price_usd > budgetCap) s -= 25;

  // Weight: higher priority → prefer lighter
  s += ((2500 - Math.min(p.weight_grams, 2500)) / 2500) * weightPri * 1.5;

  // Waterproof: higher priority → prefer higher mm
  if (p.waterproof_mm !== null) {
    s += (Math.min(p.waterproof_mm, 5000) / 5000) * waterproofPri * 1.5;
  }

  for (const t of bonusTags) if (p.tags.includes(t)) s += 4;

  return s;
}

function best(
  pool: Product[],
  budgetCap: number | null,
  weightPri: number,
  waterproofPri: number,
  bonusTags: string[],
): Product {
  return pool.slice().sort((a, b) => score(b, budgetCap, weightPri, waterproofPri, bonusTags) - score(a, budgetCap, weightPri, waterproofPri, bonusTags))[0];
}

function pickSleepingBag(
  night_low_c: number,
  season: Season | null,
  climate: string | null,
  budgetUsd: number | null,
): Product {
  const bags = products.filter((p) => p.category === "sleeping_bag");
  const cap = budgetUsd ? budgetUsd * 0.3 : null;

  // Summer hard cap — overrides temperature inference entirely.
  // "קיץ" / "summer" means never recommend sub-zero bags unless the
  // destination is genuinely high-alpine (night < -5°C even in summer).
  if (season === "summer") {
    const isHotOrWarm = night_low_c >= 10 || /desert|hot|warm/i.test(climate ?? "");
    const minRating = isHotOrWarm ? 0 : -5;
    const summerPool = bags
      .filter((p) => p.temperature_rating !== null && p.temperature_rating >= minRating)
      .sort((a, b) => (b.temperature_rating ?? 0) - (a.temperature_rating ?? 0)); // warmest first
    const pool = summerPool.length > 0 ? summerPool : bags.filter((p) => (p.temperature_rating ?? -99) >= -5);
    return pool[0] ?? bags.sort((a, b) => (b.temperature_rating ?? 0) - (a.temperature_rating ?? 0))[0];
  }

  // Temperature-based logic for non-summer trips
  let suitable: Product[];
  if (night_low_c >= 15) {
    suitable = bags
      .filter((p) => p.temperature_rating !== null && p.temperature_rating >= 0)
      .sort((a, b) => (b.temperature_rating ?? 0) - (a.temperature_rating ?? 0));
  } else if (night_low_c >= 5) {
    suitable = bags.filter((p) => p.temperature_rating !== null && p.temperature_rating >= -4 && p.temperature_rating <= 3);
  } else if (night_low_c >= -4) {
    suitable = bags.filter((p) => p.temperature_rating !== null && p.temperature_rating >= -9 && p.temperature_rating <= 1);
  } else if (night_low_c >= -14) {
    suitable = bags.filter((p) => p.temperature_rating !== null && p.temperature_rating >= -9 && p.temperature_rating <= -5);
  } else {
    suitable = bags.filter((p) => p.temperature_rating !== null && p.temperature_rating <= -15);
  }

  const pool = suitable.length > 0 ? suitable : bags;
  return best(pool, cap, 7, 3, []);
}

function pickApparel(
  night_low_c: number,
  day_high_c: number,
  season: Season | null,
  weightPri: number,
  waterproofPri: number,
  budgetUsd: number | null,
): Product[] {
  const apparel = products.filter((p) => p.category === "apparel");
  const cap = budgetUsd ? budgetUsd * 0.2 : null;

  // Summer hard cap — never recommend heavy storm shells or extreme-cold down.
  if (season === "summer") {
    if (day_high_c >= 25 || night_low_c >= 10) {
      // Hot/warm summer: ultralight shell + fleece only
      const shell =
        apparel.find((p) => p.id === "ap-salomon-bonatti") ??
        best(apparel.filter((p) => p.tags.includes("shell")), cap, weightPri, 5, []);
      const fleece =
        apparel.find((p) => p.id === "ap-patagonia-r1") ??
        best(apparel.filter((p) => p.tags.includes("fleece")), cap, weightPri, 3, []);
      return [shell, fleece];
    }
    // Cool summer alpine (e.g. Alps in July, ~2°C nights): light shell + light insulation.
    // Exclude high-waterproof storm shells (>= 20 000 mm) reserved for winter.
    const shell =
      best(apparel.filter((p) => p.tags.includes("shell") && (p.waterproof_mm ?? 0) < 20000), cap, weightPri, waterproofPri, []) ??
      best(apparel.filter((p) => p.tags.includes("shell")), cap, weightPri, waterproofPri, []);
    const insulation =
      best(apparel.filter((p) => p.tags.includes("midlayer") && p.weight_grams < 450), cap, weightPri, 3, []);
    return [shell, insulation];
  }

  // Hot desert (non-summer season keyword but still hot): light shell + fleece
  if (day_high_c > 30 && night_low_c > 15) {
    const shell =
      apparel.find((p) => p.id === "ap-salomon-bonatti") ??
      best(apparel.filter((p) => p.tags.includes("shell")), cap, weightPri, 5, []);
    const fleece =
      apparel.find((p) => p.id === "ap-patagonia-r1") ??
      best(apparel.filter((p) => p.tags.includes("fleece")), cap, weightPri, 3, []);
    return [shell, fleece];
  }

  // Cold alpine (< -5°C nights): heavy shell + down
  if (night_low_c < -5) {
    const shell =
      apparel.find((p) => p.id === "ap-arc-beta-ar") ??
      best(apparel.filter((p) => p.waterproof_mm !== null && p.waterproof_mm > 20000), cap, weightPri, waterproofPri, ["alpine"]);
    const down =
      apparel.find((p) => p.id === "ap-arc-cerium-lt") ??
      best(apparel.filter((p) => p.tags.includes("down") && p.tags.includes("midlayer")), cap, weightPri, 3, []);
    return [shell, down];
  }

  // Cool 3-season default: rain shell + light insulation
  const shell = best(apparel.filter((p) => p.tags.includes("shell")), cap, weightPri, waterproofPri, []);
  const insulation = best(apparel.filter((p) => p.tags.includes("midlayer")), cap, weightPri, 3, []);
  return [shell, insulation];
}

function selectKit(extracted: Extracted): { product: Product; reason_en: string; reason_he: string }[] {
  const {
    budget_usd, weight_priority: wp, waterproof_priority: wpp,
    night_low_c, day_high_c, climate, destination, duration_days, season,
    requested_categories,
  } = extracted;

  const include = (cat: Category): boolean =>
    !requested_categories || requested_categories.includes(cat);

  const nightTemp = night_low_c ?? 10;
  const dayTemp   = day_high_c  ?? 22;
  const cap       = budget_usd ? budget_usd / 5 : null;
  const climStr   = climate ?? "your conditions";
  const destStr   = destination ?? null;
  const days      = duration_days ? `${duration_days}-day ` : "";
  const dest      = destStr ? ` to ${destStr}` : "";
  const seas      = season ? ` in ${season}` : "";

  const bonusTags: string[] = [];
  if (wp >= 7)        bonusTags.push("ultralight");
  if (wpp >= 7)       bonusTags.push("waterproof");
  if (nightTemp < -5) bonusTags.push("expedition", "4-season");
  if (nightTemp < 5)  bonusTags.push("3-season");

  const results: { product: Product; reason_en: string; reason_he: string }[] = [];

  if (include("backpack")) {
    const pack = best(products.filter((p) => p.category === "backpack"), cap ? cap * 1.5 : null, wp, wpp, bonusTags);
    results.push({
      product: pack,
      reason_en: `${pack.weight_grams}g ${wp >= 7 ? "ultralight" : "versatile"} pack — right for a ${days}trip${dest}${seas}.`,
      reason_he: `תיק ${pack.weight_grams} גרם ${wp >= 7 ? "(אולטרא-לייט)" : ""} — מתאים למסע ${days}${destStr ? `ל${destStr}` : ""}${seas}.`,
    });
  }

  if (include("sleeping_bag")) {
    const bag = pickSleepingBag(nightTemp, season, climate, budget_usd);
    const bagTemp = bag.temperature_rating !== null ? `${bag.temperature_rating}°C` : null;
    results.push({
      product: bag,
      reason_en: bagTemp
        ? `Sleeping bag rated to ${bagTemp}, matched to ${nightTemp}°C nights in ${climStr}.`
        : `Sleeping bag suitable for ${climStr} conditions.`,
      reason_he: bagTemp
        ? `שק שינה מדורג ל-${bagTemp}, מותאם ללילות של ${nightTemp}°C ב${climStr}.`
        : `שק שינה מתאים לתנאי ${climStr}.`,
    });
  }

  if (include("sleeping_pad")) {
    const minR = nightTemp < -5 ? 5 : nightTemp < 5 ? 3 : 2;
    const padPool = products.filter((p) => p.category === "sleeping_pad" && (p.r_value === null || p.r_value >= minR));
    const pad = best(padPool.length > 0 ? padPool : products.filter((p) => p.category === "sleeping_pad"), cap, wp, 3, bonusTags);
    results.push({
      product: pad,
      reason_en: `Sleeping pad${pad.r_value !== null ? ` (R${pad.r_value})` : ""} suited for ${nightTemp}°C nights${dest}.`,
      reason_he: `מזרון${pad.r_value !== null ? ` (R-value ${pad.r_value})` : ""} מותאם ללילות של ${nightTemp}°C${dest ? ` ${dest}` : ""}.`,
    });
  }

  if (include("tent")) {
    const tents = products.filter((p) => p.category === "tent");
    const tentPool = nightTemp < -5
      ? tents.filter((p) => p.tags.includes("4-season") || (p.waterproof_mm ?? 0) >= 3000)
      : tents;
    const tent = best(tentPool.length > 0 ? tentPool : tents, cap ? cap * 1.5 : null, wp, wpp, bonusTags);
    results.push({
      product: tent,
      reason_en: `${tent.weight_grams}g tent${tent.waterproof_mm ? ` (${tent.waterproof_mm}mm)` : ""} — suitable for ${climStr}${dest}.`,
      reason_he: `אוהל ${tent.weight_grams} גרם${tent.waterproof_mm ? ` (${tent.waterproof_mm}מ"מ)` : ""} — מתאים ל${climStr}${dest ? dest : ""}.`,
    });
  }

  if (include("apparel")) {
    const apparelPair = pickApparel(nightTemp, dayTemp, season, wp, wpp, budget_usd);
    for (const ap of apparelPair.slice(0, 2)) {
      const role = ap.tags.includes("shell") ? "rain/wind shell"
        : ap.tags.includes("down") ? "down insulation"
        : ap.tags.includes("fleece") ? "fleece midlayer"
        : "insulation layer";
      const roleHe = ap.tags.includes("shell") ? "מעיל גשם / רוח"
        : ap.tags.includes("down") ? "בידוד פלומה"
        : "שכבת אמצע";
      results.push({
        product: ap,
        reason_en: `${role} (${ap.weight_grams}g) — ${ap.waterproof_mm && ap.waterproof_mm > 10000 ? "storm-grade" : ap.weight_grams < 350 ? "ultralight" : "versatile"} choice for ${climStr}${dest}.`,
        reason_he: `${roleHe} (${ap.weight_grams} גרם) — ${ap.weight_grams < 350 ? "קל במיוחד" : "מגוון"} ל${climStr}${dest ? dest : ""}.`,
      });
    }
  }

  return results;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const { message, lang } = (await req.json()) as { message?: string; lang?: string };
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const budget_usd           = extractBudget(message);
  const duration_days        = extractDays(message);
  const season               = detectSeason(message);
  const destination          = detectDestination(message);
  const { weight, waterproof } = detectPriorities(message);
  const requested_categories = extractCategories(message);

  // Try live weather — override CLIMATE_MAP temps if successful
  const liveWeather = destination ? await fetchLiveWeather(destination) : null;
  const staticClimate = inferClimate(destination, season);
  const climate: ClimateProfile = liveWeather
    ? { night_low_c: liveWeather.night_low_c, day_high_c: liveWeather.day_high_c, climate: staticClimate.climate }
    : staticClimate;

  const extracted: Extracted = {
    destination,
    duration_days,
    budget_usd,
    weight_priority: weight,
    waterproof_priority: waterproof,
    season,
    climate: climate.climate,
    night_low_c: climate.night_low_c,
    day_high_c: climate.day_high_c,
    requested_categories,
  };

  const selected = selectKit(extracted);

  const recommendations: Recommendation[] = selected.map(({ product, reason_en, reason_he }) => ({
    product_id: product.id,
    reason_english: reason_en,
    reason_hebrew: reason_he,
  }));

  const totalUsd = selected.reduce((s, { product: p }) => s + p.price_usd, 0);
  const destLabel = destination ?? (lang === "he" ? "היעד שלך" : "your destination");
  const seasLabel = season ? (lang === "he" ? ` ב${season}` : ` in ${season}`) : "";

  const weatherLine_en = liveWeather
    ? ` Weather: ${liveWeather.description}, days ${liveWeather.day_high_c}°C / nights ${liveWeather.night_low_c}°C, ${liveWeather.humidity}% humidity, ${liveWeather.rain_probability}% rain chance.`
    : ``;
  const weatherLine_he = liveWeather
    ? ` מזג אוויר: ${liveWeather.description_he}, יום ${liveWeather.day_high_c}°C / לילה ${liveWeather.night_low_c}°C, לחות ${liveWeather.humidity}%, סיכוי גשם ${liveWeather.rain_probability}%.`
    : ``;

  const summary_english =
    `Gear kit for a${duration_days ? ` ${duration_days}-day` : ""} trip to ${destLabel}${seasLabel}.` +
    weatherLine_en +
    ` Estimated total: $${totalUsd}${budget_usd ? ` (your budget: $${budget_usd})` : ""}.`;

  const summary_hebrew =
    `ערכת ציוד למסע${duration_days ? ` של ${duration_days} ימים` : ""} ל${destLabel}${seasLabel}.` +
    weatherLine_he +
    ` סה"כ משוער: $${totalUsd}${budget_usd ? ` (תקציב: $${budget_usd})` : ""}.`;

  return NextResponse.json({
    extracted,
    recommendations,
    products: selected.map(({ product }) => product),
    summary_hebrew,
    summary_english,
    weather: liveWeather ?? null,
  });
}
