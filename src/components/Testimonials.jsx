import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: 'Rajesh & Sneha Mehta',
    location: 'Borivali West, Mumbai',
    project: 'Purchased at Inspira Aura',
    rating: 5,
    review:
      'Uday Estate made our first home purchase totally stress-free. True to their word, there was absolutely zero brokerage charged. They arranged 3 site visits with AC cabs and helped us negotiate a great pre-launch price.',
  },
  {
    name: 'Vikram Singhania',
    location: 'Kandivali West',
    project: 'Purchased at Sheth Edmont',
    rating: 5,
    review:
      'The legal team at Uday Estate verified all RERA sanctions before we even paid the token amount. Their advisory is prompt, honest, and truly client-first. Highly recommended to anyone looking for premium residences.',
  },
  {
    name: 'Anita & Pradeep Deshmukh',
    location: 'Vasai East',
    project: 'Purchased at Agarwal Sky Heights',
    rating: 5,
    review:
      'From loan approval at 8.4% through SBI to registration paperwork, the Uday Estate relationship manager was with us every step. We saved more than ₹1.5 Lakhs in brokerage alone!',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#059669] mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Buyer Testimonials</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900">
            Trusted by 1,200+ Families
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Real stories from homeowners who found their dream residences with Uday Estate.
          </p>
        </div>

        {/* ── Review Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-card-hover hover:border-[#234e70]/30 transition-all duration-300"
            >
              <div>
                {/* Stars & Quote icon */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              {/* Reviewer info */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{rev.location}</p>
                  <p className="text-[10px] font-semibold text-[#234e70] mt-0.5">{rev.project}</p>
                </div>
                <div className="flex items-center text-[10px] font-semibold text-[#059669] bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
