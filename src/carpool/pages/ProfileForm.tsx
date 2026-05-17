import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Car, Clock, Info, Upload, FileText, CheckCircle, Briefcase } from 'lucide-react';
import { GoogleDistanceService } from '../lib/googleService';

const ProfileForm = () => {
  const { user, carpoolUser, refreshCarpoolUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    role: 'intern' as 'intern' | 'new_grad',
    start_month: 'may' as 'may' | 'july',
    address: '',
    zip_code: '',
    has_car: false,
    seats_available: 2,
    willing_to_detour: true,
    max_detour_minutes: 10,
    preferred_arrival_time: '09:00',
    notes: '',
    offer_letter_url: ''
  });

  useEffect(() => {
    if (carpoolUser) {
      setFormData({
        full_name: carpoolUser.full_name || user?.displayName || '',
        phone_number: carpoolUser.phone_number || '',
        role: carpoolUser.role || 'intern',
        start_month: carpoolUser.start_month || 'may',
        address: carpoolUser.address || '',
        zip_code: carpoolUser.zip_code || '',
        has_car: carpoolUser.has_car || false,
        seats_available: carpoolUser.seats_available || 2,
        willing_to_detour: carpoolUser.willing_to_detour ?? true,
        max_detour_minutes: carpoolUser.max_detour_minutes || 10,
        preferred_arrival_time: carpoolUser.preferred_arrival_time || '09:00',
        notes: carpoolUser.notes || '',
        offer_letter_url: carpoolUser.offer_letter_url || ''
      });
    }
  }, [carpoolUser, user]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert("Security: Only clear images (JPG, PNG, WEBP) are accepted for the offer letter.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Please upload an image under 5MB.");
      return;
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `offers/${user.uid}/${fileName}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadResult.ref);
      setFormData(prev => ({ ...prev, offer_letter_url: url }));
    } catch (error: any) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // STRICT MANDATORY FIELD VALIDATION
    if (!formData.full_name || formData.full_name.trim().length < 2) {
      alert("MANDATORY: Please enter your full name.");
      return;
    }

    if (!formData.zip_code || formData.zip_code.trim().length < 5) {
      alert("MANDATORY: Please enter a valid 5-digit zip code for matching.");
      return;
    }

    if (!formData.offer_letter_url) {
      alert("Verification Required: Please upload your offer letter image first.");
      return;
    }

    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      let coords = { lat: carpoolUser?.latitude || 37.3382, lng: carpoolUser?.longitude || -121.8863 };
      
      if (apiKey && (formData.address || formData.zip_code)) {
        try {
          const searchStr = formData.address || formData.zip_code;
          const newCoords = await GoogleDistanceService.geocode(searchStr, apiKey);
          if (newCoords) coords = newCoords;
        } catch (geoError) {}
      }

      const userRef = doc(db, 'carpool_users', user.uid);
      await setDoc(userRef, {
        ...formData,
        id: user.uid,
        email: user.email,
        latitude: coords.lat,
        longitude: coords.lng,
        start_date: `2026-${formData.start_month === 'may' ? '05' : '07'}-01`,
        access_status: carpoolUser?.access_status || 'pending',
        is_admin: carpoolUser?.is_admin || false,
        created_at: carpoolUser?.created_at || serverTimestamp()
      }, { merge: true });

      await refreshCarpoolUser();
      navigate('/carpool/map');
    } catch (error: any) {
      alert(`Could not save profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-bg px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 uppercase tracking-tighter text-white font-display">IBM <span className="text-pink neon-text">2026</span></h1>
          <p className="text-white text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Intern / New Grad Carpool Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
          {/* Offer Letter Verification */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono">
              <FileText className="w-4 h-4 text-pink" /> Verification
            </h3>
            <div className="bg-pink/5 border border-pink/20 p-4 text-[11px] text-text-gray leading-relaxed font-mono">
              <span className="text-pink font-bold uppercase">Required:</span> Upload an image of your IBM offer letter. Obscure personal details, but ensure <span className="text-white">Full Name</span> is visible.
            </div>
            <div className="relative border-2 border-dashed border-white/10 p-8 text-center hover:border-pink/50 transition-colors group cursor-pointer bg-black/20">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*" />
              <div className="flex flex-col items-center space-y-2">
                {uploading ? <div className="animate-spin text-pink"><Upload className="w-8 h-8" /></div> : formData.offer_letter_url ? <div className="text-green-500 flex flex-col items-center"><CheckCircle className="w-8 h-8 mb-2" /><span className="text-[10px] font-bold uppercase font-mono">Image Secured</span></div> : <><Upload className="text-text-gray w-8 h-8 group-hover:text-pink" /><span className="text-[10px] text-text-gray font-bold uppercase tracking-widest font-mono">Upload Offer Image</span></>}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono"><Info className="w-4 h-4 text-pink" /> Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-pink font-bold uppercase font-mono px-1 flex justify-between">Full Name <span className="text-[8px] italic text-pink/50">(Mandatory)</span></label>
                <input required className="w-full bg-black/50 border border-pink/30 p-3 focus:border-pink outline-none transition-all text-sm font-mono text-white" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 uppercase font-mono px-1">Phone Number</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" /><input required className="w-full bg-black/50 border border-white/10 p-3 pl-10 rounded-sm text-sm focus:border-pink outline-none text-white font-mono" placeholder="(000) 000-0000" value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})} /></div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono"><MapPin className="w-4 h-4 text-pink" /> Location</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 uppercase font-mono px-1">Home Address (Optional)</label>
                <input className="w-full bg-black/50 border border-white/10 p-3 focus:border-pink outline-none text-sm font-mono text-white" placeholder="Street, City, State" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="w-full space-y-1">
                <label className="text-[10px] text-pink font-bold uppercase tracking-tighter font-mono px-1 flex justify-between">Zip Code <span className="text-[8px] italic text-pink/50">(Mandatory)</span></label>
                <input required className="w-full bg-black/50 border border-pink/30 p-3 focus:border-pink outline-none font-mono text-sm text-white" placeholder="00000" value={formData.zip_code} onChange={e => setFormData({...formData, zip_code: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono"><Car className="w-4 h-4 text-pink" /> Commute</h3>
            <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/5">
              <label className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" className="w-5 h-5 accent-pink cursor-pointer" checked={formData.has_car} onChange={e => setFormData({...formData, has_car: e.target.checked})} /><span className="text-xs font-bold text-white group-hover:text-pink font-mono uppercase">I have a vehicle</span></label>
              {formData.has_car && <div className="flex items-center gap-3"><span className="text-[10px] text-text-gray uppercase font-mono">Seats:</span><select className="bg-black/50 border border-white/10 p-1 text-xs outline-none font-mono text-white" value={formData.seats_available} onChange={e => setFormData({...formData, seats_available: parseInt(e.target.value)})}>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}</select></div>}
            </div>
          </div>

          <button type="submit" disabled={loading || uploading} className="btn w-full bg-pink border-pink disabled:opacity-50 font-mono text-xs tracking-[0.2em] font-bold h-12 hover:shadow-[0_0_25px_rgba(255,45,120,0.4)] transition-all uppercase">{loading ? 'Processing...' : 'Submit Profile'}</button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileForm;
