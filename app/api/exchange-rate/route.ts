import { NextResponse } from "next/server";

export const runtime = "nodejs";

const FALLBACK_RATE = 3.76; // USD → ILS fallback if API is unreachable

// Module-level cache: persists across warm function invocations
let _cached: number | null = null;
let _cacheTs = 0;
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
  const now = Date.now();

  // Return cached value if still fresh
  if (_cached !== null && now - _cacheTs < TTL_MS) {
    return NextResponse.json(
      { rate: _cached, source: "cache" },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" } }
    );
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 }, // Next.js CDN cache for 24 h
    });

    if (!res.ok) throw new Error(`ER API HTTP ${res.status}`);

    const data = await res.json();
    const rate: unknown = data?.rates?.ILS;

    if (typeof rate !== "number" || rate <= 0) throw new Error("Invalid ILS rate");

    _cached = Math.round(rate * 100) / 100; // Round to 2 dp
    _cacheTs = now;

    return NextResponse.json(
      { rate: _cached, source: "live" },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("[exchange-rate]", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { rate: FALLBACK_RATE, source: "fallback" },
      { headers: { "Cache-Control": "public, s-maxage=3600" } }
    );
  }
}
