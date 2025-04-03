import nodemailer from "nodemailer";

interface IMailOption {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT as string), // Convert to number
  secure: process.env.SMTP_PORT === "465", // Correct comparison
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async (mailOptions: IMailOption) => {
  try {
    const mailOption = {
      from: `"${process.env.MAIL_FROM}" <${process.env.SMTP_EMAIL}>`,
      to: mailOptions.to,
      subject: mailOptions.subject, // Fixed typo
      html: mailOptions.html,
    };
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};
