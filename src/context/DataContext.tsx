import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as initialProjects, Project } from '../data/projects';
import { courses as initialCourses, Course } from '../data/courses';
import { awards as initialAwards, Award } from '../data/awards';
import { volunteering as initialVolunteering, Volunteering } from '../data/volunteering';
import { 
  getFirestore,
  doc, 
  onSnapshot, 
  setDoc 
} from 'firebase/firestore';
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
  aboutMe: string;
  headline1: string;
  headline2: string;
  linkedin: string;
  xcom: string;
  emails: string[];
  lastUpdated: string;
  spotifyLink: string;
  primaryColor: string;
  colorHistory?: string[];
}

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
  aboutMe: `I am a problem solving addict, and my favorite kinds of problems to solve are the ones from two seemingly unrelated fields. If you talk to me, you'll also learn very fast that I love to talk. My talking "specialty" is fun facts I find amusing. I am always open to hearing more!\n\nOutside of the awesome projects I work/worked on I enjoy dancing (I used to compete in dancesport) and making chocolate completely from scratch.`,
  headline1: 'Computer Science @ Carnegie Mellon University',
  headline2: 'Programming Languages · Space · People',
  linkedin: 'https://linkedin.com/in/rxshira',
  xcom: 'https://x.com/rxshira',
  emails: ['shirar@andrew.cmu.edu', 'rxshira@gmail.com'],
  lastUpdated: 'February 2026',
  spotifyLink: 'https://open.spotify.com/embed/playlist/1QrBzW0CNaNv4LSm3EGhPP?utm_source=generator',
  primaryColor: '#ff006e',
  colorHistory: ['#ff006e', '#7000ff', '#0066ff', '#00ffcc', '#ffcc00']
};

