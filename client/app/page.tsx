"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import EarthQuakeCard from "@/components/eqcard";
import ReportButton from "@/components/report-button";
import Header from "@/components/site-header";
import Footer from "@/components/site-footer";

const EarthquakeMap = dynamic(() => import("./maps/page"), {
  ssr: false,
});

export default function MapsPage() {
  return (
    <main>
      <Header />
      <EarthquakeMap />
      <EarthQuakeCard />
      <ReportButton/>
      <Footer/>
    </main>
  );
}
