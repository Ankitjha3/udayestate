import React, { useState, useRef } from 'react';
import {
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  RotateCcw,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X,
  Home,
  Upload,
  ImageIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Convert a File to base64 data URL ── */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── Resize + compress image to stay under localStorage limits ──
   Outputs a base64 JPEG at max 900px wide, ~80% quality (~100-200 KB)
*/
function resizeImage(file, maxWidth = 900, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale  = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(img.width  * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = url;
  });
}

/* ─── Simple password (change as needed) ─────────────────────── */
const ADMIN_PASSWORD = 'udayestate@2206';

/* ─── Category badge colours ─────────────────────────────────── */
const catColor = (cat) => {
  if (cat === 'New Launch')       return 'bg-emerald-100 text-emerald-700';
  if (cat === 'Ready Possession') return 'bg-blue-100 text-blue-700';
  if (cat === 'Nearing Possession') return 'bg-indigo-100 text-indigo-700';
  return 'bg-amber-100 text-amber-700';
};

/* ─── Empty form template ─────────────────────────────────────── */
const emptyForm = {
  name: '', developer: '', location: '', region: '',
  category: 'New Launch', configurations: '', price: '',
  priceValue: '', carpetArea: '', possession: '',
  reraNumber: '', imageUrl: '', backupImage: '',
  overview: '',
  amenities: '',      // comma-separated
  connectivity: '',   // comma-separated
};

