import { Request, Response } from "express";
import CustomError from "../middleware/errorHandler.middleware";
import Nproject from "../model/giveProject.model";
export const giveProject = async (req: Request, res: Response) => {
  const { projectTopic, startDate, lastdate, requirement, location } = req.body;
  if (!projectTopic) {
    throw new CustomError("project topic not found", 404);
  }
  if (!startDate) {
    throw new CustomError("project topic not found", 404);
  }
  if (!lastdate) {
    throw new CustomError("project topic not found", 404);
  }
  if (!requirement) {
    throw new CustomError("project topic not found", 404);
  }
  if (!location) {
    throw new CustomError("project topic not found", 404);
  }
  const nProject = await Nproject.create({
    projectTopic,
    startDate,
    lastdate,
    requirement,
    location,
  });
  res.status(200).json({
    status: "success",
    success: "true",
    message: "project given successfully",
    data: nProject,
  });
};

export const getallUserProject = async (req: Request, res: Response) => {
  try {
    const project = await Nproject.find();
    res.status(200).json({
      status: "success",
      success: true,
      message: "users fetched sucessfully",
      data: project,
    });
  } catch (err) {
    console.log("Error occur in the code");
  }
};

export const deleteUserProject = async (req: Request, res: Response) => {
  try {
    const { uProjectId } = req.body;
    const Isproject = await Nproject.findOne(uProjectId);
    if (!Isproject) {
      throw new CustomError("project not found", 404);
    }
    const delproject = await Nproject.findByIdAndDelete(uProjectId);
    res.status(200).json({
      status: "success",
      success: true,
      message: "Project delete sucessfully",
      data: delproject,
    });
  } catch (err) {
    console.log("Error occur in the code");
  }
};
export const userProjectUpdate = async (req: Request, res: Response) => {
  try {
    const { id, startDate, lastdate, requirement, location } = req.body;
    if (!id) {
      throw new CustomError("id needed for the update", 404);
    }
    console.log(id);
    const project = await Nproject.findByIdAndUpdate(
      id,
      { startDate, lastdate, requirement, location },
      { new: true }
    );
    if (!project) {
      throw new CustomError("Project not found", 404);
    }

    res.status(200).json({
      status: "success",
      success: true,
      message: "User project updated sucessfully",
      data: project,
    });
  } catch (err) {
    console.log("Error occur in the code");
  }
};
