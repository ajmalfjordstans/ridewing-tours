import Attractions from "@/components/home/attractions";
import Blog from "@/components/home/blog";
import Destinations from "@/components/home/destinations";
import Hero from "@/components/home/hero";
import TopChoices from "@/components/home/top-choices";
import Image from "next/image";
import Loading from "./loading";

export default function Home() {
  return (
    <>
      <Hero />
      <TopChoices />
      <Attractions />
      <Destinations />
      {/* <Blog /> */}
    </>
  );
}
