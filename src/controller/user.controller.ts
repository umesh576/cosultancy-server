import { Request, Response } from "express";
import CustomError from "../middleware/errorHandler.middleware";
import { hash } from "../utils/bcrypt.utils";
import User from "../model/user.model";
import { generateToken } from "../utils/jwt.utils";
import { IPayload } from "../@types/global.types";
import { compare } from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.firstName || !body.lastName) {
    throw new CustomError("firstname and lastname must be required", 404);
  }
  if (!body.email) {
    throw new CustomError("Email must be needed", 404);
  }
  if (!body.phoneNumber) {
    throw new CustomError("phone number required for login", 404);
  }
  if (!body.password) {
    throw new CustomError("Please enter password for the login", 404);
  }
  const hashedPassword = await hash(body.password);

  console.log(
    "👊 ~ user.controller.ts:11 ~ register ~ hashedPassword:",
    hashedPassword
  );

  //
  body.password = hashedPassword;
  const user = await User.create(body);

  res.status(200).json({
    status: "success",
    success: "true",
    message: "user register sucessfully",
    data: user,
  });
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    throw new CustomError("Email is required", 400);
  }

  if (!password) {
    throw new CustomError("Password is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("Email or password does not match", 400);

    return;
  }

  // 4. compare hash

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw new CustomError("Email or password does not match", 400);
    return;
  }

  const payload: IPayload = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  const token = generateToken(payload);

  console.log("👊 ~ user.controller.ts:151 ~ login ~ token:", token);

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      status: "success",
      success: true,
      message: "Login success",
      token,
    });
};
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      success: true,
      message: "users fetched sucessfully",
      data: user,
    });
  } catch (err) {
    console.log("Error occur in the code");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError("userId must be required for the fetching", 404);
  }
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError("user not found", 404);
  }
  res.status(200).json({
    status: "success",
    sccuess: true,
    message: "user fetched sucessfully",
    data: user,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, firstName, lastName } = req.body;
  if (!id) {
    throw new CustomError("id needed for the update", 404);
  }
  console.log(id);
  const user = await User.findByIdAndUpdate(
    id,
    { firstName, lastName },
    { new: true }
  );
  if (!user) {
    throw new CustomError("user not found", 404);
  }

  res.status(200).json({
    status: "success",
    success: true,
    message: "users apdated sucessfully",
    data: user,
  });
};
export const deleteUserByid = () => {};
