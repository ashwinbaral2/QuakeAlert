import Earthquake from "../models/earthquake.js";
import { syncEarthquakes } from "../services/earthquake.js";

const createEarthquake = async (req, res) => {
  try {
    await Earthquake.create(req.body);
    res.status(201).send("Earthquake created successfully!");
  } catch (error) {
    res.status(500).send("Error creating earthquake: " + error.message);
  }
};

// const getEarthquakes = async (req, res) => {
//   try {
//     const earthquakes = await Earthquake.find();
//     res.send(earthquakes);
//   } catch (error) {
//     res.status(500).send("Error fetching earthquakes: " + error.message);
//   }
// };

const getEarthquakes = async (req, res) => {
  try {
    const {
      feedType,
      minMag,
      maxMag,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const query = {};

    //  Feed type
    if (feedType) {
      query.feedType = feedType;
    }

    //  Magnitude
    if (minMag !== undefined || maxMag !== undefined) {
      query["magnitude.value"] = {};
      if (minMag) query["magnitude.value"].$gte = Number(minMag);
      if (maxMag) query["magnitude.value"].$lte = Number(maxMag);
    }

    // Date
    if (startDate || endDate) {
      query.detectedAt = {};
      if (startDate && !isNaN(new Date(startDate))) {
        query.detectedAt.$gte = new Date(startDate);
      }
      if (endDate && !isNaN(new Date(endDate))) {
        query.detectedAt.$lte = new Date(endDate);
      }
    }

    const skip = (pageNum - 1) * limitNum;

    const earthquakes = await Earthquake.find(query)
      .sort({ detectedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Earthquake.countDocuments(query);

    res.status(200).json({
      page: pageNum,
      total,
      count: earthquakes.length,
      data: earthquakes,
    });
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
const syncHandler = async (req, res) => {
  try{
    await syncEarthquakes();
    res.json({message:"Earthquake sync completed"}
    )
  } catch (error){
    res.status(500).json({error: error.message})
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
  syncHandler,
  editEarthquakeById,
  deleteEarthquakeById,
};
