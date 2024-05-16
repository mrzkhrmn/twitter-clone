import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB from: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connection to mongoDB: ${error.message}`);
    process.exit(1);
  }
};
