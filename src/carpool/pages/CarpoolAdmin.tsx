import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, writeBatch, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { CarpoolUser, AccessStatus, Carpool } from '../types';
import { CheckCircle, XCircle, Trash2, Mail, Phone, Car, MapPin, Search, Play, RefreshCw, FileText, Plus, X, Users, AlertTriangle } from 'lucide-react';
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

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rejectingIds, setRejectingIds] = useState<string[]>([]);
  const [rejectionReasons, setRejectionReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');
  const [rejectionAction, setRejectionAction] = useState<'fix' | 'contact'>('fix');

  const REJECTION_OPTIONS = [
    { id: 'name', label: 'Missing Name' },
    { id: 'address', label: 'Missing Address' },
    { id: 'phone', label: 'Missing Phone #' },
    { id: 'offer', label: 'Missing Offer Letter' }
  ];

  useEffect(() => {
    const qUsers = query(collection(db, 'carpool_users'));
    const unsubUsers = onSnapshot(qUsers, (snap) => {
      const usersData: CarpoolUser[] = [];
      snap.forEach(doc => usersData.push({ id: doc.id, ...doc.data() } as CarpoolUser));
      setUsers(usersData.sort((a, b) => (b.created_at?.seconds || 0) - (a.created_at?.seconds || 0)));
      setLoading(false);
    });

    const qPools = query(collection(db, 'carpools'));
    const unsubPools = onSnapshot(qPools, (snap) => {
      const poolsData: Carpool[] = [];
      snap.forEach(doc => poolsData.push({ id: doc.id, ...doc.data() } as Carpool));
      setCarpools(poolsData);
    });

    return () => { unsubUsers(); unsubPools(); };
  }, []);

  const sendEmail = async (to: string, subject: string, html: string) => {
    const functions = getFunctions();
    const sendFn = httpsCallable(functions, 'sendEmailNotification');
    try { await sendFn({ to, subject, html }); } catch (e) { console.error("Email failed", e); }
  };

  const handleApprove = async (userId: string, email: string, name: string, offerUrl?: string) => {
    try {
      await updateDoc(doc(db, 'carpool_users', userId), { 
        access_status: 'approved', rejection_reasons: [], rejection_reason: '', offer_letter_url: '' 
      });

      if (offerUrl) { try { await deleteObject(ref(storage, offerUrl)); } catch (e) {} }

      await sendEmail(email, "Access Approved: IBM Carpool Portal", `<h1>Welcome ${name}!</h1><p>Your IBM Carpool account has been verified. You can now log in and find your ride.</p>`);
    } catch (error) { console.error("Approval failed", error); }
  };

  const handleRejectConfirm = async () => {
    if (rejectingIds.length === 0) return;
    setLoading(true);
    try {
      for (const id of rejectingIds) {
        const u = users.find(u => u.id === id);
        if (!u) continue;

        await updateDoc(doc(db, 'carpool_users', id), {
          access_status: 'rejected',
          rejection_reasons: rejectionReasons,
          rejection_reason: otherReason,
          rejection_action: rejectionAction
        });

        const reasonList = rejectionReasons.map(r => `<li>Missing ${r}</li>`).join('');
        await sendEmail(u.email, "Action Required: Carpool Verification", `<h1>Verification Update</h1><p>Hello ${u.full_name || 'Intern'},</p><p>We need some changes to your profile:</p><ul>${reasonList}</ul><p>${otherReason}</p><p>Please log in to fix these issues.</p>`);
      }
      setRejectingIds([]); setSelectedIds([]); setRejectionReasons([]); setOtherReason('');
    } catch (err) { console.error(err); } finally { setLoading(true); }
  };

  const handleBulkApprove = async () => {
    if (!window.confirm(`Approve ${selectedIds.length} users?`)) return;
    setLoading(true);
    for (const id of selectedIds) {
      const u = users.find(u => u.id === id);
      if (u) await handleApprove(id, u.email, u.full_name, u.offer_letter_url);
    }
    setSelectedIds([]); setLoading(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Completely wipe this user's profile? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'carpool_users', userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || u.access_status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredUsers.length && filteredUsers.length > 0) setSelectedIds([]);
    else setSelectedIds(filteredUsers.map(u => u.id));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-black text-white font-sans overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12 flex justify-between items-end">
          <div><h1 className="text-4xl font-bold tracking-tighter mb-2 uppercase">Carpool <span className="text-pink neon-text">Control</span></h1><p className="text-white font-mono text-[10px] uppercase tracking-widest font-bold">Admin Management</p></div>
          <div className="flex gap-3"><button onClick={() => setShowImport(!showImport)} className="border border-white/10 px-5 py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest font-mono text-white">Import CSV</button></div>
        </header>

        <AnimatePresence>{showImport && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-12"><CsvImport /></motion.div>}</AnimatePresence>

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-6 py-4 rounded-sm flex items-center gap-8 shadow-2xl border border-white/20">
              <div className="flex flex-col"><span className="text-[10px] font-bold uppercase">Bulk Actions</span><span className="text-xs font-mono font-bold text-pink">{selectedIds.length} Selected</span></div>
              <div className="flex gap-3">
                <button onClick={handleBulkApprove} className="bg-green-600 text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase">Approve All</button>
                <button onClick={() => setRejectingIds(selectedIds)} className="bg-red-600 text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase">Reject All</button>
                <button onClick={() => setSelectedIds([])} className="px-4 py-2 text-[10px] font-bold uppercase">Cancel</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {rejectingIds.length > 0 && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRejectingIds([])} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0c0c0c] border border-white/10 p-10 max-w-lg w-full rounded-sm shadow-2xl">
                <h3 className="text-xl font-bold mb-8 uppercase tracking-tighter">Reject {rejectingIds.length} Request(s)</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    {REJECTION_OPTIONS.map(opt => (
                      <label key={opt.id} className="flex items-center gap-3 p-3 border border-white/5 hover:bg-white/5 cursor-pointer">
                        <input type="checkbox" className="accent-pink" checked={rejectionReasons.includes(opt.id)} onChange={(e) => {
                          if (e.target.checked) setRejectionReasons([...rejectionReasons, opt.id]);
                          else setRejectionReasons(rejectionReasons.filter(r => r !== opt.id));
                        }} />
                        <span className="text-[10px] font-bold uppercase font-mono">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <textarea className="w-full bg-black/50 border border-white/10 p-3 text-xs focus:border-pink outline-none h-24 font-mono text-white" placeholder="Custom comments..." value={otherReason} onChange={e => setOtherReason(e.target.value)} />
                  <div className="pt-4 border-t border-white/5">
                    <label className="text-[10px] uppercase font-mono text-white/40 mb-3 block">Action for User</label>
                    <div className="flex gap-3">
                      <button onClick={() => setRejectionAction('fix')} className={`flex-1 py-3 border text-[10px] font-bold uppercase ${rejectionAction === 'fix' ? 'border-pink text-pink bg-pink/5' : 'border-white/10 text-white/40'}`}>Fix Issues</button>
                      <button onClick={() => setRejectionAction('contact')} className={`flex-1 py-3 border text-[10px] font-bold uppercase ${rejectionAction === 'contact' ? 'border-pink text-pink bg-pink/5' : 'border-white/10 text-white/40'}`}>Contact Admin</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-10">
                  <button onClick={handleRejectConfirm} className="flex-1 bg-pink text-white py-4 font-bold text-xs uppercase tracking-widest hover:shadow-glow-pink transition-all">Submit Rejection</button>
                  <button onClick={() => setRejectingIds([])} className="px-8 text-white/40 uppercase text-[10px] font-bold hover:text-white transition-colors">Cancel</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="bg-white/5 border border-white/10 overflow-x-auto rounded-sm">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 bg-white/5">
              <tr className="text-[9px] font-bold uppercase text-white/40 font-mono tracking-widest">
                <th className="p-4 w-12"><input type="checkbox" className="accent-pink cursor-pointer" checked={selectedIds.length > 0 && selectedIds.length === filteredUsers.length} onChange={toggleSelectAll} /></th>
                <th className="p-4">Identity</th>
                <th className="p-4 text-center">Profile</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filteredUsers.map(u => (
                <motion.tr layout key={u.id} className={`transition-colors group ${selectedIds.includes(u.id) ? 'bg-pink/10' : 'hover:bg-white/[0.02]'}`}>
                  <td className="p-4"><input type="checkbox" className="accent-pink cursor-pointer" checked={selectedIds.includes(u.id)} onChange={() => setSelectedIds(prev => prev.includes(u.id) ? prev.filter(i => i !== u.id) : [...prev, u.id])} /></td>
                  <td className="p-4"><div className="font-bold text-white text-[11px] truncate max-w-[120px]">{u.full_name || 'NO NAME'}</div><div className="text-[8px] text-white/30 flex items-center gap-1.5 mt-1 uppercase">{u.has_car ? <span className="text-pink font-bold flex items-center gap-1"><Car className="w-2.5 h-2.5" /> Driver</span> : <span className="flex items-center gap-1"><Users className="w-2.5 h-2.5" /> Rider</span>}{u.offer_letter_url && <a href={u.offer_letter_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"><FileText className="w-2.5 h-2.5" /> Creds</a>}</div></td>
                  <td className="p-4 text-center">{u.full_name && u.zip_code ? <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] mx-auto" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/20 mx-auto" />}</td>
                  <td className="p-4"><div className="text-[11px] text-white/60 truncate max-w-[150px]">{u.email}</div><div className="text-[9px] text-white/30 tracking-tighter">{u.phone_number || 'No Phone'}</div></td>
                  <td className="p-4"><span className={`text-[9px] font-bold px-2 py-0.5 uppercase border rounded-sm ${u.access_status === 'approved' ? 'border-green-500/40 text-green-500 bg-green-500/5' : u.access_status === 'rejected' ? 'border-red-500/40 text-red-500 bg-red-500/5' : 'border-yellow-500/40 text-yellow-500 bg-yellow-500/5'}`}>{u.access_status}</span>{u.submission_count && u.submission_count > 1 && <span className="ml-2 text-[8px] text-pink font-bold">({u.submission_count}x)</span>}</td>
                  <td className="p-4 text-right"><div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">{u.access_status !== 'approved' && <button onClick={() => handleApprove(u.id, u.email, u.full_name, u.offer_letter_url)} className="p-1.5 hover:bg-green-500/10 text-green-500 rounded"><CheckCircle className="w-4 h-4" /></button>}{u.access_status !== 'rejected' && <button onClick={() => setRejectingIds([u.id])} className="p-1.5 hover:bg-red-500/10 text-red-500 rounded"><XCircle className="w-4 h-4" /></button>}<button onClick={() => handleDeleteUser(u.id)} className="p-1.5 hover:bg-white/10 text-white/20 hover:text-white rounded"><Trash2 className="w-4 h-4" /></button></div></td>
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
