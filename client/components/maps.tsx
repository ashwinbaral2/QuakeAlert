"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { getEarthquakes } from "@/lib/api/earthquake";
import { useEffect, useState } from "react";
// custom icon
function QuakeIcon(mag: number) {
	const size = 10 + mag * 4;

	//  color logic
	let color = "#22c55e"; // green
	if (mag >= 4) color = "#eab308"; // yellow
	if (mag >= 5) color = "#f97316"; // orange
	if (mag >= 6) color = "#ef4444"; // red
	if (mag >= 7) color = "#b91c1c"; // dark red 

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
		className: "", // removes default styles
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
	});
}

export default function EarthquakeMap() {
	const [quakes, setQuakes] = useState<any[]>([]);
	const gorkha: LatLngExpression = [28.147, 84.708];

	useEffect(() => {
		async function fetchData() {
			const data = await getEarthquakes("month"); // default = past day
			setQuakes(data.data);

			console.log("API RESPONSE:", data);
		}

		fetchData();
	}, []);

	return (
		<div className="w-full h-screen mt-5 absolute top-0 left-0">
			<MapContainer
				center={gorkha}
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
								<strong>Magnitude:</strong> {q.magnitude.value} <br />
								<strong>Time:</strong> {new Date(q.detectedAt).toLocaleString()}
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}
