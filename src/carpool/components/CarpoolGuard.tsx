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
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-pink animate-pulse font-bold tracking-widest uppercase text-xs">
          Authenticating Neural Link...
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
        <div className="min-h-screen flex items-center justify-center bg-bg px-6">
          <div className="max-w-md text-center space-y-6 border border-white/10 p-12 bg-white/5">
            <h2 className="text-3xl font-bold text-white">Access Pending</h2>
            <p className="text-text-gray">
              Your account is currently waiting for admin approval. 
              We'll notify you once you've been granted access to the carpool matcher.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="btn text-xs"
              >
                Back to Personal Site
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (carpoolUser.access_status === 'rejected') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-6">
          <div className="max-w-md text-center space-y-6 border border-red-500/20 p-12 bg-red-500/5">
            <h2 className="text-3xl font-bold text-red-500">Access Denied</h2>
            <p className="text-text-gray">
              Your access request has been rejected. If you believe this is an error, 
              please contact the administrator.
            </p>
          </div>
        </div>
      );
    }
  }

  // Check if profile is complete (basic check for address)
  // ADMIN BYPASS: Admins can see the map even without a profile
  if (!isAdmin && !carpoolUser?.address && location.pathname !== '/carpool/profile') {
    return <Navigate to="/carpool/profile" replace />;
  }

  return <>{children}</>;
};

export default CarpoolGuard;
