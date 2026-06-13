import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Home, PlusCircle, Check } from "lucide-react";
import { motion } from "framer-motion";

const defaultImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"
];

const categories = [
  "Beachfront",
  "Cabins",
  "Mansions",
  "Amazing pools",
  "Views",
  "Countryside",
  "Lakefront",
  "Icons"
];

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

const HostModal = () => {
  const { isHostModalOpen, setIsHostModalOpen, addListing } = useApp();

  const [name, setName] = useState("");
  const [type, setType] = useState("Entire home");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Beachfront");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(["", "", ""]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [maxGuests, setMaxGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(2);
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);

  if (!isHostModalOpen) return null;

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageUrlChange = (index, value) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields check
    if (!name || !location || !price || !description) {
      alert("Please fill out all required fields.");
      return;
    }

    // Process image URLs, filtering empty strings and replacing them with fallback preset images
    const processedImages = images
      .map((url) => url.trim())
      .filter((url) => url !== "");

    const finalImages = processedImages.length > 0 ? processedImages : defaultImages;

    const newListing = {
      name,
      type,
      location,
      description,
      price: parseInt(price) || 100,
      category,
      images: finalImages,
      host: {
        name: "You (Host)",
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
        yearJoined: 2026,
        superhost: true
      },
      maxGuests: parseInt(maxGuests) || 2,
      bedrooms: parseInt(bedrooms) || 1,
      beds: parseInt(beds) || 1,
      bathrooms: parseFloat(bathrooms) || 1,
      amenities: selectedAmenities
    };

    addListing(newListing);
    
    // Close Modal and Reset Form State
    setIsHostModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setType("Entire home");
    setLocation("");
    setPrice("");
    setCategory("Beachfront");
    setDescription("");
    setImages(["", "", ""]);
    setSelectedAmenities([]);
    setMaxGuests(4);
    setBedrooms(2);
    setBeds(2);
    setBathrooms(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs overflow-y-auto">
      
      {/* Modal Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[85vh] flex flex-col dark:bg-neutral-900 dark:border dark:border-neutral-850"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-150 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-extrabold text-base">
            <PlusCircle className="h-5 w-5 text-primary" />
            <span>List your property on Airbnb</span>
          </div>
          <button
            onClick={() => setIsHostModalOpen(false)}
            className="rounded-full border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all duration-150 active:scale-90"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-grow flex flex-col gap-5 no-scrollbar">
          
          {/* Section: Basic Details */}
          <div className="flex flex-col gap-3.5">
            <h3 className="font-extrabold text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Basic info</h3>
            
            {/* Listing Title */}
            <div>
              <label className="block text-xs font-bold text-gray-750 dark:text-neutral-350 mb-1">
                Property Listing Title <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Luxurious Eco-Dome with Mountain Views"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-3 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:border-primary dark:focus:border-primary focus:outline-none"
              />
            </div>

            {/* Type of Place & Category Dropdowns */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-750 dark:text-neutral-350 mb-1">
                  Property Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm font-semibold bg-white text-gray-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 focus:border-primary focus:outline-none"
                >
                  <option value="Entire home">Entire home</option>
                  <option value="Entire villa">Entire villa</option>
                  <option value="Entire cabin">Entire cabin</option>
                  <option value="Entire room">Entire room</option>
                  <option value="Private room">Private room</option>
                  <option value="Shared room">Shared room</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-750 dark:text-neutral-350 mb-1">
                  Airbnb Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm font-semibold bg-white text-gray-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 focus:border-primary focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location & Nightly Price inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-750 dark:text-neutral-350 mb-1">
                  Location (City, Country) <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aspen, Colorado, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-750 dark:text-neutral-350 mb-1">
                  Nightly Price (USD) <span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 250"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Capacity Setup */}
          <div className="flex flex-col gap-3.5 border-t border-gray-100 dark:border-neutral-800 pt-5">
            <h3 className="font-extrabold text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Guest capacity</h3>
            <div className="grid grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 dark:text-neutral-350 mb-1">Max Guests</label>
                <input
                  type="number"
                  min="1"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-gray-300 p-2 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 dark:text-neutral-350 mb-1">Bedrooms</label>
                <input
                  type="number"
                  min="1"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-gray-300 p-2 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 dark:text-neutral-350 mb-1">Beds</label>
                <input
                  type="number"
                  min="1"
                  value={beds}
                  onChange={(e) => setBeds(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-gray-300 p-2 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 dark:text-neutral-350 mb-1">Bathrooms</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(parseFloat(e.target.value) || 1)}
                  className="w-full rounded-xl border border-gray-300 p-2 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Section: Description */}
          <div className="border-t border-gray-100 dark:border-neutral-800 pt-5">
            <label className="block text-xs font-bold text-gray-750 dark:text-neutral-350 mb-1">
              Description <span className="text-primary">*</span>
            </label>
            <textarea
              required
              rows="3"
              placeholder="Describe what makes your space special, the view, details about surroundings, and amenities..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:border-primary focus:outline-none resize-none"
            />
          </div>

          {/* Section: Image URLs */}
          <div className="flex flex-col gap-3 border-t border-gray-100 dark:border-neutral-800 pt-5">
            <div>
              <h3 className="font-extrabold text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-widest">Listing Images</h3>
              <p className="text-[10px] text-gray-450 mt-0.5 font-semibold">
                Provide up to 3 image links. Leave blank to automatically use stunning, high-definition default house images.
              </p>
            </div>
            {images.map((url, idx) => (
              <div key={idx}>
                <label className="block text-[10px] font-bold text-gray-700 dark:text-neutral-350 mb-0.5">Image Link #{idx + 1}</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={url}
                  onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs font-semibold bg-transparent text-gray-800 dark:border-neutral-700 dark:text-neutral-200 focus:border-primary focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Section: Amenities Checklist */}
          <div className="border-t border-gray-100 dark:border-neutral-800 pt-5">
            <h3 className="font-extrabold text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-widest mb-3">Amenities provided</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {availableAmenities.map((amenity) => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-semibold transition-all duration-150 active:scale-97 ${
                      checked
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-900 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-350 dark:hover:bg-neutral-700"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded flex items-center justify-center border transition-colors duration-150 ${
                        checked
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 bg-white dark:border-neutral-600 dark:bg-neutral-900"
                      }`}
                    >
                      {checked && <Check className="h-3 w-3 text-white stroke-[3]" />}
                    </div>
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </form>

        {/* Sticky Footer Actions */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-150 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md sticky bottom-0 z-10 gap-3">
          <button
            type="button"
            onClick={() => setIsHostModalOpen(false)}
            className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:underline dark:text-neutral-450 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-primary hover:bg-primary-dark transition-all duration-150 active:scale-97 shadow-lg shadow-primary/10"
          >
            <Home className="h-4.5 w-4.5" />
            <span>Publish Listing</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default HostModal;
