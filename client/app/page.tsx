"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import EarthQuakeCard from "@/components/eqcard";

const EarthquakeMap = dynamic(() => import("./maps/page"), {
  ssr: false,
});

export default function MapsPage() {
 
  return (
    <main className="p-5">
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}
      >
        QuakeAlert
      </h1>
      <EarthquakeMap />
      <EarthQuakeCard />
    </main>
  );
}
