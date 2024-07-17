'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import { addDoc, collection, doc, onSnapshot, query, QuerySnapshot, setDoc } from 'firebase/firestore'
import Image from 'next/image'
import React from 'react'
import { db } from '../firebase'
import { useSelector } from 'react-redux'

export default function UserDetails({ user }) {
  const { logOut } = UserAuth()
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (err) {
      console.log(err);
    }
  }

  const handleFirebaseUpdate = async () => {
    try {
      const docRef = doc(db, "japan", "RzYea2pgV9rjQWRNuElX");
      const topChoicesCollectionRef = collection(docRef, "top-choices");

      const newDocument = {
        url: "best-of-tokyo-day-tour",
        name: "BEST OF TOKYO DAY TOUR",
        tag: "Recommended for First-Time Visitors",
        startLocation: "Tokyo",
        availability: "Every day",
        price: "¥15,939",
        details: {
          hours: "10 Hour Tour",
          language: [
            "English"
          ],
          guidedTour: true,
          entranceFeeIncluded: true,
          expertTourGuide: true
        },
        gallery: [
          "/images/tours/best-of-tokyo-day-tour/1.jpg",
          "/images/tours/best-of-tokyo-day-tour/2.jpg",
          "/images/tours/best-of-tokyo-day-tour/3.jpg",
          "/images/tours/best-of-tokyo-day-tour/4.jpg"
        ],
        description: [
          "On our Best of Tokyo Day Tour, you’ll experience the modern and historical gems of the city, making it one of the best Tokyo tours. Join us for an exciting day in Tokyo, getting lost in the beauty of the Imperial Palace. Wander the gardens and admire the incredible architecture. Tour the incredible Senso-ji Temple – a must-do on everyone’s itinerary – before trying the authentic flavors of Uji Matcha (available 3 times a week). Visit the modern district of Odaiba and cruise along Tokyo Bay – on selective days – passing beneath the Rainbow Bridge. Finally, take your journey to the next level at Tokyo Tower, where unbelievable city views await.",
          "Are you traveling to Tokyo for the first time? Our Best of Tokyo Day Tour is one of the best Tokyo tours. You will dive into the wonders of Japan’s capital city, from sacred history to magical views. See famous sites with your guide, eat traditional foods, and cruise along Tokyo Bay. Book your Tokyo experience today!"
        ],
        highlight: [
          "Explore the stunning Imperial Palace’s gardens, architecture, and surrounding nature",
          "Discover the magic of the world-famous Senso-ji Temple",
          "Ascend the Tokyo Tower and enjoy the best views of the city",
          "On Sunday, Tuesday, Thursday, or Saturday - see the Meiji Shrine and Hamarikyu Gardens",
          "On Monday, Wednesday, or Friday - indulge in Uji Matcha and cruise along Tokyo Bay"
        ],
        itinerary: {
          start: "8:00 - Meet your guide in Tokyo and start your tour",
          itinerary: [
            "Visit the Meiji Jingu Shrine - the most famous Shinto shrine (Sunday, Tuesday, Thursday & Saturday)",
            "Tour the beautiful outer garden of the Imperial Palace",
            "Visit the famous Senso-ji Temple and explore the Odaiba district",
            "Enjoy an authentic Asakusa Uji Matcha experience and take a Symphony Cruise along Tokyo Bay (Monday, Wednesday & Friday)",
            "Visit the Hamarikyu Gardens (Sunday, Tuesday, Thursday & Saturday)",
            "Visit Tokyo Tower and enjoy city views from the observation deck"
          ],
          end: "8:00 - Meet your guide in Tokyo and start your tour"
        },
        pricing: [
          {
            name: "FROM SHINJUKU, TOKYO (SHINJUKU STATION EAST EXIT - HATO BUS STOP NO. 2)",
            passengers: {
              price: "FROM ¥15500 PER PERSON"
            }
          },
          {
            name: "FROM TOKYO (TOKYO STATION MARUNOUCHI SOUTH EXIT HATO BUS BOARDING AREA)",
            passengers: {
              price: "FROM ¥18000 PER PERSON"
            }
          }
        ],
        otherDetails: {
          includes: [
            "Hand-picked expert tour guide",
            "Transportation",
            "Entrance fees: Tokyo Tower Main Deck & Tokyo Bay Cruise (on selected days)",
            "Lunch"
          ],
          excludes: [
            "Personal travel insurance",
            "Gratuities"
          ],
          bring: [
            "Water",
            "Walking shoes"
          ],
          information: [
            "Some tour activities vary based on day: On Sunday, Tuesday, Thursday, or Saturday, you will visit the Meiji Shrine and see the Hamarikyu Gardens On Monday, Wednesday, or Friday - you will enjoy an authentic Uji Matcha experience and cruise along Tokyo Bay (subject to weather conditions)"
          ],
          cancellationPolicy: "Cancellations made 3 or more days before the start of the tour will receive a 95% refund. Cancellations made less than 3 days before the start of the tour will not be refunded."
        }
      };

      await addDoc(topChoicesCollectionRef, newDocument);

      console.log("Document successfully added!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  const handleFirebaseRead = async () => {
    try {
      let itemsArr = []
      const q = query(collection(db, 'japan'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id })
        })
      })

      console.log("Document successfully read!", itemsArr);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  const handleFirebaseUserUpdate = async () => {
    try {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          userRole: loginType // Use loginType for the role
        });
        console.log("User document successfully created!");
      }
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  }
  return (
    <div className=''>
      <div className='flex gap-3'>
        <Image src={user?.photoURL} alt='profile' height={400} width={400} className='h-[140px] w-[140px] rounded-full' />
        {user?.uid == 'mM4TGPln9aO8D3b2uk7j745yV8n2' || user?.uid == 'TvX2p5F8mvYc0quBAxVbaicM83t1' && <p>Admin</p>}
      </div>
      <div className='flex gap-3 mt-[40px]'>
        <p>User Name:</p>
        <p>{user?.displayName}</p>
      </div>

      <div className='flex gap-3'>
        <p>Email:</p>
        <p>{user?.email}</p>
      </div>
      <div className='flex gap-3'>
        <p>User Id:</p>
        <p>{user?.uid}</p>
      </div>
      <div className='flex gap-3'>
        <p>User Role:</p>
        <p>{user?.userRole}</p>
      </div>
      <Button className="bg-custom-red my-[20px]" role="menuitem" onClick={handleSignOut}>
        Logout
      </Button>
      <p>Development Purpose only</p>
      <div className='flex gap-3'>
        <Button className="bg-custom-red mt-[20px]" role="menuitem" onClick={handleFirebaseUpdate}>
          Update
        </Button>
        <Button className="bg-custom-red mt-[20px]" role="menuitem" onClick={handleFirebaseRead}>
          Read
        </Button>
      </div>
    </div>
  )
}
