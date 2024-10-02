import Categories from '@/components/categories/categories'
import CommonHero from '@/components/common-hero'
import React from 'react'

export default function Page() {
  return (
    <div className=''>
      <CommonHero title={"Categories"} bg={'/images/background/categories.jpg'}/>
      <Categories />
    </div>
  )
}
