import axios from "axios";

export function createBookingObject(booking, user) {

  const bookingDetails = [];
  let customer = {};
  let payment = {};

  // Check the type of object and process accordingly
  if (booking.type === 'package') {
    // Type 1: Package Booking
    customer = {
      name: booking.displayName || "N/A", // Using displayName as the customer's name
      email: booking.email || "N/A",
      phone: booking.phone || "N/A", // Assuming phone might be part of the booking object
      bookingNo: booking.bookingId || "N/A",
      bookingDate: booking.date
        // ? new Date(booking.date.seconds * 1000).toLocaleDateString()
        // : "N/A"
    };

    payment = {
      total: booking.total || 0,
      status: booking.status === 'confirmed' ? 'PAID' : 'PENDING' // Adjust based on your payment logic
    };

    bookingDetails.push({
      booking: 'package',
      name: booking.name || "N/A",
      passengers: booking.noOfPassengers || 0,
      luggage: booking.luggage || 0, // Default to 0 if not available
      itinerary: booking.itinerary
        ? [
          booking.itinerary.start,
          ...booking.itinerary.itinerary,
          booking.itinerary.end
        ]
        : []
    });
  }
  else if (booking.transfer === 'airport' || booking.transfer === 'station') {
    customer = {
      name: booking.travelDetails.name || "N/A", // Using displayName as the customer's name
      email: booking.travelDetails.email || "N/A",
      phone: booking.travelDetails.contact || "N/A", // Assuming phone might be part of the booking object
      bookingNo: booking.bookingId || "N/A",
      bookingDate: booking.travelDetails.date
        // ? new Date(booking.travelDetails.date.seconds * 1000).toLocaleDateString()
        // : "N/A"
    };
    // Type 2: Airport or Station Pickup
    bookingDetails.push({
      booking: 'station',
      station: booking.name,
      number: booking.travelDetails.flightNumber || booking.travelDetails.trainNumber,
      pickup: booking.travelDetails.pickupAddress,
      dropoff: booking.travelDetails.dropoffAddress,
      time: booking.travelDetails.pickupTime,
      date: booking.travelDetails.date,
      passengers: booking.travelDetails.passengers,
      luggage: booking.travelDetails.luggage,
      address: booking.travelDetails.dropoffAddress
    });
    payment = {
      total: booking.total || 0,
      status: 'PAID'// Adjust based on your payment logic
    };
  } else if (booking.type === 'guide') {

    // Type 3: Guide Booking
    bookingDetails.push({
      booking: 'guide',
      name: booking.name,
      language: booking.travelDetails.language,
      time: booking.travelDetails.meetingTime,
      date: booking.travelDetails.date,
      passengers: booking.travelDetails.guests,
      hours: booking.travelDetails.hours,
      itinerary: booking.travelDetails.itinerary,
      notes: booking.travelDetails.notes
    });

    customer = {
      name: booking.travelDetails.displayName || "N/A", // Using displayName as the customer's name
      email: booking.travelDetails.email || "N/A",
      phone: booking.travelDetails.contact || "N/A", // Assuming phone might be part of the booking object
      bookingNo: booking.bookingId || "N/A",
      bookingDate: booking.travelDetails.date
        // ? new Date(booking.travelDetails.date.seconds * 1000).toLocaleDateString()
        // : "N/A"
    };

    payment = {
      total: booking.total || 0,
      status: 'PAID'// Adjust based on your payment logic
    };
  } else if (booking.type === 'custom') {
    // Type 4: Custom Package
    bookingDetails.push({
      booking: 'custom',
      point: booking.travelDetails.meetingPoint,
      pickup: booking.travelDetails.meetingAddress,
      dropoff: booking.travelDetails.city || "N/A",
      time: booking.travelDetails.meetingTime,
      date: booking.travelDetails.date,
      passengers: booking.travelDetails.guests,
      luggage: booking.travelDetails.luggage || 0, // Defaulting to 0 if not available
      hours: booking.travelDetails.hours,
      address: booking.travelDetails.meetingAddress,
      itinerary: booking.travelDetails.itinerary,
      notes: booking.travelDetails.notes
    });

    customer = {
      name: booking.travelDetails.name || "N/A", // Using displayName as the customer's name
      email: booking.travelDetails.email || "N/A",
      phone: booking.travelDetails.contact || "N/A", // Assuming phone might be part of the booking object
      bookingNo: booking.bookingId || "N/A",
      bookingDate: booking.travelDetails.date
        // ? new Date(booking.travelDetails.date.seconds * 1000).toLocaleDateString()
        // : "N/A"
    };
    
    payment = {
      total: booking.total || 0,
      status: 'PAID'// Adjust based on your payment logic
    };
  }

  return {
    customer,
    bookingDetails,
    payment
  };
}


export const generateBookingPDF = async (booking) => {
  // Send the email using axios
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/pdfs/createBookingPDF`, booking, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    console.error("Error generating booking:", response.data);
    // Optionally, handle the error (e.g., show a notification to the user)
  } else {
    // console.log("booking created successfully:", response.data);
    return response.data.url
  }
}
// Example Usage:
// You can now pass one object at a time depending on the type
// const booking1 = { /* Type 1: Package Booking object */ };
// const booking2 = { /* Type 2: Airport/Station Pickup object */ };
// const booking3 = { /* Type 3: Guide Booking object */ };
// const booking4 = { /* Type 4: Custom Package object */ };

// const finalBookingData = createBookingObject(booking1); // or booking2, booking3, booking4
// console.log(finalBookingData);
