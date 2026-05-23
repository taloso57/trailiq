import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic  = "force-dynamic"; // random video must be fresh; individual fetch calls are still cached

// ── Curated playlist IDs ──────────────────────────────────────────────────────
const CURATED_IDS = [
  32387648, // Grand Canyon bridge
  34173483, // Teton Crest Trail
  33627857, // Woman hiking forest
   7786248, // Couple hiking
  11253904, // Hiking on snow
  31686608, // Canyon landscape
   6317344, // Fixing tent
  35461824, // Mountain camp sunrise
  32151259, // Bike camping campfire
  35728732, // Sunset snowy peaks
  37400945, // Himalayan prayer flags
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────
interface PexelsFile {
  id:        number;
  quality:   string;
  file_type: string;
  width:     number;
  height:    number;
  fps:       number;
  link:      string;
}

export interface VideoData {
  videoUrl:       string;
  posterUrl:      string;
  photographer:   string;
  photographerUrl: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function pickBestFile(files: PexelsFile[]): PexelsFile | null {
  const mp4 = files.filter((f) => f.file_type === "video/mp4" && f.width > 0 && f.height > 0);
  if (!mp4.length) return files[0] ?? null;

  const sorted = [...mp4].sort((a, b) => b.width * b.height - a.width * a.height);

  // Prefer ~720p — good quality, manageable bandwidth for a BG loop
  return (
    sorted.find((f) => f.height >= 700 && f.height <= 800) ||
    sorted.find((f) => f.height >= 900 && f.height <= 1200) ||
    sorted[0]
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toVideoData(video: any): VideoData | null {
  const file = pickBestFile(video.video_files ?? []);
  if (!file) return null;
  return {
    videoUrl:        file.link,
    posterUrl:       video.image ?? "",
    photographer:    video.user?.name   ?? "Pexels",
    photographerUrl: video.user?.url    ?? "https://www.pexels.com",
  };
}

/** Fetch a single video by Pexels ID — cached for 24 h by Next.js data cache */
async function fetchById(id: number, apiKey: string): Promise<VideoData | null> {
  try {
    const res = await fetch(`https://api.pexels.com/videos/videos/${id}`, {
      headers: { Authorization: apiKey },
      next:    { revalidate: 86_400 }, // 24 h
    });
    if (!res.ok) return null;
    return toVideoData(await res.json());
  } catch {
    return null;
  }
}

/** Fetch a fresh random hiking video — never cached */
async function fetchRandom(apiKey: string): Promise<VideoData | null> {
  try {
    const page = Math.random() < 0.5 ? 1 : 2;
    const url  = `https://api.pexels.com/videos/search?query=hiking+mountain+trail&per_page=15&page=${page}&orientation=landscape&size=medium`;
    const res  = await fetch(url, { headers: { Authorization: apiKey }, cache: "no-store" });
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.videos?.length) return null;

    const video = data.videos[Math.floor(Math.random() * data.videos.length)];
    return toVideoData(video);
  } catch {
    return null;
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET() {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "PEXELS_API_KEY not configured" }, { status: 500 });
  }

  // DEBUG: test one call directly and surface the response
  try {
    const testRes = await fetch("https://api.pexels.com/videos/videos/32387648", {
      headers: { Authorization: apiKey },
      cache: "no-store",
    });
    if (!testRes.ok) {
      const body = await testRes.text();
      return NextResponse.json({
        debug: true,
        status: testRes.status,
        statusText: testRes.statusText,
        body,
        keyPrefix: apiKey.slice(0, 8),
      });
    }
    const data = await testRes.json();
    return NextResponse.json({ debug: true, status: 200, video_files_count: data.video_files?.length });
  } catch (e) {
    return NextResponse.json({ debug: true, fetchError: String(e) });
  }
}
