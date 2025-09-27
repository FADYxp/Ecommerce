import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddBtnCart from "./../addBtnCart/addBtnCart";
import AddWishBtn from "../addWishBTN/addWishBtn";

function ProductCard({ product, key }: { product: Product; key: number }) {
  return (
    <div key={key} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
      <Card className="p-0 overflow-hidden hover:shadow-lg transition rounded-xl">
        <Link href={`/productDetails/${product.id}`}>
          <CardHeader className="p-0 relative">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={300}
              height={350}
              className="object-cover w-full h-[250px]"
            />
          </CardHeader>

          <CardContent className="px-3 py-2">
            <p className="text-sm font-semibold text-green-600">
              {product.category.name}
            </p>
            <p className="text-sm line-clamp-1">{product.title}</p>
          </CardContent>

          <CardFooter className="px-3 py-2 flex items-center justify-between">
            <p className="text-green-700 font-bold text-sm">
              {product.price} EGP
            </p>
            <p className="text-xs text-black flex items-center gap-1">
              {product.ratingsAverage}
              <i className="fa-solid fa-star text-orange-300 text-xs"></i>
            </p>
          </CardFooter>
        </Link>

        <div className="flex flex-col   px-3 pb-3 mt-1">
          <AddWishBtn product={product} />
          <AddBtnCart id={product.id} />
        </div>
      </Card>
    </div>
  );
}

export default ProductCard;
