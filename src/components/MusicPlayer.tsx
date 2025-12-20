import { useState } from 'react';
import { Play, Pause, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
    >
      <motion.div
        className={`bg-hot-pink rounded-full shadow-2xl overflow-hidden ${isExpanded ? 'rounded-3xl' : ''}`}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <div className="flex items-center gap-3 p-3">
          <button
            onClick={togglePlay}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center gap-2 text-white text-sm overflow-hidden"
              >
                <Music className="w-4 h-4" />
                <span className="whitespace-nowrap">Now Playing</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;

