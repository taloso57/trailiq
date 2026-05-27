import { NextResponse } from "next/server";

export const runtime = "nodejs";

const FALLBACK_RATE = 2.85; // USD → ILS fallback if all APIs are unreachable

// Module-level cache: persists across warm function invocations
let _cached: number | null = null;
let _cacheTs = 0;
const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours (Bank of Israel updates daily ~15:30)

/** Fetch representative rate (שער יציג) from Bank of Israel official XML feed */
async function fetchBOIRate(): Promise<number> {
  const res = await fetch("https://www.boi.org.il/currency.xml", {
    next: { revalidate: 21600 }, // Next.js CDN cache for 6 h
    headers: { "User-Agent": "TrailIQ/1.0" },
  });

  if (!res.ok) throw new Error(`BOI HTTP ${res.status}`);

  const text = await res.text();

  // XML structure:
  // <CURRENCY>
  //   <CURRENCYCODE>USD</CURRENCYCODE>
  //   ...
  //   <RATE>3.69</RATE>
  //   ...
  // </CURRENCY>
  const match = text.match(
    /<CURRENCYCODE>USD<\/CURRENCYCODE>[\s\S]*?<RATE>([\d.]+)<\/RATE>/
  );
  if (!match) throw new Error("USD not found in BOI XML");

  const rate = parseFloat(match[1]);
  if (!isFinite(rate) || rate <= 0) throw new Error("Invalid BOI rate value");

  return Math.round(rate * 100) / 100;
}

/** Fallback: open.er-api.com */
async function fetchERRate(): Promise<number> {
  const res = await fetch("https://open.er-api.com/v6/latest/USD", {
    next: { revalidate: 21600 },
  });

  if (!res.ok) throw new Error(`ER API HTTP ${res.status}`);

  const data = await res.json();
  const rate: unknown = data?.rates?.ILS;

  if (typeof rate !== "number" || rate <= 0) throw new Error("Invalid ILS rate from ER API");

  return Math.round(rate * 100) / 100;
}

export async function GET() {
  const now = Date.now();

  // Return cached value if still fresh
  if (_cached !== null && now - _cacheTs < TTL_MS) {
    return NextResponse.json(
      { rate: _cached, source: "cache" },
      { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600" } }
    );
  }

  // 1. Try Bank of Israel official rate
  try {
    const rate = await fetchBOIRate();
    _cached = rate;
    _cacheTs = now;
    return NextResponse.json(
      { rate, source: "boi" },
      { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("[exchange-rate] BOI failed:", err instanceof Error ? err.message : err);
  }

  // 2. Fallback: open.er-api.com
  try {
    const rate = await fetchERRate();
    _cached = rate;
    _cacheTs = now;
    return NextResponse.json(
      { rate, source: "er-api" },
      { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("[exchange-rate] ER API failed:", err instanceof Error ? err.message : err);
  }

  // 3. Static default
  return NextResponse.json(
    { rate: FALLBACK_RATE, source: "fallback" },
    { headers: { "Cache-Control": "public, s-maxage=3600" } }
  );
}
