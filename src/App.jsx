import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/Header";
import ListingCard from "./components/ListingCard";
import Footer from "./components/Footer";
import InspirationSection from "./components/InspirationSection";
import DetailsModal from "./components/DetailsModal";
import FilterModal from "./components/FilterModal";
import HostModal from "./components/HostModal";
import WishlistDrawer from "./components/WishlistDrawer";
import LanguageCurrencyModal from "./components/LanguageCurrencyModal";
import ServicesView from "./components/ServicesView";
import ExperiencesView from "./components/ExperiencesView";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

const AppContent = () => {
  const { filteredListings, clearAllFilters, activeHeaderTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-100">
      
      {/* Stick Header & Search panels */}
      <Header />

      {/* Main Listing Grid */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {activeHeaderTab === "Services" ? (
          <ServicesView />
        ) : activeHeaderTab === "Experiences" ? (
          <ExperiencesView />
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24 px-4">
            <AlertCircle className="h-12 w-12 text-gray-300 dark:text-neutral-700 mb-4 animate-bounce" />
            <h2 className="text-lg font-extrabold text-gray-800 dark:text-neutral-200">No properties match your filters</h2>
            <p className="text-xs text-gray-400 mt-2 max-w-xs font-semibold">
              Try changing or resetting some of your filters to find your perfect stay.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-6 flex items-center gap-2 rounded-xl bg-black hover:bg-neutral-900 text-white px-5 py-3 text-xs font-bold transition-all duration-150 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-100 shadow-md"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Inspiration for future getaways Section */}
      <InspirationSection />

      {/* Footer bar */}
      <Footer />

      {/* Global Overlay Modals & Drawers */}
      <AnimatePresence>
        <FilterModal />
      </AnimatePresence>

      <AnimatePresence>
        <DetailsModal />
      </AnimatePresence>

      <AnimatePresence>
        <HostModal />
      </AnimatePresence>

      <AnimatePresence>
        <WishlistDrawer />
      </AnimatePresence>

      <AnimatePresence>
        <LanguageCurrencyModal />
      </AnimatePresence>

    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
