"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { getUserWishlistAction } from "@/wishListACTIONS/getUserWishList";
import { RemoveFromWishlistAction } from "@/wishListACTIONS/removeFromWishList";
import AddBtnCart from "../_components/addBtnCart/addBtnCart";

function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserWishlistAction();
        setWishlist(data.data); // API بيرجع array في data.data
      } catch (err) {
        toast.error("Error loading wishlist");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function removeItem(id: string) {
    try {
      const res = await RemoveFromWishlistAction(id);
      if (res.status === "success") {
        toast.success("Removed from wishlist");
        // ✨ شيل العنصر من ال state من غير ما تمسح الباقي
        setWishlist((prev) => prev.filter((pro) => pro.id !== id));
      }
    } catch (err) {
      toast.error("Failed to remove item");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5">
      <h1 className="text-4xl mb-4">Wishlist</h1>
      <div className="allProducts">
        {wishlist.map((pro, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border p-4 rounded-lg shadow-sm mb-3"
          >
            <div className="flex items-center gap-4">
              <Image
                src={pro.imageCover}
                alt={pro.title}
                width={100}
                height={100}
                className="rounded-md"
              />
              <div>
                <h2 className="font-bold">{pro.title}</h2>
                <p>Price: {pro.price} EGP</p>
              </div>
            </div>
            <div className="">
              {" "}
              <Button className="hover:bg-red-950" onClick={() => removeItem(pro.id)}>Remove</Button>
              <div className="my-2">
                {" "}
                <AddBtnCart id={pro.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
