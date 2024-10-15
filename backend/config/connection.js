import mongoose from 'mongoose';
import { config } from 'dotenv';

// load environment variables
config();
async function connection() {
  try {
    const uri = process.env.mongodb_uri;
    //  if uri is not load fron .env or its mising
    if (!uri) {
      throw new Error('MongoDB URI is missing in environment variables');
    }

    await mongoose.connect(uri);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error.message);
    // exit the process when not connected to mongodb
    process.exit(1);
  }
}
export default connection;