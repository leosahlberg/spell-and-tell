import mongoose from "mongoose";

export async function connectToDb() {
  const connectionstr = process.env.DB_CONNECTIONSTRING || "";
  await mongoose.connect(connectionstr);
}
