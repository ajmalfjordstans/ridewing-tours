import axios from "axios";
import { generatePayload } from "./send-mail";

/**
 * Generates an invoice object from an array of booking details.
 *
 * @param {Array} bookings - An array of booking objects.
 * @returns {Object} - The generated invoice object.
 */
const subtotal = (items) => {
  return items.reduce((acc, item) => {
    const noOfPassengers = Number(item.noOfPassengers); // Ensure noOfPassengers is a number
    const price = Number(item.price); // Ensure price is a number
    const bulkPrice = Number(item.bulkPrice); // Ensure bulkPrice is a number

    if (item?.type === 'package') {
      const itemPrice = noOfPassengers < 5
        ? price * 4
        : bulkPrice
          ? bulkPrice * noOfPassengers
          : price * noOfPassengers;
      return acc + itemPrice;
    } else if (item?.type === 'guide') {
      return acc + (price * (item?.travelDetails?.hours || 0));
    } else if (item.transfer === 'airport' || item.transfer === 'station') {
      const itemPrice = noOfPassengers < 4
        ? price * 4
        : price * noOfPassengers;
      return acc + itemPrice;
    } else {
      return acc;
    }
  }, 0);
};

export function generateInvoiceObj(bookings) {
  let total = subtotal(bookings)
  console.log(subtotal(bookings))
  // Helper function to generate a random invoice number
  function generateInvoiceNo() {
    return Math.floor(Math.random() * 1e12).toString();
  }

  // Helper function to format the date as MM/DD/YY
  function formatDate(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  // Initialize the invoice object
  const invoice = {
    invoiceNo: generateInvoiceNo(),
    invoiceDate: formatDate(new Date()),
    customer: "Ridewing",
    subtotal: total,
    items: []
  };

  bookings.forEach(booking => {
    // Add main booking details as items
    // Assuming 'name' and 'total' represent the main service
    if (booking.name && booking.total) {
      invoice.items.push({
        name: booking.name,
        price: booking.total / booking.noOfPassengers,
        count: booking.noOfPassengers,
        total: booking.total
      });
      // invoice.subtotal += booking.total;
    }

    // Include additionalTickets if available
    if (booking.additionalTickets && Array.isArray(booking.additionalTickets)) {
      booking.additionalTickets.forEach(ticket => {
        invoice.items.push({
          name: ticket.name,
          price: ticket.price,
          count: ticket.ticketCount,
          total: ticket.price * ticket.ticketCount
        });
        // invoice.subtotal += ticket.price * ticket.ticketCount;
      });
    }
  });

  return invoice;
}


export const generateInvoice = async (invoice) => {
  // Send the email using axios
  // const response = await axios.post("http://localhost:3005/api/pdfs/createInvoicePDF", invoice, {
  const response = await axios.post("https://ridewing-kh-express-app.onrender.com/api/pdfs/createInvoicePDF", invoice, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    console.error("Error generating invoice:", response.data);
    // Optionally, handle the error (e.g., show a notification to the user)
  } else {
    // console.log("Invoice created successfully:", response.data);
    return response.data.url
  }
}
