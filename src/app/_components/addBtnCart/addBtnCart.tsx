"use client"

import { Button } from '@/components/ui/button'
import { cartContext } from '@/context/cartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

function AddBtnCart({id} : {id : string}) {

  const {addProductToCart } = useContext(cartContext)
async function handleAddToCart() {
    
    const data =await addProductToCart(id)
    console.log(data);

    if(data.status === "success"){
        toast.success("Added to cart✅" , {duration : 2000 , position: "top-center" })
    }else{

        toast.error("failed!" , {duration : 2000 , position: "top-center" })

    }
    
}

  return (
    <>
    <Button className="w-full bg-green-600 hover:-translate-y-1 hover:bg-green-500 transition-all duration-500 hover:text-black/60"
        variant="default" onClick={handleAddToCart}>

Add to cart
    </Button>
    </>
  )
}

export default AddBtnCart