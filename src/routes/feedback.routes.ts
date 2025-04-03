import express from "express";
import {
  addReview,
  getFeedback,
  deleteFeedBack,
} from "../controller/feedback.controller";
const router = express.Router();

router.post("/add", addReview);
router.get("/see", getFeedback);
router.delete("/delete", deleteFeedBack);

export default router;
