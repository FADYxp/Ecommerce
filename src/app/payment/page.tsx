"use client"
import { Input } from '@/components/ui/input'
import React, { useContext, useRef } from 'react'
import { Button } from '@/components/ui/button';
import { cartContext } from '@/context/cartContext';
import { cashPaymentAction } from '@/paymentActions/cashPayment';
import { visaPaymentAction } from '@/paymentActions/visaPayment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function Payment() {
  const { cartId, afterPayment } = useContext(cartContext);
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function cashPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };

    try {
      const data = await cashPaymentAction(cartId, values);
      console.log(data);
      toast.success(data.status);
      afterPayment();
      router.push('/allorders');
    } catch (error) {
      console.log(error);
      toast.error("Cash payment failed");
    }
  }

  async function visaPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };

    try {
      const data = await visaPaymentAction(cartId, values);
      console.log(data);
      toast.success(data.status);

      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.log(error);
      toast.error("Visa payment failed");
    }
  }

  return (
    <div className="w-full md:w-1/2 my-10 mx-auto px-5 md:px-0">
      <h1 className="mb-10 text-center text-3xl font-bold">Payment</h1>

      <div>
        <label htmlFor="details">Details</label>
        <Input ref={details} type="text" id="details" />

        <label htmlFor="phone">Phone</label>
        <Input ref={phone} type="tel" id="phone" />

        <label htmlFor="city">City</label>
        <Input ref={city} type="text" id="city" />

        <Button onClick={cashPayment}>Cash</Button>
        <Button onClick={visaPayment}>Visa/Credit</Button>
      </div>
    </div>
  );
}

export default Payment;
