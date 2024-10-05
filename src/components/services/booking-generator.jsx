export function createBookingObject(booking) {
  const bookingDetails = [];
  let customer = {};
  let payment = {};

  // Check the type of object and process accordingly
  if (booking.customer && booking.bookingDetails && booking.payment) {
      // Type 1: Package Booking
      customer = booking.customer;
      payment = booking.payment;

      booking.bookingDetails.forEach(detail => {
          bookingDetails.push(detail);
      });
  } else if (booking.transfer === 'airport' || booking.transfer === 'station') {
      // Type 2: Airport or Station Pickup
      bookingDetails.push({
          booking: 'station',
          station: booking.name,
          number: booking.travelDetails.flightNumber || booking.travelDetails.terminalNumber,
          pickup: booking.travelDetails.pickupAddress,
          dropoff: booking.travelDetails.dropoffAddress,
          time: booking.travelDetails.pickupTime,
          date: booking.travelDetails.date,
          passengers: booking.travelDetails.passengers,
          luggage: booking.travelDetails.luggage,
          address: booking.travelDetails.dropoffAddress
      });
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
  }

  return {
      customer,
      bookingDetails,
      payment
  };
}

// Example Usage:
// You can now pass one object at a time depending on the type
// const booking1 = { /* Type 1: Package Booking object */ };
// const booking2 = { /* Type 2: Airport/Station Pickup object */ };
// const booking3 = { /* Type 3: Guide Booking object */ };
// const booking4 = { /* Type 4: Custom Package object */ };

// const finalBookingData = createBookingObject(booking1); // or booking2, booking3, booking4
// console.log(finalBookingData);
