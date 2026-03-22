import dotenv from "dotenv"

import express from "express";
import connect from "./database/connect.js";
import earthquakeRouter from "./routes/earthquake.js";
import cors from "cors";

dotenv.config()

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(earthquakeRouter);

// Start server and initialize cron after DB connection
(async () => {
  await connect();
  console.log("[INIT] Database connected, starting cron job...");
  
  // Import cron AFTER DB connection is established
  await import("./cronjob/earthquake.js");
  
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
})();