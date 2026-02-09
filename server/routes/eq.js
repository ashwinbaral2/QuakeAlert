import { Router } from "express";
import Earthquake from "../models/eq.js";
import {
    createEarthquake,
    deleteEarthquakeById,
    editEarthquakeById,
    getEarthquakes,
    getEarthquakeById,
} from "../controllers/eq.js";

const earthquakeRouter = Router();
earthquakeRouter.get("/", (req, res) => {
    res.send(
        "<h2 style='font-family: sans-serif;'>Earthquake Detection API running...</h2>",
    );
});
earthquakeRouter.post("/api/earthquakes", createEarthquake);
earthquakeRouter.get("/api/earthquakes", getEarthquakes);
earthquakeRouter.get("/api/earthquakes/:id", getEarthquakeById);
earthquakeRouter.put("/api/earthquakes/:id", editEarthquakeById);
earthquakeRouter.delete("/api/earthquakes/:id", deleteEarthquakeById);

export default earthquakeRouter;
// ───────────────── Routes ─────────────────
