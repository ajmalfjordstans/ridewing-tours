import React, { useState } from 'react';

export default function AdmissionTickets({ values, setValues }) {
  const [ticketName, setTicketName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  // console.log(values.tickets);

  const addTicket = (e) => {
    // console.log(values.tickets);
    e.preventDefault();
    if (ticketName && ticketPrice) {
      const newTickets = [...values?.tickets, { name: ticketName, price: parseFloat(ticketPrice) }];
      setValues({ ...values, tickets: newTickets });
      setTicketName('');
      setTicketPrice('');
    }
  };

  const deleteTicket = (index) => {
    const newTickets = values.tickets.filter((_, i) => i !== index);
    setValues({ ...values, tickets: newTickets });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Admission Tickets</h2>
      <div className="w-full max-w-md">
        <form className="mb-4" onSubmit={addTicket}>
          <div className="flex items-center mb-4">
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
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
        <ul className="space-y-2">
          {Array.isArray(values.tickets) && values.tickets.length > 0 ? (
            values.tickets.map((ticket, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <span className="font-medium text-gray-900 dark:text-white w-[200px]">{ticket.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{ticket.price}</span>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteTicket(index)}
                >
                  Delete
                </button>
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
