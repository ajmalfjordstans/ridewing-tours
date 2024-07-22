import Banner from '@/components/admin/edit-page/banner';
import Blogs from '@/components/admin/edit-page/blogs';
import Place from '@/components/admin/edit-page/place';
import Destinations from '@/components/admin/edit-page/destinations';
import Attractions from '@/components/admin/edit-page/attractions';
import Airports from '@/components/admin/edit-page/airports';
import Stations from '@/components/admin/edit-page/stations';
import Guides from '@/components/admin/edit-page/guides';

export default function Home({ currentPage }) {

  const pages = {
    attractions: <Attractions />,
    banner: <Banner />,
    blogs: <Blogs />,
    destinations: <Destinations />,
    place: <Place />,
    airports: <Airports />,
    stations: <Stations />,
    guides: <Guides />,
  };
  return (
    <div>
      <div>{pages[currentPage]}</div>
    </div>
  )
}
