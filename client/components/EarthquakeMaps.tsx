"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { getEarthquakes } from "@/lib/api/earthquake";
import { useEffect, useState } from "react";

// ---------------- ICONS ----------------

// Quake Icon
function QuakeIcon(mag: number) {
	const size = 10 + mag * 5;

	let color = "rgba(34, 197, 94, 0.7)";
	if (mag >= 4) color = "rgba(234, 179, 8, 0.7)";
	if (mag >= 5) color = "rgba(249, 115, 22, 0.7)";
	if (mag >= 6) color = "rgba(239, 68, 68, 0.7)";
	if (mag >= 7) color = "rgba(185, 28, 28, 0.7)";

	return L.divIcon({
		html: `
        <div style="
        width:${size}px;
        height:${size}px;
        background:${color};
        border-radius:50%;
        box-shadow: 0 0 ${size / 2}px ${color};
        border: 2px solid white;
        "></div>
    `,
		className: "",
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
	});
}

// User Icon
function UserIcon() {
	return L.divIcon({
		html: `
        <div style="
            width:14px;
            height:14px;
            background:#3b82f6;
            border-radius:50%;
            border:2px solid white;
            box-shadow: 0 0 10px rgba(59,130,246,0.8);
        "></div>
        `,
		className: "",
		iconSize: [14, 14],
		iconAnchor: [7, 7],
	});
}

// ---------------- MAP UTILS ----------------

// Fly to user
function FlyToUser({ location }: { location: LatLngExpression | null }) {
	const map = useMap();

	useEffect(() => {
		if (location) {
			map.flyTo(location, 4, { duration: 0.3 });
		}
	}, [location, map]);

	return null;
}

// ---------------- MAIN ----------------

export default function EarthquakeMap() {
	const [quakes, setQuakes] = useState<any[]>([]);
	const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
	const [locations, setLocations] = useState<Record<string, string>>({});

	const ktm: LatLngExpression = [27.72, 85.32];

	// Reverse geocode
	async function getLocationName(lat: number, lon: number) {
		const key = `${lat},${lon}`;

		if (locations[key]) return;

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
		}
	}

	useEffect(() => {
		async function fetchData() {
			const data = await getEarthquakes("day");
			setQuakes(data.data);

			// fetch location names
			data.data.forEach((q: any) => {
				const [lon, lat] = q.location.coordinates;
				getLocationName(lat, lon);
			});
		}

		function fetchUserLocation() {
			if (!navigator.geolocation) return;

			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const location: LatLngExpression = [
						pos.coords.latitude,
						pos.coords.longitude,
					];
					setUserLocation(location);
				},
				(err) => console.error(err)
			);
		}

		fetchData();
		fetchUserLocation();
	}, []);

	const userIcon = UserIcon();

	return (
		<div className="w-full h-full">
			<MapContainer
				center={ktm}
				zoom={5}
				scrollWheelZoom={true}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=mlULvqRUGxA5YTVzhzdS" />

				<FlyToUser location={userLocation} />

				{/* User Marker */}
				{userLocation && (
					<Marker position={userLocation} icon={userIcon}>
						<Popup>Your Location</Popup>
					</Marker>
				)}

				{/* Earthquake Markers */}
				{quakes.map((q: any) => {
					const coords = q.location.coordinates;
					const mag = q.magnitude.value;

					let color = "rgba(34, 197, 94, 0.7)";
					if (mag >= 4) color = "rgba(234, 179, 8, 0.7)";
					if (mag >= 5) color = "rgba(249, 115, 22, 0.7)";
					if (mag >= 6) color = "rgba(239, 68, 68, 0.7)";
					if (mag >= 7) color = "rgba(185, 28, 28, 0.7)";

					const key = `${coords[1]},${coords[0]}`;
					const locationName = locations[key] || "Loading location...";

					return (
						<Marker
							key={q.eventId}
							position={[coords[1], coords[0]]}
							icon={QuakeIcon(mag)}
						>
							<Popup>
								<div className="bg-white">
									<div className="text-[11px] font-bold text-muted-foreground mb-1">
										{locationName}
									</div>

									<div className="flex items-end gap-1">
										<span
											className="text-2xl font-semibold leading-none"
											style={{ color }}
										>
											{mag}
										</span>
										<span className="text-xs text-muted-foreground mb-0.5">
											{q.magnitude.scale.toUpperCase()}
										</span>
									</div>

									<div className="mt-2 text-[11px] text-muted-foreground">
										Detected on : {new Date(q.detectedAt).toLocaleDateString()}
									</div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-[12px] text-muted-foreground">
											Time:{" "}
											{new Date(q.detectedAt).toLocaleTimeString()}
										</span>
									</div>
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}