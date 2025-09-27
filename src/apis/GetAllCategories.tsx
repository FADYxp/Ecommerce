import React from 'react'

async function GetAllCategories() {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const data = await res.json()
  return data

}

export default GetAllCategories