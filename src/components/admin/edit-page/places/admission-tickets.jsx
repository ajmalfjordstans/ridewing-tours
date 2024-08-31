import { storage } from '@/app/firebase';
import TimepickerComponent from '@/components/services/timepicker';
import { Button } from '@material-tailwind/react';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AdmissionTickets({ values, setValues }) {
  const [ticketName, setTicketName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const [currentImage, setCurrentImage] = useState(null)
  const [openingHours, setOpeningHours] = useState(new Date())
  const [closingHours, setClosingHours] = useState(new Date())

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')

  const selectedCountry = useSelector(state => state.user.selectedCountry)
  // console.log(values.tickets);

  const addTicket = async (e) => {
    e.preventDefault();
    try {
      console.log("Starting upload...");
      const imageUrl = await handleUpload();
      console.log("Upload completed. Image URL:", imageUrl);
  
      if (ticketName && ticketPrice) {
        const newTicket = {
          name: ticketName,
          price: parseFloat(ticketPrice),
          image: imageUrl,
          opening: dayjs(openingHours).toDate(),
          closing: dayjs(closingHours).toDate(),
          description: description
        };
  
        // Ensure values?.tickets is an array before spreading it
        const newTickets = [...(values?.tickets || []), newTicket];
  
        // Update state with new ticket
        setValues({ ...values, tickets: newTickets });
  
        // Reset form fields
        setTicketName('');
        setTicketPrice('');
        setOpeningHours(new Date());
        setClosingHours(new Date());
        setImage(null);
        setCurrentImage(null);
        setDescription("");
      } else {
        console.warn("Ticket name or price is missing!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  


  const deleteTicket = (index) => {
    const newTickets = values.tickets.filter((_, i) => i !== index);
    setValues({ ...values, tickets: newTickets });
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      setImage(e.target.files[0])
      setCurrentImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);

    const storageRef = ref(storage, `images/countries/${selectedCountry}/top-choices/${values.id}/${ticketName}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          // console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading image:', error);
          setLoading(false);
          reject(error); // Reject the promise if there’s an error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            setLoading(false);
            resolve(downloadURL); // Resolve the promise with the download URL
          });
        }
      );
    });
  };

  const convertTimestampToDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    }
    return null;
  };

  function formatTo12HourTime(dateString) {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const strTime = `${hours}:${minutesStr} ${ampm}`;
    return strTime;
  }
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Additional Tickets</h2>

      <form className="mb-4" onSubmit={addTicket}>
        <div className="flex flex-col justify-center mb-4 gap-3">
          <div className='flex gap-4 items-center'>
            <div className='h-[100px] w-[150px] relative flex justify-center items-center rounded-[10px] overflow-hidden mx-auto'>
              <Image src={currentImage ? currentImage : '/images/background/image-template.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='Ticket' />
            </div>
            <input type="file" onChange={handleChange} className=' ' />
          </div>
          <div className='flex items-center'>
            <input
              type="text"
              placeholder="Ticket Name"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="w-1/4 p-2 ml-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className='flex gap-3'>
            <TimepickerComponent time={openingHours} setTime={setOpeningHours} label="Opening Hours" />
            <TimepickerComponent time={closingHours} setTime={setClosingHours} label="Closing Hours" min={openingHours} />
          </div>
          <div>
            <textarea
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-[150px]"
              required
            />
          </div>
          <div className='flex gap-5'>
            <Button
              type="submit"
              disabled={loading}
              className="ml-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Uploading...' : 'Add'}
            </Button>
            {loading && <p className='font-[600] text-[22px]'>{Math.round(progress)}%</p>}
          </div>
        </div>
      </form>
      <div className="w-full max-w-[800px]">
        <ul className="space-y-2">
          {Array.isArray(values.tickets) && values.tickets.length > 0 ? (
            values.tickets.map((ticket, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <div className='h-[100px] w-[150px] relative flex justify-center items-center rounded-[10px] overflow-hidden'>
                  <Image src={ticket.image ? ticket.image : '/images/background/image-template.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='Ticket' />
                </div>
                <div className='flex flex-col w-full p-[20px]'>
                  <div className='w-full flex justify-between'>
                    <span className="font-[600] text-gray-900 dark:text-white w-[200px] text-[22px]">{ticket?.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">Price: {ticket?.price}</span>
                  </div>
                  <div>
                    <p className='text-[#ADADAD] mt-2'>Opening Hours</p>
                    <div className='grid grid-cols-2 mt-1'>
                      {ticket?.opening &&
                        <p>Opening: {formatTo12HourTime(convertTimestampToDate(ticket?.opening))}</p>
                      }
                      {ticket?.closing &&
                        <p>Closing: {formatTo12HourTime(convertTimestampToDate(ticket?.closing))}</p>
                      }
                    </div>
                  </div>
                  <div>
                    <p className='text-[#ADADAD] mt-2'>Description</p>
                    <p>{ticket?.description}</p>
                  </div>
                </div>
                <Button
                  className="bg-custom-red"
                  onClick={() => deleteTicket(index)}
                >
                  Delete
                </Button>
              </li>
            ))
          ) : (
            <p>No Tickets to show</p>
          )}
        </ul>
      </div>
    </div>
  );
}
