

import React from 'react'

async function GetAllBrands() {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
  const data = await res.json()
  return data
}

export default GetAllBrands