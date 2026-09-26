/**
 * useProjects — localStorage-backed project state
 *
 * Storage schema (key: "ue_projects"):
 *   { projects: Project[], deletedIds: string[], hiddenIds: string[] }
 *
 * - projects    : full list (base 25 + any admin-added ones)
 * - deletedIds  : ids permanently removed by admin
 * - hiddenIds   : ids hidden from public but kept in admin
 *
 * The public site receives only: visible = not deleted & not hidden
 */

import { useState, useCallback } from 'react';
import { projectsData } from '../data/projectsData';

const STORAGE_KEY = 'ue_projects';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { customProjects: [], deletedIds: [], hiddenIds: [] };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

export default function useProjects() {
  const [state, setState] = useState(loadState);

  const commit = useCallback((next) => {
    setState(next);
    saveState(next);
  }, []);

  // ── All projects (base + custom, minus permanently deleted) ──
  const allProjects = [
    ...projectsData.filter((p) => !state.deletedIds.includes(p.id)),
    ...state.customProjects.filter((p) => !state.deletedIds.includes(p.id)),
  ];

  // ── Public-visible projects (also excludes hidden) ──
  const publicProjects = allProjects.filter((p) => !state.hiddenIds.includes(p.id));

  // ── Admin actions ──

  /** Permanently delete a project */
  const deleteProject = useCallback((id) => {
    commit({
      ...state,
      deletedIds: [...state.deletedIds, id],
      // also remove from custom list if it was admin-added
      customProjects: state.customProjects.filter((p) => p.id !== id),
    });
  }, [state, commit]);

  /** Toggle hidden/visible on public site */
  const toggleVisibility = useCallback((id) => {
    const isHidden = state.hiddenIds.includes(id);
    commit({
      ...state,
      hiddenIds: isHidden
        ? state.hiddenIds.filter((i) => i !== id)
        : [...state.hiddenIds, id],
    });
  }, [state, commit]);

  /** Add a brand-new project via admin form */
  const addProject = useCallback((project) => {
    const newProject = {
      ...project,
      id: `custom-${Date.now()}`,
      featured: false,
      hotDeal: false,
    };
    commit({
      ...state,
      customProjects: [...state.customProjects, newProject],
    });
    return newProject.id;
  }, [state, commit]);

  /** Reset everything back to defaults */
  const resetToDefaults = useCallback(() => {
    const fresh = { customProjects: [], deletedIds: [], hiddenIds: [] };
    commit(fresh);
  }, [commit]);

  return {
    allProjects,
    publicProjects,
    hiddenIds: state.hiddenIds,
    deletedIds: state.deletedIds,
    customProjects: state.customProjects,
    deleteProject,
    toggleVisibility,
    addProject,
    resetToDefaults,
  };
}
