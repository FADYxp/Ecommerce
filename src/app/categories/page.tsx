import GetAllCategories from '@/apis/GetAllCategories'
import { Category } from '@/types/product.type';
import Image from 'next/image';
import React from 'react'


async function Categories() {
  const { data } = await GetAllCategories();

  return (
    <div className="w-[95%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
      {data.map((category: Category) => (
        <div 
          key={category._id} 
          className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col items-center  hover:shadow-green-600 transition hover:scale-[1.06]"
        >
          <div className="w-full aspect-square relative">
            <Image 
              src={category.image} 
              alt={category.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full text-center py-3 font-medium text-lg bg-green-700 text-white">
            {category.name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Categories
