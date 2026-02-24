// import dotenv from "dotenv"
// dotenv.config()

import express from "express";
const app = express();
const port = 8080;

import connect from "./database/connect.js";
import earthquakeRouter from "./routes/earthquake.js";
connect();
app.use(express.json());
app.use(earthquakeRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});