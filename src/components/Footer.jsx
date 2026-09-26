import React from 'react';
import { Building2, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { companyDetails } from '../data/projectsData';

export default function Footer({ onFilterCategory, onFilterLocation }) {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src="/assets/uday-estate-logo-light.svg"
                alt="Uday Estate"
                className="h-14 w-auto object-contain"
                draggable="false"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Uday Estate brings over 15 years of expertise in Maharashtra real estate. As a MAHARERA registered advisor, we help homebuyers discover their perfect home with complete transparency and 100% Zero Brokerage.
            </p>

            {/* RERA badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-xl text-xs text-[#059669] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>{companyDetails.reraNumber}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#059669] mb-4">
              Explore Properties
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'All 25 Listings',           cat: 'All Projects'        },
                { label: 'New Launches',               cat: 'New Launch'          },
                { label: 'Ready Possession Homes',     cat: 'Ready Possession'    },
                { label: 'Under Construction',         cat: 'Under Construction'  },
                { label: 'Hot Deals & Special Pricing',cat: 'Hot Deals'           },
              ].map((item) => (
                <li key={item.cat}>
                  <button
                    onClick={() => onFilterCategory(item.cat)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Micro-markets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#059669] mb-4">
              Trending Localities
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Virar West Properties',     loc: 'Virar West'      },
                { label: 'Vasai East Townships',      loc: 'Vasai East'      },
                { label: 'Kandivali West Luxury',     loc: 'Kandivali West'  },
                { label: 'Borivali West High-rises',  loc: 'Borivali West'   },
                { label: 'Khar West Signature',       loc: 'Khar West'       },
              ].map((item) => (
                <li key={item.loc}>
                  <button
                    onClick={() => onFilterLocation(item.loc)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#059669] mb-4">
              Advisory Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                <span>{companyDetails.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#059669] flex-shrink-0" />
                <a href={`tel:${companyDetails.phone}`} className="hover:text-white transition-colors">
                  {companyDetails.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#059669] flex-shrink-0" />
                <a href={`mailto:${companyDetails.email}`} className="hover:text-white transition-colors">
                  {companyDetails.email}
                </a>
              </div>
              <div className="pt-1 text-[11px] text-slate-500">
                Hours: {companyDetails.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* ── MahaRERA Legal Disclaimer ── */}
        <div className="pt-8 pb-4 text-[11px] text-slate-500 leading-relaxed border-b border-slate-800">
          <p className="mb-2">
            <strong>MahaRERA Statutory Disclaimer:</strong> {companyDetails.name} is a verified channel partner and advisory firm registered under the Real Estate (Regulation and Development) Act, 2016 ({companyDetails.reraNumber}). All project details, prices, specifications, and renderings are provided directly from respective developer partners for informational purposes. Final prices and agreements are governed solely by registered builder-buyer contracts.
          </p>
          <p>Zero brokerage applies to all primary developer bookings facilitated through Uday Estate.</p>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {companyDetails.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">RERA Disclosures</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
