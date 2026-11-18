import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { projects as sampleItems, Project } from '../data/projects';
import { courses as initialCourses, Course } from '../data/courses';
import { awards as initialAwards, Award } from '../data/awards';
import { volunteering as initialVolunteering, Volunteering } from '../data/volunteering';
import { doc, onSnapshot, runTransaction } from 'firebase/firestore';
import { db, isConfigValid } from '../lib/firebase';

export type { Project, Course, Award, Volunteering };

export interface Teaching {
  id: string;
  title: string;
  role: string;
  organization: string;
  timeline: string;
  description: string;
}

export interface SiteSettings {
  name: string;
  headline1: string;
  headline2: string;
  linkedin: string;
  xcom: string;
  emails: string[];
  lastUpdated: string;
  spotifyLink: string;
  primaryColor: string;
  colorHistory?: string[];
  heroImage?: string;
  aboutImage?: string;
  aboutMarkdown?: string;
  aboutLinks?: { label: string; url: string }[];
  musicCaption?: string;
}

// Sample data is pre-sorted so all three sections are visible. You can re-sort any
// item from the Admin panel using its "Move to" dropdown (a section hides itself
// automatically when it has no items).
const initialWork = sampleItems.filter(p => ['ligo'].includes(p.id));
const initialResearch = sampleItems.filter(p => ['avltrees', 'specml'].includes(p.id));
const initialProjects = sampleItems.filter(p => ['robograder', 'asteria1'].includes(p.id));

const initialTeaching: Teaching[] = [
  {
    id: 'fp-ta-2025',
    title: 'Principles of Functional Programming',
    role: 'Teaching Assistant',
    organization: 'CMU School of Computer Science (15-150)',
    timeline: 'May 2025 - August 2025, January 2026 - Present',
    description: 'Teaching assistant for 15-150 Principles of Functional Programming, helping students learn Standard ML and functional programming concepts. Lead recitations, grade assignments, and provide one-on-one support to students.'
  },
  {
    id: 'hype-types-2026',
    title: 'Hype for Types',
    role: 'Instructor',
    organization: 'CMU Student College (98-317)',
    timeline: 'January 2026 - Present',
    description: 'Instructing a student-taught course on type theory, covering dependent types, proof assistants, and formal verification. Designed curriculum and teach weekly lectures to undergraduate students interested in advanced type systems.'
  }
];

const initialSettings: SiteSettings = {
  name: 'Shira Rubin',
  headline1: 'Computer Science @ Carnegie Mellon University',
  headline2: 'Programming Languages · Space · People',
  linkedin: 'https://linkedin.com/in/rxshira',
  xcom: 'https://x.com/rxshira',
  emails: ['shirar@andrew.cmu.edu', 'rxshira@gmail.com'],
  lastUpdated: 'February 2026',
  spotifyLink: 'https://open.spotify.com/embed/playlist/1QrBzW0CNaNv4LSm3EGhPP?utm_source=generator',
  primaryColor: '#ff006e',
  colorHistory: ['#ff006e', '#7000ff', '#0066ff', '#00ffcc', '#ffcc00'],
  aboutMarkdown: '',
  aboutLinks: [],
  musicCaption: ''
};

