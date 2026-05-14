import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CarpoolLanding = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              IBM INTERN <br />
              <span className="text-pink neon-text">CARPOOL MATCHER</span>
            </h1>
            <p className="text-xl text-text-gray max-w-2xl mx-auto">
              Smart route-aware pickup optimization for summer interns at 555 Bailey Ave.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            {!user ? (
              <button 
                onClick={() => loginWithGoogle()}
                className="btn bg-pink border-pink hover:shadow-[0_0_30px_rgba(255,0,110,0.5)] uppercase tracking-widest text-[10px] font-bold"
              >
                Sign in with IBM Google Account
              </button>
            ) : (
              <button 
                onClick={() => navigate('/carpool/dashboard')}
                className="btn bg-pink border-pink hover:shadow-[0_0_30px_rgba(255,0,110,0.5)] uppercase tracking-widest text-[10px] font-bold"
              >
                Enter Dashboard
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarpoolLanding;
