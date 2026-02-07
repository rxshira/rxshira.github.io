import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as initialProjects, Project } from '../data/projects';
import { courses as initialCourses, Course } from '../data/courses';
import { awards as initialAwards, Award } from '../data/awards';
import { volunteering as initialVolunteering, Volunteering } from '../data/volunteering';

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
  aboutMe: string;
  headline1: string;
  headline2: string;
  linkedin: string;
  xcom: string;
  emails: string[];
  lastUpdated: string;
  spotifyLink: string;
}

const initialTeaching: Teaching[] = [
  {
    id: 'fp-ta',
    title: 'Principles of Functional Programming',
    role: 'Teaching Assistant',
    organization: 'CMU School of Computer Science (15-150)',
    timeline: 'May 2025 - August 2025, January 2026 - Present',
    description: 'Helping students learn Standard ML and functional programming concepts. Lead recitations, grade assignments, and provide one-on-one support.'
  },
  {
    id: 'type-theory',
    title: 'Hype for Types',
    role: 'Instructor',
    organization: 'CMU Student College (98-317)',
    timeline: 'January 2026 - Present',
    description: 'Instructing a student-taught course on type theory, covering dependent types, proof assistants, and formal verification.'
  }
];

const initialSettings: SiteSettings = {
  name: 'Shira Rubin',
  aboutMe: `I am a problem solving addict, and my favorite kinds of problems to solve are the ones from two seemingly unrelated fields. If you talk to me, you'll also learn very fast that I love to talk. My talking "specialty" is fun facts I find amusing. I am always open to hearing more!\n\nOutside of the awesome projects I work/worked on I enjoy dancing (I used to compete in dancesport) and making chocolate completely from scratch.`,
  headline1: 'Computer Science @ Carnegie Mellon University',
  headline2: 'Programming Languages · Space · People',
  linkedin: 'https://linkedin.com/in/rxshira',
  xcom: 'https://x.com/rxshira',
  emails: ['shirar@andrew.cmu.edu', 'rxshira@gmail.com'],
  lastUpdated: 'February 2026',
  spotifyLink: 'https://open.spotify.com/embed/playlist/1QrBzW0CNaNv4LSm3EGhPP?utm_source=generator'
};

interface DataContextType {
  projects: Project[];
  courses: Course[];
  awards: Award[];
  volunteering: Volunteering[];
  teaching: Teaching[];
  settings: SiteSettings;
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateCourse: (course: Course) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (code: string) => void;
  updateAward: (award: Award) => void;
  addAward: (award: Award) => void;
  deleteAward: (id: string) => void;
  updateVolunteering: (vol: Volunteering) => void;
  addVolunteering: (vol: Volunteering) => void;
  deleteVolunteering: (id: string) => void;
  updateTeaching: (t: Teaching) => void;
  addTeaching: (newT: Teaching) => void;
  deleteTeaching: (id: string) => void;
  updateSettings: (s: SiteSettings) => void;
  reorderItem: (type: 'projects' | 'courses' | 'awards' | 'volunteering' | 'teaching', startIndex: number, endIndex: number) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof window !== 'undefined' && window.location.search.includes('reset=true')) {
    localStorage.clear();
  }

  const loadData = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
      if (!Array.isArray(fallback) && typeof parsed !== 'object') return fallback;
      return typeof fallback === 'object' && fallback !== null ? { ...fallback, ...parsed } : parsed;
    } catch (e) {
      return fallback;
    }
  };

  const [projects, setProjects] = useState<Project[]>(() => loadData('site_projects', initialProjects));
  const [courses, setCourses] = useState<Course[]>(() => loadData('site_courses', initialCourses));
  const [awards, setAwards] = useState<Award[]>(() => loadData('site_awards', initialAwards));
  const [volunteering, setVolunteering] = useState<Volunteering[]>(() => loadData('site_volunteering', initialVolunteering));
  const [teaching, setTeaching] = useState<Teaching[]>(() => loadData('site_teaching', initialTeaching));
  const [settings, setSettings] = useState<SiteSettings>(() => loadData('site_settings', initialSettings));

  useEffect(() => { localStorage.setItem('site_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('site_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('site_awards', JSON.stringify(awards)); }, [awards]);
  useEffect(() => { localStorage.setItem('site_volunteering', JSON.stringify(volunteering)); }, [volunteering]);
  useEffect(() => { localStorage.setItem('site_teaching', JSON.stringify(teaching)); }, [teaching]);
  useEffect(() => { localStorage.setItem('site_settings', JSON.stringify(settings)); }, [settings]);

  const updateProject = (upd: Project) => setProjects(prev => prev.map(p => p.id === upd.id ? upd : p));
  const addProject = (newP: Project) => setProjects(prev => [newP, ...prev]);
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));
  const updateCourse = (upd: Course) => setCourses(prev => prev.map(c => c.code === upd.code ? upd : c));
  const addCourse = (newC: Course) => setCourses(prev => [newC, ...prev]);
  const deleteCourse = (code: string) => setCourses(prev => prev.filter(c => c.code !== code));
  const updateAward = (upd: Award) => setAwards(prev => prev.map(a => a.title === upd.title ? upd : a));
  const addAward = (newA: Award) => setAwards(prev => [newA, ...prev]);
  const deleteAward = (title: string) => setAwards(prev => prev.filter(a => a.title !== title));
  const updateVolunteering = (upd: Volunteering) => setVolunteering(prev => prev.map(v => v.id === upd.id ? upd : v));
  const addVolunteering = (newV: Volunteering) => setVolunteering(prev => [newV, ...prev]);
  const deleteVolunteering = (id: string) => setVolunteering(prev => prev.filter(v => v.id !== id));
  const updateTeaching = (upd: Teaching) => setTeaching(prev => prev.map(t => t.id === upd.id ? upd : t));
  const addTeaching = (newT: Teaching) => setTeaching(prev => [newT, ...prev]);
  const deleteTeaching = (id: string) => setTeaching(prev => prev.filter(t => t.id !== id));
  const updateSettings = (upd: SiteSettings) => setSettings(upd);

  const reorderItem = (type: string, startIndex: number, endIndex: number) => {
    const setters: any = { projects: setProjects, courses: setCourses, awards: setAwards, volunteering: setVolunteering, teaching: setTeaching };
    if (!setters[type]) return;
    setters[type]((prev: any[]) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const resetData = () => {
    setProjects(initialProjects);
    setCourses(initialCourses);
    setAwards(initialAwards);
    setVolunteering(initialVolunteering);
    setTeaching(initialTeaching);
    setSettings(initialSettings);
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      projects, courses, awards, volunteering, teaching, settings,
      updateProject, addProject, deleteProject,
      updateCourse, addCourse, deleteCourse,
      updateAward, addAward, deleteAward,
      updateVolunteering, addVolunteering, deleteVolunteering,
      updateTeaching, addTeaching, deleteTeaching,
      updateSettings,
      reorderItem, resetData
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