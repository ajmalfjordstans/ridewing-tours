'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // {
    //   "id": "best-of-osaka-walking-tour",
    //   "pricing": [
    //     {
    //       "name": "FROM OSAKA (JR OSAKAJOKOEN STATION, EXIT 2)",
    //       "passengers": {
    //         "price": "FROM ¥19058 PER PERSON"
    //       }
    //     }
    //   ],
    //   "currency": "¥",
    //   "category": "Package Tours",
    //   "availability": "Every Monday, Tuesday, Wednesday, Thursday, Saturday",
    //   "gallery": [
    //     "/images/tours/best-of-osaka-walking-tour/1.jpg",
    //     "/images/tours/best-of-osaka-walking-tour/2.jpg",
    //     "/images/tours/best-of-osaka-walking-tour/3.jpg",
    //     "/images/tours/best-of-osaka-walking-tour/4.jpg",
    //     "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2FBEST%20OF%20OSAKA%20WALKING%20TOUR%2F2.jpg?alt=media&token=4833dfae-81fe-4413-8bd1-32692ab6c48b"
    //   ],
    //   "startLocation": "Osaka",
    //   "details": {
    //     "guidedTour": true,
    //     "expertTourGuide": true,
    //     "language": [
    //       "English"
    //     ],
    //     "hours": "6"
    //   },
    //   "otherDetails": {
    //     "bring": [
    //       "Water",
    //       "Walking shoes"
    //     ],
    //     "includes": [
    //       "Hand-picked expert tour guide",
    //       "One none alcoholic drink & some local street food"
    //     ],
    //     "excludes": [
    //       "Meals & drinks",
    //       "Personal travel insurance",
    //       "Gratuities"
    //     ],
    //     "information": [
    //       ""
    //     ]
    //   },
    //   "name": "BEST OF OSAKA WALKING TOUR",
    //   "tag": "",
    //   "itinerary": {
    //     "end": "15:00 - The tour ends in Osaka",
    //     "start": "10:00 - Meet your local guide in Osaka and start your tour",
    //     "itinerary": [
    //       "Begin your 5-hour walking tour in the retro area “Amerikamura” or “American Village”",
    //       "Walk the charming cobblestone streets lined with lanterns",
    //       "Experience Namba & Dotonbori, the neon heart of Osaka",
    //       "Stop at Hozenji, a small Buddhist temple",
    //       "Visit the vibrant and lively Kuromon Ichiba Market",
    //       "Stroll through Shinsekai, the entertainment district",
    //       "See Osaka Castle – a 16th-century marvel",
    //       "Discover the shopping street of Shinsaibashi and buy souvenirs",
    //       "Learn the story of Glico Man and see Tsutenkaku, Osaka’s “Tokyo Tower”"
    //     ]
    //   },
    //   "price": "200",
    //   "bulkPrice": "150",
    //   "description": [
    //     "Discover the vibrant life of Osaka with our Best of Osaka Walking Tour. Go on a journey that blends tradition, history, and architecture. Embark on your 5-hour walking tour starting in the retro area of “Amerikamura” or “American Village”. Discover the Namba & Dotonbori neighborhood as well as Hozenji temple – an iconic Buddhist temple. The Kuromon Ichiba Market – famous for its fresh seafood is your next destination. Stroll through Shinsekai’s entertainment district, witness the stunning Osaka Castle, and learn about Osaka’s other hidden gems. See where the past meets the present and enjoy every moment of this stunning city.",
    //     "For curious travelers who love to explore, our Best of Osaka Walking Tour is a great way to experience Osaka. Go on a journey that ties culture and history while listening to your local expert guide. Book your Osaka 5-hour walking tour today!"
    //   ],
    //   "url": "best-of-osaka-walking-tour",
    //   "highlight": [
    //     "Get the most immersive and unique 5-hour walking tour",
    //     "Explore the retro charm of Amerikamura and walk through lantern-lined cobblestone streets",
    //     "Marvel at Osaka Castle, dating back to the 16th century",
    //     "Experience the bustling energy of Namba, Dotonbori, and the lively Kuromon Ichiba Market"
    //   ],
    //   "travelDetails": {
    //     "passengers": 3
    //   },
    //   "tickets": [
    //     {
    //       "price": 500,
    //       "description": "Testing",
    //       "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-osaka-walking-tour%2FTest%20Ticekt%2Fjapan.jpg?alt=media&token=5f6c57d2-e381-41fb-ac3c-8aa6dd1f7008",
    //       "name": "Test Ticekt",
    //       "opening": {
    //         "seconds": 1725091979,
    //         "nanoseconds": 969000000
    //       },
    //       "closing": {
    //         "seconds": 1725091979,
    //         "nanoseconds": 969000000
    //       }
    //     }
    //   ],
    //   "bookingId": "BK-m1hmy0ph-wju97n5b",
    //   "date": "2024-09-29T18:30:00.000Z",
    //   "includeTicket": true,
    //   "includeGuide": true,
    //   "additionalTickets": [
    //     {
    //       "price": 500,
    //       "description": "Testing",
    //       "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-osaka-walking-tour%2FTest%20Ticekt%2Fjapan.jpg?alt=media&token=5f6c57d2-e381-41fb-ac3c-8aa6dd1f7008",
    //       "name": "Test Ticekt",
    //       "ticketCount": 3,
    //       "opening": {
    //         "seconds": 1725091979,
    //         "nanoseconds": 969000000
    //       },
    //       "closing": {
    //         "seconds": 1725091979,
    //         "nanoseconds": 969000000
    //       }
    //     },
    //     {
    //       "price": 300,
    //       "description": "Testing Another",
    //       "image": "https://firebasestorage.googleapis.com/v0/b/ridewing-1701351873793.appspot.com/o/images%2Fcountries%2FJapan%2Ftop-choices%2Fbest-of-osaka-walking-tour%2FTest%20Ticekt%2Fjapan.jpg?alt=media&token=5f6c57d2-e381-41fb-ac3c-8aa6dd1f7008",
    //       "name": "Test New Ticket",
    //       "ticketCount": 3,
    //       "opening": {
    //         "seconds": 1725091979,
    //         "nanoseconds": 969000000
    //       },
    //       "closing": {
    //         "seconds": 1725091979,
    //         "nanoseconds": 969000000
    //       }
    //     }
    //   ],
    //   "guideLanguage": "Chinese",
    //   "hoursGuideNeeded": "6",
    //   "type": "package",
    //   "status": "pending"
    // }
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
