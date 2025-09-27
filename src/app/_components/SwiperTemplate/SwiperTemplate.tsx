"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, FreeMode } from "swiper/modules";
import { Category } from "@/types/category.type";

function SwiperTemplate({ Categories }: { Categories: Category[] }) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={6}
        modules={[Autoplay, FreeMode]}
        loop={true}
        freeMode={{ enabled: true, momentum: true }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
      >
        {Categories.map((category, idx: number) => (
          <SwiperSlide key={idx}>
            <Image
              className="object-cover w-70 h-70"
              src={category.image}
              alt={category.name}
              width={200}
              height={200}
            />
            <h2 className="text-center text-xl font-semibold text-green-800/60">
              {category.name}
            </h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperTemplate;
