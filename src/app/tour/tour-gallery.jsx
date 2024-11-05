import Image from "next/image";
import React, { useEffect, useState } from "react";

export function TourImageGallery({ data }) {
  const [active, setActive] = useState(data[0]);
  const [loading, setLoading] = useState(true); // Track loading state

  // useEffect(() => {
  //   console.log(data);
  // }, [])

  // Handle image load event
  const handleImageLoad = (index) => {
    setLoading(false);
  };

  return (
    <div className="grid gap-4 md:mt-4">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-5 mt-[30px] max-h-[81vh]">
        {/* Main Active Image */}
        <div className="col-span-3 row-span-3 h-[30vh] md:h-full w-full max-h-[81vh]">
          {/* Display skeleton or image */}
          {loading && (
            <div className="bg-gray-200 h-full w-full animate-pulse"></div>
          )}
          <Image
            src={active}
            height={700}
            width={800}
            alt="image"
            className={`object-cover ${loading ? "hidden" : ""} w-full h-full`}
            onLoadingComplete={handleImageLoad}
            // unoptimized
          />
        </div>

        {/* Thumbnail Images */}
        <div className="col-span-3 md:col-span-1 md:row-span-3 flex md:flex-col gap-2 md:gap-5 md:overflow-y-scroll overflow-x-scroll">
          {data.map((imgelink, index) => (
            <div key={index} className="relative">
              <Image
                onClick={() => {
                  setActive(imgelink);
                  console.log(imgelink);
                  if (active !== imgelink)
                    setLoading(true); // Set loading state when changing the image
                }}
                src={imgelink}
                // unoptimized
                quality={40}
                height={400}
                width={400}
                alt="image"
                className="md:h-full md:w-full object-cover h-[10vh] w-[15vh] md:max-h-[25vh] hover:cursor-pointer"
                onLoadingComplete={() => setLoading(false)} // Reset the loading state
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
