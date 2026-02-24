// earthquake.service.js
import axios from "axios";
import Earthquake from "../models/earthquake.js";

const FEED_URL =
	"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

export async function syncEarthquakes() {
	const response = await axios.get(FEED_URL);
	// Log the count of earthquakes and the length of features for debugging
	console.log("USGS count:", response.data.metadata.count);
	console.log("Features length:", response.data.features.length);

	for (const feature of response.data.features) {
		const transformed = transformUSGS(feature);

		await Earthquake.updateOne({ eventId: transformed.eventId }, transformed, {
			upsert: true,
		});
	}
}

function transformUSGS(feature) {
	return {
		eventId: feature.id,
		source: feature.properties.net,
		detectedAt: new Date(feature.properties.time),
		location: {
			type: "Point",
			coordinates: [
				feature.geometry.coordinates[0],
				feature.geometry.coordinates[1],
			],
		},
		depthKm: feature.geometry.coordinates[2],
		magnitude: {
			value: feature.properties.mag,
			scale: normalizeScale(feature.properties.magType),
		},
	};
}

function normalizeScale(scale) {
	if (!scale) return "Mw";
	const upper = scale.toUpperCase();
	if (["MW", "ML", "MS", "MB"].includes(upper)) return upper;
	return "Mw";
}
