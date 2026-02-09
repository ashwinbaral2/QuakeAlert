import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(
      "mongodb://127.0.0.1:27017/earthquake_gis",
    );

    console.log("✅ MongoDB connected");

    if (res.connections) {
      console.log("✅ Connected to MongoDB successfully!");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

export default connectDB;
