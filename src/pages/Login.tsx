import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import GlowWrapper from '../components/GlowWrapper';

const Login = () => {
  const { login, user, isAdmin, authError, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink/10 blur-[100px] rounded-full opacity-50"></div>
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        <GlowWrapper className="bg-dark-gray/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center">
          <div className="mx-auto w-16 h-16 bg-pink/10 rounded-full flex items-center justify-center mb-6 text-pink border border-pink/30">
            <Lock className="w-8 h-8" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-text-gray mb-8">Restricted area for content management.</p>
          
          {authError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm text-left">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => login().catch(() => {})}
              className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            <Link 
              to="/" 
              onClick={clearError}
              className="w-full py-3 px-4 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Main Website
            </Link>
          </div>
        </GlowWrapper>
      </div>
    </div>
  );
};

export default Login;
