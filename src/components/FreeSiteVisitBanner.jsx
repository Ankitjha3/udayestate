import React, { useState } from 'react';
import { Car, ShieldCheck, CheckCircle2, Phone, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FreeSiteVisitBanner({ onOpenScheduleModal }) {
  const [phone, setPhone] = useState('');
  const [projectSelect, setProjectSelect] = useState('All Shortlisted Projects');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 }
    });
    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#234e70] rounded-2xl text-white p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle background graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
            <Car className="w-full h-full object-contain -mr-16" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 mb-3 backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Free Doorstep Cab Service</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Tour Show Apartments with Free AC Cab Pickup
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Don't worry about Mumbai traffic. Uday Estate provides free doorstep AC cab pickup and drop for you and your family to tour verified sample flats.
            </p>

            <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-300">
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" /> Zero Brokerage</span>
              <span className="flex items-center"><Car className="w-4 h-4 text-emerald-400 mr-1.5" /> Doorstep Pickup & Drop</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 text-emerald-400 mr-1.5" /> Flexible Weekend Slots</span>
            </div>
          </div>

          {/* Quick Booking Form */}
          <div className="relative z-10 w-full lg:w-96 bg-white rounded-xl p-5 text-slate-800 shadow-md">
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Cab Visit Reserved!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Our site visit coordinator will call you on <strong>{phone}</strong> to confirm your pickup address and time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Schedule Free Cab Visit</span>
                  <span className="text-[10px] bg-emerald-100 text-[#0e8744] font-bold px-2 py-0.5 rounded">
                    100% FREE
                  </span>
                </h4>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Select Locality or Project
                  </label>
                  <select
                    value={projectSelect}
                    onChange={(e) => setProjectSelect(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#234e70] focus:border-[#234e70] bg-slate-50"
                  >
                    <option value="All Shortlisted Projects">All Shortlisted Projects (Custom Tour)</option>
                    <option value="Virar West Projects">Virar West Projects</option>
                    <option value="Vasai East Projects">Vasai East Projects</option>
                    <option value="Kandivali & Borivali">Kandivali & Borivali West Projects</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Your Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#234e70] focus:border-[#234e70]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-[#0e8744] hover:bg-[#0b6b36] transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Car className="w-4 h-4" />
                  <span>Confirm Free Cab Booking</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
