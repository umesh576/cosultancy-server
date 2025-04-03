import mongoose from "mongoose";

const ComProject = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  location: {
    type: String,
    required: true,
  },
  finalDate: {
    type: String,
    required: true,
    trim: true,
  },
  coverImage: {
    type: [String],
    required: false,
  },
});

const Project = mongoose.model("comProject", ComProject);
export default Project;
