import axios from "axios";
import { generatePayload } from "./send-mail";
import { transformDataForStripe } from "./stripe-items-formatter";

/**
 * Generates an invoice object from an array of booking details.
 *
 * @param {Array} bookings - An array of booking objects.
 * @returns {Object} - The generated invoice object.
 */
const subtotal = (list) => {
  const items = transformDataForStripe(list)

  if (!Array.isArray(items.items)) {
    throw new TypeError('The "items" parameter should be an array.');
  }

  return items.items.reduce((total, item, index) => {
    // Destructure price and quantity from the item
    let { price, quantity } = item;

    // Validation and Parsing
    // Ensure price is a number
    if (typeof price === 'string') {
      // Attempt to parse price from string (e.g., "FROM ¥12900 PER PERSON")
      const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      if (isNaN(parsedPrice)) {
        console.warn(`Invalid price format for item at index ${index} ("${item.name}"). Defaulting price to 0.`);
        price = 0;
      } else {
        price = parsedPrice;
      }
    } else if (typeof price !== 'number' || isNaN(price)) {
      console.warn(`Invalid price type for item at index ${index} ("${item.name}"). Defaulting price to 0.`);
      price = 0;
    }

    // Ensure quantity is a positive integer
    if (typeof quantity === 'string') {
      // Attempt to parse quantity from string
      const parsedQuantity = parseInt(quantity, 10);
      if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        console.warn(`Invalid quantity format for item at index ${index} ("${item.name}"). Defaulting quantity to 1.`);
        quantity = 1;
      } else {
        quantity = parsedQuantity;
      }
    } else if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 1) {
      console.warn(`Invalid quantity type for item at index ${index} ("${item.name}"). Defaulting quantity to 1.`);
      quantity = 1;
    }

    // Calculate subtotal for the current item
    const subtotal = price * quantity;

    // Optional: Log each item's calculation for debugging
    // console.log(`Item: "${item.name}" | Price: ${price} | Quantity: ${quantity} | Subtotal: ${subtotal}`);

    // Add subtotal to the total
    return total + subtotal;
  }, 0);
};

export function generateInvoiceObj(bookings, user) {
  console.log(bookings);
  let item = transformDataForStripe(bookings)
  let total = subtotal(bookings)
  console.log(total, item)
  // Helper function to generate a random invoice number
  function generateInvoiceNo() {
    try {
      const randomNumber = Math.floor(Math.random() * 1e12).toString()
      const invoiceNo = `SC${randomNumber}`;
      return invoiceNo; // Return the generated invoice number
    } catch (error) {
      return { success: false, message: "Error generating invoice number", error }; // Return error if any occurs
    }
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
    customer: user.userInfo.displayName,
    phone: user.userInfo.contact,
    email: user.userInfo.email,
    subtotal: total,
    items: item.items.map(item => ({
      ...item,  // Copy existing properties
      total: item.price * item.quantity  // Add new total property
    }))
  };

  // bookings.forEach(booking => {
  //   // Add main booking details as items
  //   // Assuming 'name' and 'total' represent the main service
  //   if (booking.name && booking.total) {
  //     console.log(booking);

  //     invoice.items.push({
  //       name: booking.name,
  //       price: booking.price, // booking.noOfPassengers,
  //       count: booking.noOfPassengers,
  //       total: booking.total
  //     });
  //     // invoice.subtotal += booking.total;
  //   }

  //   // Include additionalTickets if available
  //   if (booking.additionalTickets && Array.isArray(booking.additionalTickets)) {
  //     booking.additionalTickets.forEach(ticket => {
  //       invoice.items.push({
  //         name: ticket.name,
  //         price: ticket.price,
  //         count: ticket.ticketCount,
  //         total: ticket.price * ticket.ticketCount
  //       });
  //       // invoice.subtotal += ticket.price * ticket.ticketCount;
  //     });
  //   }
  // });

  return invoice;
}

export const generateInvoice = async (invoice) => {
  console.log(invoice);

  // Send the email using axios
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/pdfs/createInvoicePDF`, invoice, {
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
