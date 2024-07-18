import Banner from '@/components/admin/edit-page/banner';
import Blogs from '@/components/admin/edit-page/blogs';
import Place from '@/components/admin/edit-page/place';
import Attractions from '@/components/home/attractions';
import Destinations from '@/components/home/destinations';
import React from 'react'

export default function Home({ currentPage }) {

  const pages = {
    attractions: <Attractions />,
    banner: <Banner />,
    blogs: <Blogs />,
    destinations: <Destinations />,
    place: <Place />
  };
  return (
    <div>
      <p>{pages[currentPage]}</p>
    </div>
  )
}
