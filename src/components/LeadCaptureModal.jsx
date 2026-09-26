import React, { useState } from 'react';
import { X, CheckCircle2, Car, Calendar, Phone, Mail, User, MessageCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { companyDetails, filterOptions } from '../data/projectsData';

export default function LeadCaptureModal({ isOpen, onClose, preselectedProject }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredLocality, setPreferredLocality] = useState(
    preselectedProject ? preselectedProject.location : 'Virar West'
  );
  const [visitDate, setVisitDate] = useState('');
  const [needCab, setNeedCab] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Uday Estate, I would like to schedule a site visit${
      preselectedProject ? ` for ${preselectedProject.name}` : ''
    }. Name: ${fullName}, Phone: ${phone}, Date: ${visitDate || 'This Weekend'}, Cab Pickup: ${
      needCab ? 'Yes' : 'No'
    }.`
  );

  /* shared input class */
  const inputCls =
    'w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] outline-none transition';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">

        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── Success State ── */}
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#059669] flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-sans text-2xl font-extrabold text-slate-900 mb-2">
              Site Visit Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-slate-900">{fullName}</strong>! Our relationship manager has reserved your VIP appointment{needCab && ' with complimentary cab pickup'}.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left text-slate-700 space-y-1.5 mb-6">
              <p><strong>Property:</strong> {preselectedProject ? preselectedProject.name : 'Curated Tour'}</p>
              <p><strong>Locality:</strong> {preferredLocality}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Brokerage Fee:</strong> <span className="text-[#059669] font-bold">₹0 (Zero Brokerage)</span></p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${companyDetails.whatsapp}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#059669] hover:bg-[#0e8744] flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Receive Details on WhatsApp</span>
              </a>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl font-semibold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Done &amp; Close
              </button>
            </div>
          </div>
        ) : (

          <div>
            {/* ── Corporate Modal Header ── */}
            <div className="bg-[#234e70] text-white p-6 sm:p-7 relative">
              {/* Trust pill */}
              <div className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-2">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Brokerage &bull; RERA Verified</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white">
                {preselectedProject
                  ? `Schedule Visit: ${preselectedProject.name}`
                  : 'Book Complimentary Site Visit'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Tour sample apartments with free AC cab pickup &amp; drop — 100% free, no obligation.
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Locality */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Locality</label>
                  <select
                    value={preferredLocality}
                    onChange={(e) => setPreferredLocality(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] outline-none transition"
                  >
                    {filterOptions.locations
                      .filter((l) => l !== 'All Locations')
                      .map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                  </select>
                </div>
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Visit Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] outline-none transition text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Free Cab Toggle */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#059669]/10 text-[#059669] flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Complimentary AC Cab</span>
                    <span className="text-[10px] text-slate-500">Pick up &amp; drop from your doorstep</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={needCab}
                  onChange={(e) => setNeedCab(e.target.checked)}
                  className="w-4 h-4 accent-[#059669] rounded cursor-pointer"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#234e70] hover:bg-[#1E3A8A] shadow-sm transition-colors cursor-pointer"
              >
                Confirm Free Site Visit Booking
              </button>

              <p className="text-[10px] text-center text-slate-400">
                100% Privacy Protected &bull; Zero Spam &bull; Zero Brokerage Always
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
