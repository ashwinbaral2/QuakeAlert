import { Router } from "express";
import {
    createEarthquake,
    deleteEarthquakeById,
    syncHandler,
    editEarthquakeById,
    getEarthquakes,
    getEarthquakeById,
} from "../controllers/earthquake.js";

const earthquakeRouter = Router();
earthquakeRouter.get("/", (req, res) => {
    res.send(
        "<h2 style='font-family: sans-serif;'>Earthquake Detection API running...</h2>",
    );
});
earthquakeRouter.get("/api/earthquakes/sync", syncHandler);
earthquakeRouter.post("/api/earthquakes", createEarthquake);
earthquakeRouter.get("/api/earthquakes", getEarthquakes);
earthquakeRouter.get("/api/earthquakes/:id", getEarthquakeById);
earthquakeRouter.put("/api/earthquakes/:id", editEarthquakeById);
earthquakeRouter.delete("/api/earthquakes/:id", deleteEarthquakeById);

export default earthquakeRouter;
