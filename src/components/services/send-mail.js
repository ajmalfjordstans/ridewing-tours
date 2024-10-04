import axios from "axios";
import { invoiceMailTemplate, welcomeAgentTemplate, welcomeUserTemplate } from "./email-templates";

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
  let email = content.email;
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
  } else if (template == 'booking') {
    email = content.email
    subject = "Invoice"
    templatePayload = invoiceMailTemplate()
    attachments = []
  } else if (template == 'invoice') {
    console.log(content, content.email, content.attachments);

    email = content.email
    subject = "Invoice"
    templatePayload = invoiceMailTemplate(content.mail)
    attachments = content.attachments
  }

  const emailPayload = {
    to: email,
    subject: subject,
    text: "Hello, Welcome to Ridewing",
    html: templatePayload.html,
    attachments: attachments
  };
  return emailPayload
}