import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { AlertCircle, ShieldAlert, Mail, Edit3, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

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

  if (!user) {
    return <Navigate to="/carpool" state={{ from: location }} replace />;
  }

  if (isAdmin) return <>{children}</>;

  if (requireApproval) {
    const isStrikeOut = carpoolUser?.submission_count && carpoolUser.submission_count >= 3 && carpoolUser.access_status === 'rejected';

    if (isStrikeOut) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center space-y-8 border border-red-500/30 p-12 bg-red-500/5 rounded-sm shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <div className="relative inline-block">
              <ShieldAlert className="w-16 h-16 text-red-500 mx-auto" />
              <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Verification Blocked</h2>
              <p className="text-red-500 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Security Protocol Triggered</p>
            </div>
            <div className="space-y-6 font-mono">
              <p className="text-white/50 text-[11px] leading-relaxed italic border-y border-white/5 py-6">
                Your profile has been rejected 3 times. For the security of our carpool community, automated resubmission is now disabled for this account.
              </p>
              <div className="bg-white/5 p-6 border border-white/10 rounded-sm space-y-4">
                <p className="text-white text-[11px] font-medium leading-relaxed uppercase tracking-tighter">Please contact the site administrator manually to resolve your credentials.</p>
                <a href="mailto:shiraxrubin@gmail.com" className="bg-white text-black py-3 rounded-sm flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-pink hover:text-white">
                  <Mail className="w-4 h-4" /> shiraxrubin@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    if (!carpoolUser || carpoolUser.access_status === 'pending') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-12 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center space-y-6 border border-white/10 p-12 bg-white/5 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink/50 to-transparent" />
            <h2 className="text-4xl font-bold text-white uppercase tracking-tighter text-shadow-glow">Access Pending</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse shadow-glow-pink" />
              <p className="text-text-gray font-mono text-[11px] leading-relaxed uppercase tracking-widest font-bold">
                Reviewing Credentials ({carpoolUser?.submission_count || 0}/3)
              </p>
            </div>
            <p className="text-white/30 text-[10px] font-mono leading-relaxed max-w-[280px] mx-auto">
              Our automated system and admin team are currently verifying your IBM credentials. This usually takes 2-4 hours.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-md w-full mt-8 bg-pink/5 border border-pink/20 p-8 rounded-sm space-y-6">
            <h3 className="text-[11px] font-bold text-pink uppercase tracking-[0.3em] font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> The Protocol
            </h3>
            <div className="space-y-5">
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-white uppercase font-mono">Route-Aware Optimization</p>
                <p className="text-[10px] text-white/40 font-mono leading-relaxed italic">
                  We calculate commute intersections. You'll only see interns whose path naturally overlaps with yours.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-white uppercase font-mono tracking-tighter">Zero-Knowledge Privacy</p>
                <p className="text-[10px] text-white/40 font-mono leading-relaxed italic">
                  Address components are masked. Your precise coordinates are never shared until a mutual carpool contract is accepted.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    if (carpoolUser.access_status === 'rejected') {
      const canFix = carpoolUser.rejection_action === 'fix';
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`max-w-lg w-full border p-12 rounded-sm shadow-2xl relative overflow-hidden ${canFix ? 'border-pink/30 bg-pink/[0.02]' : 'border-red-500/20 bg-red-500/[0.02]'}`}>
            {/* Header Accent */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${canFix ? 'via-pink/50' : 'via-red-500/50'} to-transparent`} />
            
            <div className="text-center space-y-8">
              <div className="space-y-2">
                <div className="flex justify-center mb-4">
                  <XCircle className={`w-14 h-14 ${canFix ? 'text-pink shadow-glow-pink' : 'text-red-500'}`} />
                </div>
                <h2 className={`text-4xl font-bold uppercase tracking-tighter ${canFix ? 'text-pink text-shadow-glow' : 'text-red-500'}`}>
                  Verification Halted
                </h2>
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Credential Status: Flagged</p>
              </div>

              <div className="space-y-4 text-left font-mono">
                <div className="bg-black/60 border border-white/10 p-6 rounded-sm space-y-4">
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Diagnostic Report</p>
                    <p className="text-[10px] text-pink font-bold">ID: 00{carpoolUser.submission_count || 1}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {(carpoolUser.rejection_reasons || []).map((r, i) => (
                      <li key={i} className="flex items-center gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink group-hover:shadow-glow-pink transition-all" />
                        <span className="text-[11px] text-white/90 font-bold uppercase tracking-tight">Missing Information: {r}</span>
                      </li>
                    ))}
                    {carpoolUser.rejection_reason && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-[9px] text-white/30 uppercase font-bold mb-2">Admin Comments:</p>
                        <p className="text-[11px] text-white/70 italic leading-relaxed">"{carpoolUser.rejection_reason}"</p>
                      </div>
                    )}
                  </ul>
                </div>

                {canFix ? (
                  <div className="space-y-6 pt-4">
                    <button 
                      onClick={() => navigate('/carpool/profile')}
                      className="group w-full py-5 bg-pink text-white font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,0,110,0.4)] transition-all rounded-sm"
                    >
                      <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
                      Repair Profile & Resubmit
                    </button>
                    <p className="text-[9px] text-white/30 text-center uppercase tracking-widest leading-relaxed">
                      Attempts Remaining: <span className="text-white font-bold">{3 - (carpoolUser.submission_count || 1)} of 3</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8 pt-6">
                    <div className="space-y-3">
                      <p className="text-white/60 text-[11px] text-center leading-relaxed font-medium">
                        Direct administrative intervention is required to proceed.
                      </p>
                      <a href="mailto:shiraxrubin@gmail.com" className="group w-full py-4 border border-white/10 text-white flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all rounded-sm font-bold text-[10px] tracking-widest">
                        <Mail className="w-4 h-4" /> CONTACT SYSTEM ADMIN
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      );
    }
  }

  if (!carpoolUser?.zip_code && location.pathname !== '/carpool/profile') {
    return <Navigate to="/carpool/profile" replace />;
  }

  return <>{children}</>;
};

export default CarpoolGuard;
