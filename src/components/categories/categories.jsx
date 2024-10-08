'use client'
import React, { useEffect, useState } from 'react'
import CategoriesCard from '../cards/categories-card'
import { readFirebaseCollection } from '@/app/firebase';
import { useSelector } from 'react-redux';
import Link from 'next/link';

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
  const [categories, setCategories] = useState()
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readFirebaseCollection(`countries/${selectedCountry}/categories`);
        setCategories(result);
        // console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCountry]); // Add dependencies if necessary
  return (
    <section className='container mx-auto px-[5%] lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-[20px] translate-y-[-100px] '>
      {Array.isArray(categories) ?
        categories.map((categories, id) => {
          return (
            <Link href={{ pathname: `/packages/${categories.title}`, query: { "country": selectedCountry } }} key={id}>
              <CategoriesCard data={categories} />
            </Link>
          )
        })
        :
        <p>Loading Categories</p>
      }
    </section>
  )
}
