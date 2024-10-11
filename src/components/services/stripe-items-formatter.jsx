/**
 * Transforms an array of complex objects into a format suitable for Stripe Checkout.
 *
 * @param {Array} dataArray - The array of objects to transform.
 * @returns {Object} An object containing an "items" array with name, price, and quantity.
 */
export function transformDataForStripe(dataArray) {
  const items = [];

  dataArray.forEach((obj, objIndex) => {
    // Helper function to parse price
    const parsePrice = (price) => {
      if (typeof price === 'number') {
        return price;
      } else if (typeof price === 'string') {
        // Extract numeric value from the string
        const match = price.replace(/,/g, '').match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      }
      return 0;
    };

    let quantity = 1;
    let price = parsePrice(obj.price);
    let type;

    // Handling 'guide' type
    if (obj.type === 'guide' && obj.travelDetails && typeof obj.travelDetails.hours === 'number') {
      quantity = obj.travelDetails.hours;
      type = "GUIDE"
    } else {
      quantity = obj.noOfPassengers < 4 ? 4 : obj.noOfPassengers || 1; // Default to noOfPassengers or 1
      type = "GUIDE"
    }

    // Handling 'package' type with bulkPrice logic
    if (obj.type === 'package') {
      if (obj.noOfPassengers > 4 && obj.bulkPrice) {
        price = parsePrice(obj.bulkPrice); // Use bulkPrice if passengers are more than 4
        type = "PACKAGE"
      } else {
        price = parsePrice(obj.price); // Fallback to normal price
        type = "PACKAGE"
      }
    }

    if (obj.transfer == 'airport' || obj.transfer == 'station') {
      type = 'TRANSFER'
    }

    // Extract Main Item
    if (obj.name) {
      const mainItem = {
        name: obj.name,
        price: price,
        quantity: quantity < 4 ? 4 : quantity,
        type: type
      };
      items.push(mainItem);
    } else {
      console.warn(`Object at index ${objIndex} is missing a 'name' property.`);
    }

    // Extract Additional Tickets if available
    if (Array.isArray(obj.additionalTickets)) {
      obj.additionalTickets.forEach((ticket, ticketIndex) => {
        const additionalItem = {
          name: ticket.name || `Additional Ticket ${ticketIndex + 1}`,
          price: parsePrice(ticket.price),
          quantity: ticket.ticketCount || 1, // Default quantity to 1 if not specified
          type: 'TICKET'
        };
        items.push(additionalItem);
      });
    }
  });

  return { items };
}