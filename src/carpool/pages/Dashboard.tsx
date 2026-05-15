import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Carpool, CarpoolUser, RideRequest } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Users, Car, Shield, Search, ArrowRight, Activity, CheckCircle, MoreVertical, Send, UserCheck, Bell } from 'lucide-react';
import MapView from '../components/MapView';
import { GoogleDistanceService } from '../lib/googleService';

const Dashboard = () => {
  const { user, carpoolUser, logout } = useAuth();
  const [allUsers, setAllUsers] = useState<CarpoolUser[]>([]);
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [requests, setRequests] = useState<RideRequest[]>([]);
  const [myCarpool, setMyCarpool] = useState<Carpool | null>(null);
  const [myMembers, setMyMembers] = useState<CarpoolUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'drivers' | 'riders' | 'matched'>('all');
  
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [tempRoute, setTempRoute] = useState<string | null>(null);

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

    const qReqs = query(collection(db, 'ride_requests'), where('receiver_id', '==', user?.uid));
    const unsubReqs = onSnapshot(qReqs, (snap) => {
      const reqs: RideRequest[] = [];
      snap.forEach(doc => reqs.push({ id: doc.id, ...doc.data() } as RideRequest));
      setRequests(reqs.filter(r => r.status === 'pending'));
    });

    return () => {
      unsubUsers();
      unsubPools();
      unsubReqs();
    };
  }, [user]);

  useEffect(() => {
    if (myCarpool) {
      const qMembers = query(collection(db, 'carpool_users'), where('id', 'in', myCarpool.member_ids));
      const unsub = onSnapshot(qMembers, (snap) => {
        const members: CarpoolUser[] = [];
        snap.forEach(doc => members.push(doc.data() as CarpoolUser));
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

  const handleShowRoute = async (targetUser: CarpoolUser) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    try {
      const service = new GoogleDistanceService(apiKey);
      const route = await service.getRoute(
        { lat: targetUser.latitude, lng: targetUser.longitude },
        { lat: 37.194697, lng: -121.745837 }
      );
      setTempRoute(route.polyline);
      setActiveMenuId(null);
    } catch (err) {
      console.error("Route generation failed", err);
    }
  };

  const handleSendRequest = async (targetUser: CarpoolUser) => {
    try {
      await addDoc(collection(db, 'ride_requests'), {
        sender_id: user?.uid,
        receiver_id: targetUser.id,
        type: carpoolUser?.has_car ? 'drive_offer' : 'pickup_request',
        status: 'pending',
        created_at: serverTimestamp()
      });
      alert("Request sent successfully!");
      setActiveMenuId(null);
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  const handleAcceptMatch = async () => {
    if (!myCarpool || !user) return;
    try {
      const poolRef = doc(db, 'carpools', myCarpool.id);
      await updateDoc(poolRef, { accepted_ids: arrayUnion(user.uid) });
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
    if (isFullyAccepted || member.id === user?.uid) return member.address || member.zip_code;
    return `Area: ${member.zip_code} (Hidden)`;
  };

  const filteredUsers = allUsers.filter(u => {
    const isMatched = carpools.some(p => p.member_ids.includes(u.id));
    const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.zip_code?.includes(searchTerm);
    const matchesFilter = filter === 'all' || (filter === 'drivers' && u.has_car) || (filter === 'riders' && !u.has_car) || (filter === 'matched' && isMatched);
    return matchesSearch && matchesFilter;
  });

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1f6abf] rounded-md flex items-center justify-center font-mono font-bold text-[10px] tracking-widest shadow-[0_0_15px_rgba(31,106,191,0.3)]">IBM</div>
          <span className="text-sm font-medium tracking-tight">Intern / New Grad Portal</span>
          <span className="bg-[#1f6abf]/20 border border-[#1f6abf]/30 text-[#5ba3e8] text-[9px] font-mono px-2 py-0.5 rounded uppercase">SVL · Summer 2026</span>
        </div>
        <div className="flex items-center gap-5">
          {requests.length > 0 && (
            <div className="relative group cursor-pointer">
              <Bell className="w-4 h-4 text-pink animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink rounded-full border border-black" />
            </div>
          )}
          {myCarpool && isFullyAccepted && (
            <span className="bg-green-500/10 border border-green-500/30 text-green-500 text-[9px] font-mono px-2 py-0.5 rounded flex items-center gap-1 uppercase">
              <CheckCircle className="w-2.5 h-2.5" /> Matched
            </span>
          )}
          <button onClick={() => logout()} className="text-[11px] text-white/40 hover:text-white border border-white/10 px-3 py-1 rounded transition-colors uppercase font-bold tracking-widest font-mono">Sign out</button>
        </div>
      </nav>

      {/* Stats Strip */}
      <div className="flex border-b border-white/10 shrink-0 z-20 bg-[#050505]">
        {[
          { label: 'Total interns', val: allUsers.length, color: 'text-pink' },
          { label: 'Drivers', val: allUsers.filter(u=>u.has_car).length, color: '' },
          { label: 'Riders', val: allUsers.filter(u=>!u.has_car).length, color: '' },
          { label: 'Matched', val: allUsers.filter(u => carpools.some(p => p.member_ids.includes(u.id))).length, color: 'text-pink' },
          { label: 'Cars saved', val: carpools.length, color: '' },
          { label: 'Arrival Target', val: '9:00', color: '' },
        ].map((s, i) => (
          <div key={i} className="flex-1 p-3 px-5 border-r border-white/10 last:border-r-0">
            <div className={`text-xl font-semibold tracking-tighter ${s.color}`}>{s.val}</div>
            <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden z-10">
        {/* Sidebar */}
        <aside className="w-[280px] border-r border-white/10 flex flex-col shrink-0 bg-[#0c0c0c]">
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
            <div className="text-[10px] font-mono text-pink uppercase tracking-[0.2em] mb-1 px-1">Intern roster</div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-white/[0.03]">
            {filteredUsers.map(u => {
              const isMe = u.id === user?.uid;
              const pool = carpools.find(p => p.member_ids.includes(u.id));
              const isMatched = !!pool;
              const isMyGroup = myCarpool?.member_ids.includes(u.id);

              return (
                <div key={u.id} className={`p-4 px-4 flex gap-3 items-start group relative transition-all ${isMyGroup ? 'bg-pink/[0.04] border-l-2 border-pink pl-3.5' : 'hover:bg-white/[0.02]'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0 border ${
                    isMe ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400' :
                    u.has_car ? 'bg-blue-500/15 border-blue-500/35 text-[#5ba3e8]' : 
                    'bg-pink/15 border-pink/35 text-pink'
                  }`}>
                    {getInitials(u.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] font-medium text-white truncate max-w-[120px]">
                        {u.full_name} {isMe && <span className="text-white/40 font-normal ml-1">(you)</span>}
                      </div>
                      {!isMe && (
                        <div className="relative">
                          <button onClick={() => setActiveMenuId(activeMenuId === u.id ? null : u.id)} className="p-1 hover:bg-white/10 rounded transition-colors text-white/20 hover:text-white">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                          {activeMenuId === u.id && (
                            <div className="absolute right-0 top-full mt-1 w-36 bg-[#181818] border border-white/10 rounded-sm shadow-2xl z-50 overflow-hidden font-mono">
                              <button onClick={() => handleShowRoute(u)} className="w-full text-left px-3 py-2 text-[9px] text-white/70 hover:bg-pink hover:text-white transition-colors flex items-center gap-2 uppercase tracking-tighter">
                                <Activity className="w-3 h-3" /> Show Route
                              </button>
                              <button onClick={() => handleSendRequest(u)} className="w-full text-left px-3 py-2 text-[9px] text-white/70 hover:bg-blue-500 hover:text-white transition-colors border-t border-white/5 flex items-center gap-2 uppercase tracking-tighter">
                                <Send className="w-3 h-3" /> {u.has_car ? 'Ask for Ride' : 'Offer Pickup'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-white/40 font-mono truncate mt-0.5">
                      {u.zip_code} · {u.has_car ? 'Driver' : 'Rider'}
                    </div>
                    <div className="flex gap-1.5 mt-2.5">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${u.has_car ? 'bg-blue-500/10 text-[#5ba3e8]/80 border-blue-500/20' : 'bg-pink/10 text-pink/80 border-pink/20'}`}>
                        {u.has_car ? `Driver · ${u.seats_available}s` : 'Rider'}
                      </span>
                      {isMatched && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded bg-green-500/10 text-green-400/80 border border-green-500/20 uppercase`}>
                          Matched
                        </span>
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
              markers={allUsers.map(m => {
                const pool = carpools.find(p => p.member_ids.includes(m.id));
                const isMatched = !!pool;
                const isFull = m.has_car && pool && pool.member_ids.length >= m.seats_available + 1;
                return {
                  lat: m.latitude,
                  lng: m.longitude,
                  name: m.full_name,
                  type: m.has_car ? 'driver' : 'rider',
                  isMe: m.id === user?.uid,
                  isMatched,
                  isFull,
                  isSelected: myCarpool?.member_ids.includes(m.id) || activeMenuId === m.id
                };
              })}
              routePolyline={tempRoute || myCarpool?.route_polyline}
            />
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-black/85 border border-white/10 backdrop-blur-xl p-3 px-4 rounded-lg z-20 space-y-2.5 shadow-2xl">
            <h4 className="text-[9px] font-mono text-pink uppercase tracking-widest mb-1.5">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" /> <span>You</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> <span>Driver</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-full bg-pink" /> <span>Rider</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-white/40 border-t border-white/5 pt-2 mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-white" /> <span>Full / Confirmed</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-white/40">
                <div className="w-2.5 h-2.5 rounded-full border border-white" /> <span>Unmatched / Open</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-white/40 border-t border-white/5 pt-2">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1f6abf] flex items-center justify-center text-[5px] font-bold text-white uppercase">IBM</div> <span>SVL (555 Bailey Ave)</span>
              </div>
            </div>
            {tempRoute && (
              <button onClick={() => setTempRoute(null)} className="w-full mt-2 py-1 text-[8px] bg-pink/20 text-pink border border-pink/30 uppercase font-bold tracking-tighter rounded-sm">Clear Active Path</button>
            )}
          </div>

          {/* Notifications / Requests Panel Overlay */}
          <AnimatePresence>
            {requests.length > 0 && (
              <motion.div initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} className="absolute top-20 right-4 w-64 bg-black/90 border border-white/10 backdrop-blur-xl z-40 p-4 rounded-sm shadow-2xl">
                <div className="flex items-center gap-2 text-pink text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Bell className="w-3.5 h-3.5" /> Notifications
                </div>
                <div className="space-y-3">
                  {requests.map(req => {
                    const sender = allUsers.find(u => u.id === req.sender_id);
                    return (
                      <div key={req.id} className="bg-white/5 p-3 border border-white/5 rounded-sm">
                        <p className="text-[10px] text-white/80 leading-relaxed">
                          <span className="text-white font-bold">{sender?.full_name}</span> {req.type === 'drive_offer' ? 'offered you a drive.' : 'requested a pickup.'}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 py-1.5 bg-green-500 text-black text-[9px] font-bold uppercase rounded-sm">Accept</button>
                          <button className="flex-1 py-1.5 border border-white/10 text-white/40 text-[9px] font-bold uppercase rounded-sm hover:text-white">Ignore</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Route Panel Overlay */}
          <AnimatePresence>
            {myCarpool && (
              <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="absolute bottom-0 left-0 right-0 bg-black/94 border-t border-white/10 backdrop-blur-2xl p-4 px-6 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono text-pink uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Activity className="w-3 h-3" /> Optimized Commute Sequence
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {myMembers.map((m, i) => (
                        <React.Fragment key={m.id}>
                          <div className="flex items-center gap-2 group relative">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold border transition-all ${
                              m.id === user?.uid ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400' :
                              m.has_car ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 
                              'bg-pink/20 text-pink border-pink/40'
                            }`}>
                              {m.id === myCarpool.driver_id ? getInitials(m.full_name) : i}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[11px] text-white/60 truncate max-w-[80px]">{m.full_name.split(' ')[0]} {m.id === user?.uid && '(You)'}</span>
                              <span className="text-[8px] text-white/20 font-mono truncate">{getVisibleAddress(m)}</span>
                            </div>
                            {i < myMembers.length - 1 && <span className="text-white/10 text-xs mx-1">→</span>}
                          </div>
                        </React.Fragment>
                      ))}
                      <span className="text-white/10 text-xs mx-1">→</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-[3px] bg-[#1f6abf]/20 border border-[#1f6abf]/50 flex items-center justify-center text-[7px] font-bold text-[#5ba3e8] uppercase">IBM</div>
                        <span className="text-[10px] text-white/60 font-mono tracking-tighter">SVL Lab</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-10 shrink-0">
                    <div className="flex gap-10">
                      <div className="text-right">
                        <div className="text-[18px] font-bold text-pink font-mono tracking-tighter">{myCarpool.estimated_duration}m</div>
                        <div className="text-[9px] text-white/40 font-mono uppercase mt-0.5">Duration</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[18px] font-bold text-white font-mono tracking-tighter">8:46</div>
                        <div className="text-[9px] text-white/40 font-mono uppercase mt-0.5">Arrival</div>
                      </div>
                    </div>
                    
                    {!hasIAccepted ? (
                      <button onClick={handleAcceptMatch} className="bg-green-500 text-black px-8 py-2 rounded-sm font-bold text-[10px] hover:bg-green-400 transition-all uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,197,94,0.2)]">Confirm Seat</button>
                    ) : (
                      <div className="bg-pink/10 border border-pink/30 rounded-sm p-2 px-6 text-center shadow-[0_0_15px_rgba(255,45,120,0.1)]">
                        <div className="text-[17px] font-bold text-pink font-mono leading-none tracking-tighter">7:42 AM</div>
                        <div className="text-[8px] text-white/30 font-mono uppercase mt-1 tracking-widest">Leave by</div>
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
