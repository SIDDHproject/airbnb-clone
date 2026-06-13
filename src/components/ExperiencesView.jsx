import React, { useRef } from "react";
import { useApp } from "../context/AppContext";
import { mockExperiences } from "../data/mockData";
import { ChevronLeft, ChevronRight, Upload, Ticket } from "lucide-react";

const ExperiencesView = () => {
  const { formatPrice } = useApp();
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleShare = (e, name) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this Airbnb Original: ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback
      navigator.clipboard.writeText(`${window.location.href}?experience=${encodeURIComponent(name)}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header section with titles and controls */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col text-left gap-0.5">
          <div className="flex items-center gap-2 group cursor-pointer">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Airbnb Originals
            </h2>
            <ChevronRight className="h-5 w-5 stroke-[3] text-gray-900 dark:text-white transition-transform group-hover:translate-x-1" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 font-medium">
            Hosted by the world's most interesting people
          </p>
        </div>
        
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
        className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-none pb-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {mockExperiences.map((experience) => {
          return (
            <div 
              key={experience.id}
              className="flex flex-col gap-3 w-[260px] sm:w-[280px] flex-shrink-0 snap-start group cursor-pointer"
            >
              {/* Image Wrapper */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-xs">
                <img 
                  src={experience.image} 
                  alt={experience.name} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gold Ticket Original Badge (Top Left) */}
                <div className="absolute top-3 left-3 bg-white/95 dark:bg-neutral-900/95 text-gray-900 dark:text-white font-extrabold text-[9px] px-2.5 py-1 flex items-center gap-1.5 shadow-sm rounded-md select-none">
                  {/* Small gold ticket SVG */}
                  <svg className="h-3 w-3 fill-amber-500 text-amber-500" viewBox="0 0 24 24">
                    <path d="M4 6H20C21.1 6 22 6.9 22 8V10C20.9 10 20 10.9 20 12C20 13.1 20.9 14 22 14V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V14C3.1 14 4 13.1 4 12C4 10.9 3.1 10 2 10V8C2 6.9 2.9 6 4 6Z" />
                  </svg>
                  <span className="tracking-wider uppercase">Original</span>
                </div>

                {/* Share Button (Top Right) */}
                <button
                  onClick={(e) => handleShare(e, experience.name)}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-900/90 shadow-sm hover:scale-110 active:scale-90 transition-all cursor-pointer text-gray-700 dark:text-neutral-300"
                >
                  <Upload className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Card Details */}
              <div className="flex flex-col text-left gap-0.5">
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                  {experience.name}
                </h3>
                <span className="text-[11px] sm:text-xs text-gray-500 dark:text-neutral-400 font-medium">
                  {experience.location}
                </span>
                <div className="text-[11px] sm:text-xs text-gray-500 dark:text-neutral-400 font-bold mt-0.5">
                  <span className="text-gray-900 dark:text-white font-extrabold">From {formatPrice(experience.price)}</span> / {experience.priceType}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperiencesView;
