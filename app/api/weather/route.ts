import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Maps our destination keys → OWM city query strings
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

// Maps broad questionnaire region names → a representative destination key
export const QUESTIONNAIRE_DEST_MAP: Record<string, string> = {
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

const WEATHER_DESC_MAP: Record<string, string> = {
  "clear sky":             "שמים בהירים",
  "few clouds":            "מעט עננים",
  "scattered clouds":      "עננים מפוזרים",
  "broken clouds":         "עננות חלקית",
  "overcast clouds":       "מעונן",
  "light rain":            "גשם קל",
  "moderate rain":         "גשם מתון",
  "heavy intensity rain":  "גשם כבד",
  "thunderstorm":          "סופת רעמים",
  "snow":                  "שלג",
  "light snow":            "שלג קל",
  "mist":                  "ערפל",
  "fog":                   "ערפל כבד",
  "drizzle":               "טפטוף",
  "light intensity drizzle": "טפטוף קל",
};

function translateDesc(en: string): string {
  return WEATHER_DESC_MAP[en.toLowerCase()] ?? en;
}

export interface WeatherData {
  destination: string;
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination")?.toLowerCase().trim() ?? "";

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Weather API not configured" }, { status: 503 });
  }

  const city = DEST_TO_CITY[destination];
  if (!city) {
    return NextResponse.json({ error: "Unknown destination" }, { status: 404 });
  }

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${encodeURIComponent(city)}&units=metric&cnt=16&appid=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`OWM HTTP ${res.status}`);

    const data = await res.json();
    const list: any[] = data.list ?? [];
    if (list.length === 0) throw new Error("Empty forecast");

    const slice = list.slice(0, 8);
    const dayHigh   = Math.round(Math.max(...slice.map((x: any) => x.main.temp_max)));
    const nightLow  = Math.round(Math.min(...slice.map((x: any) => x.main.temp_min)));
    const humidity  = Math.round(slice.reduce((s: number, x: any) => s + x.main.humidity, 0) / slice.length);
    const rainProb  = Math.round(slice.reduce((s: number, x: any) => s + (x.pop ?? 0), 0) / slice.length * 100);
    const windSpeed = Math.round(list[0].wind.speed * 3.6); // m/s → km/h

    const desc = (list[0].weather[0].description as string);
    const icon = (list[0].weather[0].icon as string);

    const weather: WeatherData = {
      destination,
      city: data.city?.name ?? city.split(",")[0],
      day_high_c: dayHigh,
      night_low_c: nightLow,
      humidity,
      rain_probability: rainProb,
      wind_speed_kmh: windSpeed,
      description: desc,
      description_he: translateDesc(desc),
      icon,
    };

    return NextResponse.json(weather);
  } catch (err) {
    console.error("[weather] fetch error:", err);
    return NextResponse.json({ error: "Weather unavailable" }, { status: 503 });
  }
}
