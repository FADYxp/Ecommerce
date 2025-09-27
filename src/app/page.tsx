import next from "next";
import React from "react";

import { getAllProducts } from "@/apis/allProducts";
import ProductCard from "./_components/ProductCard/ProductCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import { Product } from "@/types/product.type";
import { getMyToken } from "@/utilities/token";

async function Home() {
  const data: Product[] = await getAllProducts();
  


  return (
    <>
      <section className=" p-5 md:p-0 my-10 w-full md:w-[80%] mx-auto">
        <MainSlider />
        <CategorySlider />
        <div className="flex flex-wrap">
          {data.map(function (product: Product, idx: number) {
            return <ProductCard key={idx} product={product} />;
          })}
        </div>
      </section>
    </>
  );
}

export default Home;
