import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Carpool, CarpoolUser } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Users, Car, Shield, Search, ArrowRight, Activity, CheckCircle, LogOut } from 'lucide-react';
import MapView from '../components/MapView';

const Dashboard = () => {
  const { user, carpoolUser, logout } = useAuth();
  const [allUsers, setAllUsers] = useState<CarpoolUser[]>([]);
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [myCarpool, setMyCarpool] = useState<Carpool | null>(null);
  const [myMembers, setMyMembers] = useState<CarpoolUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'drivers' | 'riders' | 'matched'>('all');

  useEffect(() => {
    const qUsers = query(collection(db, 'carpool_users'), where('access_status', '==', 'approved'));
    const unsubUsers = onSnapshot(qUsers, (snap) => {
      const users: CarpoolUser[] = [];
      snap.forEach(doc => users.push(doc.data() as CarpoolUser));
      setAllUsers(users);
    });

    const qPools = query(collection(db, 'carpools'));
    const unsubPools = onSnapshot(qPools, (snap) => {
      const pools: Carpool[] = [];
      snap.forEach(doc => pools.push(doc.data() as Carpool));
      setCarpools(pools);
      
      const myPool = pools.find(p => p.member_ids.includes(user?.uid));
      setMyCarpool(myPool || null);
    });

    return () => {
      unsubUsers();
      unsubPools();
    };
  }, [user]);

  useEffect(() => {
    if (myCarpool) {
      const qMembers = query(collection(db, 'carpool_users'), where('id', 'in', myCarpool.member_ids));
      const unsub = onSnapshot(qMembers, (snap) => {
        const members: CarpoolUser[] = [];
        snap.forEach(doc => members.push(doc.data() as CarpoolUser));
        // Sort to match pickup order
        const sorted = [...members].sort((a, b) => {
          if (a.id === myCarpool.driver_id) return -1;
          if (b.id === myCarpool.driver_id) return 1;
          return myCarpool.pickup_order.indexOf(a.id) - myCarpool.pickup_order.indexOf(b.id);
        });
        setMyMembers(sorted);
        setLoading(false);
      });
      return unsub;
    } else {
      setLoading(false);
    }
  }, [myCarpool]);

  const handleAcceptMatch = async () => {
    if (!myCarpool || !user) return;
    try {
      const poolRef = doc(db, 'carpools', myCarpool.id);
      await updateDoc(poolRef, {
        accepted_ids: arrayUnion(user.uid)
      });
      if (myCarpool.accepted_ids.length + 1 >= myCarpool.member_ids.length) {
        await updateDoc(poolRef, { status: 'active' });
      }
    } catch (error) {
      console.error("Error accepting match:", error);
    }
  };

  const isFullyAccepted = myCarpool?.status === 'active';
  const hasIAccepted = myCarpool?.accepted_ids.includes(user?.uid || '');

  const getVisibleAddress = (member: CarpoolUser) => {
    if (isFullyAccepted || member.id === user?.uid) {
      return member.address || member.zip_code;
    }
    return `Area: ${member.zip_code} (Hidden)`;
  };

  const filteredUsers = allUsers.filter(u => {
    const isMatched = carpools.some(p => p.member_ids.includes(u.id));
    const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.zip_code?.includes(searchTerm);
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'drivers' && u.has_car) || 
      (filter === 'riders' && !u.has_car) || 
      (filter === 'matched' && isMatched);
    
    return matchesSearch && matchesFilter;
  });

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1f6abf] rounded-md flex items-center justify-center font-mono font-bold text-[10px] tracking-widest">IBM</div>
          <span className="text-sm font-medium tracking-tight">Intern Carpool</span>
          <span className="bg-[#1f6abf]/20 border border-[#1f6abf]/30 text-[#5ba3e8] text-[9px] font-mono px-2 py-0.5 rounded uppercase">SVL · Summer 2025</span>
        </div>
        <div className="flex items-center gap-3">
          {myCarpool && isFullyAccepted && (
            <span className="bg-green-500/10 border border-green-500/30 text-green-500 text-[9px] font-mono px-2 py-0.5 rounded flex items-center gap-1 uppercase">
              <CheckCircle className="w-2.5 h-2.5" /> You're matched
            </span>
          )}
          <button 
            onClick={() => logout()}
            className="text-[11px] text-white/40 hover:text-white border border-white/10 px-3 py-1 rounded transition-colors"
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* Stats Strip */}
      <div className="flex border-b border-white/10 shrink-0 z-20">
        {[
          { label: 'Total interns', val: allUsers.length, color: 'text-pink' },
          { label: 'Drivers', val: allUsers.filter(u=>u.has_car).length, color: '' },
          { label: 'Riders', val: allUsers.filter(u=>!u.has_car).length, color: '' },
          { label: 'Matched', val: allUsers.filter(u => carpools.some(p => p.member_ids.includes(u.id))).length, color: 'text-pink' },
          { label: 'Cars saved', val: carpools.length, color: '' },
          { label: 'IBM SVL arrival', val: '9:00', color: '' },
        ].map((s, i) => (
          <div key={i} className="flex-1 p-3 px-5 border-r border-white/10 last:border-r-0">
            <div className={`text-xl font-semibold tracking-tighter ${s.color}`}>{s.val}</div>
            <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden z-10">
        {/* Sidebar */}
        <aside className="w-[260px] border-r border-white/10 flex flex-col shrink-0 bg-[#0c0c0c]">
          <div className="p-3 px-4 border-b border-white/10 shrink-0">
            <div className="flex gap-1 mb-3">
              {(['all', 'drivers', 'riders', 'matched'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[9px] font-mono flex-1 py-1 rounded border transition-all capitalize ${
                    filter === f ? 'bg-pink/15 border-pink/40 text-pink' : 'border-white/10 text-white/40 hover:bg-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="text-[10px] font-mono text-pink uppercase tracking-widest mb-1 px-1">Intern roster</div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-white/[0.03]">
            {filteredUsers.map(u => {
              const isMe = u.id === user?.uid;
              const isMatched = carpools.some(p => p.member_ids.includes(u.id));
              const isMyGroup = myCarpool?.member_ids.includes(u.id);

              return (
                <div 
                  key={u.id}
                  className={`p-3.5 px-4 flex gap-3 items-start cursor-default transition-all ${isMyGroup ? 'bg-pink/[0.04] border-l-2 border-pink pl-3.5' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0 ${u.has_car ? 'bg-blue-500/15 border border-blue-500/35 text-[#5ba3e8]' : 'bg-pink/15 border border-pink/35 text-pink'}`}>
                    {getInitials(u.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-white truncate">
                      {u.full_name} {isMe && <span className="text-white/40 font-normal ml-1">(you)</span>}
                    </div>
                    <div className="text-[10px] text-white/40 font-mono truncate mt-0.5">
                      {u.zip_code} · {u.has_car ? 'Driver' : 'Rider'}
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${u.has_car ? 'bg-blue-500/10 text-[#5ba3e8]/80 border-blue-500/20' : 'bg-pink/10 text-pink/80 border-pink/20'}`}>
                        {u.has_car ? `Driver · ${u.seats_available}s` : 'Rider'}
                      </span>
                      {isMatched && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-green-500/10 text-green-400/80 border-green-500/20 uppercase">Matched</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Map Area */}
        <main className="flex-1 relative overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 z-0">
            <MapView 
              markers={allUsers.map(m => ({
                lat: m.latitude,
                lng: m.longitude,
                name: m.full_name,
                type: m.has_car ? 'driver' : 'rider',
                isSelected: myCarpool?.member_ids.includes(m.id)
              }))}
              routePolyline={myCarpool?.route_polyline}
            />
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-black/85 border border-white/10 backdrop-blur-xl p-3 px-4 rounded-lg z-20 space-y-2.5 shadow-2xl">
            <h4 className="text-[9px] font-mono text-pink uppercase tracking-widest mb-1.5">Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-full bg-pink" /> <span>Driver</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-full bg-[#5ba3e8]" /> <span>Rider (on route)</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-full bg-white/15" /> <span>Unmatched</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1f6abf] flex items-center justify-center text-[5px] font-bold text-white uppercase">IBM</div> <span>IBM SVL office</span>
              </div>
            </div>
          </div>

          {/* Route Panel Overlay */}
          <AnimatePresence>
            {myCarpool && (
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="absolute bottom-0 left-0 right-0 bg-black/94 border-t border-white/10 backdrop-blur-2xl p-4 px-6 z-30"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="text-[9px] font-mono text-pink uppercase tracking-widest mb-3">
                      {myMembers.find(m=>m.id === myCarpool.driver_id)?.full_name} → IBM SVL · Active route
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {myMembers.map((m, i) => (
                        <React.Fragment key={m.id}>
                          <div className="flex items-center gap-2 group relative">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border ${m.id === myCarpool.driver_id ? 'bg-pink/20 text-pink border-pink' : 'bg-[#5ba3e8]/20 text-[#5ba3e8] border-[#5ba3e8]'}`}>
                              {m.id === myCarpool.driver_id ? getInitials(m.full_name) : i}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] text-white/60">{m.full_name.split(' ')[0]}</span>
                            </div>
                            {i < myMembers.length - 1 && <span className="text-white/20 text-xs mx-1">→</span>}
                          </div>
                        </React.Fragment>
                      ))}
                      <span className="text-white/20 text-xs mx-1">→</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-[3px] bg-[#1f6abf]/20 border border-[#1f6abf]/50 flex items-center justify-center text-[7px] font-bold text-[#5ba3e8] uppercase">IBM</div>
                        <span className="text-[11px] text-white/60">555 Bailey Ave, SJ</span>
                      </div>
                    </div>
                    <div className="text-[9px] font-mono text-white/20 mt-3 flex items-center gap-2">
                      <Shield className="w-3 h-3" /> {isFullyAccepted ? 'Match confirmed. Full addresses visible in profile.' : 'Suggested. Accept match to reveal route details.'}
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex gap-10">
                      <div className="text-right">
                        <div className="text-[16px] font-bold text-pink">{myCarpool.estimated_duration} min</div>
                        <div className="text-[9px] text-white/40 font-mono uppercase mt-0.5">Total drive</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[16px] font-bold text-white">8:46</div>
                        <div className="text-[9px] text-white/40 font-mono uppercase mt-0.5">Est. arrival</div>
                      </div>
                    </div>
                    
                    {!hasIAccepted ? (
                      <button 
                        onClick={handleAcceptMatch}
                        className="bg-green-500 text-black px-6 py-2 rounded-md font-bold text-[10px] hover:bg-green-400 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                      >
                        Accept Match
                      </button>
                    ) : (
                      <div className="bg-pink/15 border border-pink/38 rounded-md p-2 px-5 text-center">
                        <div className="text-[17px] font-bold text-pink font-mono leading-none">7:42 AM</div>
                        <div className="text-[8px] text-white/40 font-mono uppercase mt-1 tracking-widest">Leave by</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
