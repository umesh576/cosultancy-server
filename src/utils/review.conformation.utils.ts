// import mongoose from "mongoose";
import { sendMail } from "./sendEmail.utils";

interface IreviewDetails {
  rating: Number;
  isUser: String;
  // _id: mongoose.Types.ObjectId;
}
interface Ioptions {
  to: string;
  reviewDetails?: IreviewDetails;
}

export const sendOrderConformationEmail = async (options: Ioptions) => {
  // const ;
  const { to, reviewDetails } = options;
  const html = `
  <h1>Thankyou for your Review!</h1>
  <p>Dear:${reviewDetails?.isUser}</p>
  <p>thankYou for your review.</p>
    <p> We appreciate your insights and will take them into account to improve our services. Our team is committed to delivering high-quality engineering solutions, and we will work on the areas you mentioned to serve you better in the future. We value your support!</P>  <P>Review garnu Bhayeko ma dhanybaad.</P>

  `;
  const mailOption = {
    html,
    subject: "Review Reply",
    to,
  };
  await sendMail(mailOption);
};
export const sendOrderConformationEmail1 = async (options: Ioptions) => {
  // const ;
  const { to, reviewDetails } = options;
  const html = `
  <h1>Thankyou for your Review!</h1>
  <p>Dear:${reviewDetails?.isUser}</p>
  <p>thankYou for your review.</p>
    <p>We sincerely apologize for any delays or inconvenience you experienced. We are committed to improving our services and ensuring timely communication with our clients. Your concerns have been noted, and we will work on enhancing our responsiveness to serve you better. We truly appreciate your patience and hope to have the opportunity to exceed your expectations in the future.</p>
  <P>Review garnu Bhayeko ma dhanybaad.</P>
  
  `;
  const mailOption = {
    html,
    subject: "Review Reply",
    to,
  };
  await sendMail(mailOption);
};
