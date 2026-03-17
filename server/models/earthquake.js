import mongoose, { Schema } from "mongoose";

const EarthquakeSchema = new Schema(
    {
        eventId: { type: String, required: true },
        source: { type: String, required: true },
        detectedAt: { type: Date, required: true },
        feedType: { type: String, enum: ["hour", "day", "week", "month"], required: true },

        location: {
            type: { type: String, enum: ["Point"], default: "Point" },
            coordinates: { type: [Number], required: true },
        },

        depthKm: { type: Number, required: true },

        magnitude: {
            value: { type: Number, required: true },
            scale: { type: String, enum: ["Mw", "ML", "Ms", "Mb"], lowercase: true, default: "Mw" },
        },

        reviewed: { type: Boolean, default: false },
        remarks: String,
    },
    { timestamps: true },
);
const Earthquake = mongoose.model("Earthquake", EarthquakeSchema);

export default Earthquake;
