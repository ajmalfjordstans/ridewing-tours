import Banner from '@/components/admin/edit-page/banner';
import Blogs from '@/components/admin/edit-page/blogs';
import Place from '@/components/admin/edit-page/place';
import Destinations from '@/components/admin/edit-page/destinations';
import Attractions from '@/components/admin/edit-page/attractions';

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
      <div>{pages[currentPage]}</div>
    </div>
  )
}
