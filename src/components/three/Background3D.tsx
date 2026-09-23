"use client";
/* Fixed, full-viewport host for the WebGL scene. Loaded client-only (Three
   has no business in the server bundle) and only rendered while the hero →
   services "canvas zone" is anywhere near the viewport, so the GPU idles once
   the reader is down in the reviews. */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
      {ready && <BlueprintLiquid active={active} reduced={reduced} mobile={mobile} />}
      {/* legibility scrim: keeps the copy readable no matter what color the paint is in */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_30%,rgba(10,17,32,0.78),transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,32,0.3)_0%,rgba(10,17,32,0.5)_55%,rgba(10,17,32,0.82)_100%)]" />
    </div>
  );
}
