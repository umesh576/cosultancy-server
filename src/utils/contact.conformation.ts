// import mongoose from "mongoose";
import { sendMail } from "./sendEmail.utils";

interface IcontactDetails {
  fullName: String;
  message: String;
  phoneNumber: Number;
  // _id: mongoose.Types.ObjectId;
}
interface Ioptions {
  to: string;
  reviewDetails?: IcontactDetails;
}

export const sendContactDetails = async (options: Ioptions) => {
  // const ;
  const { to, reviewDetails } = options;
  const html = `
  <h1>Thankyou for messageing us!</h1>
  <p>Dear:${reviewDetails?.fullName}</p>
  <p>thankYou for your Message.</p>
    <p> Thank you for reaching out to Rising  House Engineering Consultancy. We got your message, try to contact you soon!!</P>

  `;
  const mailOption = {
    html,
    subject: "Review Reply",
    to,
  };
  await sendMail(mailOption);
};
