import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, LogIn, Chrome } from 'lucide-react';

const CarpoolAuthGate = () => {
  const { loginWithGoogle, signup, loginWithEmail, authError, clearError } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'landing' | 'login' | 'signup'>('landing');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }
        await signup(formData.email, formData.password);
        navigate('/carpool/profile');
      } else {
        await loginWithEmail(formData.email, formData.password);
        navigate('/carpool/map');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/carpool/map');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-black px-6 relative overflow-hidden">
      <div className="w-full max-w-md text-center space-y-10 mt-12">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-white uppercase">
            IBM <span className="text-pink neon-text">2026</span>
          </h1>
          <p className="text-white font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
            Intern / New Grad Carpool Portal
          </p>
        </header>

        {mode === 'landing' ? (
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setMode('login')}
              className="w-full py-4 bg-white text-black font-bold rounded-sm text-xs uppercase tracking-widest hover:bg-pink hover:text-white transition-all flex items-center justify-center gap-3 font-mono"
            >
              <LogIn className="w-4 h-4" /> Existing Account
            </button>
            <button 
              onClick={() => setMode('signup')}
              className="w-full py-4 border border-white/10 text-white font-bold rounded-sm text-xs uppercase tracking-widest hover:border-pink hover:text-pink transition-all flex items-center justify-center gap-3 font-mono"
            >
              <UserPlus className="w-4 h-4" /> Create New Profile
            </button>
            </motion.div>

        ) : (
          <form 
            onSubmit={handleAuthAction}
            className="space-y-4 text-left"
          >
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 uppercase font-mono px-1">Email / Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  required
                  type="email"
                  className="w-full bg-white/5 border border-white/10 p-3 pl-10 rounded-sm text-sm focus:border-pink outline-none transition-all text-white font-mono"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-white/40 uppercase font-mono px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  required
                  type="password"
                  className="w-full bg-white/5 border border-white/10 p-3 pl-10 rounded-sm text-sm focus:border-pink outline-none transition-all text-white font-mono"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[10px] text-pink font-bold uppercase font-mono px-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink/40" />
                  <input 
                    required
                    type="password"
                    className="w-full bg-white/5 border border-pink/20 p-3 pl-10 rounded-sm text-sm focus:border-pink outline-none transition-all text-white font-mono"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            )}

            {authError && (
              <p className="text-[10px] text-red-500 font-mono italic px-1">{authError}</p>
            )}

            <div className="pt-4 space-y-4">
              <button 
                disabled={loading}
                type="submit"
                className="w-full py-4 bg-pink text-white font-bold rounded-sm text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(255,45,120,0.4)] transition-all font-mono"
              >
                {loading ? 'Authenticating...' : mode === 'login' ? 'Enter Portal' : 'Create Credentials'}
              </button>
              <button 
                type="button"
                onClick={() => { setMode('landing'); clearError(); }}
                className="w-full text-[10px] text-white/20 uppercase tracking-widest hover:text-white transition-all font-mono"
              >
                Go Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CarpoolAuthGate;
