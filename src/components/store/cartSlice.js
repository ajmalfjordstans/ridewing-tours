'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        //     {
        //       "id": "best-of-kyoto-day-tour",
        //       "pricing": [
        //           {
        //               "name": "FROM KYOTO (KYOTO-HACHIJOGUCHI BUS LOADING AREA)",
        //               "children": {
        //                   "age": "Children under 11 years old",
        //                   "price": "FROM ¥11500 PER PERSON"
        //               },
        //               "adults": {
        //                   "price": "FROM ¥12900 PER PERSON"
        //               }
        //           }
        //       ],
        //       "tickets": [
        //           {
        //               "price": 300,
        //               "name": "Team Lab"
        //           },
        //           {
        //               "price": 150,
        //               "name": "Shibuya Sky Tree"
        //           },
        //           {
        //               "price": 140,
        //               "name": "Kyoto"
        //           },
        //           {
        //               "opening": {
        //                   "seconds": 1722859046,
        //                   "nanoseconds": 68000000
        //               },
        //               "price": 324,
        //               "closing": {
        //                   "seconds": 1722859046,
        //                   "nanoseconds": 68000000
        //               },
        //               "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticket%2FPXL_20221231_123135026.jpg?alt=media&token=1c9d4ba5-5328-4be3-aa88-b898db5874d0",
        //               "name": "New Ticket",
        //               "description": "This is the test description about the new Ticket"
        //           },
        //           {
        //               "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticekt%2FPXL_20221231_123135026.jpg?alt=media&token=d25d8c0d-4e45-4300-bbdc-ed847dd3566d",
        //               "name": "New Ticekt",
        //               "opening": {
        //                   "seconds": 1722829034,
        //                   "nanoseconds": 79000000
        //               },
        //               "description": "Test",
        //               "closing": {
        //                   "seconds": 1722861434,
        //                   "nanoseconds": 79000000
        //               },
        //               "price": 32
        //           }
        //       ],
        //       "highlight": [
        //           "Explore the hidden gems of Kyoto with a licensed local guide",
        //           "Experience the golden pavilion of Kinkaku-ji Temple",
        //           "Visit the Buddhist temple, Kiyomizudera, and discover its rich heritage",
        //           "Uncover the wonders of Arashiyama Bamboo Forest and take epic photos"
        //       ],
        //       "gallery": [
        //           "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FKYOTO-05.jpeg?alt=media&token=89e09ffb-5200-4939-86e0-63f5d5058d55"
        //       ],
        //       "offers": {
        //           "price": 6767.5,
        //           "bulkPrice": 5225,
        //           "isPercent": false
        //       },
        //       "otherDetails": {
        //           "information": [
        //               "The entrance fees can be purchased the day of the tour in cash"
        //           ],
        //           "excludes": [
        //               "Entrance fees",
        //               "Meals & drinks",
        //               "Personal travel insurance",
        //               "Gratuities"
        //           ],
        //           "bring": [
        //               "Water",
        //               "Walking shoes"
        //           ],
        //           "includes": [
        //               "Hand-picked expert tour guide",
        //               "Transportation",
        //               "Private Car"
        //           ],
        //           "cancellationPolicy": "Cancellations made 5 or more days before the start of the tour will receive a 95% refund. Cancellations made less than 5 days before the start of the tour will not be refunded"
        //       },
        //       "startLocation": "Kyoto",
        //       "price": 6767.5,
        //       "url": "best-of-kyoto-day-tour",
        //       "tag": "For First-Time Visitors",
        //       "isPercent": true,
        //       "details": {
        //           "expertTourGuide": true,
        //           "highRated": false,
        //           "hours": "9",
        //           "availability": true,
        //           "airconditionedTransport": true,
        //           "recommended": false,
        //           "entranceFeeIncluded": true,
        //           "guidedTour": true,
        //           "rating": "",
        //           "language": [
        //               "English"
        //           ]
        //       },
        //       "category": " City Tours",
        //       "availability": "Every day",
        //       "tourType": "Private Tour",
        //       "currency": "¥",
        //       "itinerary": {
        //           "start": "9:15 - Meet your local guide in Kyoto",
        //           "itinerary": [
        //               "Visit the iconic Fushimi Inari Taisha Shrine",
        //               "See the Buddhist temple, Kiyomizudera",
        //               "Admire the golden architecture of Kinkaku-ji Temple",
        //               "Discover the world-famous Arashiyama Bamboo Forest"
        //           ],
        //           "end": "18:00 - The tour ends in Kyoto"
        //       },
        //       "description": [
        //           "Experience the heart of Kyoto with our Best of Kyoto Day Tour from Kyoto. Dive into the rich history and architecture of the city’s famous sites. Visit Fushimi Inari Taisha Shrine and Kiyomizudera – a Buddhist temple filled with ancient history. Marvel at the golden pavilion of Kinkaku-ji Temple and experience the richness of Arashiyama Bamboo Forest. Your adventure will be filled with amazing moments to last a lifetime.",
        //           "Our Best of Kyoto Day Tour is the perfect choice for Kyoto first-timers looking to tick all the best things to do in Kyoto. This tour offers a window into the city’s legacy from sacred shrines to magical nature. Along with a licensed guide, discover the wonders of Kyoto. Book your exciting full-day tour today!"
        //       ],
        //       "name": "BEST OF KYOTO DAY TOUR",
        //       "bulkPrice": 5225,
        //       "bookingId": "BK-m1s23iti-spjepzwk",
        //       "date": "2024-10-30T18:30:00.000Z",
        //       "contact": "75645646345",
        //       "meetingPoint": "sdafasf",
        //       "includeTicket": false,
        //       "includeGuide": true,
        //       "additionalTickets": [
        //           {
        //               "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticekt%2FPXL_20221231_123135026.jpg?alt=media&token=d25d8c0d-4e45-4300-bbdc-ed847dd3566d",
        //               "name": "New Ticekt",
        //               "opening": {
        //                   "seconds": 1722829034,
        //                   "nanoseconds": 79000000
        //               },
        //               "description": "Test",
        //               "closing": {
        //                   "seconds": 1722861434,
        //                   "nanoseconds": 79000000
        //               },
        //               "price": 32,
        //               "ticketCount": 1
        //           },
        //           {
        //               "opening": {
        //                   "seconds": 1722859046,
        //                   "nanoseconds": 68000000
        //               },
        //               "price": 324,
        //               "closing": {
        //                   "seconds": 1722859046,
        //                   "nanoseconds": 68000000
        //               },
        //               "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticket%2FPXL_20221231_123135026.jpg?alt=media&token=1c9d4ba5-5328-4be3-aa88-b898db5874d0",
        //               "name": "New Ticket",
        //               "description": "This is the test description about the new Ticket",
        //               "ticketCount": 1
        //           }
        //       ],
        //       "guideLanguage": "English",
        //       "hoursGuideNeeded": "9",
        //       "type": "package",
        //       "status": "pending"
        //   }
    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload };
            }
        }
    },
});

export const { addItem, removeItem, updateItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
