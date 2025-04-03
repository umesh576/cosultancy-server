import express from "express";
import {
  getAllReview,
  getReviewById,
  giveReview,
} from "../controller/review.controller";
// import { Authenticate } from "../middleware/authencation.middleware";
// import { onlyAdmin } from "../@types/global.types";
const router = express.Router();

router.post("/add", giveReview);
router.get("/", getAllReview);
router.get("/:id", getReviewById);

export default router;
