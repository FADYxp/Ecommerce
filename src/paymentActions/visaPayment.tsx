"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function visaPaymentAction(id: string, values: object) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("LogIn First");
  }

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    values,
    { headers: { token } }
  );

  return data; // هنا بيرجع بس JSON اللي جاي من الـ API
}
