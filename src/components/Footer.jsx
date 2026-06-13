import React from "react";
import { Globe, DollarSign } from "lucide-react";
import { useApp } from "../context/AppContext";

const footerLinks = [
  {
    title: "Support",
    links: ["Help Center", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighborhood concern"]
  },
  {
    title: "Hosting",
    links: ["Become a host", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly", "Airbnb-friendly apartments"]
  },
  {
    title: "Airbnb",
    links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards", "Airbnb.org emergency stays"]
  }
];

const Footer = () => {
  const { selectedLanguage, selectedCurrency, setIsLangModalOpen } = useApp();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-[#F7F7F7] text-gray-700 py-12 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-450 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        


        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-200 dark:border-neutral-800">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-neutral-100">{section.title}</h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:underline transition-all duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Area */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs font-semibold">
          
          {/* Copyright / Terms */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-center">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">UK Modern Slavery Act</a>
          </div>

          {/* Settings / Socials */}
          <div className="flex items-center gap-6">
            
            {/* Language & Currency */}
            <div className="flex items-center gap-4 text-sm font-bold text-gray-900 dark:text-neutral-200">
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                <Globe className="h-4.5 w-4.5" />
                <span>{selectedLanguage.name}</span>
              </button>
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                <span className="text-sm font-extrabold">{selectedCurrency.symbol}</span>
                <span>{selectedCurrency.code}</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 text-gray-850 dark:text-neutral-350">
              <a href="#" className="hover:scale-110 transition-transform duration-150" aria-label="Facebook">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform duration-150" aria-label="Twitter">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform duration-150" aria-label="Instagram">
                <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
