'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-gray-600">
          We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.
        </p>
        <div className="flex space-x-4">
          <button className="text-blue-600 hover:text-blue-800 text-sm">MORE INFO</button>
          <button
            onClick={acceptCookies}
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
}