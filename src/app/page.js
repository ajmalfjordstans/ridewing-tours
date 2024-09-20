'use client'
import Hero from "@/components/home/hero";

// import Attractions from "@/components/home/attractions";
// import Blog from "@/components/home/blog";
// import Destinations from "@/components/home/destinations";
// import TopChoices from "@/components/home/top-choices";
// import Transfer from "@/components/home/transfer";

// Lazy load the components
const TopChoices = React.lazy(() => import('@/components/home/top-choices'));
const Attractions = React.lazy(() => import('@/components/home/attractions'));
const Transfer = React.lazy(() => import('@/components/home/transfer'));
const Destinations = React.lazy(() => import('@/components/home/destinations'));
const Blog = React.lazy(() => import('@/components/home/blog'));

import Image from "next/image";
import Loading from "./loading";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [landing, setLanding] = useState({
    background: "",
    heading: "",
    tagline: ""
  })
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [loadingPage, setLoadingPage] = useState(false)
  const [loadComponents, setLoadComponents] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoadComponents(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px 50px 0px' }
    );

    const target = document.querySelector('#loadTrigger');
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, [])

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
  }

  useEffect(() => {
    handleFirebaseRead()
  }, [currentCountry])

  if (loadingPage) return <Loading />
  else
    return (
      <div className="pb-[150px]">
        <Hero data={landing} />
        {/* Placeholder for scroll trigger */}
        <div id="loadTrigger" style={{ height: '1px' }}></div>

        {loadComponents && (
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <TopChoices />
            <Attractions />
            <Transfer />
            <Destinations />
            <Blog />
          </Suspense>
        )}
      </div>
    );
}
