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
	console.log("[CRON] syncEarthquakes started");
	let totalSaved = 0;
	for (const { url: feedUrl, type: feedType } of FEEDS) {
		try {
			const response = await axios.get(feedUrl);
			console.log(`[CRON] ${feedType} feed - USGS count: ${response.data.metadata.count}`);
			for (const feature of response.data.features) {
			const transformed = transformUSGS(feature, feedType);
			try{
					const result = await Earthquake.updateOne(
						{ eventId: transformed.eventId, feedType: transformed.feedType },
						{ $set: transformed },
						{
							upsert: true,
							runValidators: true,
						},
					);
					if (result.upsertedId) totalSaved++;
				}catch(e){
					console.error(`[CRON] Error on ${feedType}:`, e.message);
					continue;
				}
				
			}
		} catch (error) {
			console.error(`[CRON] API Error fetching ${feedType}:`, error.message);
		}
	}
	console.log(`[CRON] syncEarthquakes completed - ${totalSaved} new records saved`);
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
