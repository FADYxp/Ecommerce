import React from 'react'
import Err from "./../../public/screens/404.jpg"
import Image from 'next/image'
function ErrorPage() {
  return (
    <div className='w-full  items-end mx-auto '>
        <Image src={Err} alt="Error Image" width={2000} height={3000} />
        <i className=' mt-3 text-2xl font-bold text-black !text-center'>Page Not Found</i>

    </div>
    
  )
}

export default ErrorPage