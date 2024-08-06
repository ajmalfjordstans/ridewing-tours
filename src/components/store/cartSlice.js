'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // {
    //   "id": 1,
    //   "url": "best-of-tokyo-day-tour",
    //   "name": "BEST OF TOKYO DAY TOUR",
    //   "tag": "Recommended for First-Time Visitors",
    //   "startLocation": "Tokyo",
    //   "availability": "Every day",
    //   "currency": "¥",
    //   "price": "15939",
    //   "details": {
    //     "hours": "10 Hour Tour",
    //     "language": [
    //       "English"
    //     ],
    //     "guidedTour": true,
    //     "entranceFeeIncluded": true,
    //     "expertTourGuide": true
    //   },
    //   "gallery": [
    //     "/images/tours/best-of-tokyo-day-tour/1.jpg",
    //     "/images/tours/best-of-tokyo-day-tour/2.jpg",
    //     "/images/tours/best-of-tokyo-day-tour/3.jpg",
    //     "/images/tours/best-of-tokyo-day-tour/4.jpg"
    //   ],
    //   "description": [
    //     "On our Best of Tokyo Day Tour, you’ll experience the modern and historical gems of the city, making it one of the best Tokyo tours. Join us for an exciting day in Tokyo, getting lost in the beauty of the Imperial Palace. Wander the gardens and admire the incredible architecture. Tour the incredible Senso-ji Temple – a must-do on everyone’s itinerary – before trying the authentic flavors of Uji Matcha (available 3 times a week). Visit the modern district of Odaiba and cruise along Tokyo Bay – on selective days – passing beneath the Rainbow Bridge. Finally, take your journey to the next level at Tokyo Tower, where unbelievable city views await.",
    //     "Are you traveling to Tokyo for the first time? Our Best of Tokyo Day Tour is one of the best Tokyo tours. You will dive into the wonders of Japan’s capital city, from sacred history to magical views. See famous sites with your guide, eat traditional foods, and cruise along Tokyo Bay. Book your Tokyo experience today!"
    //   ],
    //   "highlight": [
    //     "Explore the stunning Imperial Palace’s gardens, architecture, and surrounding nature",
    //     "Discover the magic of the world-famous Senso-ji Temple",
    //     "Ascend the Tokyo Tower and enjoy the best views of the city",
    //     "On Sunday, Tuesday, Thursday, or Saturday - see the Meiji Shrine and Hamarikyu Gardens",
    //     "On Monday, Wednesday, or Friday - indulge in Uji Matcha and cruise along Tokyo Bay"
    //   ],
    //   "itinerary": {
    //     "start": "8:00 - Meet your guide in Tokyo and start your tour",
    //     "itinerary": [
    //       "Visit the Meiji Jingu Shrine - the most famous Shinto shrine (Sunday, Tuesday, Thursday & Saturday)",
    //       "Tour the beautiful outer garden of the Imperial Palace",
    //       "Visit the famous Senso-ji Temple and explore the Odaiba district",
    //       "Enjoy an authentic Asakusa Uji Matcha experience and take a Symphony Cruise along Tokyo Bay (Monday, Wednesday & Friday)",
    //       "Visit the Hamarikyu Gardens (Sunday, Tuesday, Thursday & Saturday)",
    //       "Visit Tokyo Tower and enjoy city views from the observation deck"
    //     ],
    //     "end": "8:00 - Meet your guide in Tokyo and start your tour"
    //   },
    //   "pricing": [
    //     {
    //       "name": "FROM SHINJUKU, TOKYO (SHINJUKU STATION EAST EXIT - HATO BUS STOP NO. 2)",
    //       "passengers": {
    //         "price": "FROM ¥15500 PER PERSON"
    //       }
    //     },
    //     {
    //       "name": "FROM TOKYO (TOKYO STATION MARUNOUCHI SOUTH EXIT HATO BUS BOARDING AREA)",
    //       "passengers": {
    //         "price": "FROM ¥18000 PER PERSON"
    //       }
    //     }
    //   ],
    //   "otherDetails": {
    //     "includes": [
    //       "Hand-picked expert tour guide",
    //       "Transportation",
    //       "Entrance fees: Tokyo Tower Main Deck & Tokyo Bay Cruise (on selected days)",
    //       "Lunch"
    //     ],
    //     "excludes": [
    //       "Personal travel insurance",
    //       "Gratuities"
    //     ],
    //     "bring": [
    //       "Water",
    //       "Walking shoes"
    //     ],
    //     "information": [
    //       "Some tour activities vary based on day: On Sunday, Tuesday, Thursday, or Saturday, you will visit the Meiji Shrine and see the Hamarikyu Gardens On Monday, Wednesday, or Friday - you will enjoy an authentic Uji Matcha experience and cruise along Tokyo Bay (subject to weather conditions)"
    //     ],
    //     "cancellationPolicy": "Cancellations made 3 or more days before the start of the tour will receive a 95% refund. Cancellations made less than 3 days before the start of the tour will not be refunded."
    //   }
    // },
    // {
    //   "id": 2,
    //   "url": "kyoto-&-nara-day-tour-from-kyoto",
    //   "name": "KYOTO & NARA DAY TOUR FROM KYOTO",
    //   "tag": "Tourist Japan's Top Pick",
    //   "startLocation": "Kyoto",
    //   "availability": "Every Monday, Wednesday, Friday, Saturday",
    //   "price": "¥13,773",
    //   "details": {
    //     "hours": "9 Hour Tour",
    //     "language": [
    //       "English"
    //     ],
    //     "guidedTour": true,
    //     "entranceFeeIncluded": true,
    //     "expertTourGuide": true,
    //     "airconditionedTransport": true
    //   },
    //   "gallery": [
    //     "/images/tours/kyoto-&-nara-day-tour-kyoto/1.jpg",
    //     "/images/tours/kyoto-&-nara-day-tour-kyoto/2.jpg",
    //     "/images/tours/kyoto-&-nara-day-tour-kyoto/3.jpg",
    //     "/images/tours/kyoto-&-nara-day-tour-kyoto/4.jpg"
    //   ],
    //   "description": [
    //     "Explore 2 of Japan’s great cities on our Kyoto & Nara Day Tour from Kyoto. With your experienced guide, head to Arashiyama Bamboo Forest. Be amazed by the incredible bamboo grove before reaching Kinkakuji Temple. Admire its golden architecture and hidden details. Once you arrive in Nara, wander the beautiful Nara Park with free-roaming deer, and see the giant Buddha statue at Todaiji Temple.",
    //     "Tourist Japan is keeping the perfect for you to explore 2 amazing cities will love our Kyoto & Nara Day Tour from Kyoto. Explore these 2 cities in a day with visits to Kinkakuji Temple, Arashiyama Bamboo Forest, Nara Park, and more. Be led by an experienced guide every step of the way, so book your adventure today!"
    //   ],
    //   "highlight": [
    //     "Admire the world-renowned beauty of Arashiyama Bamboo Forest",
    //     "Head to Kinkakuji Temple and discover the golden architecture",
    //     "In Nara, get lost in the magical Nara Park and visit sacred sites within",
    //     "See the magnificent Todaiji Temple with its giant Buddha statue"
    //   ],
    //   "itinerary": {
    //     "start": "9:15 - Meet your guide in Kyoto and start your tour",
    //     "itinerary": [
    //       "Visit the world-famous Arashiyama Bamboo Forest",
    //       "Enjoy free time + lunch break",
    //       "See Kinkakuji Temple's golden architecture and outdoor pond",
    //       "Arrive in Nara and explore Nara Park",
    //       "Visit the sacred Todaiji Temple"
    //     ],
    //     "end": "18:00 - The tour ends in Kyoto"
    //   },
    //   "pricing": [
    //     {
    //       "name": "FROM KYOTO (KYOTO-HACHIJOGUCHI BUS LOADING AREA)",
    //       "passengers": {
    //         "price": "FROM ¥12,950 PER PERSON"
    //       }
    //     }
    //   ],
    //   "otherDetails": {
    //     "includes": [
    //       "Hand-picked expert tour guide",
    //       "Transportation"
    //     ],
    //     "excludes": [
    //       "Meals & drinks",
    //       "Entrance fees",
    //       "Personal travel insurance",
    //       "Gratuities"
    //     ],
    //     "bring": [
    //       "Water",
    //       "Walking shoes"
    //     ],
    //     "information": [
    //       "The entrance fees can be purchased the day of the tour in cash"
    //     ],
    //     "cancellationPolicy": "Cancellations made 5 or more days before the start of the tour will receive a 95% refund. Cancellations made less than 5 days before the start of the tour will not be refunded."
    //   }
    // },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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

export const { addItem, removeItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
