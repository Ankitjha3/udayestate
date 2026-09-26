import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Car,
} from 'lucide-react';
import { companyDetails } from '../data/projectsData';

export default function Navbar({ onOpenScheduleModal, onFilterCategory }) {
  const [scrolled, setScrolled]               = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [propertiesDropdown, setPropertiesDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCategoryClick = (cat) => {
    if (onFilterCategory) onFilterCategory(cat);
    setPropertiesDropdown(false);
    setMobileMenuOpen(false);
    document.getElementById('properties-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white w-full">

      {/* ── Slim contact bar — hidden on mobile to save space ── */}
      <div className="hidden sm:block bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center gap-4 py-1.5 text-[11px] text-slate-600">
          <a
            href={`tel:${companyDetails.phone}`}
            className="hover:text-[#234e70] font-semibold transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-[#234e70]" />
            {companyDetails.phoneDisplay}
          </a>
          <span className="text-slate-300">|</span>
          <a
            href={`https://wa.me/${companyDetails.whatsapp}?text=Hi%20Uday%20Estate,%20I%20am%20interested%20in%20exploring%20properties.`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0e8744] hover:text-[#0b6b36] font-semibold transition-colors flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            WhatsApp Us
          </a>
          <span className="text-slate-300">|</span>
          <span className="text-[#0e8744] font-semibold">0% Brokerage</span>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav className={`transition-shadow duration-200 border-b ${
        scrolled ? 'shadow-sm border-slate-200' : 'border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src="/assets/uday-estate-logo.svg"
              alt="Uday Estate"
              className="h-12 w-auto object-contain"
              draggable="false"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#home" className="hover:text-[#234e70] transition-colors">Home</a>

            {/* Properties dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPropertiesDropdown(true)}
              onMouseLeave={() => setPropertiesDropdown(false)}
            >
              <button className="hover:text-[#234e70] transition-colors flex items-center gap-1 py-2 cursor-pointer">
                Properties <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {propertiesDropdown && (
                <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                  {[
                    { label: 'All 25 Projects',    cat: 'All Projects',       badge: '25',   badgeCls: 'bg-slate-100 text-slate-600' },
                    { label: 'New Launches',        cat: 'New Launch',         badge: 'New',  badgeCls: 'bg-emerald-50 text-[#0e8744]' },
                    { label: 'Ready to Move',       cat: 'Ready Possession',   badge: 'Ready',badgeCls: 'bg-blue-50 text-blue-700' },
                    { label: 'Under Construction',  cat: 'Under Construction', badge: null,   badgeCls: '' },
                    { label: 'Hot Deals',           cat: 'Hot Deals',          badge: 'Hot',  badgeCls: 'bg-rose-50 text-rose-600' },
                  ].map(({ label, cat, badge, badgeCls }) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#234e70] font-medium transition-colors flex justify-between items-center cursor-pointer"
                    >
                      {label}
                      {badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${badgeCls}`}>{badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#hotspots"  className="hover:text-[#234e70] transition-colors">Prime Localities</a>
            <a href="#calculator" className="hover:text-[#234e70] transition-colors">EMI Calculator</a>
            <a href="#why-us"    className="hover:text-[#234e70] transition-colors">Why Us</a>
            <a href="#partners"  className="hover:text-[#234e70] transition-colors">Top Builders</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => onOpenScheduleModal()}
              className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0e8744] hover:bg-[#0b6b36] shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Car className="w-3.5 h-3.5" />
              Book Free Site Visit
            </button>
          </div>

          {/* Mobile: call + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${companyDetails.phone}`}
              className="p-2 rounded-lg bg-slate-100 text-[#234e70]"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop hamburger (lg hidden) */}
          <div className="hidden sm:flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile / Tablet Drawer ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-1 shadow-md overflow-hidden">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm text-slate-700 hover:text-[#234e70] font-semibold border-b border-slate-100">
              Home
            </a>

            <div className="py-2 border-b border-slate-100">
              <span className="text-[11px] uppercase text-[#234e70] font-bold block mb-2 tracking-wider">Properties</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['All 25 Listings',    'All Projects'],
                  ['New Launches',       'New Launch'],
                  ['Ready to Move',      'Ready Possession'],
                  ['Under Construction', 'Under Construction'],
                ].map(([label, cat]) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="text-left text-xs bg-slate-50 p-2.5 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {[
              ['Prime Localities', '#hotspots'],
              ['EMI Calculator',   '#calculator'],
              ['Why Uday Estate',  '#why-us'],
              ['Top Builders',     '#partners'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm text-slate-700 hover:text-[#234e70] font-semibold border-b border-slate-100 last:border-0">
                {label}
              </a>
            ))}

            {/* Mobile CTA */}
            <div className="pt-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenScheduleModal(); }}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#0e8744] hover:bg-[#0b6b36] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Car className="w-4 h-4" />
                Book Free Site Visit (AC Cab)
              </button>
            </div>

            {/* Mobile contact row */}
            <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
              <a href={`tel:${companyDetails.phone}`} className="flex items-center gap-1 text-[#234e70] font-semibold">
                <Phone className="w-3.5 h-3.5" /> {companyDetails.phoneDisplay}
              </a>
              <span className="text-slate-300">|</span>
              <a
                href={`https://wa.me/${companyDetails.whatsapp}?text=Hi%20Uday%20Estate`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#0e8744] font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
