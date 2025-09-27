"use client";
import React from "react";
import sliderImgs0 from "./../../../../public/screens/slider/slider-image-1.jpeg";
import sliderImgs1 from "./../../../../public/screens/slider/slider-image-2.jpeg";
import sliderImgs2 from "./../../../../public/screens/slider/slider-image-3.jpeg";
import sliderPanner1 from "./../../../../public/screens/slider/grocery-banner.png";
import sliderPanner2 from "./../../../../public/screens/slider/grocery-banner-2.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination} from 'swiper/modules';
import "swiper/css/pagination";

import "swiper/css";

function MainSlider() {
  return (
    <div className="mb-10 flex ">
      {/* السلايدر */}
      <div className="w-2/3">
        <Swiper autoplay={{ delay: 2500 }} loop={true} spaceBetween={0} slidesPerView={1}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}>
          <SwiperSlide>
            <Image
              src={sliderImgs0}
              alt="Slider Image 1"
              className="h-[400px] w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={sliderImgs1}
              alt="Slider Image 2"
              className="h-[400px] w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={sliderImgs2}
              alt="Slider Image 3"
              className="h-[400px] w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* البانرات */}
      <div className="w-1/3 flex flex-col ">
        <Image
          src={sliderPanner1}
          alt="Slider Banner 1"
          className="!h-[200px] w-full object-cover"
        />
        <Image
          src={sliderPanner2}
          alt="Slider Banner 2"
          className="!h-[200px] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default MainSlider;
