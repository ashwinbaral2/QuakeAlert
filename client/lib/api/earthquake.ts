import axios from "axios";
export async function getEarthquakes(feedType = "month") {
  const res = await axios.get(
    `http://localhost:8080/api/earthquakes?feedType=${feedType}`
  );

  return res.data;
}