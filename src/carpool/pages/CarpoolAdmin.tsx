import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CarpoolUser, AccessStatus, Carpool } from '../types';
import { CheckCircle, XCircle, Trash2, Mail, Phone, Car, MapPin, Search, Filter, Play, RefreshCw, FileText } from 'lucide-react';
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

  const handleStatusUpdate = async (userId: string, status: AccessStatus) => {
    try {
      await updateDoc(doc(db, 'carpool_users', userId), { access_status: status });
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
      
      // Clear existing pools
      carpools.forEach(pool => {
        batch.delete(doc(db, 'carpools', pool.id));
      });

      // Add new ones
      results.forEach(pool => {
        const newPoolRef = doc(collection(db, 'carpools'));
        batch.set(newPoolRef, {
          ...pool,
          id: newPoolRef.id,
          created_at: new Date()
        });
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
    <div className="min-h-screen pt-24 pb-12 px-6 bg-bg">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Carpool <span className="text-pink">Admin Control</span>
            </h1>
            <p className="text-text-gray text-xs uppercase tracking-widest font-bold">
              User Access & Verification Management
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleRunMatching}
              disabled={matching || users.filter(u => u.access_status === 'approved').length === 0}
              className="btn bg-pink border-pink flex items-center gap-2 disabled:opacity-50"
            >
              {matching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
              Run Matcher
            </button>
            <button 
              onClick={() => setShowImport(!showImport)}
              className={`btn text-[10px] ${showImport ? 'bg-white text-black' : ''}`}
            >
              {showImport ? 'Close Import' : 'Import CSV'}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {showImport && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <CsvImport />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-4">
            <p className="text-[10px] text-text-gray font-bold uppercase">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4">
            <p className="text-[10px] text-pink font-bold uppercase">Active Carpools</p>
            <p className="text-2xl font-bold text-pink">{carpools.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4">
            <p className="text-[10px] text-green-500 font-bold uppercase">Approved Users</p>
            <p className="text-2xl font-bold text-green-500">{users.filter(u => u.access_status === 'approved').length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4">
            <p className="text-[10px] text-text-gray font-bold uppercase">Pending Approval</p>
            <p className="text-2xl font-bold">{users.filter(u => u.access_status === 'pending').length}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-gray" />
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-white/5 border border-white/10 p-3 pl-10 focus:border-pink outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-bold uppercase border transition-all ${
                  filter === f ? 'bg-pink border-pink text-white' : 'border-white/10 text-text-gray hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/5 border border-white/10 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 bg-white/5">
              <tr className="text-[10px] font-bold uppercase text-text-gray">
                <th className="p-4">User</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map(u => (
                <motion.tr 
                  layout
                  key={u.id} 
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4">
                    <div className="font-bold text-white">{u.full_name}</div>
                    <div className="text-[10px] text-text-gray flex items-center gap-2 mt-1">
                      {u.has_car ? (
                        <span className="text-pink flex items-center gap-1 font-bold">
                          <Car className="w-3 h-3" /> DRIVER ({u.seats_available} SEATS)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">RIDER</span>
                      )}
                      {u.offer_letter_url && (
                        <a 
                          href={u.offer_letter_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold uppercase"
                        >
                          <FileText className="w-3 h-3" /> Offer
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-text-gray mb-1">
                      <Mail className="w-3 h-3" /> {u.email}
                    </div>
                    {u.phone_number && (
                      <div className="flex items-center gap-2 text-xs text-text-gray">
                        <Phone className="w-3 h-3" /> {u.phone_number}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-xs text-text-gray">
                      <MapPin className="w-3 h-3" /> {u.address ? `${u.address}, ${u.zip_code}` : `Zip: ${u.zip_code}`}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-1 uppercase border ${
                      u.access_status === 'approved' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
                      u.access_status === 'rejected' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                      'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
                    }`}>
                      {u.access_status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {u.access_status !== 'approved' && (
                        <button 
                          onClick={() => handleStatusUpdate(u.id, 'approved')}
                          className="p-2 hover:bg-green-500/20 text-green-500 rounded transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {u.access_status !== 'rejected' && (
                        <button 
                          onClick={() => handleStatusUpdate(u.id, 'rejected')}
                          className="p-2 hover:bg-red-500/20 text-red-500 rounded transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-2 hover:bg-white/10 text-text-gray rounded transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-gray text-sm">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarpoolAdmin;
