import { Request, Response } from "express";
import CustomError from "../middleware/errorHandler.middleware";
import Feedback from "../model/feedback.model";
import User from "../model/user.model";

export const addReview = async (req: Request, res: Response) => {
  const { userId, description } = req.body;

  if (!userId) {
    throw new CustomError("UserId must be needed for feedback", 404);
  }
  if (!description) {
    throw new CustomError("decription must be needed for feedback", 404);
  }
  const userDocument = await User.findById(userId);
  if (!userDocument) {
    throw new CustomError("Login first before feedback", 404);
  }
  const feedback = await Feedback.create({ description });
  res.status(200).json({
    status: "success",
    success: "true",
    message: "feedback create successfully",
    data: feedback,
  });
};

export const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json({
      status: "success",
      success: true,
      message: "Feedebacks fetched sucessfully",
      data: feedback,
    });
  } catch (err) {
    console.log("Error occur in the code");
  }
};

export const deleteFeedBack = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.body;
    if (!feedbackId) {
      throw new CustomError("Cannot find this feedback", 404);
    }
    const feedBack = await Feedback.findByIdAndDelete(feedbackId);
    res.status(200).json({
      status: "success",
      success: true,
      message: "Feedebacks deleted sucessfully",
      data: feedBack,
    });
  } catch (err) {
    console.log("Error occur in the code");
  }
};
