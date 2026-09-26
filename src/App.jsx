import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchFilter from './components/SearchFilter';
import ProjectCatalog from './components/ProjectCatalog';
import PrimeHotspots from './components/PrimeHotspots';
import EmiCalculator from './components/EmiCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import DeveloperPartners from './components/DeveloperPartners';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ProjectDetailModal from './components/ProjectDetailModal';
import LeadCaptureModal from './components/LeadCaptureModal';
import AdminPanel from './admin/AdminPanel';
import useProjects from './hooks/useProjects';
import { filterOptions } from './data/projectsData';

/* ─── Main public site ─────────────────────────────────────────── */
function MainSite({ publicProjects }) {
  const [searchTerm, setSearchTerm]         = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedBhk, setSelectedBhk]       = useState('All Configurations');
  const [selectedStatus, setSelectedStatus] = useState('All Projects');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [sortBy, setSortBy]                 = useState('featured');
  const [viewMode, setViewMode]             = useState('grid');
  const [activeProjectDetail, setActiveProjectDetail] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen]     = useState(false);
  const [preselectedProject, setPreselectedProject]   = useState(null);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('All Locations');
    setSelectedBhk('All Configurations');
    setSelectedStatus('All Projects');
    setSelectedBudget('All Budgets');
    setSortBy('featured');
  };

  const handleCategorySelect = (category) => {
    setSelectedStatus(category);
    document.getElementById('properties-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLocationSelect = (loc) => {
    setSelectedLocation(loc);
    document.getElementById('properties-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenScheduleModal = (project = null) => {
    setPreselectedProject(project);
    setScheduleModalOpen(true);
  };

  const filteredProjects = useMemo(() => {
    return publicProjects.filter((project) => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (
          !project.name.toLowerCase().includes(q) &&
          !project.developer.toLowerCase().includes(q) &&
          !project.location.toLowerCase().includes(q)
        ) return false;
      }
      if (selectedLocation !== 'All Locations') {
        if (!project.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      }
      if (selectedBhk !== 'All Configurations') {
        if (!project.configurations.includes(selectedBhk)) return false;
      }
      if (selectedStatus !== 'All Projects') {
        if (selectedStatus === 'Hot Deals') {
          if (!project.hotDeal) return false;
        } else if (selectedStatus === 'New Launch') {
          if (project.category !== 'New Launch') return false;
        } else if (selectedStatus === 'Ready Possession') {
          if (project.category !== 'Ready Possession') return false;
        } else if (selectedStatus === 'Under Construction') {
          if (project.category !== 'Under Construction' && project.category !== 'Nearing Possession') return false;
        }
      }
      if (selectedBudget !== 'All Budgets') {
        const range = filterOptions.budgetRanges.find((b) => b.label === selectedBudget);
        if (range) {
          const val = project.priceValue;
          if (val !== 999999 && (val < range.min || val > range.max)) return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low')  return a.priceValue - b.priceValue;
      if (sortBy === 'price-high') return b.priceValue - a.priceValue;
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [publicProjects, searchTerm, selectedLocation, selectedBhk, selectedStatus, selectedBudget, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#234e70]/20 selection:text-[#234e70]">
      <Navbar
        onOpenScheduleModal={() => handleOpenScheduleModal()}
        onFilterCategory={handleCategorySelect}
      />

      <Hero
        onExploreClick={() => document.getElementById('properties-catalog')?.scrollIntoView({ behavior: 'smooth' })}
        onOpenScheduleModal={() => handleOpenScheduleModal()}
      />

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedBhk={selectedBhk}
        setSelectedBhk={setSelectedBhk}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        onResetFilters={handleResetFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredCount={filteredProjects.length}
        totalCount={publicProjects.length}
      />

      <main className="flex-1">
        <ProjectCatalog
          projects={filteredProjects}
          onSelectProject={(proj) => setActiveProjectDetail(proj)}
          onOpenScheduleModal={(proj) => handleOpenScheduleModal(proj)}
          viewMode={viewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <PrimeHotspots onSelectLocation={handleLocationSelect} />
        <EmiCalculator onOpenScheduleModal={() => handleOpenScheduleModal()} />
        <WhyChooseUs />
        <DeveloperPartners />
        <Testimonials />
      </main>

      <Footer
        onFilterCategory={handleCategorySelect}
        onFilterLocation={handleLocationSelect}
      />

      <FloatingActions onOpenScheduleModal={() => handleOpenScheduleModal()} />

      {activeProjectDetail && (
        <ProjectDetailModal
          project={activeProjectDetail}
          onClose={() => setActiveProjectDetail(null)}
          onOpenScheduleModal={(proj) => handleOpenScheduleModal(proj)}
        />
      )}

      <LeadCaptureModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        preselectedProject={preselectedProject}
      />
    </div>
  );
}

/* ─── Root with router ─────────────────────────────────────────── */
export default function App() {
  const {
    allProjects,
    publicProjects,
    hiddenIds,
    deleteProject,
    toggleVisibility,
    addProject,
    resetToDefaults,
  } = useProjects();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite publicProjects={publicProjects} />} />
        <Route
          path="/admin"
          element={
            <AdminPanel
              allProjects={allProjects}
              publicProjects={publicProjects}
              hiddenIds={hiddenIds}
              deleteProject={deleteProject}
              toggleVisibility={toggleVisibility}
              addProject={addProject}
              resetToDefaults={resetToDefaults}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
