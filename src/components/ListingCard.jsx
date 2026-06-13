import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ListingCard = ({ listing }) => {
  const { wishlist, toggleFavorite, openDetails, formatPrice, t } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heartAnimated, setHeartAnimated] = useState(false);

  const isFavorited = wishlist.includes(listing.id);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1));
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
    setHeartAnimated(true);
    setTimeout(() => setHeartAnimated(false), 800);
  };

  return (
    <div
      onClick={() => openDetails(listing)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col gap-2.5 cursor-pointer"
    >
      {/* Image Slider Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-800 shadow-sm group-hover:shadow-md transition-shadow duration-200">
        
        {/* Images */}
        <div className="flex h-full w-full">
          <img
            src={listing.images[currentImageIndex]}
            alt={listing.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
          />
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleHeartClick}
          className="absolute right-3.5 top-3.5 z-10 p-1.5 rounded-full hover:scale-110 active:scale-95 transition-all duration-150 text-white/90 drop-shadow-md"
        >
          <Heart
            className={`h-6 w-6 stroke-[1.8] ${
              isFavorited
                ? "fill-primary stroke-primary text-primary"
                : "fill-black/30 stroke-white text-white"
            } ${heartAnimated ? "animate-heartbeat" : ""}`}
          />
        </button>

        {/* Carousel Arrow Navigation Buttons (Show only on card hover on desktop) */}
        {listing.images.length > 1 && (
          <div
            className={`absolute inset-x-3 top-1/2 z-10 flex -translate-y-1/2 justify-between pointer-events-none transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Left Button */}
            <button
              onClick={handlePrevImage}
              className="flex h-7 w-7 pointer-events-auto items-center justify-center rounded-full border border-gray-250 bg-white/90 text-gray-700 hover:bg-white hover:scale-105 active:scale-95 shadow-md transition-all duration-150"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
            </button>

            {/* Right Button */}
            <button
              onClick={handleNextImage}
              className="flex h-7 w-7 pointer-events-auto items-center justify-center rounded-full border border-gray-250 bg-white/90 text-gray-700 hover:bg-white hover:scale-105 active:scale-95 shadow-md transition-all duration-150"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* Carousel Progress Indicators (Dots) */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3.5 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {listing.images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "bg-white w-3"
                    : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text Details Area */}
      <div className="flex flex-col text-sm">
        
        {/* Location & Star Rating */}
        <div className="flex items-center justify-between text-gray-900 dark:text-white">
          <span className="font-bold truncate max-w-[80%]">{listing.location}</span>
          <span className="flex items-center gap-1 font-medium">
            <Star className="h-3.5 w-3.5 fill-black dark:fill-white stroke-[2.5]" />
            {listing.rating.toFixed(2)}
          </span>
        </div>

        {/* Listing Title/Type */}
        <span className="text-gray-500 dark:text-neutral-400 truncate mt-0.5">
          {listing.name}
        </span>

        {/* Mock dates available */}
        <span className="text-gray-500 dark:text-neutral-400">
          Available soon
        </span>

        <div className="mt-1.5">
          <div className="flex items-baseline gap-1 text-gray-950 dark:text-neutral-100 font-extrabold">
            <span className="text-base">{formatPrice(listing.price)}</span>
            <span className="text-gray-500 dark:text-neutral-400 font-normal text-xs">{t("night")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
