import mongoose from "mongoose";


// To prevent multiple connections
let isConnected = false;

if (process.env.MONGODB_URI === undefined) {
  console.log("Missing MONGODB_URI environment variable",process.env.MONGODB_URI);
}
export const dbconnect = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);

    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
