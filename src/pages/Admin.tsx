import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, X, LogOut, LayoutGrid, BookOpen, Award, Heart, ChevronUp, ChevronDown, Image as ImageIcon, Settings as SettingsIcon } from 'lucide-react';
import { Project, Award as AwardType, Volunteering, Teaching } from '../context/DataContext';

const Admin = () => {
  const { user, logout, isAdmin } = useAuth();
  const { 
    projects, addProject, updateProject, deleteProject,
    courses, addCourse, deleteCourse,
    awards, addAward, updateAward, deleteAward,
    volunteering, addVolunteering, updateVolunteering, deleteVolunteering,
    teaching, addTeaching, updateTeaching, deleteTeaching,
    settings, updateSettings,
    reorderItem
  } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'academic' | 'awards' | 'service' | 'settings'>('projects');
  
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    if (!user || !isAdmin) navigate('/admin/login');
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSave = () => {
    if (!editingItem) return;
    
    if (activeTab === 'projects') {
      const p = { ...editingItem, id: editingItem.id || Math.random().toString(36).substr(2, 9), hasImage: !!editingItem.imagePath } as Project;
      isNew ? addProject(p) : updateProject(p);
    } else if (activeTab === 'academic' && editingItem.role) {
      const t = { ...editingItem, id: editingItem.id || Math.random().toString(36).substr(2, 9) } as Teaching;
      isNew ? addTeaching(t) : updateTeaching(t);
    } else if (activeTab === 'awards') {
      const a = editingItem as AwardType;
      isNew ? addAward(a) : updateAward(a);
    } else if (activeTab === 'service') {
      const v = { ...editingItem, id: editingItem.id || Math.random().toString(36).substr(2, 9) } as Volunteering;
      isNew ? addVolunteering(v) : updateVolunteering(v);
    }

    setEditingItem(null);
  };

  const ReorderControls = ({ type, index, total }: { type: 'projects' | 'courses' | 'awards' | 'volunteering' | 'teaching', index: number, total: number }) => (
    <div className="flex flex-col gap-1 mr-4">
      <button disabled={index === 0} onClick={(e) => { e.stopPropagation(); reorderItem(type, index, index - 1); }} className="p-1 hover:bg-white/10 rounded disabled:opacity-20"><ChevronUp className="w-4 h-4" /></button>
      <button disabled={index === total - 1} onClick={(e) => { e.stopPropagation(); reorderItem(type, index, index + 1); }} className="p-1 hover:bg-white/10 rounded disabled:opacity-20"><ChevronDown className="w-4 h-4" /></button>
    </div>
  );

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <div className="w-64 border-r border-white/10 p-6 flex flex-col fixed h-full bg-bg z-20">
        <div className="mb-10">
          <h1 className="text-xl font-bold mb-1 text-white">Admin Panel</h1>
          <p className="text-xs text-text-gray truncate">{user.email}</p>
        </div>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-pink text-white font-bold shadow-[0_0_15px_rgba(255,0,110,0.3)]' : 'text-text-gray hover:bg-white/5'}`}><LayoutGrid className="w-5 h-5" /> Projects</button>
          <button onClick={() => setActiveTab('academic')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'academic' ? 'bg-pink text-white font-bold shadow-[0_0_15px_rgba(255,0,110,0.3)]' : 'text-text-gray hover:bg-white/5'}`}><BookOpen className="w-5 h-5" /> Academic</button>
          <button onClick={() => setActiveTab('service')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'service' ? 'bg-pink text-white font-bold shadow-[0_0_15px_rgba(255,0,110,0.3)]' : 'text-text-gray hover:bg-white/5'}`}><Heart className="w-5 h-5" /> Service</button>
          <button onClick={() => setActiveTab('awards')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'awards' ? 'bg-pink text-white font-bold shadow-[0_0_15px_rgba(255,0,110,0.3)]' : 'text-text-gray hover:bg-white/5'}`}><Award className="w-5 h-5" /> Awards</button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-pink text-white font-bold shadow-[0_0_15px_rgba(255,0,110,0.3)]' : 'text-text-gray hover:bg-white/5'}`}><SettingsIcon className="w-5 h-5" /> Settings</button>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-text-gray hover:text-white transition-colors mt-auto"><LogOut className="w-5 h-5" /> Logout</button>
      </div>

      <div className="flex-1 p-10 ml-64 overflow-y-auto min-h-screen">
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">Site Settings</h2>
            <div className="bg-white/5 border border-white/10 p-8 rounded-xl space-y-6 text-sm">
              <div className="space-y-2">
                <label className="text-text-gray font-bold uppercase text-[10px]">Name (Super Header)</label>
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={localSettings.name || ''} onChange={e => setLocalSettings({...localSettings, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-text-gray font-bold uppercase text-[10px]">Headline 1</label>
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={localSettings.headline1} onChange={e => setLocalSettings({...localSettings, headline1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-text-gray font-bold uppercase text-[10px]">Headline 2</label>
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={localSettings.headline2} onChange={e => setLocalSettings({...localSettings, headline2: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-text-gray font-bold uppercase text-[10px]">More About Me</label>
                <textarea className="w-full bg-black/50 border border-white/10 rounded p-3 h-48 focus:border-pink outline-none leading-relaxed" value={localSettings.aboutMe} onChange={e => setLocalSettings({...localSettings, aboutMe: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-text-gray font-bold uppercase text-[10px]">LinkedIn URL</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={localSettings.linkedin} onChange={e => setLocalSettings({...localSettings, linkedin: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-text-gray font-bold uppercase text-[10px]">X (Twitter) URL</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={localSettings.xcom} onChange={e => setLocalSettings({...localSettings, xcom: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-text-gray font-bold uppercase text-[10px]">Spotify Playlist Link (Embed URL)</label>
                <input className="w-full bg-black/50 border border-white/10 rounded p-3 focus:border-pink outline-none" value={localSettings.spotifyLink} onChange={e => setLocalSettings({...localSettings, spotifyLink: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-text-gray font-bold uppercase text-[10px]">Emails (comma separated)</label>
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={localSettings.emails.join(', ')} onChange={e => setLocalSettings({...localSettings, emails: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
              </div>
              <div className="space-y-2">
                <label className="text-text-gray font-bold uppercase text-[10px]">Last Updated Text</label>
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={localSettings.lastUpdated} onChange={e => setLocalSettings({...localSettings, lastUpdated: e.target.value})} />
              </div>
              <div className="pt-6 flex justify-end">
                <button onClick={() => { updateSettings(localSettings); alert('Settings saved!'); }} className="bg-pink text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-hot-pink transition-colors"><Save className="w-5 h-5" /> Save Global Settings</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Projects</h2>
              {!editingItem && <button onClick={() => { setIsNew(true); setEditingItem({ techStack: [], links: {} }); }} className="bg-white text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Project</button>}
            </div>
            {!editingItem ? (
              <div className="grid gap-4">
                {projects.map((p, i) => (
                  <div key={p.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center group hover:border-pink/50 transition-colors">
                    <ReorderControls type="projects" index={i} total={projects.length} />
                    <div className="flex-1"><h3 className="font-bold text-lg">{p.title}</h3><p className="text-sm text-text-gray">{p.subtitle}</p></div>
                    <div className="flex gap-2"><button onClick={() => { setIsNew(false); setEditingItem(p); }} className="p-2 hover:bg-white/10 rounded-lg">Edit</button><button onClick={() => { if(confirm('Delete?')) deleteProject(p.id); }} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"><Trash2 className="w-4 h-4" /></button></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-dark-gray border border-white/10 rounded-2xl p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4"><h3 className="text-xl font-bold">{isNew ? 'New Project' : 'Edit Project'}</h3><button onClick={() => setEditingItem(null)}><X className="w-6 h-6" /></button></div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-4">
                    <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="Title" />
                    <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm" value={editingItem.subtitle || ''} onChange={e => setEditingItem({...editingItem, subtitle: e.target.value})} placeholder="Subtitle" />
                    <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm" value={editingItem.timeline || ''} onChange={e => setEditingItem({...editingItem, timeline: e.target.value})} placeholder="Timeline" />
                  </div>
                  <div className="bg-black/30 border border-white/5 rounded p-4 flex flex-col items-center justify-center">
                    {editingItem.imagePath ? <img src={editingItem.imagePath.startsWith('http') ? editingItem.imagePath : `/images/${editingItem.imagePath}`} className="max-h-24 rounded mb-2" alt="Preview" /> : <ImageIcon className="w-8 h-8 text-text-gray" />}
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-[10px]" value={editingItem.imagePath || ''} onChange={e => setEditingItem({...editingItem, imagePath: e.target.value})} placeholder="Image filename/URL" />
                  </div>
                </div>
                <textarea className="w-full bg-black/50 border border-white/10 rounded p-3 h-32 text-sm" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} placeholder="Description" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.achievement || ''} onChange={e => setEditingItem({...editingItem, achievement: e.target.value})} placeholder="Achievement" />
                  <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.role || ''} onChange={e => setEditingItem({...editingItem, role: e.target.value})} placeholder="My Role" />
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.collaborator || ''} onChange={e => setEditingItem({...editingItem, collaborator: e.target.value})} placeholder="Collaborator" />
                </div>
                <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm" value={editingItem.techStack?.join(', ') || ''} onChange={e => setEditingItem({...editingItem, techStack: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} placeholder="Tags (comma separated)" />
                <div className="flex justify-end gap-3 pt-4"><button onClick={() => setEditingItem(null)} className="px-6 py-2">Cancel</button><button onClick={handleSave} className="bg-pink px-6 py-2 rounded-lg font-bold">Save Project</button></div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Teaching Experience</h2>
                {!editingItem && <button onClick={() => { setIsNew(true); setEditingItem({ role: 'Teaching Assistant' }); }} className="bg-white text-black px-3 py-1 rounded font-bold text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Add Exp</button>}
              </div>
              {!editingItem ? (
                <div className="grid gap-4">
                  {teaching.map((t, i) => (
                    <div key={t.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center group">
                      <ReorderControls type="teaching" index={i} total={teaching.length} />
                      <div className="flex-1"><h3 className="font-bold">{t.title}</h3><p className="text-xs text-pink">{t.role} • {t.organization}</p></div>
                      <div className="flex gap-2"><button onClick={() => { setIsNew(false); setEditingItem(t); }} className="p-2 hover:bg-white/10 rounded text-xs">Edit</button><button onClick={() => deleteTeaching(t.id)} className="p-2 text-red-400"><Trash2 className="w-4 h-4" /></button></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4 text-sm">
                  <input className="w-full bg-black/50 border border-white/10 rounded p-2" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="Course Name" />
                  <input className="w-full bg-black/50 border border-white/10 rounded p-2" value={editingItem.role || ''} onChange={e => setEditingItem({...editingItem, role: e.target.value})} placeholder="Role" />
                  <input className="w-full bg-black/50 border border-white/10 rounded p-2" value={editingItem.organization || ''} onChange={e => setEditingItem({...editingItem, organization: e.target.value})} placeholder="Org" />
                  <input className="w-full bg-black/50 border border-white/10 rounded p-2" value={editingItem.timeline || ''} onChange={e => setEditingItem({...editingItem, timeline: e.target.value})} placeholder="Timeline" />
                  <textarea className="w-full bg-black/50 border border-white/10 rounded p-2 h-32" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} placeholder="Description" />
                  <div className="flex justify-end gap-2"><button onClick={() => setEditingItem(null)} className="text-sm px-4">Cancel</button><button onClick={handleSave} className="bg-pink px-4 py-1 rounded font-bold">Save</button></div>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Coursework</h2>
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-sm">
                <div className="flex gap-2 mb-6">
                  <input id="new-c-code" className="flex-1 bg-black/50 border border-white/10 rounded p-2" placeholder="Code" />
                  <input id="new-c-name" className="flex-[2] bg-black/50 border border-white/10 rounded p-2" placeholder="Name" />
                  <button onClick={() => {
                    const c = (document.getElementById('new-c-code') as HTMLInputElement).value;
                    const n = (document.getElementById('new-c-name') as HTMLInputElement).value;
                    if(c && n) { addCourse({code:c, name:n, department:'CS'}); (document.getElementById('new-c-code') as HTMLInputElement).value=''; (document.getElementById('new-c-name') as HTMLInputElement).value=''; }
                  }} className="bg-white text-black px-4 py-2 rounded font-bold">Add</button>
                </div>
                <div className="space-y-2">
                  {courses.map((c, i) => (
                    <div key={c.code} className="flex items-center p-2 hover:bg-white/5 rounded">
                      <ReorderControls type="courses" index={i} total={courses.length} />
                      <span className="font-bold text-pink w-20">{c.code}</span><span className="flex-1">{c.name}</span>
                      <button onClick={() => deleteCourse(c.code)} className="text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'service' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Service & Leadership</h2>
              {!editingItem && <button onClick={() => { setIsNew(true); setEditingItem({ achievements: [] }); }} className="bg-white text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Entry</button>}
            </div>
            {!editingItem ? (
              <div className="grid gap-4">
                {volunteering.map((v, i) => (
                  <div key={v.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center group">
                    <ReorderControls type="volunteering" index={i} total={volunteering.length} />
                    <div className="flex-1"><h3 className="font-bold">{v.title}</h3><p className="text-sm text-text-gray">{v.organization}</p></div>
                    <button onClick={() => { setIsNew(false); setEditingItem(v); }} className="p-2 hover:bg-white/10 rounded-lg mr-2 text-xs px-4">Edit</button>
                    <button onClick={() => deleteVolunteering(v.id)} className="p-2 text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl space-y-4 text-sm">
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="Title" />
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.organization || ''} onChange={e => setEditingItem({...editingItem, organization: e.target.value})} placeholder="Role/Org" />
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.timeline || ''} onChange={e => setEditingItem({...editingItem, timeline: e.target.value})} placeholder="Timeline" />
                <textarea className="w-full bg-black/50 border border-white/10 rounded p-3 h-32" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} placeholder="Description" />
                <div className="flex justify-end gap-3 pt-4"><button onClick={() => setEditingItem(null)} className="px-4">Cancel</button><button onClick={handleSave} className="bg-pink px-6 py-2 rounded-lg font-bold">Save</button></div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'awards' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Awards</h2>
              {!editingItem && <button onClick={() => { setIsNew(true); setEditingItem({}); }} className="bg-white text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Award</button>}
            </div>
            {!editingItem ? (
              <div className="grid gap-4">
                {awards.map((a, i) => (
                  <div key={a.title} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center group">
                    <ReorderControls type="awards" index={i} total={awards.length} />
                    <div className="flex-1"><h3 className="font-bold">{a.title}</h3><p className="text-sm text-pink">{a.date}</p></div>
                    <button onClick={() => { setIsNew(false); setEditingItem(a); }} className="p-2 hover:bg-white/10 rounded-lg mr-2 text-xs px-4">Edit</button>
                    <button onClick={() => deleteAward(a.title)} className="p-2 text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl space-y-4 text-sm">
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="Award Title" />
                <input className="w-full bg-black/50 border border-white/10 rounded p-3" value={editingItem.date || ''} onChange={e => setEditingItem({...editingItem, date: e.target.value})} placeholder="Date" />
                <textarea className="w-full bg-black/50 border border-white/10 rounded p-3 h-32" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} placeholder="Description" />
                <div className="flex justify-end gap-3 pt-4"><button onClick={() => setEditingItem(null)} className="px-4">Cancel</button><button onClick={handleSave} className="bg-pink px-6 py-2 rounded-lg font-bold">Save</button></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;