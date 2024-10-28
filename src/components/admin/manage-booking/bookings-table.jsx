'use client'
import { db } from "@/app/firebase";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import { blue } from "@mui/material/colors";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ViewBooking from "./view-booking";
import { createBookingObject, generateBookingPDF } from "@/components/services/booking-generator";
import { generatePayload, sendMail } from "@/components/services/send-mail";
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Confirmed",
    value: "confirmed",
  },
  {
    label: "Ongoing",
    value: "ongoing",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
]

const TABLE_HEAD = ["No", "User", "Service", "Status", "Action"]

export function BookingTable({ bookings, setAllBookings }) {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [showBookingDetails, setShowBookingDetails] = useState(false)
  const [viewBooking, setViewBooking] = useState(false)
  // const [notification, setNotification] = useState(null)

  useEffect(() => {
    setCurrentPage(1)
    // console.log(paginatedBookings);
  }, [selectedTab])

  useEffect(() => {
    if (showBookingDetails) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showBookingDetails]);

  // Function to filter bookings based on the selected tab
  const filteredBookings = bookings.filter((booking) => {
    if (selectedTab === 'all') return true;
    return booking.status === selectedTab;
  })

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)

  // Function to paginate the filtered bookings
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  function formatDateFromTimestamp({ seconds, nanoseconds }) {
    // Convert the seconds to milliseconds
    const date = new Date(seconds * 1000);
    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

  // Function to handle editing of a booking
  const handleEdit = (bookingId, updatedBooking, action = 'update') => {
    if (updatedBooking.status == 'confirmed') {
      handleBookingPDFGeneration(updatedBooking)
    } else if (updatedBooking.status == 'rejected') {
      handleCancelBookingMail(updatedBooking)
    }

    return new Promise((resolve, reject) => {
      try {
        const updatedBookings = [...bookings];
        const bookingIndex = updatedBookings.findIndex(booking => booking.bookingId === bookingId);

        if (bookingIndex === -1) {
          throw new Error('Booking not found');
        }

        if (action === 'delete') {
          updatedBookings.splice(bookingIndex, 1);
        } else {
          updatedBookings[bookingIndex] = updatedBooking;
        }

        setAllBookings(updatedBookings); // Update the state with the new bookings array

        resolve(); // Resolve the promise after the state update
      } catch (error) {
        reject(error); // If something goes wrong, reject the promise with the error
      }
    });
  }

  const handleCancelBookingMail = async (items) => {
    console.log(items);
    const bookingObj = createBookingObject(items);
    const content = {
      email: items.email, // items.travelDetails.email
      mail: {
        name: bookingObj.customer.name,
        packageName: items.name,
        bookingNo: bookingObj.customer.bookingNo,
        date: bookingObj.customer.bookingDate,
        guests: items.noOfPassengers,
      },
    };

    const payload = generatePayload(content, 'cancel');

    // Define a promise that sends the email after a 3-second delay
    const sendMailPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const mailSend = await sendMail(payload);
          if (mailSend.status === 200) {
            resolve(); // Resolve the promise if email sent successfully
          } else {
            reject(); // Reject the promise if there's an issue
          }
        } catch (error) {
          reject(error); // Reject the promise if an error occurs
        }
      }, 3000);
    });

    console.log(sendMailPromise);

    // Use toast.promise to display notifications based on the promise state
    toast.promise(sendMailPromise, {
      pending: "Cancelling Booking",
      success: "Sending Email",
      error: "Failed to Send Email",
    });
  }

  const handleBookingPDFGeneration = async (items) => {
    console.log(items);

    const bookingObj = createBookingObject(items);
    const bookingUrl = await generateBookingPDF(bookingObj);
    console.log(bookingUrl);

    const content = {
      email: items.email, // items.travelDetails.email
      mail: {
        name: bookingObj.customer.name,
        packageName: items.name,
        bookingNo: bookingObj.customer.bookingNo,
        bookingUrl: bookingUrl,
        date: bookingObj.customer.bookingDate,
        guests: items.noOfPassengers,
      },
      attachments: [bookingUrl, process.env.NEXT_PUBLIC_TERMS_OF_USE],
    };

    const payload = generatePayload(content, 'booking');
    console.log(items, bookingObj, payload);

    // Define a promise that sends the email after a 3-second delay
    const sendMailPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const mailSend = await sendMail(payload);
          if (mailSend.status === 200) {
            resolve(); // Resolve the promise if email sent successfully
          } else {
            reject(); // Reject the promise if there's an issue
          }
        } catch (error) {
          reject(error); // Reject the promise if an error occurs
        }
      }, 3000);
    });

    console.log(sendMailPromise);

    // Use toast.promise to display notifications based on the promise state
    toast.promise(sendMailPromise, {
      pending: "Generating Booking PDF",
      success: "Sending Email",
      error: "Failed to Send Email",
    });
  };


  // Helper function to remove undefined values from an object
  const removeUndefinedValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    );
  };

  // Function to save changes to Firestore
  const saveChanges = async (booking, action = 'update') => {
    // console.log(booking);

    try {
      const userDoc = doc(db, 'users', booking.userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        // Ensure we have an array for updatedBookings
        const updatedBookings = Array.isArray(userData?.booking) ? [...userData.booking] : [];
        const bookingIndex = updatedBookings.findIndex(b => b.bookingId === booking.bookingId);

        if (bookingIndex === -1) {
          throw new Error('Booking not found in Firestore');
        }

        if (action === 'delete') {
          updatedBookings.splice(bookingIndex, 1);
        } else {
          // Sanitize booking object to remove undefined values
          const sanitizedBooking = removeUndefinedValues(booking);
          updatedBookings[bookingIndex] = sanitizedBooking;
        }

        // Update Firestore with sanitized data
        await updateDoc(userDoc, { booking: updatedBookings });

        // alert('Booking updated successfully!');
      } else {
        console.error('User document does not exist');
        alert('Error updating booking. User not found.');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking. Please try again.');
    }
  };


  // Function to handle changes in booking status
  const handleChange = (val, booking) => {
    const updatedBooking = { ...booking, status: val };
    handleEdit(booking.bookingId, updatedBooking)
      .then(() => saveChanges(updatedBooking))
      .catch(error => {
        console.error("Error editing booking:", error);
      });
  }

  // Function to handle deletion of a booking
  const handleDelete = (booking) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      handleEdit(booking.bookingId, booking, "delete")
        .then(() => saveChanges(booking, "delete"))
        .catch(error => {
          console.error("Error deleting booking:", error);
        });
    }
  }

  const handleView = (booking) => {
    setShowBookingDetails(true)
    setViewBooking(booking)
  }

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Booking list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all bookings
              </Typography>
            </div>
            {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div> */}
          </div>
          {!showBookingDetails &&
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value={selectedTab} className="w-full md:w-min">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value} onClick={() => setSelectedTab(value)} className="z-9">
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              {/* <div className="w-full md:w-72">
         
          </div> */}
            </div>
          }
        </CardHeader>
        <CardBody className="overflow-scroll px-0 pt-[20px]">
          <table className="mt-8 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {/* {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )} */}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* // ({ id, photo, displayName, email, type, transfer, name, date, contact, noOfPassengers, status, includeGuide, guideLanguage, additionalTickets, travelDetails }, index) => { */}
              {paginatedBookings.map((booking, index) => {
                const isLast = index === paginatedBookings.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {booking.photo ?
                          <Avatar src={booking.photo} alt={booking.displayName} size="sm" />
                          :
                          <div className='h-[36px] w-[36px] rounded-full bg-[green] flex justify-center items-center text-[22px] font-[300] text-white capitalize'>{booking?.displayName[0]}</div>
                        }
                        <div className="flex flex-col">
                          {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {id}
                          </Typography> */}
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {booking.displayName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {booking.email}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {booking.contact}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col max-w-[200px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {booking.type || booking.transfer}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {booking.name}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal"
                        >
                          Date: {booking && booking.date ? (booking.date) : (booking && booking.travelDetails ? booking.travelDetails.date : 'N/A')}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Guests: {booking.noOfPassengers}
                        </Typography>
                        {booking.includeGuide &&
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Guide: {booking.guideLanguage}
                          </Typography>
                        }

                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Select
                          label="Select Status"
                          value={booking.status}
                          className="capitalize"
                          // onChange={(val) => alert(val)}
                          onChange={(val) => handleChange(val, booking, index)}
                        >
                          <Option value="pending">Pending</Option>
                          <Option value="confirmed">Confirm</Option>
                          <Option value="ongoing">Ongoing</Option>
                          <Option value="completed">Completed</Option>
                          <Option value="rejected">Rejected</Option>
                        </Select>
                      </div>
                    </td>
                    {/* <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking?.currency + (booking?.total ? booking.total.toLocaleString() : 'N/A')}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={"View"}
                        className="mt-1 bg-green-500 hover:cursor-pointer"
                        onClick={() => handleView(booking)}
                      // value={online ? "online" : "offline"}
                      // color={green}
                      />
                      {/* <Chip
                      variant="ghost"
                      size="sm"
                      value={"Edit"}
                      className="mt-1 bg-blue-400"
                    // value={online ? "online" : "offline"}
                    // color={blue}
                    /> */}
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={"Delete"}
                        className="mt-1 bg-red-500 hover:cursor-pointer"
                        onClick={() => handleDelete(booking)}
                      // value={online ? "online" : "offline"}
                      // color={red}
                      />
                    </td>
                  </tr>
                );
              },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div className="flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page {currentPage} of {Math.ceil(filteredBookings.length / itemsPerPage)}
            </Typography>
            <div className="w-full md:w-72">
              <Select
                size="md"
                label="Items Per Page"
                value={itemsPerPage}
                defaultValue={itemsPerPage}
                className="capitalize relative"
                onChange={(val) => setItemsPerPage(val)}
              >
                <Option value="5">5</Option>
                <Option value="10">10</Option>
                <Option value="15">15</Option>
                <Option value="20">20</Option>
                <Option value="50">50</Option>
                <Option value="100">100</Option>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === Math.ceil(filteredBookings.length / itemsPerPage)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {showBookingDetails &&
        // console.log(viewBooking)
        <ViewBooking viewBooking={viewBooking} setShowBookingDetails={setShowBookingDetails} formatDateFromTimestamp={formatDateFromTimestamp} />
      }
    </>
  );
}