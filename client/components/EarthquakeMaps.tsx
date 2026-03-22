"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { getEarthquakes } from "@/lib/api/earthquake";
import { useEffect, useState } from "react";
// custom icon
function QuakeIcon(mag: number) {
	const size = 10 + mag * 5;

	// color logic
	let color = "rgba(34, 197, 94, 0.7)"; // green

	if (mag >= 4) color = "rgba(234, 179, 8, 0.7)"; // yellow
	if (mag >= 5) color = "rgba(249, 115, 22, 0.7)"; // orange
	if (mag >= 6) color = "rgba(239, 68, 68, 0.7)"; // red
	if (mag >= 7) color = "rgba(185, 28, 28, 0.7)"; // dark red

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
		className: "", // removes default styles -- dont remove this lol
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
	});
}

export default function EarthquakeMap() {
	const [quakes, setQuakes] = useState<any[]>([]);
	const ktm: LatLngExpression = [27.72, 85.32];

	useEffect(() => {
		async function fetchData() {
			const data = await getEarthquakes("day"); // default = past day
			setQuakes(data.data);

			console.log("API RESPONSE:", data);
		}

		fetchData();
	}, []);

	return (
		<div className="w-full h-screen mt-5 absolute top-0 left-0">
			<MapContainer
				center={ktm}
				zoom={5}
				scrollWheelZoom={true}
				style={{ height: "80%", width: "80%" }}
			>
				<TileLayer url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=mlULvqRUGxA5YTVzhzdS" />

				{quakes.map((q: any) => {
					const coords = q.location.coordinates;

					return (
						<Marker
							key={q.eventId}
							position={[coords[1], coords[0]]} // lat, lng
							icon={QuakeIcon(q.magnitude.value)}
						>
							<Popup>
								{(() => {
									const mag = q.magnitude.value;

									let color = "rgba(34, 197, 94, 0.7)";
									if (mag >= 4) color = "rgba(234, 179, 8, 0.7)";
									if (mag >= 5) color = "rgba(249, 115, 22, 0.7)";
									if (mag >= 6) color = "rgba(239, 68, 68, 0.7)";
									if (mag >= 7) color = "rgba(185, 28, 28, 0.7)";

									return (
										<div>
											{/* Header */}
											<div className="flex items-center justify-between mb-2">
												<span className="text-[12px] text-muted-foreground">
													Time : {new Date(q.detectedAt).toLocaleTimeString()}
												</span>
											</div>

											{/* Magnitude */}
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

											{/* Footer */}
											<div className="mt-2 text-[11px] text-muted-foreground">
												{new Date(q.detectedAt).toLocaleDateString()}
											</div>
										</div>
									);
								})()}
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}
