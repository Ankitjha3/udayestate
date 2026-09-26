import React, { useState } from 'react';
import { IndianRupee, Percent, Clock, ArrowRight } from 'lucide-react';

/* ── Custom range slider styles injected once ── */
const sliderStyles = `
  .emi-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 999px;
    outline: none;
    cursor: pointer;
    background: linear-gradient(to right, #234e70 0%, #234e70 var(--pct, 50%), #e2e8f0 var(--pct, 50%), #e2e8f0 100%);
    transition: background 0.1s;
  }
  .emi-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #234e70;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 8px rgba(35,78,112,0.35);
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .emi-slider::-webkit-slider-thumb:hover,
  .emi-slider:active::-webkit-slider-thumb {
    transform: scale(1.2);
    box-shadow: 0 4px 14px rgba(35,78,112,0.45);
  }
  .emi-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #234e70;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 8px rgba(35,78,112,0.35);
    cursor: pointer;
  }
  .emi-slider::-moz-range-track {
    height: 8px;
    border-radius: 999px;
    background: #e2e8f0;
  }
`;

function SliderRow({ icon: Icon, label, value, display, min, max, step, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      {/* Label + Value */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#234e70]/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-[#234e70]" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-lg font-extrabold text-[#234e70] font-mono tabular-nums">{display}</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="emi-slider"
        style={{ '--pct': `${pct}%` }}
      />

      {/* Min / Mid / Max labels */}
      <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono select-none">
        <span>{min < 100 ? `${min}%` : min >= 1000000 ? `₹${(min / 100000).toFixed(0)}L` : `${min} Yrs`}</span>
        <span className="text-slate-300">
          {min < 100
            ? `${((min + max) / 2).toFixed(1)}%`
            : min >= 1000000
            ? `₹${((min + max) / 2 / 100000).toFixed(0)}L`
            : `${Math.round((min + max) / 2)} Yrs`}
        </span>
        <span>{min < 100 ? `${max}%` : min >= 1000000 ? `₹${(max / 10000000).toFixed(1)}Cr` : `${max} Yrs`}</span>
      </div>
    </div>
  );
}

export default function EmiCalculator({ onOpenScheduleModal }) {
  const [loanAmount, setLoanAmount]   = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const calculateEmi = () => {
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return Math.round(loanAmount / n);
    return Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const monthlyEmi   = calculateEmi();
  const totalPayment = monthlyEmi * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;
  const principalPct = Math.round((loanAmount / totalPayment) * 100);
  const interestPct  = 100 - principalPct;

  const fmt = (v) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  const fmtLoan = (v) => {
    if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
    if (v >= 100000)   return `₹${(v / 100000).toFixed(2)} L`;
    return `₹${v.toLocaleString('en-IN')}`;
  };

  const banks = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak'];

  return (
    <>
      <style>{sliderStyles}</style>
      <section id="calculator" className="py-16 sm:py-20 bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0e8744] mb-2">Financial Planning Tool</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#234e70]">Home Loan EMI Calculator</h2>
              <p className="text-sm text-slate-500 mt-2 max-w-lg leading-relaxed">
                Estimate your monthly instalment instantly. Connect with our banking partners for preferential rates starting at 8.35%*.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {banks.map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* ── Sliders col ── */}
            <div className="lg:col-span-7 space-y-4">
              <SliderRow
                icon={IndianRupee}
                label="Loan Amount"
                value={loanAmount}
                display={fmtLoan(loanAmount)}
                min={1000000}
                max={30000000}
                step={200000}
                onChange={setLoanAmount}
              />
              <SliderRow
                icon={Percent}
                label="Interest Rate"
                value={interestRate}
                display={`${interestRate.toFixed(1)}% p.a.`}
                min={7.0}
                max={12.0}
                step={0.1}
                onChange={setInterestRate}
              />
              <SliderRow
                icon={Clock}
                label="Loan Tenure"
                value={tenureYears}
                display={`${tenureYears} Yrs (${tenureYears * 12} Mo)`}
                min={5}
                max={30}
                step={1}
                onChange={setTenureYears}
              />

              {/* Quick-select chips for common loan amounts (mobile-friendly) */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Quick Select Loan Amount</p>
                <div className="flex flex-wrap gap-2">
                  {[2000000, 3500000, 5000000, 7500000, 10000000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setLoanAmount(amt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        loanAmount === amt
                          ? 'bg-[#234e70] text-white border-[#234e70]'
                          : 'bg-white border-slate-300 text-slate-700 hover:border-[#234e70] hover:text-[#234e70]'
                      }`}
                    >
                      {fmtLoan(amt)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Results card ── */}
            <div className="lg:col-span-5">
              <div className="bg-[#234e70] text-white rounded-2xl p-6 sm:p-7 shadow-lg">

                {/* Monthly EMI headline */}
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Monthly EMI</p>
                <div className="text-3xl sm:text-4xl font-extrabold tabular-nums mb-0.5">{fmt(monthlyEmi)}</div>
                <p className="text-xs text-blue-200 mb-6">Estimated monthly instalment</p>

                {/* Breakdown */}
                <div className="space-y-3 border-t border-white/20 pt-5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Principal Loan</span>
                    <span className="font-semibold font-mono tabular-nums">{fmt(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Total Interest</span>
                    <span className="font-semibold font-mono tabular-nums">{fmt(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/20 pt-3">
                    <span className="text-blue-200 font-semibold">Total Payable</span>
                    <span className="font-extrabold font-mono tabular-nums">{fmt(totalPayment)}</span>
                  </div>
                </div>

                {/* Principal vs Interest bar — bigger & more visible */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-blue-200 mb-2 font-semibold">
                    <span>Principal — {principalPct}%</span>
                    <span>Interest — {interestPct}%</span>
                  </div>
                  {/* Thick 14px bar */}
                  <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-white/15">
                    <div
                      style={{ width: `${principalPct}%` }}
                      className="bg-[#059669] h-full rounded-l-full transition-all duration-500"
                    />
                    <div
                      style={{ width: `${interestPct}%` }}
                      className="bg-white/40 h-full rounded-r-full transition-all duration-500"
                    />
                  </div>
                  {/* Legend dots */}
                  <div className="flex items-center gap-4 mt-2.5 text-[11px] text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#059669] inline-block flex-shrink-0" />
                      Principal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-white/40 inline-block flex-shrink-0" />
                      Interest
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onOpenScheduleModal()}
                  className="mt-6 w-full py-3 rounded-xl text-sm font-bold bg-[#059669] hover:bg-[#0e8744] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Get Home Loan Assistance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-blue-200 text-center mt-2">
                  *Rates vary by credit profile &amp; bank
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
