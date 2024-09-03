import mongoose from "mongoose";

// To prevent multiple connections
let isConnected = false;

if (process.env.MONGODB_URI === undefined) {
  console.log(
    "Missing MONGODB_URI environment variable",
    process.env.MONGODB_URI
  );
}

export const dbconnect = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose.connection; // Return the existing connection
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });

    mongoose.connection.on("connected", () => console.log("MongoDB connected"));
    mongoose.connection.on("open", () =>
      console.log("MongoDB connection open")
    );
    mongoose.connection.on("close", () => {
      console.log("MongoDB connection closed");
      isConnected = false;
    });

    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
