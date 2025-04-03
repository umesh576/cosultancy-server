import mongoose from "mongoose";

const giveProjectSchema = new mongoose.Schema({
  projectTopic: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: String,
    required: true,
    trim: true,
  },
  lastdate: {
    type: String,
    required: true,
    trim: true,
  },
  requirement: {
    type: String,
    required: false,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
});

const Nproject = mongoose.model("Nproject", giveProjectSchema);
export default Nproject;
