import Earthquake from "../models/eq.js";

const createEarthquake = async (req, res) => {
  try {
    await Earthquake.create(req.body);
    res.status(201).send("Earthquake created successfully!");
  } catch (error) {
    res.status(500).send("Error creating earthquake: " + error.message);
  }
};

const getEarthquakes = async (req, res) => {
  try {
    const earthquakes = await Earthquake.find();
    res.send(earthquakes);
  } catch (error) {
    res.status(500).send("Error fetching earthquakes: " + error.message);
  }
};

const getEarthquakeById = async (req, res) => {
  try {
    const earthquake = await Earthquake.findById(req.params.id);
    if (!earthquake) {
      return res.status(404).send("Earthquake not found");
    }
    res.send(earthquake);
  } catch (error) {
    res.status(500).send("Error fetching earthquake: " + error.message);
  }
};
const editEarthquakeById = async (req, res) => {
  try {
    const earthquake = await Earthquake.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!earthquake) {
      return res.status(404).send("Earthquake not found");
    }
    res.send("Edited!");
  } catch (error) {
    res.status(500).send("Error editing earthquake: " + error.message);
  }
};
const deleteEarthquakeById = async (req, res) => {
  try {
    const earthquake = await Earthquake.findByIdAndDelete(req.params.id);
    if (!earthquake) {
      return res.status(404).send("Earthquake not found");
    }
    res.send("Deleted success!");
  } catch (error) {
    res.status(500).send("Error deleting earthquake: " + error.message);
  }
};
export {
  createEarthquake,
  getEarthquakes,
  getEarthquakeById,
  editEarthquakeById,
  deleteEarthquakeById,
};
