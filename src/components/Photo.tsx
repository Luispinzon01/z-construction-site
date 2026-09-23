import Image from "next/image";
import { photo, type PhotoKey } from "@/lib/content";

/* next/image over the Unsplash placeholders. `fill` + `sizes` so the browser
   picks the right width; parents must be position:relative with a size. */
export default function Photo({ k, alt, sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw", priority = false, className = "object-cover" }:
  { k: PhotoKey; alt: string; sizes?: string; priority?: boolean; className?: string }) {
  return <Image src={photo(k, 1600)} alt={alt} fill sizes={sizes} priority={priority} className={className} quality={75} />;
}
