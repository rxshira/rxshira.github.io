import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { AlertCircle, ShieldAlert, Mail } from 'lucide-react';

interface CarpoolGuardProps {
  children: React.ReactNode;
  requireApproval?: boolean;
}

const CarpoolGuard: React.FC<CarpoolGuardProps> = ({ children, requireApproval = true }) => {
  const { user, carpoolUser, loading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-pink animate-pulse font-bold tracking-widest uppercase text-[10px] font-mono">
          Syncing Portal...
        </div>
      </div>
    );
  }

  // 1. If not logged into Firebase Auth -> go to landing
  if (!user) {
    return <Navigate to="/carpool" state={{ from: location }} replace />;
  }

  // MASTER ADMIN BYPASS
  if (isAdmin) return <>{children}</>;

  if (requireApproval) {
    // 2. If admin wiped the profile (no Firestore doc) -> send to landing for clean slate
    if (!carpoolUser) {
      return <Navigate to="/carpool" replace />;
    }

    // 3. BLOCKED: 3 Rejections
    const isStrikeOut = carpoolUser.submission_count && carpoolUser.submission_count >= 3 && carpoolUser.access_status === 'rejected';

    if (isStrikeOut) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <div className="max-w-md text-center space-y-8 border border-red-500/30 p-12 bg-red-500/5 rounded-sm">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Verification Blocked</h2>
            <div className="space-y-4 font-mono">
              <p className="text-red-400 text-xs font-bold uppercase">Strike Limit Reached</p>
              <p className="text-text-gray text-[10px] leading-relaxed italic">
                Your profile has been rejected 3 times. For security, automated resubmission is now disabled.
              </p>
              <div className="bg-white/5 p-6 border border-white/10 rounded-sm">
                <p className="text-white text-[11px] mb-4">Please contact the site administrator manually to resolve your credentials.</p>
                <a href="mailto:shiraxrubin@gmail.com" className="text-pink hover:underline flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
                  <Mail className="w-4 h-4" /> shiraxrubin@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 4. PENDING (Profile exists but not approved yet)
    if (carpoolUser.access_status === 'pending') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-12 overflow-y-auto">
          <div className="max-w-md w-full text-center space-y-6 border border-white/10 p-10 bg-white/5 rounded-sm shadow-2xl">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter text-shadow-glow">Access Pending</h2>
            <p className="text-text-gray font-mono text-[10px] leading-relaxed uppercase tracking-widest">
              Reviewing Credentials ({carpoolUser.submission_count || 0}/3)
            </p>
          </div>

          <div className="max-w-md w-full mt-6 bg-pink/5 border border-pink/20 p-6 rounded-sm space-y-4">
            <h3 className="text-[10px] font-bold text-pink uppercase tracking-[0.2em] font-mono">How it works</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-white uppercase font-mono">Route-Aware Matching</p>
                <p className="text-[10px] text-white/50 font-mono leading-relaxed">
                  We don't just find people near you—we find people whose commute naturally passes your location on the way to 555 Bailey Ave.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-white uppercase font-mono">Privacy Protocol</p>
                <p className="text-[10px] text-white/50 font-mono leading-relaxed">
                  Your exact address is encrypted. Others only see your general Zip code area until a match is mutually accepted.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. REJECTED (BUT CAN FIX)
    if (carpoolUser.access_status === 'rejected') {
      const canFix = carpoolUser.rejection_action === 'fix';
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <div className={`max-w-md text-center space-y-6 border p-12 rounded-sm bg-red-500/5 ${canFix ? 'border-pink/30' : 'border-red-500/20'}`}>
            <h2 className={`text-3xl font-bold uppercase tracking-tighter ${canFix ? 'text-pink' : 'text-red-500'}`}>Access Denied</h2>
            <div className="space-y-6 font-mono">
              <div className="bg-black/50 border border-white/5 p-5 rounded-sm">
                <p className="text-[9px] text-white/40 uppercase font-bold mb-2 tracking-widest text-left">Issues Identified:</p>
                <ul className="text-left space-y-1.5">
                  {(carpoolUser.rejection_reasons || []).map((r, i) => (
                    <li key={i} className="text-[10px] text-pink font-bold uppercase">» Missing {r}</li>
                  ))}
                  {carpoolUser.rejection_reason && <li className="text-[10px] text-white/70 italic mt-2">"{carpoolUser.rejection_reason}"</li>}
                </ul>
              </div>

              {canFix ? (
                <button 
                  onClick={() => navigate('/carpool/profile')}
                  className="w-full py-4 bg-pink text-white font-bold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(255,0,110,0.3)] transition-all"
                >
                  Edit Profile & Resubmit
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-text-gray text-[10px]">Please reach out to the administrator to discuss your verification.</p>
                  <a href="mailto:shiraxrubin@gmail.com" className="text-white hover:text-pink transition-colors text-[10px] font-bold underline">CONTACT ADMIN</a>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  // 6. Final check: ensure they have a profile before seeing the map
  if (!carpoolUser?.zip_code && location.pathname !== '/carpool/profile') {
    return <Navigate to="/carpool/profile" replace />;
  }

  return <>{children}</>;
};

export default CarpoolGuard;
