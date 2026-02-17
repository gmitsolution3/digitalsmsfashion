"use client";

import { ProductFormData } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardButtons } from "./cardButtons";
import ProductSingleCard from "./../../../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";

interface GroupedProducts {
  [categoryName: string]: ProductFormData[];
}

const ProductCard = ({
  products,
}: {
  products: ProductFormData[];
}) => {
  const groupedProducts: GroupedProducts = products.reduce(
    (acc, pro) => {
      const catName = pro.category;
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(pro);
      return acc;
    },
    {} as GroupedProducts,
  );

  return (
    <div className="w-full space-y-16 py-8 px-3">
      {Object.entries(groupedProducts).map(
        ([categoryName, categoryProducts], i) => (
          <CategoryCarousel
            key={i}
            categoryName={categoryName}
            products={categoryProducts}
          />
        ),
      )}
    </div>
  );
};

// Carousel for each category
const CategoryCarousel = ({
  categoryName,
  products,
}: {
  categoryName: string;
  products: ProductFormData[];
}) => {
  if (products.length === 0) return null;

  const router = useRouter();

  const minSlidesForLoop = 5; // You can adjust this number
  const shouldLoop = products.length >= minSlidesForLoop;

  return (
    <section className="w-full">
      <div className="bg-gradient-to-tr from-primary via-primary/80 to-primary/70 rounded-md p-3 mb-8 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl md:text-2xl font-bold text-white text-center md:text-left font-semibold uppercase">
          {categoryName} sharee
        </h2>

        <button
          onClick={() =>
            router.push(`/shop/${products[0].categoryId}`)
          }
          className="w-full md:w-auto bg-white text-primary p-2 rounded font-medium shadow mt-5 lg:mt-0"
        >
          View More
        </button>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={shouldLoop}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          navigation={{
            nextEl: "#custom-show-product-next",
            prevEl: "#custom-show-product-prev",
            disabledClass: "opacity-30 cursor-not-allowed", // Optional: add disabled state
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="pb-8 pt-2">
                <ProductSingleCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows - Desktop/Tablet */}
        <button
          id="custom-show-product-prev"
          className="custom-show-product-prev absolute left-0 lg:-left-10 top-1/2 z-10 -translate-y-1/2 -translate-x-4 transform rounded-full bg-white hover:bg-gray-50 p-3 shadow-lg transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          id="custom-show-product-next"
          className="custom-show-product-next absolute right-0 lg:-right-10 top-1/2 z-10 -translate-y-1/2 translate-x-4 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
          aria-label="Next slide"
        >
          <svg
            className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/* <div className="w-full flex justify-center">
        <div className="max-w-50 border border-primary text-primary text-center mt-2 rounded-lg text-lg cursor-pointer hover:bg-primary font-bold hover:text-white transition py-4 px-4 ">
          See All Products
        </div>
      </div> */}
    </section>
  );
};

export default ProductCard;
