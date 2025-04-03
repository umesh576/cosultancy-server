import { Request, Response } from "express";
import CustomError from "../middleware/errorHandler.middleware";
import User from "../model/user.model";
import Review from "../model/review.model";
import {
  sendOrderConformationEmail,
  sendOrderConformationEmail1,
} from "../utils/review.conformation.utils";
// import { sendOrderConformationEmail1 } from "../utils/review.conformation";

export const giveReview = async (req: Request, res: Response) => {
  const { userId, rating, description } = req.body;
  if (!rating || !description) {
    throw new CustomError("rating and description is needed for review", 404);
  }
  if (!userId) {
    throw new CustomError("verify user for review", 404);
  }

  const isUser = await User.findById(userId);
  if (!isUser) {
    throw new CustomError("user cant exist", 400);
  }
  const review = await Review.create({ userId, rating, description });
  if (rating < 2.5) {
    await sendOrderConformationEmail({
      to: req.user.email,
      reviewDetails: {
        rating,
        isUser: isUser.firstName,
      },
    });
  }
  if (rating > 2.5) {
    await sendOrderConformationEmail1({
      to: req.user.email,
      reviewDetails: {
        rating,
        isUser: isUser.firstName,
      },
    });
  }
  res.status(200).json({
    status: "success",
    success: "true",
    message: "review done sucessfully",
    data: review,
  });
};

export const getAllReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.find();
    res.status(200).json({
      status: "success",
      success: true,
      message: "review fetched sucessfully",
      data: review,
    });
  } catch (err) {}
};

export const getReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError("reveiw must be required for the fetching", 404);
  }
  const user = await Review.findById(id);
  if (!user) {
    throw new CustomError("review not found", 404);
  }
  res.status(200).json({
    status: "success",
    sccuess: true,
    message: "review fetched sucessfully",
    data: user,
  });
};
