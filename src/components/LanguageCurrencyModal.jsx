import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const languages = [
  { name: "English (United Kingdom)", code: "EN", region: "United Kingdom" },
  { name: "English (United States)", code: "EN", region: "United States" },
  { name: "Deutsch (Deutschland)", code: "DE", region: "Deutschland" },
  { name: "Français (France)", code: "FR", region: "France" },
  { name: "Español (España)", code: "ES", region: "España" },
  { name: "Italiano (Italia)", code: "IT", region: "Italia" },
  { name: "Português (Brasil)", code: "PT", region: "Brasil" },
  { name: "Nederlands (Nederland)", code: "NL", region: "Nederland" },
  { name: "日本語 (日本)", code: "JA", region: "日本" },
  { name: "한국어 (한국)", code: "KO", region: "한국" },
  { name: "简体中文 (中国)", code: "ZH", region: "中国" },
  { name: "हिन्दी (भारत)", code: "HI", region: "भारत" }
];

const currencies = [
  { name: "United States Dollar", code: "USD", symbol: "$" },
  { name: "Pound Sterling", code: "GBP", symbol: "£" },
  { name: "Euro", code: "EUR", symbol: "€" },
  { name: "Australian Dollar", code: "AUD", symbol: "$" },
  { name: "Canadian Dollar", code: "CAD", symbol: "$" },
  { name: "Japanese Yen", code: "JPY", symbol: "¥" },
  { name: "Indian Rupee", code: "INR", symbol: "₹" },
  { name: "Brazilian Real", code: "BRL", symbol: "R$" },
  { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
  { name: "Korean Won", code: "KRW", symbol: "₩" }
];

const LanguageCurrencyModal = () => {
  const {
    isLangModalOpen,
    setIsLangModalOpen,
    selectedLanguage,
    setSelectedLanguage,
    selectedCurrency,
    setSelectedCurrency
  } = useApp();

  const [activeTab, setActiveTab] = useState("lang"); // "lang" | "curr"

  if (!isLangModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsLangModalOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[80vh] flex flex-col dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 z-10 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-150 dark:border-neutral-800">
          <button
            onClick={() => setIsLangModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-neutral-350 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab("lang")}
              className={`pb-1 border-b-2 transition-colors duration-150 cursor-pointer ${
                activeTab === "lang"
                  ? "border-black text-black dark:border-white dark:text-white"
                  : "border-transparent text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              }`}
            >
              Language and region
            </button>
            <button
              onClick={() => setActiveTab("curr")}
              className={`pb-1 border-b-2 transition-colors duration-150 cursor-pointer ${
                activeTab === "curr"
                  ? "border-black text-black dark:border-white dark:text-white"
                  : "border-transparent text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              }`}
            >
              Currency
            </button>
          </div>
          
          <div className="w-8 h-8" /> {/* Spacer to balance close button */}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {activeTab === "lang" ? (
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-4">
                Choose a language and region
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((lang) => {
                  const isSelected = selectedLanguage.name === lang.name;
                  return (
                    <button
                      key={lang.name}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLangModalOpen(false);
                      }}
                      className={`flex flex-col p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? "border-black bg-gray-50/50 dark:border-white dark:bg-neutral-800/50 font-bold"
                          : "border-gray-150 hover:border-gray-900 dark:border-neutral-800 dark:hover:border-neutral-500"
                      }`}
                    >
                      <span className="text-xs font-semibold text-gray-800 dark:text-neutral-100">
                        {lang.name}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-450 mt-0.5">
                        {lang.region}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-4">
                Choose a currency
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currencies.map((curr) => {
                  const isSelected = selectedCurrency.code === curr.code;
                  return (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setIsLangModalOpen(false);
                      }}
                      className={`flex flex-col p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? "border-black bg-gray-50/50 dark:border-white dark:bg-neutral-800/50 font-bold"
                          : "border-gray-150 hover:border-gray-900 dark:border-neutral-800 dark:hover:border-neutral-500"
                      }`}
                    >
                      <span className="text-xs font-semibold text-gray-800 dark:text-neutral-100">
                        {curr.name}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-450 mt-0.5">
                        {curr.code} - {curr.symbol}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageCurrencyModal;
