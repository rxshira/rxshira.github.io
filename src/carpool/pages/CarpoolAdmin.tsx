import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, writeBatch, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { CarpoolUser, AccessStatus, Carpool } from '../types';
import { CheckCircle, XCircle, Trash2, Mail, Phone, Car, MapPin, Search, Play, RefreshCw, FileText, Plus, X, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CsvImport from '../components/CsvImport';
import { runMatchingAlgorithm } from '../lib/matching';
import { mockDistanceService } from '../lib/mockService';
import { GoogleDistanceService } from '../lib/googleService';

const CarpoolAdmin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<CarpoolUser[]>([]);
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<AccessStatus | 'all'>('all');
  const [showImport, setShowImport] = useState(false);
  const [showAddManual, setShowAddAddManual] = useState(false);

  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    address: '',
    zip_code: '',
    has_car: false,
    seats_available: 3,
    phone_number: '',
    role: 'intern' as 'intern' | 'new_grad',
    start_month: 'may' as 'may' | 'july'
  });

  useEffect(() => {
    const qUsers = query(collection(db, 'carpool_users'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const usersData: CarpoolUser[] = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as CarpoolUser);
      });
      setUsers(usersData.sort((a, b) => (b.created_at?.seconds || 0) - (a.created_at?.seconds || 0)));
      setLoading(false);
    });

    const qPools = query(collection(db, 'carpools'));
    const unsubPools = onSnapshot(qPools, (snapshot) => {
      const poolsData: Carpool[] = [];
      snapshot.forEach((doc) => {
        poolsData.push({ id: doc.id, ...doc.data() } as Carpool);
      });
      setCarpools(poolsData);
    });

    return () => {
      unsubUsers();
      unsubPools();
    };
  }, []);

  const handleStatusUpdate = async (userId: string, status: AccessStatus, offerUrl?: string) => {
    try {
      await updateDoc(doc(db, 'carpool_users', userId), { 
        access_status: status,
        // If approved, we can clear the URL since the file is being deleted
        ...(status === 'approved' ? { offer_letter_url: '' } : {})
      });

      // Privacy Cleanup: If approved, delete the sensitive offer letter from Storage
      if (status === 'approved' && offerUrl) {
        try {
          // Firebase Storage ref can be created directly from a full URL
          const storageRef = ref(storage, offerUrl);
          await deleteObject(storageRef);
          console.log("✅ Privacy Cleanup: Offer letter deleted after approval.");
        } catch (storageErr) {
          console.warn("Storage cleanup failed (file might already be gone):", storageErr);
        }
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'carpool_users', userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAddManualUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    try {
      let coords = { lat: 37.3382, lng: -121.8863 };
      if (apiKey) {
        const result = await GoogleDistanceService.geocode(newUser.address || newUser.zip_code, apiKey);
        if (result) coords = result;
      }

      const tempId = `dummy_${Date.now()}`;
      await setDoc(doc(db, 'carpool_users', tempId), {
        ...newUser,
        id: tempId,
        latitude: coords.lat,
        longitude: coords.lng,
        access_status: 'approved',
        is_admin: false,
        created_at: serverTimestamp(),
        willing_to_detour: true,
        max_detour_minutes: 15,
        start_date: `2026-${newUser.start_month === 'may' ? '05' : '07'}-01`
      });
      
      setShowAddAddManual(false);
      setNewUser({
        full_name: '', email: '', address: '', zip_code: '', has_car: false, 
        seats_available: 3, phone_number: '', role: 'intern', start_month: 'may'
      });
    } catch (err) {
      alert("Failed to add user.");
    }
  };

  const handleRunMatching = async () => {
    setMatching(true);
    try {
      const approvedUsers = users.filter(u => u.access_status === 'approved');
      const drivers = approvedUsers.filter(u => u.has_car);
      const riders = approvedUsers.filter(u => !u.has_car);

      if (drivers.length === 0) {
        alert("No approved drivers available for matching.");
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const service = apiKey ? new GoogleDistanceService(apiKey) : mockDistanceService;

      const results = await runMatchingAlgorithm(drivers, riders, service);

      const batch = writeBatch(db);
      carpools.forEach(pool => batch.delete(doc(db, 'carpools', pool.id)));
      results.forEach(pool => {
        const newPoolRef = doc(collection(db, 'carpools'));
        batch.set(newPoolRef, { ...pool, id: newPoolRef.id, created_at: new Date() });
      });

      await batch.commit();
      alert(`Matching complete! Generated ${results.length} carpools.`);
    } catch (error) {
      console.error("Matching failed:", error);
      alert("Matching failed. See console.");
    } finally {
      setMatching(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || u.access_status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-black text-white font-sans overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2 uppercase">
              Carpool <span className="text-pink neon-text">Control Center</span>
            </h1>
            <p className="text-white font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
              Intern / New Grad Access Management
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button 
              onClick={handleRunMatching}
              disabled={matching || users.filter(u => u.access_status === 'approved').length === 0}
              className="bg-white text-black px-5 py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-pink hover:text-white transition-all flex items-center gap-2 disabled:opacity-50 font-mono"
            >
              {matching ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
              Generate Matches
            </button>
            <button 
              onClick={() => setShowAddAddManual(!showAddManual)}
              className={`border border-white/10 px-5 py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 font-mono ${showAddManual ? 'bg-white text-black' : 'text-white hover:bg-white/5'}`}
            >
              <Plus className="w-3 h-3" /> Add Dummy
            </button>
            <button 
              onClick={() => setShowImport(!showImport)}
              className={`border border-white/10 px-5 py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest transition-all font-mono ${showImport ? 'bg-white text-black' : 'text-white hover:bg-white/5'}`}
            >
              Import CSV
            </button>
          </div>
        </header>

        <AnimatePresence>
          {showImport && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-12">
              <CsvImport />
            </motion.div>
          )}

          {showAddManual && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-12 bg-white/5 border border-white/10 p-8 rounded-sm overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-pink">Manual Intern Entry</h3>
                <button onClick={() => setShowAddAddManual(false)} className="text-white/20 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAddManualUser} className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-white/40">Full Name</label>
                  <input required className="w-full bg-black/50 border border-white/10 p-2 text-xs focus:border-pink outline-none text-white" value={newUser.full_name} onChange={e => setNewUser({...newUser, full_name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-white/40">Address / City</label>
                  <input required className="w-full bg-black/50 border border-white/10 p-2 text-xs focus:border-pink outline-none text-white" value={newUser.address} onChange={e => setNewUser({...newUser, address: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-white/40">Vehicle Status</label>
                  <div className="flex gap-2 h-9">
                    <button type="button" onClick={() => setNewUser({...newUser, has_car: true})} className={`flex-1 text-[9px] font-bold uppercase border transition-all ${newUser.has_car ? 'bg-pink border-pink' : 'border-white/10'}`}>Has Car</button>
                    <button type="button" onClick={() => setNewUser({...newUser, has_car: false})} className={`flex-1 text-[9px] font-bold uppercase border transition-all ${!newUser.has_car ? 'bg-white text-black border-white' : 'border-white/10'}`}>Rider</button>
                  </div>
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="bg-white text-black px-8 py-2 font-bold text-[10px] uppercase tracking-widest hover:bg-pink hover:text-white transition-all">Create Dummy Intern</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users Table */}
        <div className="bg-white/5 border border-white/10 overflow-x-auto rounded-sm">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 bg-white/5">
              <tr className="text-[9px] font-bold uppercase text-white/40 font-mono tracking-widest">
                <th className="p-4">Intern / Hire Identity</th>
                <th className="p-4">Communication</th>
                <th className="p-4">Commute Root</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map(u => (
                <motion.tr layout key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-white text-xs">{u.full_name}</div>
                    <div className="text-[9px] text-white/30 flex items-center gap-2 mt-1 uppercase font-mono">
                      {u.has_car ? (
                        <span className="text-pink font-bold flex items-center gap-1"><Car className="w-3 h-3" /> Driver ({u.seats_available})</span>
                      ) : (
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Rider</span>
                      )}
                      {u.offer_letter_url && (
                        <a href={u.offer_letter_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold">
                          <FileText className="w-3 h-3" /> Credentials
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[11px] text-white/60 mb-1 font-mono">{u.email}</div>
                    <div className="flex items-center gap-2 text-[9px] text-white/30 font-mono tracking-tighter">{u.phone_number || 'No Phone'}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono truncate max-w-[180px]">{u.address || u.zip_code}</div>
                  </td>
                  <td className="p-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 uppercase border rounded-sm font-mono ${
                      u.access_status === 'approved' ? 'border-green-500/40 text-green-500 bg-green-500/5' :
                      u.access_status === 'rejected' ? 'border-red-500/40 text-red-500 bg-red-500/5' :
                      'border-yellow-500/40 text-yellow-500 bg-yellow-500/5'
                    }`}>
                      {u.access_status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      {u.access_status !== 'approved' && (
                        <button onClick={() => handleStatusUpdate(u.id, 'approved', u.offer_letter_url)} className="p-1.5 hover:bg-green-500/10 text-green-500 rounded transition-colors"><CheckCircle className="w-4 h-4" /></button>
                      )}
                      {u.access_status !== 'rejected' && (
                        <button onClick={() => handleStatusUpdate(u.id, 'rejected')} className="p-1.5 hover:bg-red-500/10 text-red-500 rounded transition-colors"><XCircle className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => handleDeleteUser(u.id)} className="p-1.5 hover:bg-white/10 text-white/20 hover:text-white rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarpoolAdmin;