export default function AdminPanel({
  allProjects,
  publicProjects,
  hiddenIds,
  deleteProject,
  toggleVisibility,
  addProject,
  resetToDefaults,
}) {
  const navigate = useNavigate();

  /* ── Auth state ── */
  const [authed, setAuthed]       = useState(() => sessionStorage.getItem('ue_admin') === '1');
  const [pwInput, setPwInput]     = useState('');
  const [pwError, setPwError]     = useState('');
  const [showPw, setShowPw]       = useState(false);

  /* ── UI state ── */
  const [tab, setTab]             = useState('projects'); // 'projects' | 'add'
  const [search, setSearch]       = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null); // project id
  const [confirmReset, setConfirmReset]   = useState(false);
  const [addSuccess, setAddSuccess]       = useState('');
  const [form, setForm]           = useState(emptyForm);
  const [formErrors, setFormErrors]       = useState({});
  const [expandedId, setExpandedId]       = useState(null);

  /* ── Image upload state ── */
  const [imagePreview, setImagePreview]   = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  /* ── Login ── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('ue_admin', '1');
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Incorrect password. Try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ue_admin');
    setAuthed(false);
    setPwInput('');
  };

  /* ── Delete flow ── */
  const handleDeleteConfirm = () => {
    if (confirmDelete) {
      deleteProject(confirmDelete);
      setConfirmDelete(null);
    }
  };

  /* ── Reset flow ── */
  const handleResetConfirm = () => {
    resetToDefaults();
    setConfirmReset(false);
  };

  /* ── Image file picker handler ── */
  const handleImagePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const base64 = await resizeImage(file);
      setImagePreview(base64);
      setForm((prev) => ({ ...prev, imageUrl: base64 }));
    } catch (_) {
      alert('Could not process image. Please try a different file.');
    }
    setImageUploading(false);
    // reset input so same file can be picked again if needed
    e.target.value = '';
  };

  /* ── Add project form ── */
  const validate = () => {
    const errs = {};
    if (!form.name.trim())         errs.name = 'Required';
    if (!form.developer.trim())    errs.developer = 'Required';
    if (!form.location.trim())     errs.location = 'Required';
    if (!form.price.trim())        errs.price = 'Required';
    if (!form.configurations.trim()) errs.configurations = 'Required';
    if (!form.possession.trim())   errs.possession = 'Required';
    if (!form.reraNumber.trim())   errs.reraNumber = 'Required';
    return errs;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }

    addProject({
      ...form,
      priceValue: parseFloat(form.priceValue) || 0,
      amenities:    form.amenities.split(',').map(s => s.trim()).filter(Boolean),
      connectivity: form.connectivity.split(',').map(s => s.trim()).filter(Boolean),
      backupImage: form.backupImage ||
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    });

    setAddSuccess(form.name);
    setForm(emptyForm);
    setFormErrors({});
    setImagePreview('');
    setTab('projects');
  };

  const field = (key, label, placeholder, type = 'text', required = false) => (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setFormErrors({ ...formErrors, [key]: '' }); }}
        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] transition ${
          formErrors[key] ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50'
        }`}
      />
      {formErrors[key] && <p className="text-xs text-rose-500 mt-0.5">{formErrors[key]}</p>}
    </div>
  );

  /* ─── Filtered project list ─── */
  const filtered = allProjects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.developer.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  const hiddenCount  = hiddenIds.length;
  const visibleCount = publicProjects.length;

  /* ══════════════════════════════════════════
     LOGIN SCREEN
  ══════════════════════════════════════════ */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#ecf1f8] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#234e70] p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-extrabold text-white">Admin Panel</h1>
            <p className="text-xs text-blue-200 mt-1">Uday Estate — Property Management</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={pwInput}
                  onChange={(e) => { setPwInput(e.target.value); setPwError(''); }}
                  className="w-full px-3 py-2.5 pr-10 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] bg-slate-50"
                  autoFocus
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pwError && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />{pwError}
                </p>
              )}
            </div>
            <button type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-sm text-white bg-[#234e70] hover:bg-[#1E3A8A] transition-colors cursor-pointer">
              Sign In
            </button>
          </form>

          <div className="px-6 pb-4 text-center">
            <button onClick={() => navigate('/')}
              className="text-xs text-[#234e70] hover:underline flex items-center gap-1 mx-auto cursor-pointer">
              <Home className="w-3 h-3" /> Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     ADMIN DASHBOARD
  ══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-100 font-sans">

      {/* ── Top bar ── */}
      <header className="bg-[#234e70] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-emerald-300" />
            <span className="font-extrabold text-sm tracking-wide">Uday Estate — Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer">
              <Home className="w-3.5 h-3.5" /> View Site
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Projects',   value: allProjects.length, color: 'text-[#234e70]' },
            { label: 'Visible to Public',value: visibleCount,        color: 'text-[#059669]' },
            { label: 'Hidden',           value: hiddenCount,         color: 'text-amber-600' },
            { label: 'Custom Added',     value: allProjects.length - 25 < 0 ? 0 : allProjects.length - 25, color: 'text-indigo-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Success toast ── */}
        {addSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl mb-4">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>"{addSuccess}" added successfully and is now live on the site.</span>
            <button onClick={() => setAddSuccess('')} className="ml-auto cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'projects', label: `All Projects (${allProjects.length})` },
            { id: 'add',      label: '+ Add New Project' },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                tab === t.id
                  ? 'bg-[#234e70] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#234e70] hover:text-[#234e70]'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════
            TAB: PROJECT LIST
        ════════════════════════════════ */}
        {tab === 'projects' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <input
                type="text"
                placeholder="Search by name, developer, location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70]"
              />
              <button onClick={() => setConfirmReset(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-400 bg-rose-50 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
              </button>
            </div>

            {/* Project rows */}
            <div className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <p className="text-center text-slate-500 text-sm py-12">No projects match your search.</p>
              )}
              {filtered.map((project) => {
                const isHidden   = hiddenIds.includes(project.id);
                const isCustom   = project.id.startsWith('custom-');
                const isExpanded = expandedId === project.id;

                return (
                  <div key={project.id} className={`transition-colors ${isHidden ? 'bg-slate-50/80' : 'bg-white'}`}>
                    {/* Main row */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      {/* Thumbnail */}
                      <img
                        src={project.imageUrl || project.backupImage}
                        alt={project.name}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0 border border-slate-200 ${isHidden ? 'opacity-40' : ''}`}
                        onError={(e) => { e.target.src = project.backupImage; }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                          <span className={`text-sm font-bold text-slate-900 truncate ${isHidden ? 'line-through text-slate-400' : ''}`}>
                            {project.name}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${catColor(project.category)}`}>
                            {project.category}
                          </span>
                          {isCustom && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-indigo-100 text-indigo-700">
                              Custom
                            </span>
                          )}
                          {isHidden && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-100 text-amber-700">
                              Hidden
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">
                          {project.developer} &bull; {project.location} &bull; {project.price}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* Expand/collapse */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : project.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                          title="View details"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {/* Toggle visibility */}
                        <button
                          onClick={() => toggleVisibility(project.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isHidden
                              ? 'text-amber-500 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={isHidden ? 'Show on site' : 'Hide from site'}
                        >
                          {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setConfirmDelete(project.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 bg-slate-50 border-t border-slate-100">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
                          {[
                            ['RERA',          project.reraNumber],
                            ['Configurations',project.configurations],
                            ['Carpet Area',   project.carpetArea],
                            ['Possession',    project.possession],
                            ['Region',        project.region],
                            ['Hot Deal',      project.hotDeal ? 'Yes' : 'No'],
                            ['Featured',      project.featured ? 'Yes' : 'No'],
                          ].map(([k, v]) => (
                            <div key={k} className="bg-white rounded-lg p-2.5 border border-slate-200">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">{k}</span>
                              <span className="font-semibold text-slate-800 break-words">{v || '—'}</span>
                            </div>
                          ))}
                        </div>
                        {project.overview && (
                          <p className="mt-3 text-xs text-slate-600 leading-relaxed">{project.overview}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════
            TAB: ADD NEW PROJECT
        ════════════════════════════════ */}
        {tab === 'add' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#234e70]" /> Add New Project
            </h2>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('name',          'Project Name',     'e.g. Cosmos Jewels',      'text', true)}
                {field('developer',     'Developer / Builder','e.g. Cosmos Group',     'text', true)}
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {field('location',  'Locality',       'e.g. Virar West', 'text', true)}
                {field('region',    'Region / City',  'e.g. Vasai-Virar City')}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70]"
                  >
                    {['New Launch','Ready Possession','Under Construction','Nearing Possession'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {field('price',          'Price Display',      'e.g. ₹45,00,000',       'text', true)}
                {field('priceValue',     'Price (Lakhs, number)', 'e.g. 45',             'number')}
                {field('configurations', 'Configurations',     'e.g. 1 BHK | 2 BHK',   'text', true)}
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {field('carpetArea',  'Carpet Area',   'e.g. 420 - 650 sq.ft.')}
                {field('possession',  'Possession',    'e.g. Dec 2026',    'text', true)}
                {field('reraNumber',  'RERA Number',   'e.g. P51900014520','text', true)}
              </div>

              {/* Images — file upload + URL fallback */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Project Image <span className="text-slate-400 font-normal">(upload a file OR paste a URL)</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Left: upload area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex-shrink-0 w-full sm:w-44 h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      imagePreview
                        ? 'border-[#234e70] bg-slate-50'
                        : 'border-slate-300 bg-slate-50 hover:border-[#234e70] hover:bg-[#ecf1f8]'
                    }`}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-bold">Change</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {imageUploading
                          ? <div className="w-6 h-6 border-2 border-[#234e70] border-t-transparent rounded-full animate-spin" />
                          : <Upload className="w-6 h-6 text-slate-400 mb-1" />
                        }
                        <span className="text-xs text-slate-500 font-medium text-center px-2">
                          {imageUploading ? 'Processing…' : 'Click to upload\nJPG / PNG / WebP'}
                        </span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={handleImagePick}
                    />
                  </div>

                  {/* Right: URL fallback + clear */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        — OR paste image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={imagePreview ? '' : form.imageUrl}
                        disabled={!!imagePreview}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] transition ${
                          imagePreview ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => { setImagePreview(''); setForm((p) => ({ ...p, imageUrl: '' })); }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Remove uploaded image
                      </button>
                    )}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Fallback image URL (optional)</label>
                      <input
                        type="url"
                        placeholder="https://… (shown if primary fails)"
                        value={form.backupImage}
                        onChange={(e) => setForm({ ...form, backupImage: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Overview</label>
                <textarea
                  rows={3}
                  placeholder="Brief project description…"
                  value={form.overview}
                  onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] resize-none"
                />
              </div>

              {/* Amenities & Connectivity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amenities <span className="text-slate-400 font-normal">(comma-separated)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Swimming Pool, Gymnasium, Clubhouse…"
                    value={form.amenities}
                    onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Connectivity <span className="text-slate-400 font-normal">(comma-separated)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="5 mins to station, Near highway…"
                    value={form.connectivity}
                    onChange={(e) => setForm({ ...form, connectivity: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#234e70]/30 focus:border-[#234e70] resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#234e70] hover:bg-[#1E3A8A] transition-colors cursor-pointer shadow-sm">
                  Add Project to Site
                </button>
                <button type="button" onClick={() => { setForm(emptyForm); setFormErrors({}); setImagePreview(''); }}
                  className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ── Confirm Delete Modal ── */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 text-center mb-1">Delete Project?</h3>
            <p className="text-xs text-slate-600 text-center mb-5">
              "{allProjects.find(p => p.id === confirmDelete)?.name}" will be permanently removed from the site and admin. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Reset Modal ── */}
      {confirmReset && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 text-center mb-1">Reset to Defaults?</h3>
            <p className="text-xs text-slate-600 text-center mb-5">
              All custom projects, hidden states, and deletions will be wiped. The site will revert to the original 25 projects.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmReset(false)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={handleResetConfirm}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointer">
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
