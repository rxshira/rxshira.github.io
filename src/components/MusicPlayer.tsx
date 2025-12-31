import { Play, Pause, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  currentSong?: string;
  onClose?: () => void;
}

const MusicPlayer = ({ isPlaying, onToggle, currentSong, onClose }: MusicPlayerProps) => {
  const [showSong, setShowSong] = useState(false);

  // Only show if isPlaying is true (which now includes the showMusicPlayer state)
  if (!isPlaying) return null;

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 text-white rounded-full px-6 py-3 flex items-center gap-3 z-[100] group overflow-hidden"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          }}
          onMouseEnter={() => setShowSong(true)}
          onMouseLeave={() => setShowSong(false)}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(194, 24, 91, 0.4)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '25%',
              background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
              pointerEvents: 'none',
              borderRadius: '9999px',
            }}
          />
          <div className="flex gap-1 relative z-10">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="w-1 bg-white rounded-full animate-pulse"
                style={{
                  height: '20px',
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
          <span className="font-bold relative z-10">Now Playing...</span>
          {showSong && currentSong && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm italic opacity-90 relative z-10"
            >
              {currentSong}
            </motion.span>
          )}
          <button 
            onClick={onToggle} 
            className="p-1 hover:bg-white/20 rounded-full transition-colors relative z-10"
          >
            <Pause className="w-4 h-4" />
          </button>
          {onClose && (
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-white/20 rounded-full transition-colors opacity-70 hover:opacity-100 relative z-10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;
