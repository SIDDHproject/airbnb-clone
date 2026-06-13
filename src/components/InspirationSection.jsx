import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabsData = {
  "Popular": [
    { name: "Dallas", desc: "Holiday rentals" },
    { name: "Cleveland", desc: "House rentals" },
    { name: "Galveston", desc: "Cabin rentals" },
    { name: "North Myrtle Beach", desc: "Villa rentals" },
    { name: "Portland", desc: "House rentals" },
    { name: "Nice", desc: "Cabin rentals" },
    { name: "Kauai", desc: "Flat rentals" },
    { name: "Portland", desc: "Villa rentals" },
    { name: "Minneapolis", desc: "Holiday rentals" },
    { name: "Amsterdam", desc: "Flat rentals" },
    { name: "Miramar Beach", desc: "Villa rentals" },
    { name: "West Palm Beach", desc: "Cottage rentals" },
    { name: "Tokyo", desc: "Apartment rentals" },
    { name: "Philadelphia", desc: "Monthly Rentals" },
    { name: "Orange Beach", desc: "Flat rentals" },
    { name: "Charlotte", desc: "House rentals" },
    { name: "Barcelona", desc: "Flat rentals" },
    { name: "San Francisco", desc: "Apartment rentals" },
    { name: "Las Vegas", desc: "Condo rentals" },
    { name: "Chicago", desc: "Loft rentals" },
    { name: "Miami", desc: "Apartment rentals" },
    { name: "Seattle", desc: "House rentals" },
    { name: "Austin", desc: "Cabin rentals" },
    { name: "Nashville", desc: "Condo rentals" }
  ],
  "Arts & culture": [
    { name: "Lake Wawasee", desc: "House rentals" },
    { name: "Paris", desc: "Holiday rentals" },
    { name: "Lake Como", desc: "House rentals" },
    { name: "Príncipe Real", desc: "Holiday rentals" },
    { name: "Gozo", desc: "Holiday rentals" },
    { name: "North Cascades National Park", desc: "Cabin rentals" },
    { name: "Amalfi Coast", desc: "Villa rentals" },
    { name: "Coronado Islands", desc: "Villa rentals" },
    { name: "Sand Key Beach", desc: "Apartment rentals" },
    { name: "Covent Garden", desc: "Flat rentals" },
    { name: "Assateague Island", desc: "Apartment rentals" },
    { name: "Lido Key", desc: "Villa rentals" },
    { name: "ESPN Wide World of Sports", desc: "Apartment rentals" },
    { name: "Everglades", desc: "Villa rentals" },
    { name: "Haeundae Beach", desc: "Apartment rentals" },
    { name: "Cuyahoga Valley National Park", desc: "Holiday rentals" },
    { name: "Samara Beach", desc: "House rentals" }
  ],
  "Beach": [
    { name: "Ibiza", desc: "Villa rentals" },
    { name: "Miami", desc: "Beach houses" },
    { name: "Honolulu", desc: "Condo rentals" },
    { name: "Phuket", desc: "Resort villas" },
    { name: "Maldives", desc: "Overwater bungalows" },
    { name: "Rio de Janeiro", desc: "Apartment rentals" },
    { name: "Cancun", desc: "Beachfront rentals" },
    { name: "Amalfi", desc: "Cliffside villas" },
    { name: "Mykonos", desc: "Luxury villas" },
    { name: "Bali", desc: "Beachfront bungalows" },
    { name: "Cape Town", desc: "Modern apartments" },
    { name: "Sydney", desc: "Oceanside flats" }
  ],
  "Mountains": [
    { name: "Aspen", desc: "Ski chalets" },
    { name: "Zermatt", desc: "Mountain cabins" },
    { name: "Banff", desc: "Lodge rentals" },
    { name: "Chamonix", desc: "Alpine chalets" },
    { name: "Queenstown", desc: "Lakeview lodges" },
    { name: "Whistler", desc: "Condo rentals" },
    { name: "Lake Tahoe", desc: "Cozy cabins" },
    { name: "Interlaken", desc: "Swiss chalets" },
    { name: "Park City", desc: "Mountain lofts" },
    { name: "Gatlinburg", desc: "Log cabins" }
  ],
  "Outdoors": [
    { name: "Joshua Tree", desc: "Desert homes" },
    { name: "Yellowstone", desc: "Cabin rentals" },
    { name: "Costa Rica", desc: "Treehouses" },
    { name: "Patagonia", desc: "Glamping tents" },
    { name: "Isle of Skye", desc: "Stone cottages" },
    { name: "Maui", desc: "Eco lodges" },
    { name: "Lake District", desc: "Country houses" },
    { name: "Sedona", desc: "Red rock villas" },
    { name: "Yukon", desc: "Wilderness cabins" },
    { name: "Serengeti", desc: "Safari tents" }
  ],
  "Things to do": [
    { name: "Apennine Mountains", desc: "Food and drink" },
    { name: "Durham", desc: "Sightseeing" },
    { name: "Norfolk", desc: "Things to do" },
    { name: "Mexico City", desc: "Sightseeing" },
    { name: "Seine", desc: "Nature and outdoors" },
    { name: "Rome", desc: "Tours" },
    { name: "San Juan", desc: "Entertainment" },
    { name: "Taranto", desc: "Nature and outdoors" },
    { name: "Honshu", desc: "Nature and outdoors" },
    { name: "Plainview", desc: "Nature and outdoors" },
    { name: "Elgin", desc: "Nature and outdoors" },
    { name: "Florence", desc: "Entertainment" },
    { name: "7th Arrondissement", desc: "Things to do" },
    { name: "Great Britain", desc: "Sightseeing" },
    { name: "Francavilla al Mare", desc: "Nature and outdoors" },
    { name: "Nomós Kykládon", desc: "Sightseeing" },
    { name: "Tokyo", desc: "Sports activities" }
  ]
};

