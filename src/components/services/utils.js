// Function to generate 5 digit booking id
export function generateBookingId() {
  const timestamp = Date.now().toString(36).substring(0, 3); // Shorten timestamp
  const randomNum = Math.random().toString(36).substring(2, 4); // Shorten random number
  return `BK${timestamp}${randomNum}`;
}

// Function to format date in dd/mm/yyyy format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB'); // 'en-GB' for dd/mm/yyyy format
};

// Function to format time to 12-hour format with AM/PM
export const formatTime = (time) => {
  const timeParts = time.split(':');
  let hours = parseInt(timeParts[0], 10);
  const minutes = timeParts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}:${minutes} ${ampm}`;
};
