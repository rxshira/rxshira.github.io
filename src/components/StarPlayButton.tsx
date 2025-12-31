import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarPlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const StarPlayButton = ({ isPlaying, onToggle }: StarPlayButtonProps) => {
  return (
    <motion.div
      className="fixed top-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <button
        onClick={onToggle}
        className="w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(194, 24, 91, 0.08)',
            pointerEvents: 'none',
          }}
        />
        {isPlaying ? (
          <Pause className="w-5 h-5 relative z-10" style={{ color: '#C2185B' }} />
        ) : (
          <Play className="w-5 h-5 relative z-10" style={{ color: '#C2185B' }} />
        )}
      </button>
    </motion.div>
  );
};

export default StarPlayButton;

