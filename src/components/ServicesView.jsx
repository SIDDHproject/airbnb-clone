import React, { useRef } from "react";
import { useApp } from "../context/AppContext";
import { mockServices } from "../data/mockData";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";

const ServicesView = () => {
  const { filters, formatPrice, wishlist, toggleFavorite } = useApp();
  const carouselRef = useRef(null);

  // Get location name, default to "North Goa" if empty
  const locationName = filters.location ? filters.location : "North Goa";

  // Filter services based on searched location if any
  const filteredServices = mockServices.filter((service) => {
    if (filters.location) {
      return service.location.toLowerCase().includes(filters.location.toLowerCase()) ||
             filters.location.toLowerCase().includes(service.location.toLowerCase());
    }
    return true;
  });

  // If search location matches nothing, fall back to all services but show the title
  const displayServices = filteredServices.length > 0 ? filteredServices : mockServices;

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-10 py-4">
      {/* Services Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Services in {locationName}
          </h2>
          
          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-xs hover:bg-gray-50 active:scale-90 dark:border-neutral-750 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-xs hover:bg-gray-50 active:scale-90 dark:border-neutral-750 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div 
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {displayServices.map((service) => {
            const isLiked = wishlist.includes(service.id);
            return (
              <div 
                key={service.id}
                className="flex flex-col gap-2.5 w-[260px] sm:w-[280px] flex-shrink-0 snap-start group cursor-pointer"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-xs">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(service.id);
                    }}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 backdrop-blur-xs hover:bg-black/20 hover:scale-110 active:scale-90 transition-all cursor-pointer"
                  >
                    <Heart 
                      className={`h-4.5 w-4.5 stroke-white stroke-[2.5] transition-colors ${
                        isLiked ? "fill-primary stroke-primary" : "fill-transparent"
                      }`} 
                    />
                  </button>
                </div>

                {/* Card Details */}
                <div className="flex flex-col text-left">
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 dark:text-neutral-400 font-semibold mt-0.5">
                    <span>From {formatPrice(service.price)} / {service.priceType}</span>
                    {service.rating && (
                      <>
                        <span className="text-gray-300 dark:text-neutral-600 font-light">·</span>
                        <span className="flex items-center gap-0.5 text-gray-900 dark:text-neutral-255 font-extrabold">
                          <Star className="h-3 w-3 fill-current text-black dark:text-neutral-255 stroke-none" />
                          <span>{service.rating.toFixed(1)}</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesView;
