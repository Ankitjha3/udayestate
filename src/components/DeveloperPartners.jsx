import React from 'react';
import { Building2, BadgeCheck } from 'lucide-react';

const developers = [
  { name: 'Kalpataru Limited',  projectsCount: '3+ Projects',    tag: 'Grade A Tier 1'         },
  { name: 'Evershine Group',    projectsCount: '5+ Projects',    tag: 'Legacy Builder'          },
  { name: 'Tata Housing',       projectsCount: 'Grade-A Partner',tag: 'Tata Enterprise'         },
  { name: 'The Wadhwa Group',   projectsCount: 'Iconic Landmarks',tag: 'Award Winning'          },
  { name: 'Agarwal Group',      projectsCount: '6+ Townships',   tag: 'Vasai-Virar Leader'      },
  { name: 'Sheth Creators',     projectsCount: '4+ High-rises',  tag: 'Architectural Pioneer'   },
  { name: 'Cosmos Group',       projectsCount: '3+ Projects',    tag: 'Integrated Living'       },
  { name: 'Shripal Group',      projectsCount: '3+ Projects',    tag: 'Modern Lifestyle'        },
];

export default function DeveloperPartners() {
  return (
    <section id="partners" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#059669] mb-2">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Authorized Developer Network</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900">
            Top Builders &amp; Associates
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Directly partnered with Mumbai's most celebrated real estate developers to secure verified inventory, pre-launch discounts, and priority unit allocations.
          </p>
        </div>

        {/* ── Developer Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {developers.map((dev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-[#234e70]/40 hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-[#234e70] text-slate-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-300">
                <Building2 className="w-5 h-5" />
              </div>
              {/* Tag */}
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#059669] mb-1">
                {dev.tag}
              </span>
              {/* Name */}
              <h4 className="font-sans text-sm font-bold text-slate-900 group-hover:text-[#234e70] transition-colors leading-snug">
                {dev.name}
              </h4>
              {/* Count */}
              <p className="text-xs text-slate-400 mt-1">{dev.projectsCount}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
