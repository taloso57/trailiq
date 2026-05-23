"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoData } from "@/app/api/playlist/route";

/**
 * Full-viewport hero video player.
 *
 * Architecture
 * ───────────
 *  • Fetches /api/playlist → array of 12 videos (1 random + 11 curated)
 *  • Desktop: two <video> elements (A / B) that crossfade using CSS opacity
 *    transitions. While video A plays, video B silently pre-buffers the next
 *    clip. On onEnded, B fades in and A fades out, then A reloads the clip
 *    after that for the next crossfade.
 *  • Mobile: no video is decoded — a single <div> cycles through the poster
 *    images every 8 s with a fade transition.
 *  • Fallback: if the API call fails, this component renders nothing and the
 *    parent section's bg-black is the fallback.
 *
 * Z-index layers (all inside the parent <section> which is position:relative)
 *   z-[1]  video elements / mobile poster
 *   z-[2]  50 % black overlay
 *   z-[3]  Pexels credit
 */
export default function HeroVideo() {
  // ── Playlist state ─────────────────────────────────────────────────────────
  const [videos, setVideos]   = useState<VideoData[]>([]);
  const [failed, setFailed]   = useState(false);

  // ── Two video elements for crossfade ───────────────────────────────────────
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  // Mutable refs — safe to read inside event handlers without stale-closure issues
  const active      = useRef<"a" | "b">("a");   // which slot is currently visible
  const idxRef      = useRef(0);                 // index of the currently-playing video
  const vidsRef     = useRef<VideoData[]>([]);   // mirrors videos state
  const pendingLoad = useRef<ReturnType<typeof setTimeout> | null>(null);

  // React state drives CSS opacity (triggers re-render)
  const [aOp, setAOp] = useState(0);
  const [bOp, setBOp] = useState(0);

  // ── Mobile poster cycling ──────────────────────────────────────────────────
  const [mobileIdx,  setMobileIdx]  = useState(0);
  const [mobileFade, setMobileFade] = useState(true);

  // Keep vidsRef in sync
  useEffect(() => { vidsRef.current = videos; }, [videos]);

  // ── Fetch playlist ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch("/api/playlist")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { videos: VideoData[] }) => {
        if (!cancelled && d.videos?.length) setVideos(d.videos);
      })
      .catch((e) => {
        if (!cancelled) {
          console.warn("[HeroVideo] playlist fetch failed:", e);
          setFailed(true);
        }
      });
    return () => { cancelled = true; };
  }, []);

  // ── Initialise once playlist arrives ──────────────────────────────────────
  useEffect(() => {
    if (!videos.length) return;

    active.current  = "a";
    idxRef.current  = 0;

    const elA = aRef.current;
    const elB = bRef.current;

    // Slot A → plays video[0]
    if (elA) { elA.src = videos[0].videoUrl; elA.load(); }

    // Slot B → silently pre-buffers video[1] while A plays
    if (elB && videos.length > 1) { elB.src = videos[1].videoUrl; elB.load(); }
  }, [videos]);

  // ── Mobile cycling (8 s interval) ─────────────────────────────────────────
  useEffect(() => {
    if (!videos.length) return;
    const t = setInterval(() => {
      setMobileFade(false);
      setTimeout(() => {
        setMobileIdx((p) => (p + 1) % videos.length);
        setMobileFade(true);
      }, 600);
    }, 8_000);
    return () => clearInterval(t);
  }, [videos.length]);

  // ── Crossfade helper ───────────────────────────────────────────────────────
  /**
   * Called when `from` slot's video ends.
   * 1. Marks `to` as the active slot.
   * 2. Fades `to` in (if already buffered) or waits for its onCanPlay.
   * 3. Fades `from` out 800 ms later (overlap = crossfade).
   * 4. After transition, reloads `from` with the next-next video.
   */
  function transition(from: "a" | "b") {
    const to: "a" | "b" = from === "a" ? "b" : "a";
    const vids           = vidsRef.current;
    if (!vids.length) return;

    // Advance playlist index
    const nextIdx    = (idxRef.current + 1) % vids.length;
    const preloadIdx = (nextIdx + 1) % vids.length;     // video after next
    idxRef.current   = nextIdx;
    active.current   = to;

    const incomingEl = to   === "a" ? aRef.current : bRef.current;
    const outgoingEl = from === "a" ? aRef.current : bRef.current;

    const fadeIn  = to   === "a" ? setAOp : setBOp;
    const fadeOut = from === "a" ? setAOp : setBOp;

    // Bring incoming to front (if already buffered, play immediately)
    if (incomingEl && incomingEl.readyState >= 3) {
      incomingEl.play().catch(() => {});
      fadeIn(1);
    }
    // else: onCanPlay of the incoming slot will fire and handle it

    // Fade out outgoing 800 ms after crossfade starts
    setTimeout(() => fadeOut(0), 800);

    // After transition completes, reload outgoing slot with the video after next
    // Capture idxRef value NOW so the closure is stable
    const capturedNext = nextIdx;
    if (pendingLoad.current) clearTimeout(pendingLoad.current);
    pendingLoad.current = setTimeout(() => {
      const preload = (capturedNext + 1) % vidsRef.current.length;
      if (outgoingEl) {
        outgoingEl.src = vidsRef.current[preload]?.videoUrl ?? "";
        outgoingEl.load();
      }
    }, 1_400); // safely after 1 s opacity transition
  }

  // ── Slot A event handlers ──────────────────────────────────────────────────
  function onACanPlay() {
    if (active.current !== "a") return; // A is pre-buffering while B plays — ignore
    setAOp(1);
    aRef.current?.play().catch(() => {});
  }

  function onAEnded() {
    if (active.current !== "a") return;
    transition("a");
  }

  // ── Slot B event handlers ──────────────────────────────────────────────────
  function onBCanPlay() {
    if (active.current !== "b") return; // B is pre-buffering while A plays — ignore
    setBOp(1);
    bRef.current?.play().catch(() => {});
  }

  function onBEnded() {
    if (active.current !== "b") return;
    transition("b");
  }

  // ── Cleanup pending timeouts on unmount ───────────────────────────────────
  useEffect(() => () => { if (pendingLoad.current) clearTimeout(pendingLoad.current); }, []);

  // ── Nothing to show yet (bg-black from parent is the fallback) ────────────
  if (failed || !videos.length) return null;

  return (
    <>
      {/* ── Mobile: cycling poster images (no video download) ── */}
      <div
        aria-hidden
        className={`
          absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat md:hidden
          transition-opacity duration-500
          ${mobileFade ? "opacity-100" : "opacity-0"}
        `}
        style={{ backgroundImage: `url("${videos[mobileIdx]?.posterUrl ?? ""}")` }}
      />

      {/* ── Desktop slot A ── */}
      <video
        ref={aRef}
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover hidden md:block pointer-events-none"
        style={{ zIndex: 1, opacity: aOp, transition: "opacity 1s ease-in-out" }}
        muted
        playsInline
        onCanPlay={onACanPlay}
        onEnded={onAEnded}
      />

      {/* ── Desktop slot B ── */}
      <video
        ref={bRef}
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover hidden md:block pointer-events-none"
        style={{ zIndex: 1, opacity: bOp, transition: "opacity 1s ease-in-out" }}
        muted
        playsInline
        onCanPlay={onBCanPlay}
        onEnded={onBEnded}
      />

      {/* ── 50 % black overlay ── */}
      <div aria-hidden className="absolute inset-0 z-[2] bg-black/50 pointer-events-none" />

      {/* ── Pexels credit ── */}
      <p className="absolute bottom-5 end-6 z-[3] text-[9px] text-white/20 pointer-events-none select-none">
        Video ·{" "}
        <a
          href="https://www.pexels.com"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto hover:text-white/40 transition-colors"
        >
          Pexels
        </a>
      </p>
    </>
  );
}
