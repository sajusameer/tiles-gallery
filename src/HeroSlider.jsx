"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";
import Link from "next/link";

const slides = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="h-[80vh]"
    >
      {slides.map((img, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* 🔥 Dark overlay */}
            <div className="bg-black/70 w-full h-full flex flex-col items-center justify-center text-center px-4">

              <h1 className="text-4xl md:text-6xl font-bold text-[#d4af37] drop-shadow-lg">
                Discover Your Perfect Aesthetic
              </h1>

              <p className="mt-4 text-gray-300 max-w-xl">
                Premium tiles crafted for luxury interiors
              </p>

              <Link href="/all-tiles">
                <button className="mt-6 border border-[#d4af37] px-6 py-2 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition">
                  Browse Now
                </button>
              </Link>

            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}