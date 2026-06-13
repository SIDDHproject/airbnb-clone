import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Globe,
  Menu,
  User,
  Heart,
  Sun,
  Moon,
  PlusCircle,
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Minus,
  Plus,
  SlidersHorizontal,
  X,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const popularDestinations = [
  "Malibu, California",
  "Bali, Indonesia",
  "Santorini, Greece",
  "Catskills, New York",
  "Joshua Tree, California",
  "Queenstown, New Zealand",
  "Isle of Skye, Scotland",
  "Tokyo, Japan",
  "Oia, Greece",
  "Montreux, Switzerland",
  "Aspen, Colorado"
];

const Header = () => {
  const {
    darkMode,
    toggleDarkMode,
    setIsHostModalOpen,
    setIsWishlistDrawerOpen,
    setIsFilterModalOpen,
    filters,
    updateFilters,
    clearAllFilters,
    getGuestCount,
    wishlist,
    selectedLanguage,
    selectedCurrency,
    setIsLangModalOpen,
    t
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeHeaderTab, setActiveHeaderTab] = useState("Homes");
  
  // Search dropdown active state: "location" | "dates" | "guests" | null
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Local Search States
  const [locationInput, setLocationInput] = useState(filters.location || "");
  const [startDateInput, setStartDateInput] = useState(filters.dates.startDate || "");
  const [endDateInput, setEndDateInput] = useState(filters.dates.endDate || "");
  const [guestCounts, setGuestCounts] = useState(
    filters.guests || { adults: 0, children: 0, infants: 0, pets: 0 }
  );

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to collapse/hide the search bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownRef = useRef(null);
  const searchBarRef = useRef(null);

  // Sync state with global context filters
  useEffect(() => {
    setLocationInput(filters.location);
    setStartDateInput(filters.dates.startDate || "");
    setEndDateInput(filters.dates.endDate || "");
    setGuestCounts(filters.guests);
  }, [filters]);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGuestChange = (type, operation) => {
    setGuestCounts((prev) => {
      const updated = { ...prev };
      if (operation === "inc") {
        updated[type] = updated[type] + 1;
      } else {
        updated[type] = Math.max(0, updated[type] - 1);
      }
      return updated;
    });
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    updateFilters({
      location: locationInput,
      dates: { startDate: startDateInput || null, endDate: endDateInput || null },
      guests: guestCounts
    });
    setActiveDropdown(null);
  };

  const handleClearSearch = () => {
    setLocationInput("");
    setStartDateInput("");
    setEndDateInput("");
    setGuestCounts({ adults: 0, children: 0, infants: 0, pets: 0 });
    clearAllFilters();
    setActiveDropdown(null);
  };

  const totalGuests = guestCounts.adults + guestCounts.children + guestCounts.infants + guestCounts.pets;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-gray-150 bg-white/95 transition-[padding,background-color,border-color] duration-200 dark:border-neutral-800 dark:bg-neutral-900/95 glass shadow-xs ${isScrolled ? "py-2.5" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        
        {/* Top Level: Logo, Switcher Tabs, User Menu */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Logo Section */}
          <div className="flex-1 flex justify-start">
            <div 
              onClick={() => {
                setActiveHeaderTab("Homes");
                handleClearSearch();
              }}
              className="flex cursor-pointer items-center text-primary active:scale-95 transition-transform duration-150"
            >
              {/* Bélo Logo */}
              <svg
                className="h-8 w-8 fill-current text-primary"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z" />
              </svg>
              <span className="hidden md:block text-[#FF385C] font-extrabold text-xl tracking-tighter ml-1.5 select-none font-sans lowercase">
                airbnb
              </span>
            </div>
          </div>


          {/* Center Section: Switcher Navigation OR Compact Search Bar */}
          <div className="flex flex-1 justify-center max-w-[180px] sm:max-w-xs md:max-w-md">
            <AnimatePresence mode="wait">
              {!isScrolled ? (
                <motion.nav
                  key="switcher"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="hidden lg:flex items-center gap-8 justify-center"
                >
                  {/* Homes */}
                  <button
                    onClick={() => setActiveHeaderTab("Homes")}
                    className={`group flex items-center gap-2.5 text-sm font-bold transition-all duration-200 relative pb-2 focus:outline-none cursor-pointer hover:scale-105 active:scale-95 ${
                      activeHeaderTab === "Homes"
                        ? "text-gray-900 dark:text-white font-extrabold"
                        : "text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 transition-transform duration-300 ease-out group-hover:scale-115 group-hover:-rotate-3 group-hover:filter group-hover:drop-shadow-[0_2px_8px_rgba(76,175,80,0.4)]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 34c0-4 3-7 6-7s6 3 6 7c0 4-4.5 7-6 7s-6-3-6-7z" fill="#4CAF50"/>
                        <rect x="40" y="38" width="4" height="8" rx="1" fill="#795548"/>
                        <rect x="8" y="22" width="24" height="20" rx="2" fill="#ECEFF1" stroke="#37474F" strokeWidth="2"/>
                        <path d="M4 22L20 8l16 14" stroke="#37474F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="17" y="30" width="6" height="12" rx="1" fill="#FF1744"/>
                        <circle cx="21" cy="36" r="0.75" fill="#FFD600"/>
                        <rect x="11" y="12" width="4" height="8" fill="#757575"/>
                      </svg>
                    </div>
                    <span>{t("homes")}</span>
                    {activeHeaderTab === "Homes" && (
                      <motion.div
                        layoutId="activeHeaderTabUnderline"
                        className="absolute bottom-0 inset-x-0 h-[3px] bg-black dark:bg-white rounded-full"
                      />
                    )}
                  </button>

                  {/* Experiences */}
                  <button
                    onClick={() => setActiveHeaderTab("Experiences")}
                    className={`group flex items-center gap-2.5 text-sm font-bold transition-all duration-200 relative pb-2 focus:outline-none cursor-pointer hover:scale-105 active:scale-95 ${
                      activeHeaderTab === "Experiences"
                        ? "text-gray-900 dark:text-white font-extrabold"
                        : "text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    }`}
                  >
                    <div className="flex-shrink-0 relative">
                      <span className="absolute -top-3.5 left-5 bg-primary text-[8px] font-black text-white px-1.5 py-0.5 rounded-md shadow-xs tracking-wider transition-transform duration-200 group-hover:scale-110">
                        NEW
                      </span>
                      <svg className="h-6 w-6 transition-transform duration-300 ease-out group-hover:scale-115 group-hover:-translate-y-0.5 group-hover:rotate-3 group-hover:filter group-hover:drop-shadow-[0_2px_8px_rgba(255,87,34,0.4)]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 6c-8.8 0-16 7.2-16 16 0 6.5 4 12.5 10 14.5l2 3h8l2-3c6-2 10-8 10-14.5 0-8.8-7.2-16-16-16z" fill="#FF5722"/>
                        <path d="M24 6c-4 0-8 6.5-8 16 0 6.5 2 12.5 5 14.5M24 6c4 0 8 6.5 8 16 0 6.5-2 12.5-5 14.5" stroke="#FFFFFF" strokeWidth="2"/>
                        <path d="M18 38l2 5M30 38l-2 5" stroke="#424242" strokeWidth="1"/>
                        <rect x="20" y="42" width="8" height="5" rx="1" fill="#8D6E63" stroke="#4E342E" strokeWidth="1"/>
                      </svg>
                    </div>
                    <span>{t("experiences")}</span>
                    {activeHeaderTab === "Experiences" && (
                      <motion.div
                        layoutId="activeHeaderTabUnderline"
                        className="absolute bottom-0 inset-x-0 h-[3px] bg-black dark:bg-white rounded-full"
                      />
                    )}
                  </button>

                  {/* Services */}
                  <button
                    onClick={() => setActiveHeaderTab("Services")}
                    className={`group flex items-center gap-2.5 text-sm font-bold transition-all duration-200 relative pb-2 focus:outline-none cursor-pointer hover:scale-105 active:scale-95 ${
                      activeHeaderTab === "Services"
                        ? "text-gray-900 dark:text-white font-extrabold"
                        : "text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    }`}
                  >
                    <div className="flex-shrink-0 relative">
                      <span className="absolute -top-3.5 left-4 bg-primary text-[8px] font-black text-white px-1.5 py-0.5 rounded-md shadow-xs tracking-wider transition-transform duration-200 group-hover:scale-110">
                        NEW
                      </span>
                      <svg className="h-6 w-6 transition-transform duration-300 ease-out group-hover:scale-115 group-hover:rotate-12 group-hover:filter group-hover:drop-shadow-[0_2px_8px_rgba(33,33,33,0.4)]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 38h36v3a1 1 0 01-1 1H7a1 1 0 01-1-1v-3z" fill="#424242" />
                        <rect x="8" y="35" width="32" height="3" fill="#212121" />
                        <path d="M10 35c0-10 6-16 14-16s14 6 14 16H10z" fill="#ECEFF1" stroke="#37474F" strokeWidth="1.5"/>
                        <path d="M24 19c6 0 12 4 13.5 12H24V19z" fill="#CFD8DC" />
                        <rect x="23" y="14" width="2" height="5" fill="#757575" />
                        <circle cx="24" cy="12" r="3" fill="#424242" />
                      </svg>
                    </div>
                    <span>{t("services")}</span>
                    {activeHeaderTab === "Services" && (
                      <motion.div
                        layoutId="activeHeaderTabUnderline"
                        className="absolute bottom-0 inset-x-0 h-[3px] bg-black dark:bg-white rounded-full"
                      />
                    )}
                  </button>
                </motion.nav>
              ) : (
                <motion.div
                  key="compact-search"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    setIsScrolled(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setActiveDropdown("location");
                  }}
                  className="flex items-center justify-between gap-2 border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-850 rounded-full py-1.5 pl-4 pr-1.5 shadow-xs hover:shadow-md cursor-pointer transition-colors duration-200 w-full"
                >
                  <div className="flex items-center divide-x divide-gray-200 dark:divide-neutral-700 text-[10px] sm:text-[11px] font-bold text-gray-800 dark:text-neutral-250 select-none overflow-hidden text-left">
                    <span className="pr-2 sm:pr-3 truncate max-w-[55px] sm:max-w-[80px]">
                      {locationInput || t("anywhere")}
                    </span>
                    <span className="px-2 sm:px-3 truncate max-w-[65px] sm:max-w-[90px] hidden xs:block">
                      {startDateInput && endDateInput
                        ? `${new Date(startDateInput).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                        : t("anyWeek")}
                    </span>
                    <span className="pl-2 sm:pl-3 text-gray-500 dark:text-neutral-400 font-medium truncate max-w-[55px] sm:max-w-[80px] hidden sm:block">
                      {totalGuests > 0 ? `${totalGuests} ${totalGuests > 1 ? t("guests") : t("guest")}` : t("addGuests")}
                    </span>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center bg-primary hover:bg-primary-dark text-white rounded-full transition-transform active:scale-90 flex-shrink-0">
                    <Search className="h-3 w-3 stroke-[3]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: User Section */}
          <div className="flex-1 flex justify-end items-center gap-3">
            {/* Become Host Link */}
            <button
              onClick={() => setIsHostModalOpen(true)}
              className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800 md:block transition-all duration-150 active:scale-95 cursor-pointer"
            >
              {t("becomeHost")}
            </button>

            {/* Language/Globe icon */}
            <button
              onClick={() => setIsLangModalOpen(true)}
              className="hidden rounded-full px-3 py-2 text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800 md:flex items-center gap-1.5 transition-colors duration-150 cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold">{selectedLanguage.code} · {selectedCurrency.code}</span>
            </button>

            {/* User Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 rounded-full border border-gray-200 bg-white p-2.5 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Menu className="h-4 w-4" />
                <div className="relative rounded-full bg-gray-500 p-1 text-white dark:bg-neutral-600">
                  <User className="h-3.5 w-3.5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white ring-2 ring-white dark:ring-neutral-800 animate-pulse">
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 md:right-4 mt-2 w-60 origin-top-right rounded-2xl bg-white py-1.5 shadow-xl border border-gray-150/80 dark:border-neutral-750/80 focus:outline-none dark:bg-neutral-800 dark:shadow-neutral-950/40 z-50"
                  >
                    {/* Help Centre */}
                    <div className="py-0.5">
                      <button
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-gray-800 dark:text-neutral-250 hover:bg-gray-50 dark:hover:bg-neutral-700/50 cursor-pointer font-semibold"
                      >
                        <HelpCircle className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                        <span>{t("helpCentre")}</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-150 dark:border-neutral-750 my-1" />

                    {/* Become a Host Card */}
                    <div
                      onClick={() => {
                        setIsHostModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-neutral-700/40 cursor-pointer transition-colors"
                    >
                      <div className="flex flex-col text-left pr-1.5 max-w-[70%]">
                        <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                          {t("becomeHost")}
                        </span>
                        <span className="text-[9px] text-gray-500 dark:text-neutral-450 mt-0.5 leading-normal font-medium">
                          It's easy to start hosting and earn extra income.
                        </span>
                      </div>
                      <div className="w-9 h-11 flex items-center justify-center flex-shrink-0">
                        <img
                          src={`${import.meta.env.BASE_URL}host_character.png`}
                          alt="Host character"
                          className="w-full h-full object-contain filter drop-shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-150 dark:border-neutral-750 my-1" />

                    {/* Refer a Host & Find a Co-Host */}
                    <div className="py-0.5 flex flex-col">
                      <button
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex w-full items-center px-4 py-1.5 text-left text-xs text-gray-800 dark:text-neutral-250 hover:bg-gray-50 dark:hover:bg-neutral-700/50 cursor-pointer font-semibold"
                      >
                        {t("referHost")}
                      </button>
                      <button
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex w-full items-center px-4 py-1.5 text-left text-xs text-gray-800 dark:text-neutral-250 hover:bg-gray-50 dark:hover:bg-neutral-700/50 cursor-pointer font-semibold"
                      >
                        {t("findCoHost")}
                      </button>
                    </div>

                    <div className="border-t border-gray-150 dark:border-neutral-750 my-1" />

                    {/* Active App Controls (Wishlist, Filters, Dark Mode) */}
                    <div className="py-0.5 flex flex-col">
                      <button
                        onClick={() => {
                          setIsWishlistDrawerOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50 cursor-pointer font-semibold"
                      >
                        <Heart className="h-3.5 w-3.5 text-gray-400 dark:text-neutral-400" />
                        <span>{t("wishlist")} ({wishlist.length})</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsFilterModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50 cursor-pointer font-semibold"
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5 text-gray-400 dark:text-neutral-400" />
                        <span>{t("filters")}</span>
                      </button>
                      <button
                        onClick={() => {
                          toggleDarkMode();
                        }}
                        className="flex w-full items-center justify-between px-4 py-1.5 text-left text-xs text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50 cursor-pointer font-semibold"
                      >
                        <span className="flex items-center gap-2">
                          {darkMode ? (
                            <>
                              <Sun className="h-3.5 w-3.5 text-amber-500" /> Light Mode
                            </>
                          ) : (
                            <>
                              <Moon className="h-3.5 w-3.5 text-indigo-500" /> Dark Mode
                            </>
                          )}
                        </span>
                        <span className="text-[9px] rounded bg-gray-100 px-1.5 py-0.5 text-gray-400 dark:bg-neutral-700 dark:text-neutral-400">
                          {darkMode ? "Dark" : "Light"}
                        </span>
                      </button>
                    </div>

                    <div className="border-t border-gray-150 dark:border-neutral-750 my-1" />

                    {/* Log in / Sign up */}
                    <div className="py-0.5">
                      <button
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex w-full items-center px-4 py-1.5 text-left text-xs text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-700/50 cursor-pointer font-bold"
                      >
                        {t("loginSignup")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Row 2: Large Search Bar (Hides on scroll down) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center w-full mt-2 overflow-hidden"
              ref={searchBarRef}
            >
              <div className="relative w-full max-w-2xl">
                <div className="flex items-center bg-white border border-gray-200 dark:bg-neutral-850 dark:border-neutral-750 rounded-full shadow-lg hover:shadow-xl dark:shadow-neutral-950/20 transition-colors duration-200 p-1.5 gap-0">
                  
                  {/* Where input */}
                  <div
                    onClick={() => setActiveDropdown("location")}
                    className={`flex-1 flex flex-col px-5 py-2 rounded-full cursor-pointer hover:bg-gray-100/60 dark:hover:bg-neutral-800 transition-colors relative ${
                      activeDropdown === "location" ? "bg-gray-100/80 dark:bg-neutral-800" : ""
                    }`}
                  >
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-gray-800 dark:text-neutral-200">{t("where")}</span>
                    <input
                      type="text"
                      placeholder={t("searchDest")}
                      value={locationInput}
                      onChange={(e) => {
                        setLocationInput(e.target.value);
                        setActiveDropdown("location");
                      }}
                      className="bg-transparent text-[11px] text-gray-500 dark:text-neutral-400 focus:outline-none placeholder-gray-400 font-medium mt-0.5 w-full border-none p-0"
                    />

                    {/* Destination Dropdown */}
                    {activeDropdown === "location" && (
                      <div className="absolute left-0 top-full mt-3 w-72 rounded-2xl bg-white border border-gray-150 p-4 shadow-xl dark:bg-neutral-800 dark:border-neutral-750 z-50">
                        <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-2.5">{t("popularDest")}</p>
                        <div className="flex flex-col gap-1 max-h-52 overflow-y-auto no-scrollbar">
                          {popularDestinations
                            .filter((d) => d.toLowerCase().includes(locationInput.toLowerCase()))
                            .map((dest) => (
                              <button
                                type="button"
                                key={dest}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLocationInput(dest);
                                  setActiveDropdown("dates");
                                }}
                                className="flex items-center gap-2.5 w-full py-2 px-2 text-left rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700/50 transition-colors"
                              >
                                <MapPin className="h-4 w-4 text-gray-400 dark:text-neutral-500 flex-shrink-0" />
                                <span className="text-xs font-semibold text-gray-750 dark:text-neutral-200">{dest}</span>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="h-6.5 w-px bg-gray-200 dark:bg-neutral-700" />

                  {/* When Input (Dates) */}
                  <div
                    onClick={() => setActiveDropdown("dates")}
                    className={`flex-1 flex flex-col px-5 py-2 rounded-full cursor-pointer hover:bg-gray-100/60 dark:hover:bg-neutral-800 transition-colors relative ${
                      activeDropdown === "dates" ? "bg-gray-100/80 dark:bg-neutral-800" : ""
                    }`}
                  >
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-gray-800 dark:text-neutral-200">{t("when")}</span>
                    <span className="text-[11px] text-gray-500 dark:text-neutral-400 font-medium mt-0.5 truncate">
                      {startDateInput && endDateInput
                        ? `${new Date(startDateInput).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(endDateInput).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                        : t("addDates")}
                    </span>

                    {/* Dates Selector Dropdown */}
                    {activeDropdown === "dates" && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 rounded-2xl bg-white border border-gray-150 p-4 shadow-xl dark:bg-neutral-800 dark:border-neutral-750 z-50 flex flex-col gap-3">
                        <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-1">{t("selectDates")}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-neutral-400 uppercase">{t("checkIn")}</label>
                            <input
                              type="date"
                              value={startDateInput}
                              min={new Date().toISOString().split("T")[0]}
                              onChange={(e) => setStartDateInput(e.target.value)}
                              className="w-full rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 p-2 text-xs text-gray-700 dark:text-neutral-300 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-neutral-400 uppercase">{t("checkOut")}</label>
                            <input
                              type="date"
                              value={endDateInput}
                              min={startDateInput || new Date().toISOString().split("T")[0]}
                              onChange={(e) => setEndDateInput(e.target.value)}
                              className="w-full rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 p-2 text-xs text-gray-700 dark:text-neutral-300 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setStartDateInput("");
                              setEndDateInput("");
                            }}
                            className="text-[11px] font-bold text-gray-500 hover:underline px-2 py-1"
                          >
                            {t("reset")}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown("guests");
                            }}
                            className="bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold rounded-lg px-3 py-1 shadow-sm"
                          >
                            {t("done")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="h-6.5 w-px bg-gray-200 dark:bg-neutral-700" />

                  {/* Who Input (Guests) */}
                  <div
                    onClick={() => setActiveDropdown("guests")}
                    className={`flex-1 flex flex-col pl-5 pr-1.5 py-1.5 rounded-full cursor-pointer hover:bg-gray-100/60 dark:hover:bg-neutral-800 transition-colors relative ${
                      activeDropdown === "guests" ? "bg-gray-100/80 dark:bg-neutral-800" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-gray-800 dark:text-neutral-200">{t("who")}</span>
                        <span className="text-[11px] text-gray-500 dark:text-neutral-400 font-medium mt-0.5 truncate">
                          {totalGuests > 0 ? `${totalGuests} ${totalGuests > 1 ? t("guests") : t("guest")}` : t("addGuests")}
                        </span>
                      </div>

                      {/* Red Search Button Icon */}
                      <button
                        onClick={handleSearchSubmit}
                        className="flex h-9 w-9 items-center justify-center bg-primary hover:bg-primary-dark text-white rounded-full transition-all duration-150 active:scale-95 shadow-md flex-shrink-0 cursor-pointer"
                      >
                        <Search className="h-3.5 w-3.5 stroke-[3]" />
                      </button>
                    </div>

                    {/* Guests Increment/Decrement Dropdown */}
                    {activeDropdown === "guests" && (
                      <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-white border border-gray-150 p-4 shadow-xl dark:bg-neutral-800 dark:border-neutral-750 z-50 flex flex-col gap-4">
                        {[
                          { name: t("adults"), desc: t("age13"), key: "adults" },
                          { name: t("children"), desc: t("ages2"), key: "children" },
                          { name: t("infants"), desc: t("under2"), key: "infants" },
                          { name: t("pets"), desc: t("serviceAnimal"), key: "pets" }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-800 dark:text-neutral-200">{item.name}</span>
                              <span className="text-[10px] text-gray-400 dark:text-neutral-400 font-semibold">{item.desc}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGuestChange(item.key, "dec");
                                }}
                                disabled={guestCounts[item.key] === 0}
                                className="h-7 w-7 rounded-full border border-gray-200 hover:border-gray-900 dark:border-neutral-700 dark:hover:border-neutral-400 flex items-center justify-center text-gray-650 dark:text-neutral-350 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-bold text-gray-800 dark:text-white select-none w-4 text-center">
                                {guestCounts[item.key]}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGuestChange(item.key, "inc");
                                }}
                                className="h-7 w-7 rounded-full border border-gray-200 hover:border-gray-900 dark:border-neutral-700 dark:hover:border-neutral-400 flex items-center justify-center text-gray-650 dark:text-neutral-350 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-neutral-700 pt-3 mt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClearSearch();
                            }}
                            className="text-[11px] font-bold text-gray-500 hover:underline"
                          >
                            {t("clearSearch")}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSearchSubmit(e);
                            }}
                            className="bg-primary hover:bg-primary-dark text-white text-[11px] font-bold rounded-lg px-3.5 py-1.5 shadow-sm"
                          >
                            {t("search")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
