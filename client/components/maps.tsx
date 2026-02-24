"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { SearchBar } from "./searchbar";

// custom icon
function QuakeIcon(mag: number) {
    const size = 5 + mag * 3;

    return new L.Icon({
        iconUrl: "https://hexmos.com/freedevtools/svg_icons/circle/circle-dot-lucide.svg",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
}



export default function EarthquakeMap() {
    const gorkha: LatLngExpression = [28.147, 84.708];
    return (
        <div className="w-full h-screen mt-5 absolute top-0 left-0">
            
            <MapContainer
                center={gorkha}
                zoom={7}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                className="top-0 z-10"
            >
                <SearchBar/>
                <TileLayer
                    url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=mlULvqRUGxA5YTVzhzdS"
                />
                <Marker position={gorkha} icon={QuakeIcon(7.8)}></Marker>
            </MapContainer>
        </div>
    );
}
