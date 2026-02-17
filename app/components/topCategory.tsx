"use client";

import * as LucideIcons from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SubCategory {
  name: string;
  slug: string;
  isActive: boolean;
  id: string;
}

interface Category {
  isActive: boolean;
  name: string;
  order: number;
  slug: string;
  image?: string;
  subCategories: SubCategory[];
  _id: string;
}

// Get a list of some Lucide icons
const iconList = [
  LucideIcons.Box,
  LucideIcons.Cpu,
  LucideIcons.Heart,
  LucideIcons.Watch,
  //   LucideIcons.Shoe,
  LucideIcons.Thermometer,
  LucideIcons.ShoppingBag,
  LucideIcons.Gift,
];

interface TopCategoriesProps {
  categories: Category[];
}

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      {!categories || categories.length === 0 ? (
        <div className="text-2xl text-center text-primary">
          No Category found
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-xl lg:text-4xl font-bold pl-4 text-center uppercase font-semibold mb-5 block lg:hidden">
              Top Categories
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <Slider {...settings} className="w-full space-x-5">
              {categories
                .sort((a, b) => a.order - b.order)
                .map((cat, index) => {
                  // Pick a random icon for each category (based on index to keep consistent)
                  const IconComponent =
                    iconList[index % iconList.length];

                  return (
                    <Link
                      href={`/shop/${cat._id}`}
                      key={cat._id}
                      className={`h-full inline-block space-x-5`}
                    >
                      <div
                        key={cat._id}
                        className={
                          "flex flex-col items-center justify-center gap-2 bg-white rounded-0 shadow hover:shadow-lg transition cursor-pointer text-center w-full h-full relative group overflow-hidden"
                        }
                      >
                        {/* Icon */}
                        {cat.image ? (
                          <div className="w-full">
                            <Image
                              src={cat?.image}
                              alt={cat.name}
                              priority
                              width={300}
                              height={300}
                              className="w-[600px] h-[300px] object-cover group-hover:scale-[110%] duration-300"
                            />
                          </div>
                        ) : (
                          <div className="bg-[#ebdfd4] rounded-full p-3 mb-2">
                            <IconComponent
                              size={28}
                              className="text-primary"
                            />
                          </div>
                        )}

                        {/* Name */}
                        <span className="text-sm font-medium text-white bg-primary shadow rounded-full p-2 uppercase absolute top-3 left-5">
                          {cat.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </Slider>
          </div>
        </div>
      )}
    </section>
  );
};
