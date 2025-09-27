"use client";

import React, { useContext } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { wishlistContext } from "@/context/wishListContext";

function AddWishBtn({ product }: { product: any }) {
  const {
    wishlist,
    addToWishlistLocal,
    removeFromWishlistLocal,
    addToWishlistAPI,
    removeFromWishlistAPI,
  } = useContext<any>(wishlistContext);

  const isInWishlist = wishlist?.some(
    (item: any) => item.id === product.id || item._id === product._id
  );

  async function toggleWishlist() {
    if (isInWishlist) {
      removeFromWishlistLocal(product.id);
      const data = await removeFromWishlistAPI(product.id);
      if (data?.status === "success") {
        toast.success("Removed from wishlist ❤️");
      } else {
        addToWishlistLocal(product);
        toast.error("Failed to remove");
      }
    } else {
      addToWishlistLocal(product);
      const data = await addToWishlistAPI(product.id);
      if (data?.status === "success") {
        toast.success("Added to wishlist ❤️");
      } else {
        removeFromWishlistLocal(product.id);
        toast.error("Failed to add");
      }
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      className="transition"
      aria-label="Add to wishlist"
    >
      <Heart
        size={29}
        className={`transition duration-200 ${
          isInWishlist
            ? "text-red-500 fill-red-500"
            : "text-gray-400 hover:text-red-400 hover:fill-red-100"
        }`}
      />
    </button>
  );
}

export default AddWishBtn;
