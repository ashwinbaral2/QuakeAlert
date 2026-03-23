"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getEarthquakes } from "@/lib/api/earthquake";

const EarthquakeMap = dynamic(() => import("@/components/EarthquakeMaps"), {
	ssr: false,
});

// Magnitude color logic
function getMagnitudeColor(mag: number) {
	let color = "rgba(34, 197, 94, 0.7)"; // green
	if (mag >= 4) color = "rgba(234, 179, 8, 0.7)"; // yellow
	if (mag >= 5) color = "rgba(249, 115, 22, 0.7)"; // orange
	if (mag >= 6) color = "rgba(239, 68, 68, 0.7)"; // red
	if (mag >= 7) color = "rgba(185, 28, 28, 0.7)"; // dark red
	return color;
}

// Reverse geocode function
async function getLocationName(
	lat: number,
	lon: number,
	setLocations: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
	const key = `${lat},${lon}`;

	try {
		const res = await fetch(
			`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=711132a81b114d0a84a81278d122f929`
		);
		const data = await res.json();

		const name =
			data?.features?.[0]?.properties?.formatted || "Unknown location";

		setLocations((prev) => ({
			...prev,
			[key]: name,
		}));
	} catch (err) {
		console.error("Geoapify error:", err);
		setLocations((prev) => ({
			...prev,
			[key]: "Location unavailable",
		}));
	}
}

// Stats Card Component
function StatsCard({ title, value }: { title: string; value: string }) {
	return (
		<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100">
			<div className="text-center">
				<p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
				<p className="text-3xl font-bold text-gray-900">{value}</p>
			</div>
		</div>
	);
}

// Magnitude Badge Component
function MagnitudeBadge({ mag }: { mag: number }) {
	const color = getMagnitudeColor(mag);
	return (
		<span
			className="px-3 py-1 rounded-full text-sm font-semibold text-white shadow-sm"
			style={{ backgroundColor: color }}
		>
			{mag.toFixed(1)}
		</span>
	);
}

// Event Item Component
function EventItem({
	quake,
	isStrongest,
	locations,
}: {
	quake: any;
	isStrongest: boolean;
	locations: Record<string, string>;
}) {
	const [lon, lat] = quake.location.coordinates;
	const mag = quake.magnitude.value;
	const time = new Date(quake.detectedAt);
	const key = `${lat},${lon}`;
	const location = locations[key] || "Loading location...";

	return (
		<div
			className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${isStrongest ? "bg-yellow-50 border-yellow-200" : ""}`}
		>
			<div className="flex items-center justify-between">
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate">
						{location}
					</p>
					<p className="text-xs text-gray-500 mt-1">{time.toLocaleString()}</p>
				</div>
				<div className="ml-3">
					<MagnitudeBadge mag={mag} />
				</div>
			</div>
		</div>
	);
}

export default function MapsPage() {
	const [quakes, setQuakes] = useState<any[]>([]);
	const [locations, setLocations] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await getEarthquakes("day");
				setQuakes(data.data);

				// fetch location names
				data.data.forEach((q: any) => {
					const [lon, lat] = q.location.coordinates;
					getLocationName(lat, lon, setLocations);
				});
			} catch (error) {
				console.error("Failed to fetch earthquakes:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	const totalEarthquakes = quakes.length;
	const highestMag =
		quakes.length > 0 ? Math.max(...quakes.map((q) => q.magnitude.value)) : 0;
	const averageDepth =
		quakes.length > 0
			? (
					quakes.reduce((sum, q) => sum + (q.depthKm ?? 0), 0) / quakes.length
				).toFixed(1)
			: "0.0";
	const SIGNIFICANT_MAG = 4.5;
	const significantEvents = quakes.filter(q => q.magnitude.value >= SIGNIFICANT_MAG).length;
	const strongestQuake = quakes.find((q) => q.magnitude.value === highestMag);

	if (loading) {
		return (
			<main className="h-screen w-full bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading earthquake data...</p>
				</div>
			</main>
		);
	}

	return (
		<main className="h-screen w-full bg-gray-50 p-6 flex flex-col gap-6">
			{/* Stats Section */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				<StatsCard title="Total Events" value={totalEarthquakes.toString()} />
				<StatsCard title="Significant" value={significantEvents.toString()} />
				<StatsCard title="Highest Magnitude" value={highestMag.toFixed(1)} />
				<StatsCard title="Average Depth (in km)" value={averageDepth} />
			</div>

			{/* Main Content */}
			<div className="flex-1 flex gap-6 min-h-0">
				{/* Map Section */}
				<div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
					<EarthquakeMap />
				</div>

				{/* Event List Panel */}
				<div className="w-96 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
					<div className="p-6 border-b border-gray-100">
						<h3 className="text-xl font-semibold text-gray-900">
							Recent Earthquakes
						</h3>
						<p className="text-sm text-gray-600 mt-1">
							Latest seismic activity
						</p>
					</div>
					<div className="flex-1 overflow-y-auto">
						{quakes.length === 0 ? (
							<div className="p-6 text-center text-gray-500">
								No earthquakes detected
							</div>
						) : (
							quakes.map((quake) => (
								<EventItem
									key={quake.eventId}
									quake={quake}
									isStrongest={quake === strongestQuake}
									locations={locations}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
