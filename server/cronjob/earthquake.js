import cron from "node-cron";
import { syncEarthquakes } from "../services/earthquake.js";

// Schedule the job to run every hour at the top of the hour

let isRunning = false;

console.log("[INIT] Earthquake cron job initialized - scheduled for every hour");

cron.schedule("0 * * * *", async () => {
  if (isRunning) {
    console.log("⚠️ Previous job still running, skipping...");
    return;
  }

  isRunning = true;

  console.log("Running earthquake data sync job...");
  try {
    await syncEarthquakes();
    console.log("Earthquake data sync completed successfully from cron job.");
  } catch (error) {
    console.error("Error during earthquake data sync:", error);
  } finally {
    isRunning = false;
    console.log("Earthquake data sync job finished.");
  }
});
