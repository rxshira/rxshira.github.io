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
          className="fixed bottom-6 right-6 bg-pink-600 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-3 z-50 group"
          onMouseEnter={() => setShowSong(true)}
          onMouseLeave={() => setShowSong(false)}
        >
          <div className="flex gap-1">
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
          <span className="font-bold">Now Playing...</span>
          {showSong && currentSong && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm italic opacity-90"
            >
              {currentSong}
            </motion.span>
          )}
          <button 
            onClick={onToggle} 
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <Pause className="w-4 h-4" />
          </button>
          {onClose && (
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-white/20 rounded-full transition-colors opacity-70 hover:opacity-100"
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
