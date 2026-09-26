import React, { useState } from 'react';
import { 
  MapPin, 
  Home, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  Car, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

export default function ProjectCard({ project, onSelect, onOpenScheduleModal, viewMode = 'grid' }) {
  const [imgSrc, setImgSrc] = useState(project.imageUrl);
  const [hasError, setHasError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleImgError = () => {
    if (!hasError) {
      setImgSrc(project.backupImage);
      setHasError(true);
    }
  };

  // Estimate monthly EMI based on numeric price value (in Lakhs)
  const getEstimatedEmi = (val) => {
    if (!val || val === 999999) return 'Flexible EMI Options';
    // 8.5% interest, 20 years -> roughly ~₹868 per lakh borrowed (assuming 80% loan)
    const loanLakhs = val * 0.8;
    const emi = Math.round(loanLakhs * 868);
    if (emi >= 100000) {
      return `EMI starts at ₹${(emi / 100000).toFixed(2)} L/mo`;
    }
    return `EMI starts at ₹${(emi / 1000).toFixed(1)} K/mo`;
  };

  const getStatusBadge = (category) => {
    switch (category) {
      case 'New Launch':
        return 'bg-[#0e8744] text-white';
      case 'Ready Possession':
        return 'bg-[#234e70] text-white';
      case 'Nearing Possession':
        return 'bg-indigo-700 text-white';
      case 'Under Construction':
      default:
        return 'bg-amber-600 text-white';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col md:flex-row group">
        {/* Image side */}
        <div className="md:w-80 h-52 md:h-auto relative overflow-hidden flex-shrink-0 bg-slate-100">
          <img
            src={imgSrc}
            alt={project.name}
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shadow-xs ${getStatusBadge(project.category)}`}>
              {project.category}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer ${
              isLiked ? 'bg-white text-rose-600 shadow-sm' : 'bg-black/40 text-white hover:bg-white hover:text-rose-600'
            }`}
            aria-label="Save property"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
          </button>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center text-[10px] text-white">
            <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded font-medium">
              RERA: {project.reraNumber}
            </span>
            <span className="bg-[#0e8744] px-2 py-0.5 rounded font-bold">
              0% Brokerage
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {project.developer}
                </p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#234e70] transition-colors">
                  {project.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-lg sm:text-xl font-extrabold text-[#234e70]">
                  {project.price}
                </span>
                <span className="block text-[11px] text-slate-500 font-medium">
                  {getEstimatedEmi(project.priceValue)}
                </span>
              </div>
            </div>

            <div className="flex items-center text-xs text-slate-600 mb-3">
              <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
              <span>{project.location} &bull; {project.region}</span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {project.overview}
            </p>

            {/* Spec pills */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-700 mb-4">
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium">
                {project.configurations}
              </span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium">
                Carpet: {project.carpetArea}
              </span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium">
                Possession: {project.possession}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-xs text-emerald-700 font-semibold flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-[#0e8744]" /> 100% Verified Developer
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelect(project)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                View Details
              </button>
              <button
                onClick={() => onOpenScheduleModal(project)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0e8744] hover:bg-[#0b6b36] rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Book Free Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col group h-full">
      {/* Property Hero Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={project.name}
          onError={handleImgError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Status Tag */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shadow-xs ${getStatusBadge(project.category)}`}>
            {project.category}
          </span>
          {project.hotDeal && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white shadow-xs">
              Special Deal
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer z-10 ${
            isLiked ? 'bg-white text-rose-600 shadow-sm' : 'bg-black/40 text-white hover:bg-white hover:text-rose-600'
          }`}
          aria-label="Save property"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Bottom image metadata */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex justify-between items-center text-[10px] text-white z-10">
          <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
            Carpet: {project.carpetArea}
          </span>
          <span className="bg-[#0e8744] font-bold px-2 py-0.5 rounded">
            Zero Brokerage
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
            {project.developer}
          </p>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#234e70] transition-colors line-clamp-1 mb-1">
            {project.name}
          </h3>

          <div className="flex items-center text-xs text-slate-600 mb-3">
            <MapPin className="w-3 h-3 text-slate-400 mr-1 flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>

          {/* Structured specs row (HomeBazaar style) */}
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-xs text-slate-700 space-y-1 mb-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Configurations</span>
              <span className="font-bold text-slate-900">{project.configurations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Possession</span>
              <span className="font-semibold text-slate-800">{project.possession}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-base sm:text-lg font-extrabold text-[#234e70] block leading-none">
                {project.price}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-1 block">
                {getEstimatedEmi(project.priceValue)}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold">
              RERA Verified
            </span>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(project)}
              className="py-2 px-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors text-center cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={() => onOpenScheduleModal(project)}
              className="py-2 px-2 text-xs font-bold text-white bg-[#0e8744] hover:bg-[#0b6b36] rounded-lg shadow-xs text-center flex items-center justify-center space-x-1 transition-colors cursor-pointer"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Free Visit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
