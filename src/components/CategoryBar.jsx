import React, { useRef, useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  LayoutGrid,
  Palmtree,
  Trees,
  Building,
  Waves,
  Mountain,
  Map,
  Anchor,
  Sparkles,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "All", icon: LayoutGrid },
  { name: "Beachfront", icon: Palmtree },
  { name: "Cabins", icon: Trees },
  { name: "Mansions", icon: Building },
  { name: "Amazing pools", icon: Waves },
  { name: "Views", icon: Mountain },
  { name: "Countryside", icon: Map },
  { name: "Lakefront", icon: Anchor },
  { name: "Icons", icon: Sparkles }
];

const CategoryBar = () => {
  const { filters, updateFilters, setIsFilterModalOpen } = useApp();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to toggle arrow visibility
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Run once initially
      checkScroll();
      
      // Re-run on resize
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="sticky top-[73px] z-30 w-full border-b border-gray-100 bg-white/95 py-3.5 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900/95 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4 relative">
        
        {/* Left Scroll Button */}
        {showLeftArrow && (
          <div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10 flex items-center pr-8 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-neutral-900 dark:via-neutral-900/90 dark:to-transparent">
            <button
              onClick={() => scroll("left")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:scale-105 active:scale-95 shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 transition-all duration-150"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Categories List Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-1 items-center gap-7 overflow-x-auto no-scrollbar scroll-smooth pr-10"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = filters.category === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => updateFilters({ category: cat.name })}
                className={`group flex flex-col items-center gap-1.5 pb-2 text-[11px] font-bold transition-all duration-150 relative focus:outline-none whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 hover:text-gray-800 hover:border-gray-300 dark:text-neutral-450 dark:hover:text-neutral-200"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-primary"
                      : "text-gray-550 dark:text-neutral-400 group-hover:text-gray-900 dark:group-hover:text-neutral-200"
                  }`}
                />
                <span>{cat.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryUnderline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-black dark:bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        {showRightArrow && (
          <div className="absolute right-24 sm:right-28 lg:right-32 top-1/2 -translate-y-1/2 z-10 flex items-center pl-8 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-neutral-900 dark:via-neutral-900/90 dark:to-transparent">
            <button
              onClick={() => scroll("right")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:scale-105 active:scale-95 shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 transition-all duration-150"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Filters Button wrapper */}
        <div className="flex-shrink-0 pl-4 border-l border-gray-150 dark:border-neutral-800">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-gray-250 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:border-gray-900 dark:border-neutral-750 dark:bg-neutral-850 dark:text-neutral-250 dark:hover:border-neutral-500 transition-all duration-150 active:scale-95 shadow-xs"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default CategoryBar;
