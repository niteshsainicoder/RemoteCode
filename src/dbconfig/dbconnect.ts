import mongoose from "mongoose";

const MONGODB_URI = `mongodb://127.0.0.1:27017/remoteCode`;

// To prevent multiple connections
let isConnected = false;

export const dbconnect = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
    
    });

    mongoose.connection.on("connected", () => {
      isConnected = true;
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      console.log("MongoDB disconnected");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
