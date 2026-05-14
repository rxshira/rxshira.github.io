import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CarpoolAuthGate from './pages/CarpoolAuthGate';
import Dashboard from './pages/Dashboard';
import ProfileForm from './pages/ProfileForm';
import CarpoolAdmin from './pages/CarpoolAdmin';
import CarpoolGuard from './components/CarpoolGuard';
import { useAuth } from '../context/AuthContext';

const CarpoolApp = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="carpool-root">
      <Routes>
        {/* Main entry: Redirect to map if logged in, otherwise show Auth Gate */}
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/carpool/map" replace /> : <CarpoolAuthGate />
          } 
        />
        
        {/* Intern-facing map view */}
        <Route 
          path="/map" 
          element={
            <CarpoolGuard>
              <Dashboard />
            </CarpoolGuard>
          } 
        />
        
        {/* Intern profile setup */}
        <Route 
          path="/profile" 
          element={
            <CarpoolGuard requireApproval={false}>
              <ProfileForm />
            </CarpoolGuard>
          } 
        />

        {/* STRICT ADMIN ONLY: Block regular users */}
        <Route 
          path="/admin" 
          element={
            isAdmin ? (
              <CarpoolGuard>
                <CarpoolAdmin />
              </CarpoolGuard>
            ) : (
              <Navigate to="/carpool/map" replace />
            )
          } 
        />

        {/* Catch-all for legacy /dashboard link */}
        <Route path="/dashboard" element={<Navigate to="/carpool/map" replace />} />
      </Routes>
    </div>
  );
};

export default CarpoolApp;
