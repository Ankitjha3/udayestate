import React from 'react';
import { MapPin, ArrowRight, Building, TrendingUp } from 'lucide-react';

const hotspots = [
  {
    id: 'virar-vasai',
    name: 'Vasai & Virar City',
    filterLoc: 'Virar West',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    tagline: 'High Growth Corridor',
    priceRange: '₹37 L - ₹95 L',
    propertiesCount: '12+ Projects',
    description: 'Rapid infrastructure expansion with coastal road connectivity, upcoming metro line, and top-tier gated townships.'
  },
  {
    id: 'kandivali-borivali',
    name: 'Kandivali & Borivali West',
    filterLoc: 'Kandivali West',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Prime Western Suburbs',
    priceRange: '₹1.15 Cr - ₹4.75 Cr',
    propertiesCount: '8+ Projects',
    description: 'Premier connectivity via Metro Lines 2A & 7, Sanjay Gandhi National Park proximity, and grade-A towers.'
  },
  {
    id: 'khar-bandra',
    name: 'Khar & Western Corridor',
    filterLoc: 'Khar West',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Signature Luxury',
    priceRange: 'Price on Request',
    propertiesCount: '3+ Projects',
    description: 'Ultra-exclusive residential addresses offering bespoke penthouses, rapid BKC access, and elite community living.'
  },
  {
    id: 'vasai-east',
    name: 'Vasai East Townships',
    filterLoc: 'Vasai East',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tagline: 'Integrated Living',
    priceRange: '₹42 L - ₹92 L',
    propertiesCount: '5+ Projects',
    description: 'Excellent NH-48 connectivity, planned self-sustainable townships, lush green surroundings, and high rental demand.'
  }
];

export default function PrimeHotspots({ onSelectLocation }) {
  return (
    <section id="hotspots" className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#234e70] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#0e8744]" />
              <span>Explore By Region</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Prime Mumbai Localities
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Carefully vetted residential epicenters across Mumbai and the MMR with strong appreciation potential.
            </p>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs">
            <TrendingUp className="w-4 h-4 text-[#0e8744]" />
            <span>Average MMR Appreciation: 9.4% YoY</span>
          </div>
        </div>

        {/* Hotspots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => onSelectLocation(spot.filterLoc)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/90 text-slate-800 shadow-xs">
                      {spot.tagline}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white flex justify-between items-baseline text-xs">
                    <span className="font-semibold text-slate-200 flex items-center">
                      <Building className="w-3.5 h-3.5 mr-1" />
                      {spot.propertiesCount}
                    </span>
                    <span className="font-bold text-white">
                      {spot.priceRange}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#234e70] transition-colors mb-1">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              </div>

              {/* Bottom trigger */}
              <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#234e70] group-hover:text-[#0e8744] transition-colors">
                <span>View Projects in {spot.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
