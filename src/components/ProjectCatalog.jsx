import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { ArrowUpDown, Building } from 'lucide-react';

export default function ProjectCatalog({
  projects,
  onSelectProject,
  onOpenScheduleModal,
  viewMode,
  sortBy,
  setSortBy
}) {
  const [displayCount, setDisplayCount] = useState(12);

  const displayedProjects = projects.slice(0, displayCount);

  return (
    <section id="properties-catalog" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#234e70] mb-1">
            <Building className="w-3.5 h-3.5 text-[#0e8744]" />
            <span>RERA Approved Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Featured Residential Projects
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Browse verified residences with direct developer pricing, clear titles, and 100% zero brokerage advisory.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-600 flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-slate-400" /> Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#234e70] cursor-pointer shadow-xs"
          >
            <option value="featured">Featured Projects</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Project Name (A to Z)</option>
          </select>
        </div>
      </div>

      {/* Projects Grid or List */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-6">
          <p className="text-lg font-bold text-slate-800 mb-1">No matching projects found</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We couldn't find any developments matching your selected filters. Try broadening your location or budget selection.
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }
          >
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
                onSelect={onSelectProject}
                onOpenScheduleModal={onOpenScheduleModal}
              />
            ))}
          </div>

          {/* Load More Button */}
          {displayCount < projects.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setDisplayCount((prev) => Math.min(prev + 9, projects.length))}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
              >
                Load More Projects ({projects.length - displayCount} Remaining)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
