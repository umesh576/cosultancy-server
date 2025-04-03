import mongoose from "mongoose";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name needed for add contact"],
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    match: [emailRegex, "Provided email is not valid"],
    required: [true, "Email must be provided for registration"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, ""],
  },
});

const Contact = mongoose.model("contact", contactSchema);
export default Contact;
