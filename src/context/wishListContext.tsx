// context/WishlistContext.tsx
"use client";

import React, { createContext, useEffect, useState } from "react";
import { RemoveFromWishlistAction } from "@/wishListACTIONS/removeFromWishList";
import { getUserWishlistAction } from "@/wishListACTIONS/getUserWishList";
import { AddToWishlistAction } from "@/wishListACTIONS/addToWishList";

export const wishlistContext = createContext({});

function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🟢 Get Wishlist
  async function getWishlist() {
    setIsLoading(true);
    try {
      const data = await getUserWishlistAction();
      setWishlist(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // 🟢 Local updates only (UI سريع)
  function addToWishlistLocal(product: any) {
    setWishlist((prev) => [...prev, product]);
  }

  function removeFromWishlistLocal(id: string) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  // 🟢 API calls
  async function addToWishlistAPI(id: string) {
    try {
      const data = await AddToWishlistAction(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlistAPI(id: string) {
    try {
      const data = await RemoveFromWishlistAction(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        getWishlist,
        addToWishlistLocal,
        removeFromWishlistLocal,
        addToWishlistAPI,
        removeFromWishlistAPI,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export default WishlistContextProvider;
