import React, { useState } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { companyDetails } from '../data/projectsData';

/* Tab definitions — shorter labels for mobile */
const TABS = [
  { id: 'overview',     label: 'Overview',  mobileLabel: 'Overview'  },
  { id: 'amenities',    label: 'Amenities', mobileLabel: 'Amenities' },
  { id: 'connectivity', label: 'Location',  mobileLabel: 'Location'  },
  { id: 'inquire',      label: 'Book Visit',mobileLabel: 'Book'      },
];

export default function ProjectDetailModal({ project, onClose, onOpenScheduleModal }) {
  const [activeTab, setActiveTab]         = useState('overview');
  const [inquiryName, setInquiryName]     = useState('');
  const [inquiryPhone, setInquiryPhone]   = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [imgSrc, setImgSrc]               = useState(project.imageUrl);

  if (!project) return null;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setInquirySubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Uday Estate, I am interested in ${project.name} (${project.location}). Please share the brochure, pricing, and available units.`
  );

  const categoryColor =
    project.category === 'New Launch'      ? 'bg-[#059669] text-white' :
    project.category === 'Ready Possession'? 'bg-[#234e70] text-white' :
                                             'bg-amber-600 text-white';

  return (
    /* Full-screen overlay — scrolls itself on mobile */
    <div
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal card — full width on mobile, max 4xl on desktop */}
      <div className="relative w-full min-h-screen sm:min-h-0 sm:max-w-2xl md:max-w-4xl sm:mx-auto sm:my-8 bg-white sm:rounded-2xl shadow-2xl flex flex-col">

        {/* ── Close button ── */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Banner image ── */}
        <div className="relative h-52 sm:h-72 w-full overflow-hidden bg-slate-200 flex-shrink-0 sm:rounded-t-2xl">
          <img
            src={imgSrc}
            alt={project.name}
            onError={() => setImgSrc(project.backupImage)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide shadow-sm ${categoryColor}`}>
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-[#059669] border border-emerald-200">
              0% Brokerage
            </span>
          </div>

          {/* Title + price */}
          <div className="absolute bottom-3 left-3 right-12 text-white">
            <p className="text-[11px] uppercase font-bold tracking-wider text-emerald-300 mb-0.5">
              {project.developer}
            </p>
            <h2 className="text-lg sm:text-2xl font-extrabold leading-tight line-clamp-2">
              {project.name}
            </h2>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
              <p className="text-xs text-slate-300 flex items-center">
                <MapPin className="w-3 h-3 text-rose-400 mr-1 flex-shrink-0" />
                {project.location} &bull; {project.region}
              </p>
              <div className="bg-white/95 px-3 py-1 rounded-lg text-right flex-shrink-0">
                <span className="text-[9px] text-slate-500 block uppercase font-semibold tracking-wide">From</span>
                <span className="text-sm font-extrabold text-[#234e70] leading-none">{project.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── 4 equal-width tabs, no overflow ── */}
        <div className="flex border-b border-slate-200 bg-slate-50 flex-shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer border-b-2 px-1 text-center ${
                activeTab === tab.id
                  ? 'border-[#234e70] text-[#234e70] font-bold bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className="sm:hidden">{tab.mobileLabel}</span>
              <span className="hidden sm:inline">{tab.label}{tab.id === 'amenities' ? ` (${project.amenities.length})` : ''}</span>
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.overview} Designed for elevated urban living with intelligent layouts, sunlit rooms, premium finishes, and serene surroundings.
              </p>

              {/* Specs grid — 2 cols on mobile */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Config',      value: project.configurations },
                  { label: 'Carpet Area', value: project.carpetArea      },
                  { label: 'Possession',  value: project.possession      },
                  { label: 'Brokerage',   value: '0% Free', green: true  },
                ].map((s) => (
                  <div key={s.label} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{s.label}</span>
                    <span className={`text-xs sm:text-sm font-bold mt-1 block break-words ${s.green ? 'text-[#059669]' : 'text-slate-900'}`}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* RERA */}
              <div className="p-3.5 bg-[#234e70] rounded-xl text-white">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-300">Maharashtra Real Estate Regulatory Authority</p>
                    <p className="text-xs font-bold font-mono text-white mt-0.5 break-all">MahaRERA: {project.reraNumber}</p>
                  </div>
                  <span className="flex-shrink-0 text-[10px] bg-white/10 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Amenities */}
          {activeTab === 'amenities' && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Lifestyle &amp; Wellness — {project.amenities.length} Amenities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connectivity */}
          {activeTab === 'connectivity' && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Location &amp; Strategic Advantages
              </p>
              <div className="space-y-2">
                {project.connectivity.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Book Visit */}
          {activeTab === 'inquire' && (
            <div>
              {inquirySubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Inquiry Received!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto mb-5 leading-relaxed">
                    Our Senior Property Specialist for {project.name} will reach out within 15 minutes.
                  </p>
                  <a
                    href={`https://wa.me/${companyDetails.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] text-white rounded-xl text-xs font-bold hover:bg-[#0e8744] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Book a VIP site visit with complimentary door-to-door AC cab and zero brokerage guarantee.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-white bg-[#234e70] hover:bg-[#1E3A8A] shadow-sm transition-colors cursor-pointer"
                  >
                    Confirm VIP Site Visit Request
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* ── Sticky Footer — stacks on mobile ── */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0 sm:rounded-b-2xl">
          {/* Mobile: 2×2 grid | Desktop: single row */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2">
            <a
              href={`https://wa.me/${companyDetails.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-[#059669] hover:bg-[#0e8744] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${companyDetails.phone}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Call Advisor</span>
            </a>

            <button
              onClick={() => { onClose(); onOpenScheduleModal(project); }}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#234e70] hover:bg-[#1E3A8A] shadow-sm transition-colors cursor-pointer"
            >
              Schedule Site Visit &amp; Pick Up
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
