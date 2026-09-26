import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, Calendar } from 'lucide-react';
import { companyDetails } from '../data/projectsData';

export default function FloatingActions({ onOpenScheduleModal }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#234e70] text-white hover:bg-[#1E3A8A] flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Quick Schedule Visit Pill */}
      <button
        onClick={onOpenScheduleModal}
        className="hidden sm:inline-flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#234e70] hover:bg-[#1E3A8A] shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Free Visit</span>
      </button>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${companyDetails.whatsapp}?text=Hi%20Uday%20Estate,%20I%20am%20looking%20for%20a%20property.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#059669] hover:bg-[#0e8744] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group relative"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Instant WhatsApp Help
        </span>
      </a>

    </div>
  );
}
