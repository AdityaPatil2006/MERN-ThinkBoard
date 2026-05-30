import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB Connected Successfully!");
  } catch (error) {
    console.log("Error:Unable to connect MONGODB :", error);
    process.exit(1); // ? Exit with failure(1)
  }
};
