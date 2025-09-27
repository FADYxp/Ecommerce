// wishlistACTIONS/getUserWishlist.ts
"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function getUserWishlistAction() {
  const token = await getMyToken();
  if (!token) throw Error("login first");

  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { headers: { token } }
  );

    console.log(data);

  return data;
}
