import React from 'react'
import CategoriesCard from '../cards/categories-card'

const CategoriesData = [
  {
    title: "Japan Explore",
    image: "/images/temp/categories/category1.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category2.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category3.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category4.jpg"
  },
  {
    title: "Japan Explore",
    image: "/images/temp/categories/category1.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category2.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category3.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category4.jpg"
  },
  {
    title: "Japan Explore",
    image: "/images/temp/categories/category1.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category2.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category3.jpg"
  },
  {
    title: "Water activities",
    image: "/images/temp/categories/category4.jpg"
  },
]

export default function Categories() {
  return (
    <section className='container mx-auto px-[5%] lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] translate-y-[-100px] '>
      {CategoriesData.map((categories, id) => {
        return (
          <CategoriesCard key={id} data={categories} />
        )
      })}
    </section>
  )
}
