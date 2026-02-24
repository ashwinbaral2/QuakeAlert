"use client";

import Header from "@/components/site-header";
import ReportButton from "@/components/report-button";
import { Button } from "@/components/ui/button";
import { Activity, ArrowDown } from "lucide-react";

const mockQuakes = [
  { id: 1, location: "Southern California", mag: 4.2, depth: "10 km", time: "2 min ago" },
  { id: 2, location: "Central Japan", mag: 5.1, depth: "35 km", time: "18 min ago" },
  { id: 3, location: "Chile Coast", mag: 3.8, depth: "22 km", time: "42 min ago" },
  { id: 4, location: "Eastern Turkey", mag: 4.6, depth: "15 km", time: "1 hr ago" },
  { id: 5, location: "Alaska Peninsula", mag: 3.3, depth: "8 km", time: "2 hr ago" },
];

const magColor = (m: number) =>
  m >= 5
    ? "bg-destructive/15 text-destructive"
    : m >= 4
    ? "bg-amber-100 text-amber-700"
    : "bg-muted text-muted-foreground";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col ">
      <Header />

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

        <a href="#recent" className="inline-block mt-8">
          <Button size="lg">
            Explore Live Data
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </section>

      {/* RECENT QUAKES */}
      <section
        id="recent"
        className="px-6 py-16 md:py-20 bg-muted/50"
        aria-labelledby="recent-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <h2 id="recent-heading" className="text-2xl font-semibold">
              Recent Earthquakes
            </h2>
          </div>

          <div className="space-y-3">
            {mockQuakes.map((q) => (
              <article
                key={q.id}
                className="bg-card border border-border rounded-lg px-5 py-4 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{q.location}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Depth: {q.depth} · {q.time}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-sm font-semibold px-3 py-1 rounded-full ${magColor(
                    q.mag
                  )}`}
                >
                  M {q.mag.toFixed(1)}
                </span>
              </article>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            Demo data — connect to USGS API for live earthquakes.
          </p>
        </div>
      </section>

      {/* MAP PREVIEW */}
      <section
        id="map"
        className="px-6 py-16 md:py-20"
        aria-labelledby="map-heading"
      >
        <div className="max-w-4xl mx-auto">
          <h2 id="map-heading" className="text-2xl font-semibold mb-8">
            Global Seismic Map
          </h2>

          <div className="relative w-full aspect-video bg-muted border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <p className="text-sm">
                Interactive map will appear here
              </p>
              <p className="text-xs mt-1">
                (Leaflet / Mapbox integration coming next)
              </p>
            </div>
          </div>
        </div>
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

          <Button size="lg" variant="default">
            Configure Alerts
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            Demo only — alert system coming soon.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto px-6 py-8 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} QuakeWatch
      </footer>

      <ReportButton />
    </main>
  );
}