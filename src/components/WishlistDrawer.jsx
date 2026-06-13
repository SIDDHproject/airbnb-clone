import React from "react";
import { useApp } from "../context/AppContext";
import { X, Heart, Star, ChevronRight, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const WishlistDrawer = () => {
  const {
    wishlist,
    listings,
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    toggleFavorite,
    openDetails,
    formatPrice,
    t
  } = useApp();

  if (!isWishlistDrawerOpen) return null;

  // Filter listings inside wishlist
  const wishlistedListings = listings.filter((l) => wishlist.includes(l.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsWishlistDrawerOpen(false)}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-neutral-900"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-150 px-6 py-4.5 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-extrabold text-base">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <span>{t("wishlist")} ({wishlistedListings.length})</span>
          </div>
          <button
            onClick={() => setIsWishlistDrawerOpen(false)}
            className="rounded-full border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all duration-150 active:scale-90"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {wishlistedListings.length > 0 ? (
            <div className="flex flex-col gap-4">
              {wishlistedListings.map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => {
                    openDetails(listing);
                    setIsWishlistDrawerOpen(false);
                  }}
                  className="group flex gap-3 p-3 rounded-2xl border border-gray-150 bg-white hover:border-primary hover:shadow-md cursor-pointer transition-all duration-150 dark:border-neutral-850 dark:bg-neutral-850 dark:hover:border-primary-light"
                >
                  {/* Image */}
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
                    <img
                      src={listing.images[0]}
                      alt={listing.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-900 dark:text-neutral-150">
                      <span className="truncate pr-1">{listing.location}</span>
                      <span className="flex items-center gap-0.5 text-gray-800 dark:text-neutral-300">
                        <Star className="h-3 w-3 fill-black dark:fill-white" />
                        {listing.rating.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 truncate dark:text-neutral-400 mt-0.5">
                      {listing.name}
                    </span>
                    <span className="text-[11px] font-extrabold text-gray-900 dark:text-white mt-1">
                      {formatPrice(listing.price)} <span className="font-normal text-gray-400">{t("night")}</span>
                    </span>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-col justify-between items-end pl-1">
                    {/* Delete Item */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(listing.id);
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary/5 dark:text-neutral-500 dark:hover:text-primary-light transition-colors duration-150"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[80%] flex-col items-center justify-center text-center px-4">
              <div className="rounded-full bg-gray-50 p-6 text-gray-300 dark:bg-neutral-850 dark:text-neutral-700 mb-4 animate-pulse">
                <Heart className="h-10 w-10 stroke-[1.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-neutral-200">Create your first wishlist</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-[240px]">
                As you search, click the heart icon on your favorite places to save them here.
              </p>
              <button
                onClick={() => setIsWishlistDrawerOpen(false)}
                className="mt-5 rounded-xl bg-primary hover:bg-primary-dark text-white px-5 py-2.5 text-xs font-bold transition-all duration-150 active:scale-95 shadow-md shadow-primary/10"
              >
                Start browsing
              </button>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default WishlistDrawer;
