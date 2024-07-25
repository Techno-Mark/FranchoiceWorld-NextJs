// components/CookieConsent/CookieConsent.jsx
"use client";
import CloseIcon from "@/assets/icons/closeIcon";
import { Cookie } from "@/assets/icons/cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdCookie } from "react-icons/md";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenCookiePopup");
    if (!hasSeenPopup) {
      setShowConsent(true);
    }
  }, []);

  const handleAction = () => {
    localStorage.setItem("hasSeenCookiePopup", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white md:w-2/5 w-auto border rounded-lg">
        <div className="flex !justify-end pt-4 pr-5">
          <button
            className="bg-transparent border-none text-2xl cursor-pointer"
            onClick={handleAction}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex justify-center items-center p-7 flex-col pb-6">
          <Cookie />
          <div className="text-[var(--footer-bg)] pt-6 pb-4 font-bold text-lg">
            Our website uses cookies
          </div>
          <div className="pb-3">Learn more about our use of cookies:</div>
          <Link
            href="/privacy-policy"
            className="text-[var(--highlighted-color)] underline"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex justify-between bg-[var(--cookie-bg-color)] p-5">
          <button
            className="px-5 py-2.5 border-none rounded cursor-pointer bg-[rgba(115,114,115,0.2)]"
            onClick={handleAction}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 border-none rounded cursor-pointer bg-[var(--footer-bg)] text-white"
            onClick={handleAction}
          >
            <span className="flex items-center justify-center">
              Accept
              <MdCookie />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
