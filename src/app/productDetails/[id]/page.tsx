import { singleProductDetails } from "@/apis/singleProductDetails";
import AddBtnCart from "@/app/_components/addBtnCart/addBtnCart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

async function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(id);
  const { data } = await singleProductDetails(id);
  console.log(data);
  return (
    <>
      <div className=" flex items-center flex-col md:flex-row w-full px-5 md:w-[80%] md:p-0 md:mx-auto my-10">
        <div className="w-full md:w-1/3">
          <Image src={data.imageCover} className="w-full" alt={data.title} width={300} height={400} />
        </div>
        <div className="w-full md:w-2/3 m-0 md:mt-5 ">
          <h2 className="text-2xl text-green-600 font-bold">{data.title}</h2>
          <p className="my-5">{data.description}</p>
          <p className="text-bold"> {data.category.name}</p>

          <div className="w-full flex justify-between items-center py-4">
            <p className="text-green-600">{data.price} EGP</p>
            <p className="text-black ">
              {data.ratingsAverage}{" "}
              <i className="fa-solid fa-star text-orange-300"></i>
            </p>
          </div>
               <AddBtnCart id={data.id}/>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;
