import CustomError from "../middleware/errorHandler.middleware";
import Contact from "../model/contact.model";
import { Request, Response } from "express";
import { sendContactDetails } from "../utils/contact.conformation";

export const addContact = async (req: Request, res: Response) => {
  const { fullName, phoneNumber, email, message } = req.body;
  if (!fullName) {
    throw new CustomError("Fullname must be required", 404);
  }
  if (!phoneNumber) {
    throw new CustomError("PhoneNumber name required", 404);
  }
  if (!email) {
    throw new CustomError("Email name required", 404);
  }
  if (!message) {
    throw new CustomError("Message name required", 404);
  }
  const service = await Contact.create({
    fullName,
    phoneNumber,
    email,
    message,
  });
  await sendContactDetails({
    to: email,
    reviewDetails: {
      fullName,
      message,
      phoneNumber,
    },
  });
  res.status(200).json({
    status: "Success",
    success: true,
    message: "New service added sucessfully",
    data: service,
  });
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError(
        "Contact id mustbe needed for the delete Contact",
        404
      );
    }
    const contact = await Contact.findByIdAndDelete(id);
    res.status(200).json({
      status: "Success",
      success: true,
      message: "Contact deleted sucessfully",
      data: contact,
    });
  } catch (err) {
    console.log("Internal server error");
  }
};

export const seeContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({
      status: "Success",
      success: true,
      message: "Contacts fetched sucessfully",
      data: contact,
    });
  } catch (err) {
    console.log("Internal server error");
  }
};
