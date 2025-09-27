// wishlistACTIONS/addToWishlist.ts
"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function AddToWishlistAction(id: string) {
  const {token} = await getMyToken();
  if (!token) throw Error("login first");

  const values = { productId: id };

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    values,
    { headers: { token } }
  );

  return data;
}
