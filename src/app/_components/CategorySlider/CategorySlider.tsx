import GetAllCategories from '@/apis/GetAllCategories'
import React from 'react'
import SwiperTemplate from '../SwiperTemplate/SwiperTemplate'
import { Category } from '@/types/category.type'

async function CategorySlider() {
    const {data} : {data : Category[]} = await GetAllCategories()
  return (
    <>
    <SwiperTemplate Categories={data} />
    </>
  )
}

export default CategorySlider