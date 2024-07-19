'use client'
import React, { useEffect, useState } from 'react'
import AttractionsCard from '../cards/attractions-card'
import { Button } from '@material-tailwind/react'

const AttractionsData = [
  // Switzerland
  {
    title: 'Jungfraujoch',
    country: 'Switzerland',
    image: '/images/temp/carousel/jungfrau.jpg',
    description: 'Known as the "Top of Europe," Jungfraujoch offers stunning views of the Aletsch Glacier and surrounding peaks with year-round snow activities.'
  },
  {
    title: 'Mount Titlis Cable Car',
    country: 'Switzerland',
    image: '/images/temp/carousel/mount.jpg',
    description: 'The Mount Titlis Cable Car takes visitors on a scenic ride to the summit, offering panoramic views and featuring the world’s first revolving cable car.'
  },
  {
    title: 'Shinkansen Bullet Train',
    country: 'Japan',
    image: '/images/temp/carousel/shinkansen.jpeg',
    description: 'Japan’s high-speed bullet train offers a fast and efficient way to travel between major cities, providing comfort and scenic views along the route.'
  },
  {
    title: 'Swiss Travel Pass',
    country: 'Switzerland',
    image: '/images/temp/carousel/swiss_travel.jpeg',
    description: 'This all-in-one ticket provides unlimited travel on Switzerland’s public transportation network and offers free or discounted admission to many attractions.'
  },
  // United Kingdom
  {
    title: 'Hop On Hop Off Bus',
    country: 'United Kingdom, Switzerland, Japan, South Korea',
    image: 'https://images.unsplash.com/photo-1556704498-49037b3a4403?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This service allows visitors to hop on and off at various stops throughout the city, providing flexibility to explore London, Zurich/Geneva, Tokyo, and Seoul at their own pace.'
  },
  {
    title: 'London Eye',
    country: 'United Kingdom',
    image: '/images/temp/carousel/london_eye.jpeg',
    description: 'This iconic Ferris wheel on the South Bank of the River Thames offers breathtaking views of the city’s skyline.'
  },
  {
    title: 'Tower Bridge',
    country: 'United Kingdom',
    image: '/images/temp/carousel/tower_bridge.jpeg',
    description: 'A symbol of London, this combined bascule and suspension bridge spans the River Thames and features the Tower Bridge Exhibition.'
  },
  // Japan
  {
    title: 'Mount Fuji',
    country: 'Japan',
    image: '/images/temp/carousel/fuji.jpeg',
    description: 'Japan’s highest peak and a UNESCO World Heritage site, Mount Fuji is popular for climbing and offers stunning views.'
  },
  {
    title: 'Tea Ceremony',
    country: 'Japan',
    image: '/images/temp/carousel/tea_ceremony.jpeg',
    description: 'A traditional Japanese tea ceremony, or "chanoyu," is a cultural experience that emphasizes harmony, respect, purity, and tranquility.'
  },
  {
    title: 'Hakone Ropeway',
    country: 'Japan',
    image: '/images/temp/carousel/hakone.jpeg',
    description: 'This aerial lift in Hakone provides scenic views of Mount Fuji and the volcanic Owakudani Valley, part of the Hakone Round Course.'
  },
  {
    title: 'Lake Ashi Pirate Cruise',
    country: 'Japan',
    image: '/images/temp/carousel/pirate_cruise.jpeg',
    description: 'Enjoy a scenic cruise on Lake Ashi aboard a pirate-themed ship, offering beautiful views of Mount Fuji and the surrounding nature.'
  },
  {
    title: 'TeamLab Borderless',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1669794911682-4fded20a9cab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'An immersive digital art museum in Tokyo, where art installations change based on viewer interaction, creating a unique experience every visit.'
  },
  {
    title: 'Tokyo Sky Tree',
    country: 'Japan',
    image: '/images/temp/carousel/sky_tree.jpg',
    description: 'A broadcasting and observation tower in Tokyo, offering panoramic views of the city from its observation decks.'
  },
  // South Korea
  {
    title: 'Nami Island',
    country: 'South Korea',
    image: '/images/temp/carousel/nami_island.jpeg',
    description: 'A picturesque half-moon-shaped island known for its beautiful tree-lined roads, cultural events, and stunning autumn foliage.'
  },
  {
    title: 'Petite France',
    country: 'South Korea',
    image: '/images/temp/carousel/petite_france.jpeg',
    description: 'A French-themed village in Gapyeong, featuring colorful buildings, museums, galleries, and performances with European charm.'
  },
  {
    title: 'DMZ (Demilitarized Zone)',
    country: 'South Korea',
    image: '/images/temp/carousel/dmz.jpeg',
    description: 'A buffer zone between North and South Korea, offering guided tours to learn about the Korean conflict and see the Joint Security Area.'
  },
  {
    title: 'Seoul Tower',
    country: 'South Korea',
    image: 'https://images.unsplash.com/photo-1541694764078-df09dec4f9c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Also known as Namsan Seoul Tower, this iconic structure provides panoramic views of Seoul from observation decks, restaurants, and cafes.'
  }
];

export default function Attractions() {
  const [showMore, setShowMore] = useState(false)
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/json/japan.json');
      const result = await response.json();
      setData(result.attractions);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className='py-[50px] container mx-auto px-[5%] lg:px-0'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px]'>Discover Popular Attractions</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
        {data?.slice(0, showMore ? data.length : 4).map((data, id) => {
          return (
            <AttractionsCard key={id} data={data} />
          )
        })}
      </div>
      <div className='w-full flex justify-center'>
        <Button
          onClick={() => setShowMore(!showMore)}
          className='h-[48px] w-[180px] border-[red] border-[2px] rounded-[10px] bg-transparent text-[red] mt-[40px]'
        >SEE {showMore ? "LESS" : "MORE"}</Button>
      </div>
    </section>
  )
}