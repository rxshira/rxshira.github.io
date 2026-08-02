import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion, addDoc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '../../lib/firebase';
import { Carpool, CarpoolUser, RideRequest } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Users, Car, Shield, Search, ArrowRight, Activity, CheckCircle, MoreVertical, Send, Bell, X, Calendar, Mail, Undo2 } from 'lucide-react';
import MapView from '../components/MapView';
import { GoogleDistanceService } from '../lib/googleService';

const Dashboard = () => {
  const { user, carpoolUser, logout, refreshCarpoolUser } = useAuth();
  const [allUsers, setAllUsers] = useState<CarpoolUser[]>([]);
  const [carpools, setCarpools] = useState<Carpool[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<RideRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<RideRequest[]>([]);
  const [myCarpool, setMyCarpool] = useState<Carpool | null>(null);
  const [myMembers, setMyMembers] = useState<CarpoolUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'drivers' | 'riders' | 'matched'>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [tempRoute, setTempRoute] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [focusedUserId, setFocusedUserId] = useState<string | null>(null);

  const mapCenter = useMemo(() => {
    if (focusedUserId) {
      const target = allUsers.find(u => u.id === focusedUserId);
      if (target) return { lat: target.latitude, lng: target.longitude };
    }
    return null;
  }, [focusedUserId, allUsers]);

  const [routeLegs, setRouteLegs] = useState<any[]>([]);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(0);
  const [viewArrivalTime, setViewArrivalTime] = useState<string>(carpoolUser?.preferred_arrival_time || '09:00');
  const [isUpdatingTime, setIsUpdatingTime] = useState(false);

  useEffect(() => {
    if (carpoolUser?.preferred_arrival_time) setViewArrivalTime(carpoolUser.preferred_arrival_time);
  }, [carpoolUser]);

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
      const myPool = pools.find(p => p.member_ids.includes(user?.uid || ''));
      setMyCarpool(myPool || null);
    });

    let unsubIncoming = () => {};
    let unsubSent = () => {};

    if (user?.uid) {
      const qIncoming = query(collection(db, 'ride_requests'), where('receiver_id', '==', user.uid), where('status', '==', 'pending'));
      unsubIncoming = onSnapshot(qIncoming, (snap) => {
        const reqs: RideRequest[] = [];
        snap.forEach(doc => reqs.push({ id: doc.id, ...doc.data() } as RideRequest));
        setIncomingRequests(reqs);
      });

      const qSent = query(collection(db, 'ride_requests'), where('sender_id', '==', user.uid), where('status', '==', 'pending'));
      unsubSent = onSnapshot(qSent, (snap) => {
        const reqs: RideRequest[] = [];
        snap.forEach(doc => reqs.push({ id: doc.id, ...doc.data() } as RideRequest));
        setSentRequests(reqs);
      });
    }

    return () => { unsubUsers(); unsubPools(); unsubIncoming(); unsubSent(); };
  }, [user]);

  useEffect(() => {
    if (myCarpool) {
      const qMembers = query(collection(db, 'carpool_users'), where('id', 'in', myCarpool.member_ids));
      const unsub = onSnapshot(qMembers, async (snap) => {
        const members: CarpoolUser[] = [];
        snap.forEach(doc => members.push(doc.data() as CarpoolUser));
        const sorted = [...members].sort((a, b) => {
          if (a.id === myCarpool.driver_id) return -1;
          if (b.id === myCarpool.driver_id) return 1;
          return myCarpool.pickup_order.indexOf(a.id) - myCarpool.pickup_order.indexOf(b.id);
        });
        setMyMembers(sorted);
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (apiKey && sorted.length > 1) {
          try {
            const service = new GoogleDistanceService(apiKey);
            const route = await service.getRoute({ lat: sorted[0].latitude, lng: sorted[0].longitude }, { lat: 37.194697, lng: -121.745837 }, sorted.slice(1).map(r => ({ lat: r.latitude, lng: r.longitude })));
            if (route.legs) { setRouteLegs(route.legs); setTotalDurationSeconds(route.duration); }
          } catch (err) { console.error(err); }
        }
        setLoading(false);
      });
      return unsub;
    } else { setLoading(false); setRouteLegs([]); setTotalDurationSeconds(0); }
  }, [myCarpool, user]);

  const handleCancelRequest = async (requestId: string) => {
    if (!window.confirm("Cancel this request?")) return;
    try {
      await deleteDoc(doc(db, 'ride_requests', requestId));
    } catch (err) { console.error("Cancel failed", err); }
  };

  const handleAcceptRequest = async (req: RideRequest) => {
    try {
      await updateDoc(doc(db, 'ride_requests', req.id), { status: 'accepted' });
      let targetPool = carpools.find(p => p.member_ids.includes(user?.uid) || p.member_ids.includes(req.sender_id));
      if (targetPool) {
        await updateDoc(doc(db, 'carpools', targetPool.id), { member_ids: arrayUnion(user?.uid, req.sender_id), accepted_ids: arrayUnion(user?.uid, req.sender_id), status: 'active' });
      } else {
        const driverId = carpoolUser?.has_car ? user?.uid : req.sender_id;
        const riderId = carpoolUser?.has_car ? req.sender_id : user?.uid;
        const newPoolRef = doc(collection(db, 'carpools'));
        await setDoc(newPoolRef, { id: newPoolRef.id, driver_id: driverId, member_ids: [driverId, riderId], pickup_order: [riderId], accepted_ids: [driverId, riderId], status: 'active', created_at: serverTimestamp() });
      }
      alert("Ride confirmed!");
      setShowNotifications(false);
    } catch (err) { console.error(err); }
  };

  const handleShowRoute = async (targetUser: CarpoolUser) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;
    try {
      const service = new GoogleDistanceService(apiKey);
      const route = await service.getRoute({ lat: targetUser.latitude, lng: targetUser.longitude }, { lat: 37.194697, lng: -121.745837 });
      setTempRoute(route.polyline);
      setActiveMenuId(null);
    } catch (err) { console.error("Route generation failed", err); }
  };

  const handleSendRequest = async (targetUser: CarpoolUser) => {
    try {
      await addDoc(collection(db, 'ride_requests'), { sender_id: user?.uid, receiver_id: targetUser.id, type: carpoolUser?.has_car ? 'drive_offer' : 'pickup_request', status: 'pending', created_at: serverTimestamp() });
      alert("Request sent!");
      setActiveMenuId(null);
    } catch (err) { console.error(err); }
  };

  const filteredUsers = allUsers.filter(u => {
    const matchesTime = u.preferred_arrival_time === viewArrivalTime;
    if (!matchesTime) return false;
    const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.zip_code?.includes(searchTerm);
    const matchesFilter = filter === 'all' || (filter === 'drivers' && u.has_car) || (filter === 'riders' && !u.has_car) || (filter === 'matched' && carpools.some(p => p.member_ids.includes(u.id)));
    return matchesSearch && matchesFilter;
  });

  const getInitials = (name: string) => name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??';

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      <nav className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0 z-50">
        <div className="flex items-center gap-3"><div className="w-8 h-8 aspect-square bg-[#1f6abf] rounded-md flex items-center justify-center font-mono font-bold text-[10px] text-white tracking-widest shadow-2xl">IBM</div><span className="text-sm font-medium text-white tracking-tighter uppercase font-mono">Intern / New Grad Portal</span></div>
        <div className="flex items-center gap-5">
          <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className={`w-4 h-4 ${(incomingRequests.length + sentRequests.length) > 0 ? 'text-pink animate-bounce' : 'text-white/20'}`} />
            {(incomingRequests.length + sentRequests.length) > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink rounded-full border border-black" />}
          </div>
          <button onClick={() => logout()} className="text-[11px] text-white border border-white/10 px-3 py-1 rounded transition-colors uppercase font-bold tracking-widest font-mono text-shadow-glow">Sign out</button>
        </div>
      </nav>

      <div className="flex border-b border-white/10 bg-[#050505] shrink-0">
        {[ { label: 'Total', val: filteredUsers.length, color: 'text-pink' }, { label: 'Drivers', val: filteredUsers.filter(u=>u.has_car).length, color: '' }, { label: 'Riders', val: filteredUsers.filter(u=>!u.has_car).length, color: '' }, { label: 'Matched', val: filteredUsers.filter(u => carpools.some(p => p.member_ids.includes(u.id))).length, color: 'text-pink' } ].map((s, i) => (
          <div key={i} className="flex-1 p-3 px-5 border-r border-white/10"><div className={`text-xl font-semibold tracking-tighter ${s.color}`}>{s.val}</div><div className="text-[9px] text-white/40 font-mono uppercase mt-0.5">{s.label}</div></div>
        ))}
        <div className="flex-1 p-3 px-5 flex items-center justify-between">
          <select value={viewArrivalTime} onChange={(e) => setViewArrivalTime(e.target.value)} className="bg-transparent text-xl font-semibold text-white outline-none cursor-pointer"><option value="08:00" className="bg-black text-white">08:00 AM</option><option value="08:30" className="bg-black text-white">08:30 AM</option><option value="09:00" className="bg-black text-white">09:00 AM</option><option value="09:30" className="bg-black text-white">09:30 AM</option></select>
          {viewArrivalTime !== carpoolUser?.preferred_arrival_time && <button disabled={isUpdatingTime} className="bg-pink text-white text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest">Set Time</button>}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden z-10">
        <aside className="w-[280px] border-r border-white/10 flex flex-col bg-[#0c0c0c] shrink-0">
          <div className="p-3 border-b border-white/10"><div className="flex gap-1 mb-3">{(['all', 'drivers', 'riders', 'matched'] as const).map(f => <button key={f} onClick={() => setFilter(f)} className={`text-[9px] font-mono flex-1 py-1 rounded border transition-all ${filter === f ? 'bg-pink/15 border-pink/40 text-pink' : 'border-white/10 text-white/40'}`}>{f}</button>)}</div><div className="text-[10px] font-mono text-pink uppercase tracking-widest px-1">Roster</div></div>
          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-white/[0.03]">
            {filteredUsers.map(u => {
              const isFocused = focusedUserId === u.id;
              const hasSentRequest = sentRequests.some(r => r.receiver_id === u.id);
              return (
                <div key={u.id} id={`roster-item-${u.id}`} onClick={() => setFocusedUserId(u.id)} className={`p-4 flex gap-3 transition-all border-l-2 cursor-pointer ${isFocused ? 'bg-white/5 border-white shadow-2xl ring-1 ring-white/10' : activeMenuId === u.id ? 'bg-pink/10 border-pink' : 'hover:bg-white/[0.02] border-transparent'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${u.id === user?.uid ? 'border-yellow-400 text-yellow-400' : u.has_car ? 'border-blue-500 text-blue-400' : 'border-pink text-pink'}`}>{getInitials(u.full_name)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-white">
                      <div className="text-[12px] font-medium truncate">{u.full_name}</div>
                      {u.id !== user?.uid && (
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === u.id ? null : u.id); }} className="p-1 rounded text-white/20 hover:text-white transition-colors"><MoreVertical className="w-3.5 h-3.5" /></button>
                          {activeMenuId === u.id && (
                            <div className="absolute right-0 top-full mt-1 w-36 bg-[#181818] border border-white/10 rounded-sm shadow-2xl z-50 overflow-hidden font-mono" onClick={e => e.stopPropagation()}>
                              <button onClick={() => handleShowRoute(u)} className="w-full text-left px-3 py-2 text-[9px] hover:bg-pink hover:text-white flex items-center gap-2 uppercase tracking-tighter"><Activity className="w-3 h-3" /> Route</button>
                              {hasSentRequest ? (
                                <button onClick={() => handleCancelRequest(sentRequests.find(r => r.receiver_id === u.id)!.id)} className="w-full text-left px-3 py-2 text-[9px] text-pink hover:bg-pink hover:text-white border-t border-white/5 flex items-center gap-2 uppercase tracking-tighter">
                                  <Undo2 className="w-3 h-3" /> Cancel Req
                                </button>
                              ) : (
                                <button onClick={() => handleSendRequest(u)} className="w-full text-left px-3 py-2 text-[9px] hover:bg-blue-500 border-t border-white/5 flex items-center gap-2 uppercase tracking-tighter">
                                  <Send className="w-3 h-3" /> {u.has_car ? 'Ride' : 'Pickup'}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-white/40 font-mono mt-0.5">{u.zip_code} · {u.has_car ? 'Driver' : 'Rider'}</div>
                    {hasSentRequest && <div className="mt-1 text-[8px] text-pink font-bold uppercase tracking-widest flex items-center gap-1"><Clock className="w-2 h-2" /> Pending</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 relative bg-[#050505]">
          <MapView markers={allUsers.filter(u => u.preferred_arrival_time === viewArrivalTime).map(m => ({ lat: m.latitude, lng: m.longitude, id: m.id, name: m.full_name, type: m.has_car ? 'driver' : 'rider', isMe: m.id === user?.uid, isMatched: carpools.some(p => p.member_ids.includes(m.id)), isSelected: focusedUserId === m.id }))} center={mapCenter} onMarkerClick={id => { setFocusedUserId(id); document.getElementById(`roster-item-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} />
          <div className="absolute top-4 right-4 bg-black/85 border border-white/10 p-3 px-4 rounded-lg z-20 space-y-2 shadow-2xl text-white"><h4 className="text-[9px] font-mono text-pink uppercase tracking-widest font-bold">Map Legend</h4><div className="space-y-1.5"><div className="flex items-center gap-2 text-[10px] text-white/40"><div className="w-2 h-2 rounded-full bg-yellow-400" /> <span>You</span></div><div className="flex items-center gap-2 text-[10px] text-white/40"><div className="w-2 h-2 rounded-full bg-blue-500" /> <span>Driver</span></div><div className="flex items-center gap-2 text-[10px] text-white/40"><div className="w-2 h-2 rounded-full bg-pink" /> <span>Rider</span></div></div></div>
          
          <AnimatePresence>
            {showNotifications && (incomingRequests.length + sentRequests.length) > 0 && (
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="absolute top-4 right-44 w-72 bg-black/90 border border-pink/20 backdrop-blur-xl z-[60] p-4 rounded-sm shadow-2xl">
                <div className="flex justify-between items-center mb-4 text-pink text-[10px] font-bold uppercase tracking-widest">
                  <Bell className="w-3.5 h-3.5" /> Activity
                  <button onClick={() => setShowNotifications(false)}><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {/* Incoming */}
                  {incomingRequests.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[8px] text-white/30 uppercase font-bold tracking-widest">Incoming Requests</p>
                      {incomingRequests.map(req => {
                        const s = allUsers.find(u => u.id === req.sender_id);
                        return (
                          <div key={req.id} className="bg-white/5 p-3 rounded-sm border border-white/5">
                            <p className="text-[10px] text-white/80 font-mono"><span className="text-white font-bold">{s?.full_name}</span> {req.type === 'drive_offer' ? 'offered a drive.' : 'requested a pickup.'}</p>
                            <div className="flex gap-2 mt-3">
                              <button onClick={() => handleAcceptRequest(req)} className="flex-1 py-1.5 bg-green-500 text-black text-[9px] font-bold uppercase rounded-sm hover:bg-green-400">Accept</button>
                              <button onClick={() => handleCancelRequest(req.id)} className="flex-1 py-1.5 border border-white/10 text-white/40 text-[9px] font-bold uppercase rounded-sm hover:text-white">Ignore</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* Sent */}
                  {sentRequests.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[8px] text-white/30 uppercase font-bold tracking-widest">Sent by you</p>
                      {sentRequests.map(req => {
                        const r = allUsers.find(u => u.id === req.receiver_id);
                        return (
                          <div key={req.id} className="bg-white/[0.02] p-3 rounded-sm border border-white/5 flex justify-between items-center">
                            <div>
                              <p className="text-[10px] text-white/60 font-mono">To: <span className="text-white">{r?.full_name}</span></p>
                              <p className="text-[8px] text-white/30 uppercase font-mono">{req.type.replace('_', ' ')}</p>
                            </div>
                            <button onClick={() => handleCancelRequest(req.id)} className="p-1.5 hover:bg-pink/10 text-pink rounded transition-colors"><X className="w-3.5 h-3.5" /></button>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
