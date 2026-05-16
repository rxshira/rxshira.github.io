import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface CarpoolGuardProps {
  children: React.ReactNode;
  requireApproval?: boolean;
}

const CarpoolGuard: React.FC<CarpoolGuardProps> = ({ children, requireApproval = true }) => {
  const { user, carpoolUser, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-pink animate-pulse font-bold tracking-widest uppercase text-xs">
          Syncing Portal...
        </div>
      </div>
    );
  }

  // Not logged in -> go to auth gate
  if (!user) {
    return <Navigate to="/carpool" state={{ from: location }} replace />;
  }

  // MASTER ADMIN BYPASS
  if (isAdmin) {
    return <>{children}</>;
  }

  // Approval Check
  if (requireApproval) {
    if (!carpoolUser || carpoolUser.access_status === 'pending') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-12 overflow-y-auto">
          <div className="max-w-md w-full text-center space-y-6 border border-white/10 p-10 bg-white/5 rounded-sm">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter text-shadow-glow">Access Pending</h2>
            <p className="text-text-gray font-mono text-xs leading-relaxed">
              Your account is currently waiting for admin verification. 
              Our team is reviewing your offer letter credentials.
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
                  Your exact address is encrypted. Others only see your general Zip code area until a match is mutually accepted by both parties.
                </p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-pink/10">
              <h3 className="text-[10px] font-bold text-pink uppercase tracking-[0.2em] font-mono mb-3">Once Approved, You can:</h3>
              <ul className="space-y-2">
                {[
                  'Browse the intern roster for your arrival window',
                  'Visualize potential paths on the interactive map',
                  'Send and receive pickup requests or drive offers',
                  'Get real-time traffic-adjusted pickup sequences'
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 items-start text-[10px] text-white/70 font-mono italic">
                    <span className="text-pink font-bold">»</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (carpoolUser.access_status === 'rejected') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <div className="max-w-md text-center space-y-6 border border-red-500/20 p-12 bg-red-500/5 rounded-sm">
            <h2 className="text-3xl font-bold text-red-500 uppercase tracking-tighter">Access Denied</h2>
            <div className="space-y-4">
              <p className="text-text-gray font-mono text-xs leading-relaxed">
                Your access request has been rejected.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm">
                <p className="text-[10px] text-red-400 font-bold uppercase mb-1">Reason Provided:</p>
                <p className="text-white font-mono text-xs italic">"{carpoolUser.rejection_reason || 'No specific reason provided'}"</p>
              </div>
              <p className="text-text-gray/50 font-mono text-[9px]">
                If you believe this is an error, please contact the administrator.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  // Profile Completion Check
  // Only redirect if they don't even have a ZIP code and aren't already on the profile page
  if (!carpoolUser?.zip_code && location.pathname !== '/carpool/profile') {
    return <Navigate to="/carpool/profile" replace />;
  }

  return <>{children}</>;
};

export default CarpoolGuard;
