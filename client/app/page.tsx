"use client";

import ReportButton from "@/components/report-button";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";


export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col ">

      {/* HERO */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
          Earthquake Detection,
          <br />
          <span className="text-muted-foreground">Simplified.</span>
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Monitor seismic activity around the globe with reliable, real-time data.
          Stay informed, stay prepared.
        </p>

        <a href="/dashboard" className="inline-block mt-8">
          <Button size="lg" className=" bg-red-700 hover:bg-red-800 text-white">
            Explore Live Data
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </section>


      {/* ALERT CTA */}
      <section
        id="alerts"
        className="px-6 py-16 md:py-20 bg-muted/50"
        aria-labelledby="alerts-heading"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 id="alerts-heading" className="text-2xl font-semibold mb-4">
            Earthquake Alerts
          </h2>

          <p className="text-muted-foreground mb-6">
            Get notified when earthquakes above your chosen magnitude occur.
          </p>

          <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white">
            Configure Alerts
          </Button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto px-6 py-8 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} QuakeAlert. All rights reserved.
      </footer>

      <ReportButton />
    </main>
  );
}