import mongoose from "mongoose";
import { Role } from "../@types/global.types";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, "username must be requiredd for login"],
    type: String,
    minLength: [3, "name required more than 3 letter"],
    trim: true,
  },
  lastName: {
    required: [true, "lastname must be required"],
    type: String,
    minLength: [2, "lastname must be more than 2 letter"],
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "provided email already exists"],
    match: [emailRegex, "Provided email is not valid"],
    required: [true, "Email must be provided for registration"],
    trim: true,
  },
  password: {
    required: [true, "password needed for the register"],
    type: String,
    minLength: [5, "password need more than 5 character"],
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.user,
    trim: true,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
