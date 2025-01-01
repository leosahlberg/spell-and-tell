import mongoose from "mongoose";

export async function connectToDb() {
  await mongoose.connect("mongodb://localhost:27017/spell-and-tell");
}

/* 
const connectionstr = process.env.DBCONNECTIONSTRING || "";
  await mongoose.connect(connectionstr);

*/
