"use client";
import dynamic from "next/dynamic";

const EarthquakeMap = dynamic(() => import("@/components/EarthquakeMaps"), {
  ssr: false,
});

export default function MapsPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <EarthquakeMap />
    </main>
  );
}
