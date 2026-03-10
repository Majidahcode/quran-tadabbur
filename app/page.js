"use client";
import dynamic from "next/dynamic";

// Disable SSR for the main app (uses Three.js / window)
const QuranApp = dynamic(() => import("@/components/QuranApp"), { ssr: false });

export default function Page() {
  return <QuranApp />;
}
