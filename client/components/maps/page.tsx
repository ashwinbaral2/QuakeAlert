"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

export default function EarthquakeMap() {
    const kathmandu: LatLngExpression = [27.7172, 85.324];
    return (
        <div style={{ height: "50vh", width: "100%" }}>
            <MapContainer
                center={kathmandu}
                zoom={7}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={kathmandu}></Marker>
                
            </MapContainer>
        </div>
    );
}
