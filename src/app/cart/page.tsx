"use client";

import { cartContext } from "@/context/cartContext";
import React, { useContext } from "react";
import Loading from "./../loading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartProduct } from "@/types/cart.type";
import { toast } from "sonner";
import Link from "next/link";

function Cart() {
  const {
    isLoading,
    totalPrice,
    products,
    removeCartItem,
    updateCart,
    clearCart,
  } = useContext(cartContext);

  async function removeItem(id: string) {
    await removeCartItem(id);
    toast.success("Item removed from cart.");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
      {/* Header */}
      <div className="p-5 bg-white shadow-md rounded-2xl mb-8 transition duration-300 hover:shadow-xl hover:scale-[1.01]">
        <h1 className="text-4xl font-bold mb-3">🛒 Cart</h1>
        <p className="my-2 font-mono text-green-600 text-lg">
          Total price: <span className="font-bold">{totalPrice} EGP</span>
        </p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            onClick={clearCart}
            className="transition duration-200 hover:scale-105"
          >
            Clear cart
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white transition duration-200 hover:scale-105"
          >
            <Link href={"/payment"}>Checkout</Link>
             
          </Button>
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-col gap-5">
        {products.map(function (pro: CartProduct, idx: number) {
          return (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-2xl p-4 border border-gray-200 
                         transition duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]"
            >
              {/* left: image + info */}
              <div className="flex items-center gap-5">
                {/* img */}
                <div className="w-28 h-28 relative rounded-xl overflow-hidden border border-gray-300">
                  <Image
                    src={pro.product.imageCover}
                    alt={pro.product.title}
                    fill
                    className="object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                {/* title */}
                <div>
                  <h1 className="font-semibold text-lg hover:text-green-600 transition">
                    {pro.product.title}
                  </h1>
                  <p className="text-gray-600">Price: {pro.price} EGP</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-red-600 hover:bg-red-100 transition duration-200 hover:scale-105"
                    onClick={() => removeItem(pro.product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              {/* right: counter */}
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <Button
                  variant="secondary"
                  size="sm"
                  className="hover:bg-green-100 transition duration-200 hover:scale-110"
                  onClick={() => updateCart(pro.product.id, pro.count + 1)}
                >
                  +
                </Button>
                <p className="text-2xl font-bold">{pro.count}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="hover:bg-red-100 transition duration-200 hover:scale-110"
                  onClick={() => updateCart(pro.product.id, pro.count - 1)}
                  disabled={pro.count <= 1}
                >
                  -
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
