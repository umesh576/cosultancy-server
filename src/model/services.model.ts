import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, "Service name needed for add service"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, ""],
    minLength: [10, "decription is more than 10 letter"],
  },
  coverImage: {
    type: [String],
    required: false,
  },
});

const Service = mongoose.model("service", serviceSchema);
export default Service;
