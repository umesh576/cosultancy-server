import mongoose from "mongoose";

export const connectDatabase = (url: any) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected sucessfully");
    })
    .catch((err: any) => {
      console.log(err);
    });
};
