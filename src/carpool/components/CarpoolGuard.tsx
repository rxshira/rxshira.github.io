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

  if (!user) {
    return <Navigate to="/carpool" state={{ from: location }} replace />;
  }

  // ADMIN BYPASS: If you are the site admin, you can see everything
  if (isAdmin) {
    return <>{children}</>;
  }

  // If we require approval but user is pending or rejected
  if (requireApproval) {
    if (!carpoolUser || carpoolUser.access_status === 'pending') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <div className="max-w-md text-center space-y-6 border border-white/10 p-12 bg-white/5 rounded-sm">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Access Pending</h2>
            <p className="text-text-gray font-mono text-xs leading-relaxed">
              Your account is currently waiting for admin verification. 
              Our team is reviewing your offer letter credentials.
            </p>
          </div>
        </div>
      );
    }

    if (carpoolUser.access_status === 'rejected') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <div className="max-w-md text-center space-y-6 border border-red-500/20 p-12 bg-red-500/5 rounded-sm">
            <h2 className="text-3xl font-bold text-red-500 uppercase tracking-tighter">Access Denied</h2>
            <p className="text-text-gray font-mono text-xs leading-relaxed">
              Your access request has been rejected. If you believe this is an error, 
              please contact the administrator.
            </p>
          </div>
        </div>
      );
    }
  }

  // Check if profile is complete (basic check for zip)
  // FIX: Approved users should NOT be redirected if they have at least a zip code
  if (!carpoolUser?.zip_code && location.pathname !== '/carpool/profile') {
    return <Navigate to="/carpool/profile" replace />;
  }

  return <>{children}</>;
};

export default CarpoolGuard;
