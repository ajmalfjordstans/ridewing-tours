'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        //Test cart data
        {
            "id": "best-of-kyoto-day-tour",
            "details": {
                "recommended": false,
                "entranceFeeIncluded": true,
                "guidedTour": true,
                "language": [
                    "English"
                ],
                "airconditionedTransport": true,
                "rating": "",
                "highRated": false,
                "expertTourGuide": true,
                "availability": true,
                "hours": "9"
            },
            "pricing": [
                {
                    "adults": {
                        "price": "FROM ¥12900 PER PERSON"
                    },
                    "children": {
                        "age": "Children under 11 years old",
                        "price": "FROM ¥11500 PER PERSON"
                    },
                    "name": "FROM KYOTO (KYOTO-HACHIJOGUCHI BUS LOADING AREA)"
                }
            ],
            "name": "BEST OF KYOTO DAY TOUR",
            "availability": "Every day",
            "gallery": [
                "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FKYOTO-05.jpeg?alt=media&token=89e09ffb-5200-4939-86e0-63f5d5058d55"
            ],
            "tickets": [
                {
                    "price": 300,
                    "name": "Team Lab"
                },
                {
                    "name": "Shibuya Sky Tree",
                    "price": 150
                },
                {
                    "name": "Kyoto",
                    "price": 140
                },
                {
                    "closing": {
                        "seconds": 1722859046,
                        "nanoseconds": 68000000
                    },
                    "price": 324,
                    "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticket%2FPXL_20221231_123135026.jpg?alt=media&token=1c9d4ba5-5328-4be3-aa88-b898db5874d0",
                    "opening": {
                        "seconds": 1722859046,
                        "nanoseconds": 68000000
                    },
                    "description": "This is the test description about the new Ticket",
                    "name": "New Ticket"
                },
                {
                    "opening": {
                        "seconds": 1722829034,
                        "nanoseconds": 79000000
                    },
                    "description": "Test",
                    "closing": {
                        "seconds": 1722861434,
                        "nanoseconds": 79000000
                    },
                    "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticekt%2FPXL_20221231_123135026.jpg?alt=media&token=d25d8c0d-4e45-4300-bbdc-ed847dd3566d",
                    "price": 32,
                    "name": "New Ticekt"
                }
            ],
            "currency": "¥",
            "startLocation": "Kyoto",
            "offers": {
                "isPercent": false,
                "bulkPrice": 5225,
                "price": 6767.5
            },
            "highlight": [
                "Explore the hidden gems of Kyoto with a licensed local guide",
                "Experience the golden pavilion of Kinkaku-ji Temple",
                "Visit the Buddhist temple, Kiyomizudera, and discover its rich heritage",
                "Uncover the wonders of Arashiyama Bamboo Forest and take epic photos"
            ],
            "tourType": "Private Tour",
            "tag": "For First-Time Visitors",
            "bulkPrice": 5225,
            "price": 6767.5,
            "isPercent": true,
            "url": "best-of-kyoto-day-tour",
            "category": " City Tours",
            "itinerary": {
                "itinerary": [
                    "Visit the iconic Fushimi Inari Taisha Shrine",
                    "See the Buddhist temple, Kiyomizudera",
                    "Admire the golden architecture of Kinkaku-ji Temple",
                    "Discover the world-famous Arashiyama Bamboo Forest"
                ],
                "end": "18:00 - The tour ends in Kyoto",
                "start": "9:15 - Meet your local guide in Kyoto"
            },
            "otherDetails": {
                "excludes": [
                    "Entrance fees",
                    "Meals & drinks",
                    "Personal travel insurance",
                    "Gratuities"
                ],
                "information": [
                    "The entrance fees can be purchased the day of the tour in cash"
                ],
                "cancellationPolicy": "Cancellations made 5 or more days before the start of the tour will receive a 95% refund. Cancellations made less than 5 days before the start of the tour will not be refunded",
                "includes": [
                    "Hand-picked expert tour guide",
                    "Transportation",
                    "Private Car"
                ],
                "bring": [
                    "Water",
                    "Walking shoes"
                ]
            },
            "description": [
                "Experience the heart of Kyoto with our Best of Kyoto Day Tour from Kyoto. Dive into the rich history and architecture of the city’s famous sites. Visit Fushimi Inari Taisha Shrine and Kiyomizudera – a Buddhist temple filled with ancient history. Marvel at the golden pavilion of Kinkaku-ji Temple and experience the richness of Arashiyama Bamboo Forest. Your adventure will be filled with amazing moments to last a lifetime.",
                "Our Best of Kyoto Day Tour is the perfect choice for Kyoto first-timers looking to tick all the best things to do in Kyoto. This tour offers a window into the city’s legacy from sacred shrines to magical nature. Along with a licensed guide, discover the wonders of Kyoto. Book your exciting full-day tour today!"
            ],
            "bookingId": "BK-m1v1ic4a-zc4r7qys",
            "date": "2024-10-24T18:30:00.000Z",
            "contact": "9605745465",
            "meetingPoint": "5082 Airport Pulling Rd N\nNaples\nFlorida\n34105\n(239) 434-7744\nUnited States",
            "includeTicket": false,
            "includeGuide": true,
            "additionalTickets": [
                {
                    "closing": {
                        "seconds": 1722859046,
                        "nanoseconds": 68000000
                    },
                    "price": 324,
                    "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticket%2FPXL_20221231_123135026.jpg?alt=media&token=1c9d4ba5-5328-4be3-aa88-b898db5874d0",
                    "opening": {
                        "seconds": 1722859046,
                        "nanoseconds": 68000000
                    },
                    "description": "This is the test description about the new Ticket",
                    "name": "New Ticket",
                    "ticketCount": 4
                },
                {
                    "opening": {
                        "seconds": 1722829034,
                        "nanoseconds": 79000000
                    },
                    "description": "Test",
                    "closing": {
                        "seconds": 1722861434,
                        "nanoseconds": 79000000
                    },
                    "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-kyoto-day-tour%2FNew%20Ticekt%2FPXL_20221231_123135026.jpg?alt=media&token=d25d8c0d-4e45-4300-bbdc-ed847dd3566d",
                    "price": 32,
                    "name": "New Ticekt",
                    "ticketCount": 2
                }
            ],
            "guideLanguage": "English",
            "hoursGuideNeeded": "9",
            "type": "package",
            "status": "pending",
            "noOfPassengers": 1,
            "total": 28430
        },
        {
            "id": "HND",
            "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Fairports%2Fnrt%20japan-02.webp?alt=media&token=d6828fe8-8f16-42fb-83cd-0e302445d97c",
            "price": "20000",
            "currency": "¥",
            "name": "Haneda Airport",
            "background": "",
            "transfer": "airport",
            "bookingId": "BK-m1v1jjr7-fpx6tvb9",
            "travelDetails": {
                "name": "Armand Bonner",
                "contact": 9605745465,
                "email": "noxafamet@mailinator.com",
                "passengers": 4,
                "luggage": 6,
                "pickupTime": "08:56",
                "date": "2024-10-04",
                "tripType": "departure",
                "pickupAddress": "Voluptas est labore ",
                "dropoffAddress": "Et magni officia adi",
                "flightNumber": "596",
                "terminalNumber": "385"
            },
            "status": "pending",
            "noOfPassengers": 4,
            "total": 80000
        },
        {
            "id": "BK-m1v1kaj7-2v4pkdvr",
            "bookingId": "BK-m1v1kaj7-220ls2oh",
            "name": "Frontend FJordstans's Custom  Package",
            "travelDetails": {
                "guests": 6,
                "meetingPoint": "station",
                "meetingTime": "10:59",
                "city": "",
                "date": "2024-10-04",
                "hours": 12,
                "guideLanguage": "",
                "itinerary": "Quam maiores id et i",
                "notes": "Nulla repellendus V",
                "meetingAddress": "Quaerat aliquid quia"
            },
            "type": "custom",
            "status": "pending",
            "noOfPassengers": 1,
            "total": 0
        },
        {
            "id": "8ygMlWRX1wiJ16mHcWbL",
            "name": "Tokyo",
            "price": "12000",
            "description": "You can have a richer, deeper understanding of the spots you visit in Japan because the guides will be able to tell you the history and context of the spots you visit from an insider/local perspective and answer questions you have about them.",
            "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Fguides%2FAdobeStock_323459394_Preview.jpeg?alt=media&token=730acd7c-d436-4a5c-9d4c-ba708b02aecf",
            "languages": [
                "Japanese",
                "Chinese",
                "English"
            ],
            "currency": "JPY",
            "bookingId": "BK-m1v1ldqj-9c8vd9vu",
            "travelDetails": {
                "guests": 2,
                "meetingPoint": "hotel",
                "meetingTime": "10:13",
                "city": "",
                "date": "2024-10-04",
                "itinerary": "Veritatis doloribus ",
                "language": "Chinese",
                "hours": 8,
                "notes": "Inventore et volupta",
                "meetingAddress": "Eos tempora aute op"
            },
            "type": "guide",
            "status": "pending",
            "noOfPassengers": 1,
            "total": 12000
        },
        {
            "id": "HKT",
            "currency": "JPY",
            "name": "Hakata Statio",
            "image": "/images/japan-attractions/hiroshima.jpg",
            "price": "100",
            "transfer": "station",
            "bookingId": "BK-m1v1maaf-fg8ozr51",
            "travelDetails": {
                "name": "Wyatt Humphrey",
                "contact": 9605745465,
                "email": "kasic@mailinator.com",
                "passengers": 4,
                "luggage": 5,
                "pickupTime": "19:55",
                "date": "2024-10-04",
                "tripType": "arrival",
                "pickupAddress": "Hakata Statio",
                "dropoffAddress": "Wytdfsa",
                "trainNumber": "961"
            },
            "status": "pending",
            "noOfPassengers": 4,
            "total": 400
        }
    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = [...action.payload]
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
