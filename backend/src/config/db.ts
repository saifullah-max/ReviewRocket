import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectToDB = async () => {
  try {
    const remoteURI = process.env.REMOTE_URI;

    if (remoteURI) {
      mongoose
        .connect(remoteURI)
        .then(() => {
          console.log("Remote MongoDB connected");
        })
        .catch((err) => {
          console.log(`MongoDB Connection failed`, err);
        });
    }
  } catch (error) {
    console.log("DBS Connection failed!!!!");
  }
};
