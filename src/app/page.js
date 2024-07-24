'use client'
import Attractions from "@/components/home/attractions";
import Blog from "@/components/home/blog";
import Destinations from "@/components/home/destinations";
import Hero from "@/components/home/hero";
import TopChoices from "@/components/home/top-choices";

import Image from "next/image";
import Loading from "./loading";
import Transfer from "@/components/home/transfer";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [landing, setLanding] = useState({
    background: "",
    heading: "",
    tagline: ""
  })
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [loadingPage, setLoadingPage] = useState(false)
  const handleFirebaseRead = async () => {
    try {
      setLoadingPage(true)
      const docRef = doc(db, `countries/${currentCountry}/landing/hero`);
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = { ...docSnapshot.data(), id: docSnapshot.id };
          setLanding(data)
        } else {
          console.log("No such document!");
        }
      });
      setLoadingPage(false)
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  };
  useEffect(() => {
    handleFirebaseRead()
  }, [currentCountry])
  if (loadingPage) return <Loading />
  else
    return (
      <div className="pb-[150px]">
        <Hero data={landing} />
        <TopChoices />
        <Attractions />
        {/* <Transfer /> */}
        <Destinations />
        <Blog />
      </div>
    );
}
