"use client";
import { useState } from "react";
import Photo from "./Photo";
import type { PhotoKey } from "@/lib/content";

export default function Compare({ before, after, altBefore, altAfter, labels, ariaLabel, sizes = "(min-width: 64rem) 50vw, 100vw" }:
  { before: PhotoKey; after: PhotoKey; altBefore: string; altAfter: string; labels: [string, string]; ariaLabel: string; sizes?: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="compare" style={{ ["--pos" as string]: `${pos}%` }}>
      <Photo k={before} alt={altBefore} sizes={sizes} />
      <div className="compare__after absolute inset-0"><Photo k={after} alt={altAfter} sizes={sizes} /></div>
      <span className="absolute top-3.5 left-3.5 slate rounded px-2.5 py-1.5 bg-navy-2/80 text-bone pointer-events-none">{labels[0]}</span>
      <span className="absolute top-3.5 right-3.5 slate rounded px-2.5 py-1.5 bg-amber text-navy-2 pointer-events-none">{labels[1]}</span>
      <div className="compare__handle" />
      <input className="compare__range" type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={ariaLabel} />
    </div>
  );
}
