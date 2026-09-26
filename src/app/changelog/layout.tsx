import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Space_Mono } from "next/font/google";
import "../globals.css";

/* Root layout for the unlisted changelog report (reached only at /NewSiteNewYou). */
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], display: "swap", variable: "--font-bc" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "600"], display: "swap", variable: "--font-barlow" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400"], display: "swap", preload: false, variable: "--font-mono-sp" });

export const metadata: Metadata = { title: "New Site, New You · Z Construction build report", robots: { index: false, follow: false, nocache: true }, icons: { icon: "/icon.png" } };

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-navy-2 text-bone">{children}</body>
    </html>
  );
}
