import GetAllBrands from "@/apis/allBrands";
import Image from "next/image";
import React from "react";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

async function Brands() {
  const { data = [] } = await GetAllBrands();

  return (
    <div className="w-[95%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
      {data?.map((brand: Brand) => (
        <div
          key={brand._id}
          className="bg-white hover:shadow-[0_0_10px_rgba(22,163,74,0.5)] rounded-2xl border-1  overflow-hidden flex flex-col items-center justify-center aspect-square transition"
        >
          <div className="w-45 h-45 relative">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center font-medium text-lg">
            {brand.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Brands;
