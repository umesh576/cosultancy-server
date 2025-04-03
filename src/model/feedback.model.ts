import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  description: {
    required: [true, "username must be requiredd for login"],
    type: String,
    minLength: [10, "name required more than 3 letter"],
    trim: true,
  },
});

const Feedback = mongoose.model("feedback", feedbackSchema);
export default Feedback;
