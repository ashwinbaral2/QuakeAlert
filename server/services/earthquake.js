// earthquake.service.js
import axios from "axios";
import Earthquake from "../models/earthquake.js";

const FEEDS = [
	{
		url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
		type: "hour",
	},
	{
		url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
		type: "day",
	},
	{
		url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
		type: "week",
	},
	{
		url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
		type: "month",
	},
];
export async function syncEarthquakes() {
	for (const { url: feedUrl, type: feedType } of FEEDS) {
		const response = await axios.get(feedUrl);
		// Log the count of earthquakes and the length of features for debugging
		console.log("USGS count:", response.data.metadata.count);
		console.log("Features length:", response.data.features.length);
		for (const feature of response.data.features) {
			const transformed = transformUSGS(feature, feedType);
			try{
				await Earthquake.updateOne(
					{ eventId: transformed.eventId, feedType: transformed.feedType },
					{ $set: transformed },
					{
						upsert: true,
						runValidators: true,
					},
				);
			}catch(e){
				console.error("Error transforming feature:", e, "Feature:", feature);
				continue;
			}
			
		}
	}
}

function transformUSGS(feature, feedType) {
	return {
		eventId: feature.id,
		source: feature.properties.net,
		detectedAt: new Date(feature.properties.time),
		feedType,
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
