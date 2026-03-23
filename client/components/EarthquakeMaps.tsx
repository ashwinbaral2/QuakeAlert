"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { getEarthquakes } from "@/lib/api/earthquake";
import { useEffect, useState } from "react";

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

export default function EarthquakeMap() {
	const [quakes, setQuakes] = useState<any[]>([]);
	const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);

	const ktm: LatLngExpression = [27.72, 85.32];

	useEffect(() => {
		async function fetchData() {
			const data = await getEarthquakes("day");
			setQuakes(data.data);

			console.log("API RESPONSE:", data);
		}

		function fetchUserLocation() {
			if (!navigator.geolocation) {
				console.error("Geolocation not supported");
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const location: LatLngExpression = [
						pos.coords.latitude,
						pos.coords.longitude,
					];

					console.log("User Location:", location);
					setUserLocation(location); // FIXED
				},
				(err) => {
					console.error("Error fetching user location:", err);
				}
			);
		}

		fetchData();
		fetchUserLocation();
	}, []);

	const userIcon = UserIcon();

	return (
		<div className="w-full h-screen mt-5 absolute top-0 left-0">
			<MapContainer
				center={ktm}
				zoom={5}
				scrollWheelZoom={true}
				style={{ height: "80%", width: "80%" }}
			>
				<TileLayer url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=mlULvqRUGxA5YTVzhzdS" />

				{/* Move map to user */}
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

					return (
						<Marker
							key={q.eventId}
							position={[coords[1], coords[0]]}
							icon={QuakeIcon(mag)}
						>
							<Popup>
								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-[12px] text-muted-foreground">
											Time: {new Date(q.detectedAt).toLocaleTimeString()}
										</span>
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
										{new Date(q.detectedAt).toLocaleDateString()}
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
