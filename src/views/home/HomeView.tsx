import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Banner Data
const banners = [
  {
    image: "/assets/banner/cityBanner1.jpg",
    alt: "Banner 1",
    title: "Build Your Dream Home with Quality Materials",
  },
  {
    image: "/assets/banner/cityBanner2.jpg",
    alt: "Banner 2",
    title: "Top-Quality Construction Materials at Best Prices",
  },
  // Add more banners as needed
];

// Category Data
const categories = [
  {
    image: "/assets/categories/bricks.jpg",
    alt: "Category 1",
    label: "Bricks",
  },
  {
    image: "/assets/categories/cement.jpg",
    alt: "Category 2",
    label: "Cement",
  },
  {
    image: "/assets/categories/ceramics.jpg",
    alt: "Category 3",
    label: "Ceramic",
  },
  { image: "/assets/categories/tools.jpg", alt: "Category 4", label: "Tools" },
  // Add more categories as needed
];

// Featured Offers Data
const offers = [
  {
    image: "/assets/offers/bricks.jpg",
    alt: "Offer 1",
    title: "50% Off on Cement Bags",
    description:
      "High-quality cement at a discounted price. Limited time offer!",
  },
  {
    image: "/assets/offers/delivery.png",
    alt: "Offer 2",
    title: "Free Delivery on Orders Over $100",
    description:
      "Get free delivery for bulk purchases. Shop now and save more.",
  },
  {
    image: "/assets/offers/tools.webp",
    alt: "Offer 3",
    title: "Buy 2 Get 1 Free on Tools",
    description:
      "Purchase tools in bulk and get amazing deals. Limited time only.",
  },
  // Add more offers as needed
];

export default function HomeView() {
  return (
    <div className="w-full bg-background mt-10">
      {/* Banner Swiper */}
      <section className="mb-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-screen lg:max-w-screen-xl mx-auto"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-80 bg-gray-300">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  className=" object-cover w-full"
                  width={800}
                  height={320}
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40">
                  <h2 className="text-4xl text-white font-bold">
                    {banner.title}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Product Categories */}
      <section className="mb-12 px-4">
        <h3 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          Shop by Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full h-40 bg-gray-200 mb-4">
                <Image
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-full object-cover"
                  width={160}
                  height={160}
                />
              </div>
              <h4 className="text-lg text-gray-800">{category.label}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Offers */}
      <section className="mb-12 px-4">
        <h3 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          Featured Offers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <div className="w-full h-48 bg-gray-200 mb-4">
                <Image
                  src={offer.image}
                  alt={offer.alt}
                  className="w-full h-full object-cover"
                  width={320}
                  height={128}
                />
              </div>
              <h4 className="text-xl text-gray-800 mb-2">{offer.title}</h4>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
