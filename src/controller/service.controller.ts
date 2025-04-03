import { Request, Response } from "express";
import CustomError from "../middleware/errorHandler.middleware";
import Service from "../model/services.model";

export const addService = async (req: Request, res: Response) => {
  const { serviceName, description } = req.body;
  const { coverImage } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (!serviceName) {
    throw new CustomError("project name must be required", 404);
  }
  if (!description) {
    throw new CustomError("ProjectManager name required", 404);
  }
  if (!coverImage || coverImage.length === 0) {
    throw new CustomError("Cover image is required", 400);
  }
  const coverImagePaths = coverImage.map((file) => file.path);

  const service = await Service.create({
    serviceName,
    description,
    coverImage: coverImagePaths,
  });
  res.status(200).json({
    status: "Success",
    success: true,
    message: "New service added sucessfully",
    data: service,
  });
};

export const seeService = async (req: Request, res: Response) => {
  try {
    const service = await Service.find();
    res.status(200).json({
      status: "success",
      success: true,
      message: "Service fetched sucessfully",
      data: service,
    });
  } catch (err) {}
};
export const deleteService = async (req: Request, res: Response) => {
  const { ServiceId } = req.body;
  if (!ServiceId) {
    throw new CustomError("ServiceId needed for the update", 404);
  }
  console.log(ServiceId);
  const service = await Service.findByIdAndDelete(ServiceId);
  if (!service) {
    throw new CustomError("Project not found", 404);
  }

  res.status(200).json({
    status: "success",
    success: true,
    message: "Service deleted sucessfully",
    data: service,
  });
};
