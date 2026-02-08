import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import GlowWrapper from '../components/GlowWrapper';

const Login = () => {
  const { login, user, isAdmin, authError, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(username, password);
    setIsSubmitting(false);
    if (success) navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink/10 blur-[100px] rounded-full opacity-50"></div>
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        <GlowWrapper className="bg-dark-gray/50 border border-white/10 rounded-none p-8 backdrop-blur-xl text-center">
          <div className="mx-auto w-16 h-16 bg-pink/10 rounded-full flex items-center justify-center mb-6 text-pink border border-pink/30">
            <Lock className="w-8 h-8" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-text-gray mb-8 text-sm uppercase tracking-widest font-bold">Internal Use Only</p>
          
          {authError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm text-left">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-text-gray uppercase px-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-none p-3 text-white focus:border-pink outline-none transition-colors"
                placeholder="Admin username"
                required
              />
            </div>
            
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-text-gray uppercase px-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-none p-3 text-white focus:border-pink outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-white text-black font-bold hover:bg-pink hover:text-white transition-all disabled:opacity-50 mt-4"
            >
              {isSubmitting ? 'Verifying...' : 'Login to Dashboard'}
            </button>

            <Link 
              to="/" 
              onClick={clearError}
              className="w-full py-3 px-4 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Main Website
            </Link>
          </form>
        </GlowWrapper>
      </div>
    </div>
  );
};

export default Login;