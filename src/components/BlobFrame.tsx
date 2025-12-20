import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlobFrameProps {
  children: ReactNode;
  className?: string;
}

const BlobFrame = ({ children, className = '' }: BlobFrameProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
        <defs>
          <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.05 C0.6,0.1 0.7,0.15 0.75,0.3 C0.8,0.45 0.85,0.6 0.8,0.75 C0.75,0.9 0.6,0.95 0.5,0.98 C0.4,0.95 0.25,0.9 0.2,0.75 C0.15,0.6 0.2,0.45 0.25,0.3 C0.3,0.15 0.4,0.1 0.5,0.05 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] overflow-hidden bg-cream shadow-lg">
        {children}
      </div>
    </motion.div>
  );
};

export default BlobFrame;

