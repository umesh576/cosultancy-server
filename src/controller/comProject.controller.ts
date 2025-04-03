import { Request, Response } from "express";
import CustomError from "../middleware/errorHandler.middleware";
import Project from "../model/Completedproject.model";
import User from "../model/user.model";
import mongoose from "mongoose";

export const addComproject = async (req: Request, res: Response) => {
  //   const body = req.body;
  const { projectName, projectManager, finalDate, location } = req.body;
  const { coverImage } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (!projectName) {
    throw new CustomError("project name must be required", 404);
  }
  if (!projectManager) {
    throw new CustomError("ProjectManager name required", 404);
  }
  if (!coverImage || coverImage.length === 0) {
    throw new CustomError("Cover image is required", 400);
  }
  if (!finalDate) {
    throw new CustomError("Project last Date must be required", 404);
  }
  console.log(projectManager);
  const isEmployee = await User.findById(
    new mongoose.Types.ObjectId(projectManager)
  );
  if (!isEmployee) {
    throw new CustomError("User doesn't exists", 404);
  }
  console.log(isEmployee.role);
  const coverImagePaths = coverImage.map((file) => file.path);

  const project = await Project.create({
    projectName,
    projectManager,
    coverImage: coverImagePaths,
    finalDate,
    location,
  });
  res.status(200).json({
    status: "Success",
    success: true,
    message: "project added sucessfully",
    data: project,
  });
};

export const getAllComProject = async (req: Request, res: Response) => {
  try {
    const comProject = await Project.find();
    res.status(200).json({
      status: "success",
      success: true,
      message: "review fetched sucessfully",
      data: comProject,
    });
  } catch (err) {}
};
export const updateComproject = async (req: Request, res: Response) => {
  const { id, projectName, projectManager, finalDate } = req.body;
  if (!id) {
    throw new CustomError("id needed for the update", 404);
  }
  console.log(id);
  const user = await Project.findByIdAndUpdate(
    id,
    { projectName, projectManager, finalDate },
    { new: true }
  );
  if (!user) {
    throw new CustomError("Project not found", 404);
  }

  res.status(200).json({
    status: "success",
    success: true,
    message: "users apdated sucessfully",
    data: user,
  });
};
