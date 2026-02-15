"use client"
import dynamic from "next/dynamic";

const EarthquakeMap = dynamic(() => import("../components/maps/page"), {
  ssr: false,
});

export default function MapsPage() {
  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
        QuakeAlert
      </h1>
      <EarthquakeMap />
    </main>
  );
}
