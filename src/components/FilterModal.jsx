import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, SlidersHorizontal, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const availableAmenities = [
  "WiFi",
  "Pool",
  "Kitchen",
  "AC",
  "Dedicated workspace",
  "Free parking",
  "Gym",
  "Beach access",
  "Hot tub",
  "Fireplace"
];

const FilterModal = () => {
  const {
    filters,
    updateFilters,
    clearAllFilters,
    isFilterModalOpen,
    setIsFilterModalOpen,
    listings
  } = useApp();

  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);
  const [localTypeOfPlace, setLocalTypeOfPlace] = useState(filters.typeOfPlace);
  const [localAmenities, setLocalAmenities] = useState(filters.amenities);

  if (!isFilterModalOpen) return null;

  const handleAmenityToggle = (amenity) => {
    setLocalAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleApply = () => {
    updateFilters({
      priceRange: localPriceRange,
      typeOfPlace: localTypeOfPlace,
      amenities: localAmenities
    });
    setIsFilterModalOpen(false);
  };

  const handleReset = () => {
    setLocalPriceRange([0, 1500]);
    setLocalTypeOfPlace("Any");
    setLocalAmenities([]);
    clearAllFilters();
  };

  // Calculate matching count on the fly
  const matchCount = listings.filter((listing) => {
    // Category
    if (filters.category !== "All" && listing.category !== filters.category) {
      return false;
    }
    // Location
    if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    // Price
    if (listing.price < localPriceRange[0] || listing.price > localPriceRange[1]) {
      return false;
    }
    // Type of Place
    if (localTypeOfPlace !== "Any") {
      const typeLower = listing.type.toLowerCase();
      const filterLower = localTypeOfPlace.toLowerCase();
      if (filterLower === "entire home" && !typeLower.includes("entire") && !typeLower.includes("villa") && !typeLower.includes("cabin") && !typeLower.includes("lodge")) {
        return false;
      }
      if (filterLower === "private room" && !typeLower.includes("room") && !typeLower.includes("suite")) {
        return false;
      }
    }
    // Amenities
    if (localAmenities.length > 0) {
      const hasAll = localAmenities.every((a) => listing.amenities.includes(a));
      if (!hasAll) return false;
    }
    return true;
  }).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs overflow-y-auto">
      
      {/* Modal Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[85vh] flex flex-col dark:bg-neutral-900 dark:border dark:border-neutral-850"
      >
        
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-150 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-extrabold text-base">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span>Filters</span>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="rounded-full border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all duration-150 active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 flex-grow flex flex-col gap-6 no-scrollbar">
          
          {/* Section: Type of Place */}
          <div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-sm mb-3">Type of place</h3>
            <div className="flex gap-2">
              {["Any", "Entire Home", "Private Room"].map((type) => (
                <button
                  key={type}
                  onClick={() => setLocalTypeOfPlace(type)}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl border text-center transition-all duration-150 active:scale-97 ${
                    localTypeOfPlace === type
                      ? "bg-black border-black text-white dark:bg-white dark:border-white dark:text-black"
                      : "bg-white border-gray-200 text-gray-750 hover:border-gray-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Price Range */}
          <div className="border-t border-gray-100 dark:border-neutral-800 pt-6">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-sm mb-3">Price range (per night)</h3>
            
            {/* Price Range inputs side by side */}
            <div className="flex items-center gap-4">
              
              {/* Min Price */}
              <div className="flex-1 rounded-xl border border-gray-300 p-3 dark:border-neutral-700">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                  Minimum Price
                </span>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-500 dark:text-neutral-450 mr-1">$</span>
                  <input
                    type="number"
                    min="0"
                    max="1500"
                    value={localPriceRange[0]}
                    onChange={(e) => setLocalPriceRange([parseInt(e.target.value) || 0, localPriceRange[1]])}
                    className="bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-150 w-full focus:outline-none"
                  />
                </div>
              </div>

              <span className="text-gray-400 font-bold">—</span>

              {/* Max Price */}
              <div className="flex-1 rounded-xl border border-gray-300 p-3 dark:border-neutral-700">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                  Maximum Price
                </span>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-500 dark:text-neutral-450 mr-1">$</span>
                  <input
                    type="number"
                    min="0"
                    max="1500"
                    value={localPriceRange[1]}
                    onChange={(e) => setLocalPriceRange([localPriceRange[0], parseInt(e.target.value) || 1500])}
                    className="bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-150 w-full focus:outline-none"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section: Amenities */}
          <div className="border-t border-gray-100 dark:border-neutral-800 pt-6">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-sm mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {availableAmenities.map((amenity) => {
                const checked = localAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3.5 text-left text-xs font-bold transition-all duration-150 active:scale-97 ${
                      checked
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-900 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-350 dark:hover:bg-neutral-700"
                    }`}
                  >
                    <div
                      className={`h-4.5 w-4.5 rounded flex items-center justify-center border transition-colors duration-150 ${
                        checked
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 bg-white dark:border-neutral-600 dark:bg-neutral-900"
                      }`}
                    >
                      {checked && (
                        <svg className="h-3 w-3 fill-current text-white" viewBox="0 0 20 20">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-150 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md sticky bottom-0 z-10 gap-4">
          
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm font-bold text-gray-650 hover:underline dark:text-neutral-400 active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear all</span>
          </button>

          {/* Show Listings Submit Button */}
          <button
            onClick={handleApply}
            className="px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-black hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100 transition-all duration-150 active:scale-97 shadow-md"
          >
            Show {matchCount} property{matchCount !== 1 && "ies"}
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default FilterModal;
