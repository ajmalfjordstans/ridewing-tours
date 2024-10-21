import axios from "axios";
import { bookingConfirmationTemplate, cancelBookingTemplate, invoiceMailTemplate, welcomeAgentTemplate, welcomeUserTemplate } from "./email-templates";

export const sendMail = async (emailPayload) => {
  // Send the email using axios
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/emails/send`, emailPayload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    console.error("Error sending email:", response.data);
    // Optionally, handle the error (e.g., show a notification to the user)
  } else {
    console.log("Email sent successfully:", response.data);
    return response
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
    subject = "Booking"
    templatePayload = bookingConfirmationTemplate(content.mail)
    attachments = content.attachments
  }else if (template == 'cancel') {
    email = content.email
    subject = "Cancel Booking"
    templatePayload = cancelBookingTemplate(content.mail)
  }
   else if (template == 'invoice') {
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