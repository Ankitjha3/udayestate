import React from 'react';
import {
  Search,
  MapPin,
  Home,
  IndianRupee,
  RotateCcw,
  LayoutGrid,
  List,
} from 'lucide-react';
import { filterOptions } from '../data/projectsData';

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedBhk,
  setSelectedBhk,
  selectedStatus,
  setSelectedStatus,
  selectedBudget,
  setSelectedBudget,
  onResetFilters,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
}) {
  const popularLocalities = ['Virar West', 'Vasai East', 'Kandivali West', 'Borivali West', 'Khar West'];

  const inputBase =
    'w-full bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#234e70]/20 focus:border-[#234e70] transition-colors';

  return (
    /* No negative margin — sits cleanly below the hero on all screen sizes */
    <div className="w-full bg-[#f8fafc] border-b border-slate-200 py-4 sm:py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-4 sm:p-6 w-full">

          {/* ── Status Tabs + View Switcher ── */}
          <div className="flex flex-col gap-3 pb-4 border-b border-slate-100">
            {/* Scrollable tab row */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full pb-0.5">
              {filterOptions.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedStatus(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedStatus === cat
                      ? 'bg-[#234e70] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Count + view switcher */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Found <strong className="text-slate-900">{filteredCount}</strong> Verified Projects
              </span>
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-[#234e70]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white shadow-xs text-[#234e70]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Filter Inputs ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

            {/* Select Locality */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Select Locality
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#234e70] pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`${inputBase} pl-9 pr-3 py-2.5 cursor-pointer appearance-none`}
                >
                  {filterOptions.locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project or Builder search */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Project or Builder
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search e.g. Evershine, Cosmos…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${inputBase} pl-9 pr-3 py-2.5 placeholder:text-slate-400`}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Bedrooms
              </label>
              <div className="relative">
                <Home className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  className={`${inputBase} pl-9 pr-3 py-2.5 cursor-pointer appearance-none`}
                >
                  {filterOptions.configurations.map((bhk) => (
                    <option key={bhk} value={bhk}>{bhk}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Budget Range
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className={`${inputBase} pl-9 pr-3 py-2.5 cursor-pointer appearance-none`}
                >
                  {filterOptions.budgetRanges.map((r) => (
                    <option key={r.label} value={r.label}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Popular Localities ── */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-600 shrink-0">Popular:</span>
              {popularLocalities.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer shrink-0 ${
                    selectedLocation === loc
                      ? 'bg-[#234e70] text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#234e70]'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Reset */}
            {(searchTerm ||
              selectedLocation !== 'All Locations' ||
              selectedBhk !== 'All Configurations' ||
              selectedStatus !== 'All Projects' ||
              selectedBudget !== 'All Budgets') && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset Filters
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
