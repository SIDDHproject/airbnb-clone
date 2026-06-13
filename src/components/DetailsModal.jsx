import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  X, Star, Heart, Share, ShieldCheck, Calendar,
  Wifi, Waves, Utensils, Wind, Laptop, Car,
  Dumbbell, Palmtree, Bath, Flame, Check, AlertCircle, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const amenityIconMap = {
  "WiFi": Wifi,
  "Pool": Waves,
  "Kitchen": Utensils,
  "AC": Wind,
  "Dedicated workspace": Laptop,
  "Free parking": Car,
  "Gym": Dumbbell,
  "Beach access": Palmtree,
  "Hot tub": Bath,
  "Fireplace": Flame
};

const DetailsModal = () => {
  const {
    selectedListing,
    closeDetails,
    wishlist,
    toggleFavorite,
    formatPrice,
    t
  } = useApp();

  const [bookingGuests, setBookingGuests] = useState({ adults: 2, children: 0 });
  const [nightsCount, setNightsCount] = useState(5);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!selectedListing) return null;

  const isFavorited = wishlist.includes(selectedListing.id);

  // Booking calculations
  const price = selectedListing.price;
  const baseTotal = price * nightsCount;
  const cleaningFee = Math.round(price * 0.2);
  const serviceFee = Math.round(baseTotal * 0.12);
  const total = baseTotal + cleaningFee + serviceFee;

  const handleBook = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      closeDetails();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs overflow-y-auto">
      
      {/* Modal Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col dark:bg-neutral-900 dark:border dark:border-neutral-850"
      >
        
        {/* Modal Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-150 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-neutral-800 dark:text-neutral-350 px-2 py-0.5 rounded">
              {selectedListing.type}
            </span>
            {selectedListing.host.superhost && (
              <span className="text-xs font-bold text-primary flex items-center gap-1 uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">
                <Sparkles className="h-3 w-3" /> Superhost
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            
            {/* Share / Save actions */}
            <button
              onClick={() => toggleFavorite(selectedListing.id)}
              className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800 p-2 rounded-xl border border-gray-200 dark:border-neutral-700 transition-all duration-150 active:scale-95"
            >
              <Heart className={`h-4.5 w-4.5 ${isFavorited ? "fill-primary stroke-primary text-primary" : "text-gray-400"}`} />
              <span>{isFavorited ? "Saved" : "Save"}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={closeDetails}
              className="rounded-full border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all duration-150 active:scale-90"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-grow flex flex-col gap-6 no-scrollbar">
          
          {/* Header Title */}
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              {selectedListing.name}
            </h2>
            <p className="text-sm font-semibold text-gray-500 dark:text-neutral-400 mt-1">
              {selectedListing.location} · ★ {selectedListing.rating.toFixed(2)} · {selectedListing.maxGuests} guests · {selectedListing.bedrooms} bedrooms · {selectedListing.beds} beds · {selectedListing.bathrooms} baths
            </p>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden aspect-video md:aspect-[2.39/1] bg-gray-100 dark:bg-neutral-800">
            {/* Main Big Image */}
            <div className="md:col-span-2 h-full w-full overflow-hidden">
              <img
                src={selectedListing.images[0]}
                alt="Property Main"
                className="h-full w-full object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
            
            {/* Secondary Images Grid */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
              {selectedListing.images.slice(1, 5).map((imgUrl, index) => (
                <div key={index} className="h-full w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Property Detail ${index + 1}`}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
              {/* Fallback mock image grids if less than 5 images */}
              {selectedListing.images.length < 5 &&
                Array.from({ length: 5 - selectedListing.images.length }).map((_, idx) => (
                  <div key={`fallback-${idx}`} className="h-full w-full overflow-hidden bg-gray-250 dark:bg-neutral-800 flex items-center justify-center text-gray-400 text-xs">
                    More Photos Coming Soon
                  </div>
                ))}
            </div>
          </div>

          {/* Details Content Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Description, Host, Amenities, Reviews */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Host details bar */}
              <div className="flex items-center gap-4 py-4 border-b border-gray-150 dark:border-neutral-800">
                <img
                  src={selectedListing.host.profilePic}
                  alt={selectedListing.host.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-neutral-100">
                    Hosted by {selectedListing.host.name}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 dark:text-neutral-400">
                    Joined in {selectedListing.host.yearJoined} {selectedListing.host.superhost && "· Superhost"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="pb-6 border-b border-gray-150 dark:border-neutral-800">
                <h3 className="font-bold text-gray-900 dark:text-neutral-100 mb-2">About this space</h3>
                <p className="text-sm text-gray-700 dark:text-neutral-350 leading-relaxed">
                  {selectedListing.description}
                </p>
              </div>

              {/* Amenities List */}
              <div className="pb-6 border-b border-gray-150 dark:border-neutral-800">
                <h3 className="font-bold text-gray-900 dark:text-neutral-100 mb-3">What this place offers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedListing.amenities.map((amenity) => {
                    const IconComponent = amenityIconMap[amenity] || Check;
                    return (
                      <div key={amenity} className="flex items-center gap-3 text-sm text-gray-700 dark:text-neutral-350">
                        <div className="p-2 bg-gray-50 dark:bg-neutral-850 rounded-lg text-gray-600 dark:text-neutral-300">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-black dark:fill-white" />
                  {selectedListing.rating.toFixed(2)} · {selectedListing.reviews.length} review{selectedListing.reviews.length !== 1 && "s"}
                </h3>
                
                {selectedListing.reviews.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedListing.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl border border-gray-150 dark:border-neutral-800 flex flex-col gap-2.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt={rev.author}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-200">{rev.author}</h4>
                            <span className="text-[10px] text-gray-400 font-semibold">{rev.date}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-neutral-350 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">No reviews yet for this listing.</p>
                )}
              </div>

            </div>

            {/* Right Column: Interactive Booking Widget */}
            <div className="relative">
              <div className="sticky top-2 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-850 dark:shadow-neutral-950/20">
                {/* Price Display */}
                <div className="flex items-baseline justify-between mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">{formatPrice(price)}</span>
                    <span className="text-xs text-gray-500 dark:text-neutral-400">{t("night")}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-850 dark:text-neutral-300">
                    <Star className="h-3.5 w-3.5 fill-black dark:fill-white" />
                    <span>{selectedListing.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="rounded-xl border border-gray-300 dark:border-neutral-700 divide-y divide-gray-300 dark:divide-neutral-700 mb-4 overflow-hidden">
                  
                  {/* Stay Duration Selector */}
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                      {t("lengthStay")}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={nightsCount}
                      onChange={(e) => setNightsCount(parseInt(e.target.value) || 1)}
                      className="bg-transparent w-full text-sm font-semibold text-gray-800 dark:text-gray-150 focus:outline-none"
                    />
                  </div>

                  {/* Guests Selector */}
                  <div className="p-3 grid grid-cols-2 divide-x divide-gray-300 dark:divide-neutral-700">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                        {t("adults")}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={selectedListing.maxGuests}
                        value={bookingGuests.adults}
                        onChange={(e) => setBookingGuests({ ...bookingGuests, adults: parseInt(e.target.value) || 1 })}
                        className="bg-transparent w-full text-sm font-semibold text-gray-800 dark:text-gray-150 focus:outline-none"
                      />
                    </div>
                    <div className="pl-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                        {t("children")}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="6"
                        value={bookingGuests.children}
                        onChange={(e) => setBookingGuests({ ...bookingGuests, children: parseInt(e.target.value) || 0 })}
                        className="bg-transparent w-full text-sm font-semibold text-gray-800 dark:text-gray-150 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Price breakdown */}
                <div className="flex flex-col gap-2.5 text-sm mb-5 font-semibold text-gray-700 dark:text-neutral-350">
                  <div className="flex justify-between">
                    <span className="underline">{formatPrice(price)} x {nightsCount} {t("nights")}</span>
                    <span className="text-gray-900 dark:text-white">{formatPrice(baseTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">{t("cleaningFee")}</span>
                    <span className="text-gray-900 dark:text-white">{formatPrice(cleaningFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">{t("serviceFee")}</span>
                    <span className="text-gray-900 dark:text-white">{formatPrice(serviceFee)}</span>
                  </div>
                  <hr className="border-gray-200 dark:border-neutral-750 my-1" />
                  <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white">
                    <span>{t("totalBeforeTaxes")}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Book Action Button */}
                <button
                  disabled={bookingConfirmed}
                  onClick={handleBook}
                  className={`w-full py-3.5 rounded-xl text-sm font-extrabold text-white transition-all duration-200 active:scale-97 shadow-lg flex items-center justify-center gap-2 ${
                    bookingConfirmed
                      ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                      : "bg-primary hover:bg-primary-dark shadow-primary/20"
                  }`}
                >
                  {bookingConfirmed ? (
                    <>
                      <ShieldCheck className="h-5 w-5 animate-bounce" />
                      <span>{t("confirmed")}</span>
                    </>
                  ) : (
                    t("reserveHouse")
                  )}
                </button>

                <p className="text-center text-[10.5px] text-gray-400 mt-3 font-semibold">
                  {t("noChargedYet")}
                </p>

                {/* Booking Confirmed Notification toast overlay */}
                {bookingConfirmed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-16 inset-x-0 bg-emerald-50 dark:bg-emerald-950/45 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3.5 flex items-start gap-2.5 shadow-md"
                  >
                    <AlertCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-350">{t("success")}</h4>
                      <p className="text-[10px] text-emerald-650 dark:text-emerald-400 mt-0.5">
                        {t("stayScheduled")}
                      </p>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default DetailsModal;
