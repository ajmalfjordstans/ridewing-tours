import axios from "axios";
import { welcomeAgentTemplate, welcomeUserTemplate } from "./email-templates";

export const sendMail = async (emailPayload) => {
  // Send the email using axios
  // const response = await axios.post("http://localhost:3005/api/emails/send", emailPayload, {
  const response = await axios.post("https://ridewing-kh-express-app.onrender.com/api/emails/send", emailPayload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    console.error("Error sending email:", response.data);
    // Optionally, handle the error (e.g., show a notification to the user)
  } else {
    console.log("Email sent successfully:", response.data);
    // Optionally, handle the success (e.g., show a success message to the user)
  }
}

export const generatePayload = (content, template) => {
  let email;
  let subject;
  let templatePayload;
  let attachments = []
  if (template == 'user') {
    templatePayload = welcomeUserTemplate(content.displayName)
    subject = "Welcome to Ridewing"
    email = content.email
  } else if (template == 'agent') {
    templatePayload = welcomeAgentTemplate(content.displayName)
    subject = "Welcome to Ridewing"
    email = content.email
  }

  const emailPayload = {
    to: content.email,
    subject: subject,
    text: "Hello, Welcome to Ridewing",
    html: templatePayload.html,
    attachments: attachments
    //[
    //   "https://storage.googleapis.com/ridewing-1701351873793.appspot.com/bookings/booking-confirmation-Mohammed Ajmal-package-1728033811481.pdf",
    //   "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/RideWing%20Terms%20and%20Conditions.pdf?alt=media&token=9641b3fc-ff87-4337-82c9-85e05007c568",
    // ],
  };
  sendMail(emailPayload)
}