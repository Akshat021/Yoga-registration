import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.set("strictQuery", true);
  mongoose.connect(url);
};
export default connectDB;