const InspirationSection = () => {
  const [activeTab, setActiveTab] = useState("Popular");
  const [isExpanded, setIsExpanded] = useState(false);

  const destinations = tabsData[activeTab] || [];
  
  // Show first 17 items (matching the grid of 6 cols, leaving the 18th slot for "Show more") or all items
  const visibleDestinations = isExpanded ? destinations : destinations.slice(0, 17);

  return (
    <section className="border-t border-gray-200 bg-[#F7F7F7] py-12 dark:border-neutral-850 dark:bg-neutral-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <h2 className="text-[22px] font-extrabold tracking-tight text-gray-900 dark:text-white">
          Inspiration for future getaways
        </h2>

        {/* Tab Navigation */}
        <div className="mt-5 border-b border-gray-200 dark:border-neutral-800">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-px text-sm font-semibold">
            {Object.keys(tabsData).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsExpanded(false); // Reset expand on tab change
                  }}
                  className={`relative pb-3 text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap focus:outline-none ${
                    isActive
                      ? "text-gray-900 dark:text-white font-bold"
                      : "text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="activeInspirationTabUnderline"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-gray-900 dark:bg-white rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Destination Grid */}
        <div className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
            
            <AnimatePresence mode="popLayout">
              {visibleDestinations.map((dest, idx) => (
                <motion.div
                  key={`${activeTab}-${dest.name}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.2) }}
                  className="flex flex-col text-left group"
                >
                  <span className="text-xs font-bold text-gray-800 dark:text-neutral-200 group-hover:underline cursor-pointer">
                    {dest.name}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-neutral-450 mt-0.5 leading-normal">
                    {dest.desc}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* "Show more" or "Show less" toggle button in the grid */}
            {destinations.length > 17 && (
              <motion.button
                layout
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white hover:underline cursor-pointer h-fit pt-0.5 focus:outline-none"
              >
                <span>{isExpanded ? "Show less" : "Show more"}</span>
                {isExpanded ? (
                  <ChevronUp className="h-3.5 w-3.5 stroke-[2.5]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 stroke-[2.5]" />
                )}
              </motion.button>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default InspirationSection;
