import React from 'react';
import {
  BadgePercent,
  ShieldCheck,
  Car,
  Clock,
  FileText,
  Headphones,
  CheckCircle,
} from 'lucide-react';

const pillars = [
  {
    icon: BadgePercent,
    title: 'Zero Brokerage Guarantee',
    description: '100% transparent and completely free consultation for homebuyers. You never pay a single rupee in commission fees.',
  },
  {
    icon: ShieldCheck,
    title: '100% MahaRERA Verified',
    description: 'Every project in our catalog is legally vetted, registered with MahaRERA, and approved by premier Indian banks.',
  },
  {
    icon: Car,
    title: 'Complimentary VIP Cab Visit',
    description: 'Enjoy free door-to-door AC cab pickup and drop for you and your family to tour shortlisted show-apartments.',
  },
  {
    icon: Clock,
    title: '15+ Years Industry Heritage',
    description: 'Backed by over a decade and a half of advisory excellence, helping thousands of families secure their forever homes.',
  },
  {
    icon: FileText,
    title: 'Seamless Home Loan & Legal Help',
    description: 'Our in-house documentation experts coordinate loan approvals, stamp duty registration, and title checks with ease.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Property Concierge',
    description: 'One point of contact dedicated to your budget, scheduling viewings, and securing pre-launch prices.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#059669] mb-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>The Uday Estate Advantage</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Homebuyers Choose Us
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            We simplify Mumbai's real estate market with uncompromised integrity, verified documentation, and personalised care — at zero broker fees.
          </p>
        </div>

        {/* ── 6 Pillars Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#234e70]/40 hover:bg-white hover:shadow-card-hover transition-all duration-300 group"
              >
                {/* Icon box — corporate navy bg + white icon, hover turns green */}
                <div className="w-11 h-11 rounded-xl bg-[#234e70] text-white flex items-center justify-center mb-5 group-hover:bg-[#059669] transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Value Callout Banner ── */}
        <div className="mt-14 bg-[#234e70] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white">
              Looking for tailored recommendations?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl leading-relaxed">
              Tell our property advisors your budget, preferred locality, and family requirements — receive a curated project portfolio within minutes.
            </p>
          </div>
          <div className="w-full md:w-auto flex-shrink-0">
            <a
              href="tel:+919820045678"
              className="w-full md:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#059669] hover:bg-[#0e8744] transition-colors text-center whitespace-nowrap inline-block shadow-sm"
            >
              Speak With Senior Consultant
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
