'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            "id": "best-of-osaka-walking-tour",
            "url": "best-of-osaka-walking-tour",
            "details": {
                "hours": "6",
                "guidedTour": true,
                "expertTourGuide": true,
                "rating": "5",
                "highRated": true,
                "availability": true,
                "language": [
                    "English"
                ]
            },
            "isPercent": false,
            "bulkPrice": 17900,
            "highlight": [
                "Get the most immersive and unique 5-hour walking tour",
                "Explore the retro charm of Amerikamura and walk through lantern-lined cobblestone streets",
                "Marvel at Osaka Castle, dating back to the 16th century",
                "Experience the bustling energy of Namba, Dotonbori, and the lively Kuromon Ichiba Market"
            ],
            "price": 17900,
            "tourType": "SIC Tour",
            "startLocation": "Osaka",
            "gallery": [
                "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-osaka-walking-tour%2FOSAKA-01.jpeg?alt=media&token=8d9b9b6f-ad26-405e-8bc3-99ed3fe2bcdc"
            ],
            "currency": "¥",
            "description": [
                "Discover the vibrant life of Osaka with our Best of Osaka Walking Tour. Go on a journey that blends tradition, history, and architecture. Embark on your 5-hour walking tour starting in the retro area of “Amerikamura” or “American Village”. Discover the Namba & Dotonbori neighborhood as well as Hozenji temple – an iconic Buddhist temple. The Kuromon Ichiba Market – famous for its fresh seafood is your next destination. Stroll through Shinsekai’s entertainment district, witness the stunning Osaka Castle, and learn about Osaka’s other hidden gems. See where the past meets the present and enjoy every moment of this stunning city.",
                "For curious travelers who love to explore, our Best of Osaka Walking Tour is a great way to experience Osaka. Go on a journey that ties culture and history while listening to your local expert guide. Book your Osaka 5-hour walking tour today!"
            ],
            "itinerary": {
                "start": "10:00 - Meet your local guide in Osaka and start your tour",
                "end": "15:00 - The tour ends in Osaka",
                "itinerary": [
                    "Begin your 5-hour walking tour in the retro area “Amerikamura” or “American Village”",
                    "Walk the charming cobblestone streets lined with lanterns",
                    "Experience Namba & Dotonbori, the neon heart of Osaka",
                    "Stop at Hozenji, a small Buddhist temple",
                    "Visit the vibrant and lively Kuromon Ichiba Market",
                    "Stroll through Shinsekai, the entertainment district",
                    "See Osaka Castle – a 16th-century marvel",
                    "Discover the shopping street of Shinsaibashi and buy souvenirs",
                    "Learn the story of Glico Man and see Tsutenkaku, Osaka’s “Tokyo Tower”"
                ]
            },
            "pricing": [
                {
                    "passengers": {
                        "price": "FROM ¥19058 PER PERSON"
                    },
                    "name": "FROM OSAKA (JR OSAKAJOKOEN STATION, EXIT 2)"
                }
            ],
            "tickets": [
                {
                    "opening": {
                        "seconds": 1725091979,
                        "nanoseconds": 969000000
                    },
                    "closing": {
                        "seconds": 1725091979,
                        "nanoseconds": 969000000
                    },
                    "price": 500,
                    "name": "Test Ticekt",
                    "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-osaka-walking-tour%2FTest%20Ticekt%2Fjapan.jpg?alt=media&token=5f6c57d2-e381-41fb-ac3c-8aa6dd1f7008",
                    "description": "Testing"
                }
            ],
            "name": "BEST OF OSAKA WALKING TOUR",
            "availability": "Every Monday, Tuesday, Wednesday, Thursday, Saturday",
            "category": " City Tours",
            "offers": {
                "bulkPrice": "18900",
                "isPercent": false,
                "price": "18900",
                "offerValue": "1000",
                "offerTitle": "Launch Offer"
            },
            "tag": "",
            "otherDetails": {
                "bring": [
                    "Water",
                    "Walking shoes"
                ],
                "information": [
                    ""
                ],
                "includes": [
                    "Hand-picked expert tour guide",
                    "One none alcoholic drink & some local street food"
                ],
                "excludes": [
                    "Meals & drinks",
                    "Personal travel insurance",
                    "Gratuities"
                ]
            },
            "bookingId": "BKm2ebb",
            "date": "24/10/2024",
            "contact": "9876543210",
            "meetingPoint": "Test meeting point",
            "includeTicket": true,
            "includeGuide": true,
            "additionalTickets": [
                {
                    "opening": {
                        "seconds": 1725091979,
                        "nanoseconds": 969000000
                    },
                    "closing": {
                        "seconds": 1725091979,
                        "nanoseconds": 969000000
                    },
                    "price": 500,
                    "name": "Test Ticekt",
                    "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-osaka-walking-tour%2FTest%20Ticekt%2Fjapan.jpg?alt=media&token=5f6c57d2-e381-41fb-ac3c-8aa6dd1f7008",
                    "description": "Testing",
                    "ticketCount": 1
                }
            ],
            "guideLanguage": "English",
            "hoursGuideNeeded": "6",
            "type": "package",
            "status": "pending",
            "noOfPassengers": 1,
            "total": 72100
        },
        {
            "id": "HND",
            "price": "7000",
            "background": "",
            "currency": "¥",
            "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Fairports%2Fnrt%20japan-02.webp?alt=media&token=d6828fe8-8f16-42fb-83cd-0e302445d97c",
            "name": "Haneda Airport",
            "transfer": "airport",
            "bookingId": "BKm2epn",
            "travelDetails": {
                "name": "Mohammed Ajmal",
                "contact": 9876543210,
                "email": "frontend.fjordstans@gmail.com",
                "passengers": 4,
                "luggage": 5,
                "pickupTime": "10:13 PM",
                "date": "26/10/2024",
                "tripType": "departure",
                "pickupAddress": "Ridwing",
                "dropoffAddress": "Haneda Airport",
                "flightNumber": "FCJ",
                "terminalNumber": "64"
            },
            "status": "pending",
            "noOfPassengers": 4,
            "total": 28000
        },
        {
            "id": "BKm2ehd",
            "bookingId": "BKm2eaj",
            "name": "Frontend FJordstans's Custom  Package",
            "travelDetails": {
                "name": "Mohammed Ajmal",
                "contact": 9605745465,
                "email": "frontend.fjordstans@gmail.com",
                "guests": "1",
                "meetingPoint": "airport",
                "meetingTime": "10:11 AM",
                "city": "",
                "date": "23/10/2024",
                "hours": 7,
                "guideLanguage": "Hindi",
                "itinerary": "Receive offers and discounts by subscribing to our newsletter",
                "notes": "Receive offers and discounts by subscribing to our newsletter",
                "meetingAddress": "Receive offers and discounts by subscribing to our newsletter"
            },
            "type": "custom",
            "status": "pending",
            "noOfPassengers": 1,
            "total": 0
        },
        {
            "id": "HKT",
            "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Fstations%2Ftokyo%20station-01.jpeg?alt=media&token=43c80c97-d05e-47ac-a6af-c0086730b2b2",
            "name": "TOKYO STATION",
            "price": "4500",
            "currency": "¥",
            "transfer": "station",
            "bookingId": "BKm2ea0",
            "travelDetails": {
                "name": "Mohammed Ajmal",
                "contact": 9605745465,
                "email": "frontend.fjordstans@gmail.com",
                "passengers": 6,
                "luggage": 10,
                "pickupTime": "10:00 AM",
                "date": "25/10/2024",
                "tripType": "arrival",
                "pickupAddress": "TOKYO STATION",
                "dropoffAddress": "fsa dfas",
                "trainNumber": "t42s"
            },
            "status": "pending"
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
