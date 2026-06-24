'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rex_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rex_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('rex_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-dark text-brand-white-pure p-4 md:p-6 z-[100] border-t border-brand-green/20 shadow-2xl animate-in slide-in-from-bottom-full duration-500">
      <div className="container-inner flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-brand-white-pure/80 max-w-3xl leading-relaxed">
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/legal/privacy" className="underline hover:text-brand-green-light transition-colors font-medium">Privacy Policy</Link> for more information.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleDecline}
            className="btn-base bg-transparent border border-brand-white-pure/30 hover:bg-brand-white-pure/10 w-full md:w-auto text-sm px-5 py-2.5"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="btn-primary w-full md:w-auto text-sm px-6 py-2.5 shadow-none"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