interface DataContextType {
  projects: Project[];
  work: Project[];
  research: Project[];
  courses: Course[];
  awards: Award[];
  volunteering: Volunteering[];
  teaching: Teaching[];
  settings: SiteSettings;
  loading: boolean;
  updateProject: (project: Project) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addItem: (list: 'projects' | 'work' | 'research', item: Project) => Promise<void>;
  updateItem: (list: 'projects' | 'work' | 'research', item: Project) => Promise<void>;
  deleteItem: (list: 'projects' | 'work' | 'research', id: string) => Promise<void>;
  moveItem: (from: 'projects' | 'work' | 'research', to: 'projects' | 'work' | 'research', id: string) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  updateCourseCode: (oldCode: string, course: Course) => Promise<void>;
  addCourse: (course: Course) => Promise<void>;
  deleteCourse: (code: string) => Promise<void>;
  updateAward: (award: Award) => Promise<void>;
  addAward: (award: Award) => Promise<void>;
  deleteAward: (id: string) => Promise<void>;
  updateVolunteering: (vol: Volunteering) => Promise<void>;
  addVolunteering: (vol: Volunteering) => Promise<void>;
  deleteVolunteering: (id: string) => Promise<void>;
  updateTeaching: (t: Teaching) => Promise<void>;
  addTeaching: (newT: Teaching) => Promise<void>;
  deleteTeaching: (id: string) => Promise<void>;
  updateSettings: (s: SiteSettings) => Promise<void>;
  reorderItem: (type: string, startIndex: number, endIndex: number) => Promise<void>;
  reorderFeatured: (startIndex: number, endIndex: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '255 0 110';
};

// Drop any items that share an id (guards against duplicates created by earlier bugs).
const dedupeById = (arr: Project[]): Project[] => {
  const seen = new Set<string>();
  return (arr || []).filter((x) => {
    if (!x?.id) return true;
    if (seen.has(x.id)) return false;
    seen.add(x.id);
    return true;
  });
};

type ListKey = 'projects' | 'work' | 'research';
type StoredKey = ListKey | 'courses' | 'awards' | 'volunteering' | 'teaching' | 'settings';

// Stable identity for any stored item, used when reordering against the latest data.
const keyOf = (x: any): string => String(x?.id ?? x?.code ?? x?.title ?? '');

// Move the item identified by `itemKey` so it lands where `targetKey` currently is.
const moveByKey = <T,>(list: T[], itemKey: string, targetKey: string): T[] => {
  const from = list.findIndex(x => keyOf(x) === itemKey);
  const to = list.findIndex(x => keyOf(x) === targetKey);
  if (from === -1 || to === -1 || from === to) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [work, setWork] = useState<Project[]>(initialWork);
  const [research, setResearch] = useState<Project[]>(initialResearch);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [awards, setAwards] = useState<Award[]>(initialAwards);
  const [volunteering, setVolunteering] = useState<Volunteering[]>(initialVolunteering);
  const [teaching, setTeaching] = useState<Teaching[]>(initialTeaching);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [loading, setLoading] = useState(true);

  // True only once the real content has arrived from the database. Saving is blocked
  // until then, so the built-in sample content can never be written over real data.
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!isConfigValid) {
      console.warn("DataContext: Firebase not configured. Cloud sync disabled.");
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(doc(db, 'site', 'content'), (snap) => {
      const data: any = snap.exists() ? snap.data() : {};

      // Display-only fallbacks: nothing here is ever written back automatically.
      setProjects(data.projects !== undefined ? dedupeById(data.projects) : initialProjects);
      setCourses(data.courses !== undefined ? data.courses : initialCourses);
      setAwards(data.awards !== undefined ? data.awards : initialAwards);
      setVolunteering(data.volunteering !== undefined ? data.volunteering : initialVolunteering);
      setTeaching(data.teaching !== undefined ? data.teaching : initialTeaching);
      setSettings(data.settings !== undefined ? data.settings : initialSettings);
      // Work/Research come only from the DB — never fall back to sample data.
      setWork(dedupeById(data.work || []));
      setResearch(dedupeById(data.research || []));

      loadedRef.current = true;
      setLoading(false);
    }, (err) => {
      console.error("Firestore sync error:", err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--pink', settings.primaryColor);
      document.documentElement.style.setProperty('--pink-rgb', hexToRgb(settings.primaryColor));
    }
  }, [settings.primaryColor]);

  // What a field holds when it has never been saved — matches what is displayed.
  const fallback: Record<StoredKey, any> = {
    projects: initialProjects, work: [], research: [], courses: initialCourses,
    awards: initialAwards, volunteering: initialVolunteering, teaching: initialTeaching,
    settings: initialSettings,
  };

  /**
   * Every save goes through here. It re-reads the LATEST content from the database
   * inside a transaction and applies only the requested change to it, so a stale tab
   * or another device can never overwrite items it doesn't know about.
   * The page updates itself from the database listener once the save commits.
   */
  const mutate = async (change: (current: (k: StoredKey) => any) => Partial<Record<StoredKey, any>>) => {
    if (!isConfigValid) {
      alert("Database error: Website is currently running in local mode. Changes will not be saved permanently.");
      return;
    }
    if (!loadedRef.current) {
      alert("Your content is still loading from the database. Wait a moment and try again.");
      return;
    }
    const ref = doc(db, 'site', 'content');
    try {
      await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref);
        const data: any = snap.exists() ? snap.data() : {};
        const current = (k: StoredKey) => (data[k] !== undefined ? data[k] : fallback[k]);
        tx.set(ref, change(current), { merge: true });
      });
    } catch (e: any) {
      console.error("Save failed:", e);
      alert(e?.code === 'permission-denied'
        ? "Save blocked: you need to be signed in with the site admin account."
        : `Save failed: ${e?.message || e}`);
    }
  };

  const addItem = (list: ListKey, item: Project) =>
    mutate(cur => ({ [list]: [item, ...cur(list).filter((p: Project) => p.id !== item.id)] }));

  const updateItem = (list: ListKey, item: Project) =>
    mutate(cur => ({ [list]: cur(list).map((p: Project) => p.id === item.id ? item : p) }));

  const deleteItem = (list: ListKey, id: string) =>
    mutate(cur => ({ [list]: cur(list).filter((p: Project) => p.id !== id) }));

  const moveItem = async (from: ListKey, to: ListKey, id: string) => {
    if (from === to) return;
    await mutate(cur => {
      const found = cur(from).find((p: Project) => p.id === id);
      if (!found) return {};
      // Auto-unstar when moving to a new section (its star belonged to the old one).
      const item = { ...found, featured: false };
      return {
        [from]: cur(from).filter((p: Project) => p.id !== id),
        // Remove any existing copy in the target first so a re-move can't duplicate it.
        [to]: [item, ...cur(to).filter((p: Project) => p.id !== id)],
      };
    });
  };

  const updateProject = (upd: Project) => updateItem('projects', upd);
  const addProject = (newP: Project) => addItem('projects', newP);
  const deleteProject = (id: string) => deleteItem('projects', id);

  const updateCourse = (upd: Course) =>
    mutate(cur => ({ courses: cur('courses').map((c: Course) => c.code === upd.code ? upd : c) }));

  // Update a course matched by its OLD code, so the course number itself can be
  // edited without losing the row's position.
  const updateCourseCode = (oldCode: string, upd: Course) =>
    mutate(cur => ({ courses: cur('courses').map((c: Course) => c.code === oldCode ? upd : c) }));

  // Prepend so a newly added course shows at the top of the admin list.
  const addCourse = (newC: Course) =>
    mutate(cur => ({ courses: [newC, ...cur('courses')] }));

  const deleteCourse = (code: string) =>
    mutate(cur => ({ courses: cur('courses').filter((c: Course) => c.code !== code) }));

  const updateAward = (upd: Award) =>
    mutate(cur => ({ awards: cur('awards').map((a: Award) => a.title === upd.title ? upd : a) }));

  const addAward = (newA: Award) =>
    mutate(cur => ({ awards: [newA, ...cur('awards')] }));

  const deleteAward = (title: string) =>
    mutate(cur => ({ awards: cur('awards').filter((a: Award) => a.title !== title) }));

  const updateVolunteering = (upd: Volunteering) =>
    mutate(cur => ({ volunteering: cur('volunteering').map((v: Volunteering) => v.id === upd.id ? upd : v) }));

  const addVolunteering = (newV: Volunteering) =>
    mutate(cur => ({ volunteering: [newV, ...cur('volunteering')] }));

  const deleteVolunteering = (id: string) =>
    mutate(cur => ({ volunteering: cur('volunteering').filter((v: Volunteering) => v.id !== id) }));

  const updateTeaching = (upd: Teaching) =>
    mutate(cur => ({ teaching: cur('teaching').map((t: Teaching) => t.id === upd.id ? upd : t) }));

  const addTeaching = (newT: Teaching) =>
    mutate(cur => ({ teaching: [newT, ...cur('teaching')] }));

  const deleteTeaching = (id: string) =>
    mutate(cur => ({ teaching: cur('teaching').filter((t: Teaching) => t.id !== id) }));

  const updateSettings = (upd: SiteSettings) => mutate(() => ({ settings: upd }));

  // Reorder by identity, applied to the latest stored list (not by raw index, which
  // could point at a different item if the list changed elsewhere).
  const reorderItem = async (type: string, startIndex: number, endIndex: number) => {
    const shown: any = { projects, work, research, courses, awards, volunteering, teaching };
    const list: any[] = shown[type];
    if (!list || !list[startIndex] || !list[endIndex]) return;
    const itemKey = keyOf(list[startIndex]);
    const targetKey = keyOf(list[endIndex]);
    await mutate(cur => ({ [type]: moveByKey(cur(type as StoredKey), itemKey, targetKey) }));
  };

  // Featured projects are listed first, in starred order, followed by the rest.
  const reorderFeatured = async (startIndex: number, endIndex: number) => {
    const shownFeatured = projects.filter(p => p.featured);
    if (!shownFeatured[startIndex] || !shownFeatured[endIndex]) return;
    const itemKey = keyOf(shownFeatured[startIndex]);
    const targetKey = keyOf(shownFeatured[endIndex]);
    await mutate(cur => {
      const latest: Project[] = cur('projects');
      const featured = moveByKey(latest.filter(p => p.featured), itemKey, targetKey);
      return { projects: [...featured, ...latest.filter(p => !p.featured)] };
    });
  };

  return (
    <DataContext.Provider value={{
      projects, work, research, courses, awards, volunteering, teaching, settings, loading,
      updateProject, addProject, deleteProject,
      addItem, updateItem, deleteItem, moveItem,
      updateCourse, updateCourseCode, addCourse, deleteCourse,
      updateAward, addAward, deleteAward,
      updateVolunteering, addVolunteering, deleteVolunteering,
      updateTeaching, addTeaching, deleteTeaching,
      updateSettings,
      reorderItem, reorderFeatured
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
