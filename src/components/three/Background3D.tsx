"use client";
/* Fixed, full-viewport host for the WebGL scene. Loaded client-only (Three
   has no business in the server bundle) and only rendered while the hero →
   services "canvas zone" is anywhere near the viewport, so the GPU idles once
   the reader is down in the reviews. */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HomeSlideshow from "./HomeSlideshow";

const BlueprintLiquid = dynamic(() => import("./BlueprintLiquid"), { ssr: false, loading: () => null });

export default function Background3D({ zoneId = "canvas-zone" }: { zoneId?: string }) {
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.matchMedia("(max-width: 48rem)").matches || navigator.hardwareConcurrency <= 4);
    setReady(true);
    const zone = document.getElementById(zoneId);
    if (!zone || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([en]) => setActive(en.isIntersecting), { rootMargin: "40% 0px 40% 0px" });
    io.observe(zone);
    return () => io.disconnect();
  }, [zoneId]);

  return (
    <div
      aria-hidden="true"
      className="blueprint-fallback pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0 }}
    >
      {/* 1. remodeled-home slideshow  2. navy tint so the grid still reads  3. WebGL  4. text scrims */}
      <HomeSlideshow active={active} reduced={reduced} />
      <div className="absolute inset-0 bg-void/[.42]" />
      {ready && <BlueprintLiquid active={active} reduced={reduced} mobile={mobile} />}
      {/* legibility scrim: keeps the copy readable no matter what color the paint is in */}
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_15%_45%,rgba(10,17,32,0.72),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,32,0.25)_0%,rgba(10,17,32,0.3)_50%,rgba(10,17,32,0.75)_100%)]" />
    </div>
  );
}
