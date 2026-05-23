"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10 pointer-events-none"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: { value: 80, density: { enable: true, width: 1400 } },
          color: { value: ["#ffffff", "#00D4FF", "#0EA5E9"] },
          opacity: {
            value: { min: 0.03, max: 0.18 },
            animation: { enable: true, speed: 0.4 },
          },
          size: {
            value: { min: 0.5, max: 1.8 },
            animation: { enable: false },
          },
          move: {
            enable: true,
            speed: 0.25,
            direction: "none",
            outModes: "out",
            random: true,
            straight: false,
          },
          links: {
            enable: true,
            distance: 160,
            color: "#ffffff",
            opacity: 0.04,
            width: 0.8,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 180, links: { opacity: 0.12 } },
          },
        },
      }}
    />
  );
}
