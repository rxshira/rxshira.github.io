import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
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

    // Security: Only allow specific image mime types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert("Security Alert: Only image files (JPG, PNG, WEBP) are permitted for verification.");
      return;
    }

    // Security: Limit file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `offers/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, offer_letter_url: url }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Offer letter upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!formData.offer_letter_url) {
      alert("Please upload your offer letter for verification.");
      return;
    }
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      let coords = { lat: carpoolUser?.latitude || 37.3382, lng: carpoolUser?.longitude || -121.8863 };
      
      if (apiKey && (formData.address !== carpoolUser?.address || formData.zip_code !== carpoolUser?.zip_code)) {
        const searchStr = formData.address || formData.zip_code;
        coords = await GoogleDistanceService.geocode(searchStr, apiKey);
      }

      const userRef = doc(db, 'carpool_users', user.uid);
      await updateDoc(userRef, {
        ...formData,
        latitude: coords.lat,
        longitude: coords.lng,
        start_date: `2026-${formData.start_month === 'may' ? '05' : '07'}-01`
      });
      await refreshCarpoolUser();
      navigate('/carpool/map');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-bg px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 uppercase tracking-tighter text-white">IBM <span className="text-pink">2026</span></h1>
          <p className="text-white text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Intern / New Grad Carpool Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 md:p-12">
          {/* Offer Letter Verification */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono">
              <FileText className="w-4 h-4 text-pink" /> Verification
            </h3>
            <div className="bg-pink/5 border border-pink/20 p-4 text-[11px] text-text-gray leading-relaxed font-mono">
              <span className="text-pink font-bold uppercase">Required:</span> Upload a clear <span className="text-white">image</span> of your IBM offer letter. Obscure personal details, but ensure <span className="text-white">Full Name</span> and <span className="text-white">Recruiter Signature</span> are visible.
            </div>
            <div className="relative border-2 border-dashed border-white/10 p-8 text-center hover:border-pink/50 transition-colors group cursor-pointer bg-black/20">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileUpload}
                accept="image/jpeg,image/png,image/webp"
              />
              <div className="flex flex-col items-center space-y-2">
                {uploading ? (
                  <div className="animate-spin text-pink"><Upload className="w-8 h-8" /></div>
                ) : formData.offer_letter_url ? (
                  <div className="text-green-500 flex flex-col items-center">
                    <CheckCircle className="w-8 h-8 mb-2" />
                    <span className="text-[10px] font-bold uppercase font-mono">Offer Image Secured</span>
                  </div>
                ) : (
                  <>
                    <Upload className="text-text-gray w-8 h-8 group-hover:text-pink transition-colors" />
                    <span className="text-[10px] text-text-gray font-bold uppercase tracking-widest font-mono">Upload Offer Image</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Role & Date Selection */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono">
              <Briefcase className="w-4 h-4 text-pink" /> Placement Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-text-gray font-bold uppercase font-mono">Hire Type</label>
                <div className="flex gap-2">
                  {[
                    { val: 'intern', label: 'Intern' },
                    { val: 'new_grad', label: 'New Grad' }
                  ].map(r => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setFormData({...formData, role: r.val as any})}
                      className={`flex-1 py-2 text-[10px] font-bold uppercase border transition-all ${formData.role === r.val ? 'bg-pink border-pink text-white shadow-[0_0_15px_rgba(255,45,120,0.3)]' : 'border-white/10 text-text-gray hover:bg-white/5'}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-text-gray font-bold uppercase font-mono">Start Month (2026)</label>
                <div className="flex gap-2">
                  {['may', 'july'].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({...formData, start_month: m as any})}
                      className={`flex-1 py-2 text-[10px] font-bold uppercase border transition-all ${formData.start_month === m ? 'bg-pink border-pink text-white shadow-[0_0_15px_rgba(255,45,120,0.3)]' : 'border-white/10 text-text-gray hover:bg-white/5'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono">
              <Info className="w-4 h-4 text-pink" /> Contact Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-text-gray font-bold uppercase font-mono">Full Name</label>
                <input 
                  required
                  className="w-full bg-black/50 border border-white/10 p-3 focus:border-pink outline-none transition-colors text-sm font-mono"
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-text-gray font-bold uppercase font-mono">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-gray" />
                  <input 
                    required
                    className="w-full bg-black/50 border border-white/10 p-3 pl-10 focus:border-pink outline-none transition-colors text-sm font-mono"
                    placeholder="(000) 000-0000"
                    value={formData.phone_number}
                    onChange={e => setFormData({...formData, phone_number: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono">
              <MapPin className="w-4 h-4 text-pink" /> Commute Origin
            </h3>
            <div className="bg-pink/5 border border-pink/20 p-4 text-[10px] text-text-gray leading-relaxed font-mono">
              <span className="text-pink font-bold">SECURITY:</span> Precise address is <span className="text-white">ENCRYPTED</span> and only revealed to group members after mutual acceptance.
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-text-gray font-bold uppercase font-mono">Home Address (Optional)</label>
                  <div className="group relative">
                    <span className="text-pink cursor-help text-xs font-mono">(?)</span>
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-dark-gray border border-white/10 text-[9px] text-text-gray opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl font-mono">
                      Used for high-precision route matching.
                    </div>
                  </div>
                </div>
                <input 
                  className="w-full bg-black/50 border border-white/10 p-3 focus:border-pink outline-none transition-colors text-sm font-mono"
                  placeholder="Street Address, City, State"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="w-full space-y-1">
                <label className="text-[10px] text-pink font-bold uppercase tracking-tighter font-mono">Zip Code (Mandatory)</label>
                <input 
                  required
                  className="w-full bg-black/50 border border-pink/30 p-3 focus:border-pink outline-none transition-colors font-mono text-sm"
                  placeholder="00000"
                  value={formData.zip_code}
                  onChange={e => setFormData({...formData, zip_code: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-mono">
              <Car className="w-4 h-4 text-pink" /> Commute Configuration
            </h3>
            <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  className="w-5 h-5 accent-pink cursor-pointer"
                  checked={formData.has_car}
                  onChange={e => setFormData({...formData, has_car: e.target.checked})}
                />
                <span className="text-xs font-bold text-white group-hover:text-pink transition-colors font-mono uppercase">I have a car</span>
              </label>

              {formData.has_car && (
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-gray font-bold uppercase font-mono">Seats:</span>
                  <select 
                    className="bg-black/50 border border-white/10 p-1 text-xs outline-none font-mono text-white"
                    value={formData.seats_available}
                    onChange={e => setFormData({...formData, seats_available: parseInt(e.target.value)})}
                  >
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-[10px] text-text-gray font-bold uppercase font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Target Arrival
                </label>
                <select 
                  className="w-full bg-black/50 border border-white/10 p-3 focus:border-pink outline-none appearance-none cursor-pointer text-sm font-mono text-white"
                  value={formData.preferred_arrival_time}
                  onChange={e => setFormData({...formData, preferred_arrival_time: e.target.value})}
                >
                  <option value="08:00">08:00 AM</option>
                  <option value="08:30">08:30 AM</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="09:30">09:30 AM</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-text-gray font-bold uppercase font-mono">Max Detour (Mins)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    step="5"
                    className="flex-1 accent-pink"
                    value={formData.max_detour_minutes}
                    onChange={e => setFormData({...formData, max_detour_minutes: parseInt(e.target.value)})}
                  />
                  <span className="text-pink font-mono font-bold text-sm w-12">{formData.max_detour_minutes}m</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={loading || uploading}
              className="btn w-full bg-pink border-pink disabled:opacity-50 font-mono text-xs tracking-[0.2em] font-bold h-12 hover:shadow-[0_0_25px_rgba(255,45,120,0.4)] transition-all"
            >
              {loading ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileForm;
