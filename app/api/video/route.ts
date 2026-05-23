import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // fresh random video on every request

interface PexelsVideoFile {
  id: number;
  quality: "uhd" | "hd" | "sd" | string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string; // thumbnail
  duration: number;
  user: { id: number; name: string; url: string };
  video_files: PexelsVideoFile[];
  video_pictures: { id: number; picture: string; nr: number }[];
}

interface PexelsSearchResponse {
  page: number;
  per_page: number;
  total_results: number;
  videos: PexelsVideo[];
}

function pickBestFile(files: PexelsVideoFile[]): PexelsVideoFile | null {
  const mp4 = files.filter((f) => f.file_type === "video/mp4" && f.width > 0 && f.height > 0);
  if (!mp4.length) return files[0] ?? null;

  // Sort all MP4 files by resolution (largest first)
  const sorted = [...mp4].sort((a, b) => b.width * b.height - a.width * a.height);

  // Prefer 720p (1280×720) — best balance of quality vs. bandwidth for a BG video
  const hd720 = sorted.find((f) => f.height >= 700 && f.height <= 800);
  if (hd720) return hd720;

  // Accept 1080p if 720p isn't available
  const hd1080 = sorted.find((f) => f.height >= 900 && f.height <= 1200);
  if (hd1080) return hd1080;

  // Fall back to highest resolution available (avoids 360p)
  return sorted[0];
}

export async function GET() {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "PEXELS_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch two pages and pick from a combined pool for more variety
    const page = Math.random() < 0.5 ? 1 : 2;
    const url = new URL("https://api.pexels.com/videos/search");
    url.searchParams.set("query", "hiking mountain trail");
    url.searchParams.set("per_page", "15");
    url.searchParams.set("page", String(page));
    url.searchParams.set("orientation", "landscape");
    url.searchParams.set("size", "medium"); // prefer medium+ resolution source videos

    const res = await fetch(url.toString(), {
      headers: { Authorization: apiKey },
      next: { revalidate: 0 }, // never cache at the fetch level
    });

    if (!res.ok) {
      console.error("[/api/video] Pexels error", res.status, await res.text());
      return NextResponse.json(
        { error: `Pexels API returned ${res.status}` },
        { status: 502 }
      );
    }

    const data: PexelsSearchResponse = await res.json();

    if (!data.videos?.length) {
      return NextResponse.json({ error: "No videos found" }, { status: 404 });
    }

    // Pick a random video from the result set
    const video = data.videos[Math.floor(Math.random() * data.videos.length)];
    const file = pickBestFile(video.video_files);

    if (!file) {
      return NextResponse.json({ error: "No playable file found" }, { status: 404 });
    }

    return NextResponse.json({
      videoUrl: file.link,
      posterUrl: video.image, // high-quality thumbnail Pexels provides
      width: file.width,
      height: file.height,
      duration: video.duration,
      photographer: video.user.name,
      photographerUrl: video.user.url,
    });
  } catch (err) {
    console.error("[/api/video] fetch failed", err);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}
