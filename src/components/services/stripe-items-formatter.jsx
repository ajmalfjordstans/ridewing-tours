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

    let quantity = 1

    if (obj.type === 'guide' && obj.travelDetails && typeof obj.travelDetails.hours === 'number') {
      quantity = obj.travelDetails.hours;
    } else {
      quantity = obj.noOfPassengers < 4 ? 4 : obj.noOfPassengers || 1; // Default to noOfPassengers or 1
    }

    // Extract Main Item
    if (obj.name) {
      const mainItem = {
        name: obj.name,
        price: parsePrice(obj.price),
        quantity: quantity, // Default quantity to 1 if not specified
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
        };
        items.push(additionalItem);
      });
    }

    // // Extract Tickets if available
    // if (Array.isArray(obj.tickets)) {
    //   obj.tickets.forEach((ticket, ticketIndex) => {
    //     const ticketItem = {
    //       name: ticket.name || `Ticket ${ticketIndex + 1}`,
    //       price: parsePrice(ticket.price),
    //       quantity: 1, // Assuming quantity is 1 unless specified
    //     };
    //     items.push(ticketItem);
    //   });
    // }

    // Handle Nested Pricing Arrays (e.g., pricing[])
    // if (Array.isArray(obj.pricing)) {
    //   obj.pricing.forEach((priceObj, priceIndex) => {
    //     // Assuming 'adults' and 'children' have price information
    //     ['adults', 'children'].forEach((category) => {
    //       if (priceObj[category] && priceObj[category].price) {
    //         const categoryItem = {
    //           name: `${category.charAt(0).toUpperCase() + category.slice(1)} - ${priceObj.name || obj.name}`,
    //           price: parsePrice(priceObj[category].price),
    //           quantity: 1, // Default quantity
    //         };
    //         items.push(categoryItem);
    //       }
    //     });
    //   });
    // }
  });

  return { items };
}
