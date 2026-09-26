import React from 'react';
import { 
  ShieldCheck, 
  Car, 
  BadgePercent, 
  ArrowRight, 
  Building2, 
  Award,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function Hero({ onExploreClick, onOpenScheduleModal }) {
  return (
    <section id="home" className="relative pt-20 sm:pt-24 pb-14 sm:pb-20 bg-[#ecf1f8] border-b border-slate-200 overflow-hidden">
      {/* Subtle modern architectural backdrop */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0e8744]"></span>
            <span className="text-xs font-semibold text-slate-700">
              MahaRERA Registered Advisory &bull; Mumbai MMR
            </span>
          </div>

          {/* Main Headline (Housiey & HomeBazaar style) */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#234e70] tracking-tight leading-[1.2] mb-4">
            Buy Homes Directly <br />
            <span className="text-[#0e8744]">With 100% Zero Brokerage</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
            Discover verified new launches and ready-to-move residences across Virar, Vasai, Kandivali, Borivali & Mumbai with direct builder pricing and free doorstep AC cab viewings.
          </p>

          {/* Value Pills Bar (Housiey style) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white/90 backdrop-blur-sm border border-slate-200/80 p-2 sm:px-5 sm:py-2.5 rounded-full shadow-xs mb-8 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center space-x-1.5 text-[#0e8744]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Brokerage</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <div className="flex items-center space-x-1.5 text-[#234e70]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Developer Rates</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <div className="flex items-center space-x-1.5 text-slate-700">
              <Car className="w-4 h-4 text-[#0e8744]" />
              <span>Free Doorstep Cab Visit</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#234e70] hover:bg-[#1a3d59] shadow-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Browse 25 Verified Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenScheduleModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Car className="w-4 h-4 text-[#0e8744]" />
              <span>Book Free Site Visit (AC Cab)</span>
            </button>
          </div>
        </div>

        {/* 4 Trust Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200/80">
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#234e70]">0%</p>
            <p className="text-xs text-slate-600 font-medium mt-0.5">Brokerage Fee Ever</p>
          </div>
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#234e70]">100%</p>
            <p className="text-xs text-slate-600 font-medium mt-0.5">MahaRERA Verified</p>
          </div>
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#234e70]">25+</p>
            <p className="text-xs text-slate-600 font-medium mt-0.5">Top Mumbai Projects</p>
          </div>
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#234e70]">15+ Yrs</p>
            <p className="text-xs text-slate-600 font-medium mt-0.5">Advisory Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
