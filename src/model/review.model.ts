import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "rati needed for review"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, ""],
  },
});

const Review = mongoose.model("review", reviewSchema);
export default Review;
