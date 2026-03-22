import dotenv from "dotenv"

import express from "express";
import "./cronjob/earthquake.js"

import connect from "./database/connect.js";
import earthquakeRouter from "./routes/earthquake.js";
import cors from "cors";

dotenv.config()


const app = express();
const port = 8080;

app.use(cors());

connect();
app.use(express.json());
app.use(earthquakeRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});