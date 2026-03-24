"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Loader2,
  Clock3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { format, subDays } from "date-fns";

type Earthquake = {
  _id?: string;
  magnitude: { value: number; scale: string };
  location: { type: string; coordinates: [number, number] };
  detectedAt: string | number | Date;
  feedType?: string;
};

type FilterState = {
  minMag: string;
  startDate: string;
  endDate: string;
  sortBy: "time" | "magnitude";
  order: "descending" | "ascending";
  limit: number;
};

const defaultEnd = new Date();
const defaultStart = subDays(defaultEnd, 7);

const formatISODate = (d: Date) => d.toISOString().slice(0, 10);

const defaultFilters: FilterState = {
  minMag: "2.0",
  startDate: formatISODate(defaultStart),
  endDate: formatISODate(defaultEnd),
  sortBy: "time",
  order: "descending",
  limit: 100,
};

const QueryIconText = ({ text }: { text: string }) => (
  <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
    <MapPin className="size-3" />
    {text}
  </div>
);

const LoadingState = () => (
  <div className="flex justify-center py-10">
    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
    <span className="ml-2 font-medium text-indigo-700">Fetching events...</span>
  </div>
);

async function getLocationName(lat: number, lon: number, setLocations: React.Dispatch<React.SetStateAction<Record<string, string>>>) {
  const key = `${lat},${lon}`;
  try {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=711132a81b114d0a84a81278d122f929`);
    const data = await res.json();
    const name = data?.features?.[0]?.properties?.formatted || "Unknown location";
    setLocations((prev) => ({ ...prev, [key]: name }));
  } catch (err) {
    console.error("Geoapify error:", err);
    setLocations((prev) => ({ ...prev, [key]: "Location unavailable" }));
  }
}

function EarthquakeCard({ quake, locations }: { quake: Earthquake; locations: Record<string, string> }) {
  const mag = quake.magnitude?.value ?? 0;
  const time = new Date(quake.detectedAt);
  const [lon, lat] = quake.location.coordinates;
  const locationKey = `${lat},${lon}`;
  const formattedLocation = locations[locationKey] || "Loading location...";

  return (
    <article
      className={`rounded-lg border p-4 shadow-sm space-y-2 transition hover:shadow-lg ${
        mag > 5 ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">M {mag.toFixed(1)}</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {quake.feedType || "quake"}
        </span>
      </div>
      <p className="text-sm text-slate-600">
        Placed: {`${quake.location.coordinates[1].toFixed(3)}, ${quake.location.coordinates[0].toFixed(3)}`}
      </p>
      <p className="text-sm text-slate-500">{formattedLocation}</p>
      <p className="text-sm text-slate-500 flex items-center gap-1">
        <Clock3 className="size-3" /> {format(time, "PPP p")}
      </p>
    </article>
  );
}

function EarthquakeList({ data, locations }: { data: Earthquake[]; locations: Record<string, string> }) {
  if (!data.length) {
    return (
      <div className="p-8 text-center text-lg text-slate-500">
        No results found for selected filter criteria.
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-slate-50 text-left text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Magnitude</th>
              <th className="px-4 py-3">Coordinates</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Feed Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((quake) => {
              const mag = quake.magnitude?.value ?? 0;
              const time = new Date(quake.detectedAt);
              const quakeKey = quake._id ?? `${quake.detectedAt}-${mag}`;
              const [lon, lat] = quake.location.coordinates;
              const locationKey = `${lat},${lon}`;
              const formattedLocation = locations[locationKey] || "Loading location...";
              return (
                <tr
                  key={quakeKey}
                  className={`border-t transition ${
                    mag > 5
                      ? "bg-amber-50 hover:bg-amber-100"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-slate-700">{mag.toFixed(1)}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {quake.location?.coordinates
                      ? `${quake.location.coordinates[1].toFixed(3)}, ${quake.location.coordinates[0].toFixed(3)}`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{formattedLocation}</td>
                  <td className="px-4 py-3 text-slate-600">{format(time, "PPP p")}</td>
                  <td className="px-4 py-3 text-slate-600">{quake.feedType ?? "unknown"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {data.map((quake) => {
          const quakeKey = quake._id ?? `${quake.detectedAt}-${quake.magnitude?.value}`;
          return <EarthquakeCard key={quakeKey} quake={quake} locations={locations} />;
        })}
      </div>
    </>
  );
}

function FilterPanel({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (changes: Partial<FilterState>) => void;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Search className="size-4" /> Earthquake Filters
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Min magnitude</label>
          <select
            value={filters.minMag}
            onChange={(e) => onChange({ minMag: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {Array.from({ length: 9 }, (_, i) => (i + 1).toString()).map((mag) => (
              <option key={mag} value={`${mag}.0`}>
                +{mag}.0
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Start date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            max={filters.endDate}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">End date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            min={filters.startDate}
            max={formatISODate(new Date())}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Sort by</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value as FilterState["sortBy"] })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="time">Time</option>
            <option value="magnitude">Magnitude</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Order</label>
          <select
            value={filters.order}
            onChange={(e) => onChange({ order: e.target.value as FilterState["order"] })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Limit</label>
          <input
            type="number"
            value={filters.limit}
            onChange={(e) => onChange({ limit: Math.max(1, Number(e.target.value) || 1) })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            min={1}
            max={500}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span>Filter earthquakes by : </span>
        <span className="inline-flex items-center gap-1">
          <ChevronDown className="size-3" /> sorting: {filters.sortBy}
        </span>
        <span className="inline-flex items-center gap-1">
          <ChevronUp className="size-3" /> order: {filters.order}
        </span>
      </div>
    </section>
  );
}

const QuakeFeed = () => {
  const [earthquakes, setEarthquakes] = React.useState<Earthquake[]>([]);
  const [locations, setLocations] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<FilterState>(defaultFilters);
  const [debouncedFilters, setDebouncedFilters] = React.useState<FilterState>(defaultFilters);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedFilters(filters), 300);
    return () => window.clearTimeout(timeout);
  }, [filters]);

  React.useEffect(() => {
    const controller = new AbortController();
    const fetchEarthquakes = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (debouncedFilters.minMag) params.set("minMag", debouncedFilters.minMag);
        if (debouncedFilters.startDate) params.set("startDate", debouncedFilters.startDate);
        if (debouncedFilters.endDate) params.set("endDate", debouncedFilters.endDate);
        params.set("limit", String(debouncedFilters.limit));
        params.set("sortBy", debouncedFilters.sortBy);
        params.set("order", debouncedFilters.order);

        const url = `http://localhost:8080/api/earthquakes?${params.toString()}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Server error ${response.status}`);
        }

        const payload = await response.json();
        const records: Earthquake[] = Array.isArray(payload.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : [];

        const sorted = [...records].sort((a, b) => {
          const valueA = debouncedFilters.sortBy === "magnitude" ? a.magnitude?.value ?? 0 : new Date(a.detectedAt).getTime();
          const valueB = debouncedFilters.sortBy === "magnitude" ? b.magnitude?.value ?? 0 : new Date(b.detectedAt).getTime();
          if (valueA === valueB) return 0;
          const descFactor = debouncedFilters.order === "descending" ? -1 : 1;
          return valueA > valueB ? descFactor * -1 : descFactor * 1;
        });

        setEarthquakes(sorted);

        sorted.forEach((quake) => {
          const [lon, lat] = quake.location.coordinates;
          getLocationName(lat, lon, setLocations);
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError((err as Error).message || "Unknown error");
        setEarthquakes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();

    return () => {
      controller.abort();
    };
  }, [debouncedFilters]);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <header className="mb-6 rounded-xl border border-slate-200 bg-linear-to-r from-slate-50 via-white to-slate-50 p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-indigo-500">
          <Search className="size-5" />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Earthquake Feed</h1>
        </div>
        <p className="text-slate-600">
          Search for recent or past earthquake events
        </p>
      </header>

      <FilterPanel filters={filters} onChange={(u) => setFilters((prev) => ({ ...prev, ...u }))} />

      <main className="mt-6">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">Error: {error}</div>
        ) : (
          <EarthquakeList data={earthquakes} locations={locations} />
        )}
      </main>
    </div>
  );
};

export default QuakeFeed;

