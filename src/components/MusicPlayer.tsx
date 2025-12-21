import { Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicPlayer = ({ isPlaying, onToggle }: MusicPlayerProps) => {
  if (!isPlaying) return null;

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 bg-pink-600 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-3 z-50"
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
          <button 
            onClick={onToggle} 
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <Pause className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;
