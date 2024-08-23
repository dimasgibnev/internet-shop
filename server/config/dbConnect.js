import mongoose from "mongoose";

export const dbConnect = async () =>
  await mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => console.log(err, "db connection error"));
