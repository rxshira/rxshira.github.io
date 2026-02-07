import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import GlowWrapper from './GlowWrapper';

interface ExpandableProps {
  title: string;
  children: React.ReactNode;
}

const Expandable: React.FC<ExpandableProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expandable rounded-none">
      <GlowWrapper className="w-full">
        <div 
          className="flex justify-between items-center px-10 py-8 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
          <span className="text-text-gray text-2xl">
            {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </span>
        </div>
      </GlowWrapper>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-10 pt-8 border-t border-white/10 text-lg text-text-gray leading-relaxed rounded-none">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Expandable;