interface DataContextType {
  projects: Project[];
  courses: Course[];
  awards: Award[];
  volunteering: Volunteering[];
  teaching: Teaching[];
  settings: SiteSettings;
  loading: boolean;
  updateProject: (project: Project) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
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
  resetData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '255 0 110';
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [awards, setAwards] = useState<Award[]>(initialAwards);
  const [volunteering, setVolunteering] = useState<Volunteering[]>(initialVolunteering);
  const [teaching, setTeaching] = useState<Teaching[]>(initialTeaching);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConfigValid) {
      console.warn("DataContext: Firebase not configured. Cloud sync disabled.");
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(doc(db, 'site', 'content'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.projects) setProjects(data.projects);
        if (data.courses) setCourses(data.courses);
        if (data.awards) setAwards(data.awards);
        if (data.volunteering) setVolunteering(data.volunteering);
        if (data.teaching) setTeaching(data.teaching);
        if (data.settings) setSettings(data.settings);
      }
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

  const saveToCloud = async (newData: any) => {
    if (!isConfigValid) {
      alert("Database error: Website is currently running in local mode. Changes will not be saved permanently.");
      return;
    }
    try {
      await setDoc(doc(db, 'site', 'content'), newData, { merge: true });
    } catch (e) {
      console.error("Save failed:", e);
      alert("Permission denied: Check your Firestore Security Rules.");
    }
  };

  const updateProject = async (upd: Project) => {
    const newList = projects.map(p => p.id === upd.id ? upd : p);
    setProjects(newList);
    await saveToCloud({ projects: newList });
  };

  const addProject = async (newP: Project) => {
    const newList = [newP, ...projects];
    setProjects(newList);
    await saveToCloud({ projects: newList });
  };

  const deleteProject = async (id: string) => {
    const newList = projects.filter(p => p.id !== id);
    setProjects(newList);
    await saveToCloud({ projects: newList });
  };

  const updateCourse = async (upd: Course) => {
    const newList = courses.map(c => c.code === upd.code ? upd : c);
    setCourses(newList);
    await saveToCloud({ courses: newList });
  };

  const addCourse = async (newC: Course) => {
    const newList = [...courses, newC];
    setCourses(newList);
    await saveToCloud({ courses: newList });
  };

  const deleteCourse = async (code: string) => {
    const newList = courses.filter(c => c.code !== code);
    setCourses(newList);
    await saveToCloud({ courses: newList });
  };

  const updateAward = async (upd: Award) => {
    const newList = awards.map(a => a.title === upd.title ? upd : a);
    setAwards(newList);
    await saveToCloud({ awards: newList });
  };

  const addAward = async (newA: Award) => {
    const newList = [newA, ...awards];
    setAwards(newList);
    await saveToCloud({ awards: newList });
  };

  const deleteAward = async (title: string) => {
    const newList = awards.filter(a => a.title !== title);
    setAwards(newList);
    await saveToCloud({ awards: newList });
  };

  const updateVolunteering = async (upd: Volunteering) => {
    const newList = volunteering.map(v => v.id === upd.id ? upd : v);
    setVolunteering(newList);
    await saveToCloud({ volunteering: newList });
  };

  const addVolunteering = async (newV: Volunteering) => {
    const newList = [newV, ...volunteering];
    setVolunteering(newList);
    await saveToCloud({ volunteering: newList });
  };

  const deleteVolunteering = async (id: string) => {
    const newList = volunteering.filter(v => v.id !== id);
    setVolunteering(newList);
    await saveToCloud({ volunteering: newList });
  };

  const updateTeaching = async (upd: Teaching) => {
    const newList = teaching.map(t => t.id === upd.id ? upd : t);
    setTeaching(newList);
    await saveToCloud({ teaching: newList });
  };

  const addTeaching = async (newT: Teaching) => {
    const newList = [newT, ...teaching];
    setTeaching(newList);
    await saveToCloud({ teaching: newList });
  };

  const deleteTeaching = async (id: string) => {
    const newList = teaching.filter(t => t.id !== id);
    setTeaching(newList);
    await saveToCloud({ teaching: newList });
  };

  const updateSettings = async (upd: SiteSettings) => {
    setSettings(upd);
    await saveToCloud({ settings: upd });
  };

  const reorderItem = async (type: string, startIndex: number, endIndex: number) => {
    const listMap: any = { projects, courses, awards, volunteering, teaching };
    const list = Array.from(listMap[type]);
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    
    const setters: any = { 
      projects: setProjects, 
      courses: setCourses, 
      awards: setAwards, 
      volunteering: setVolunteering, 
      teaching: setTeaching 
    };
    setters[type](list);
    await saveToCloud({ [type]: list });
  };

  const reorderFeatured = async (startIndex: number, endIndex: number) => {
    // 1. Get current featured projects in their current order
    const featured = projects.filter(p => p.featured);
    const itemToMove = featured[startIndex];
    
    // 2. Remove from current featured list
    const newFeatured = [...featured];
    newFeatured.splice(startIndex, 1);
    
    // 3. Insert at new featured list position
    newFeatured.splice(endIndex, 0, itemToMove);
    
    // 4. Reconstruct the full project list preserving non-featured positions
    const nonFeatured = projects.filter(p => !p.featured);
    
    // Interleave them: we put all featured projects first for simplicity in ordering,
    // or we can try to maintain original slots. 
    // Usually, users want featured projects to be the "priority" ones.
    const newList = [...newFeatured, ...nonFeatured];
    
    setProjects(newList);
    await saveToCloud({ projects: newList });
  };

  const resetData = async () => {
    setProjects(initialProjects);
    setCourses(initialCourses);
    setAwards(initialAwards);
    setVolunteering(initialVolunteering);
    setTeaching(initialTeaching);
    setSettings(initialSettings);
    await saveToCloud({
      projects: initialProjects,
      courses: initialCourses,
      awards: initialAwards,
      volunteering: initialVolunteering,
      teaching: initialTeaching,
      settings: initialSettings
    });
  };

  return (
    <DataContext.Provider value={{
      projects, courses, awards, volunteering, teaching, settings, loading,
      updateProject, addProject, deleteProject,
      updateCourse, addCourse, deleteCourse,
      updateAward, addAward, deleteAward,
      updateVolunteering, addVolunteering, deleteVolunteering,
      updateTeaching, addTeaching, deleteTeaching,
      updateSettings,
      reorderItem, reorderFeatured, resetData
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
