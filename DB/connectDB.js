import mongoose from "mongoose";
import dotenv from "dotenv"

export function connectDB() {
  let connection;

dotenv.config({path :".env.local"})

  connection = mongoose.connect(process.env.MONGODB_URI);


  if (connection) {
    return console.log("DB Connected!");
  } else {
    return console.log("something went wrong to connect DB");
  }
}
