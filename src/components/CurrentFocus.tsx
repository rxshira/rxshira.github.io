import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Rocket, Plus, Minus } from 'lucide-react';

const activities = [
  {
    icon: BookOpen,
    title: '98-317 - Hype for Types',
    description: 'Instructing type theory course @ CMU',
    color: 'red-orange'
  },
  {
    icon: GraduationCap,
    title: '15-150 - Principles of Functional Programming',
    description: 'TA-ing Functional Programming @ CMU',
    color: 'orange'
  },
  {
    icon: Rocket,
    title: 'Research',
    description: 'Researching mechanized verification of AVL trees in Decalf',
    color: 'hot-pink'
  }
];

interface CurrentFocusProps {
  onExpandedChange?: (expanded: boolean) => void;
  isExpanded?: boolean;
  onExpandRequest?: () => void;
}

const CurrentFocus = ({ onExpandedChange, isExpanded: externalExpanded, onExpandRequest }: CurrentFocusProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    if (externalExpanded !== undefined) {
      setIsExpanded(externalExpanded);
    }
  }, [externalExpanded]);
  
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  return (
    <section id="focus" className="relative py-20 px-6" style={{ backgroundColor: '#FFD93D' }}>
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-12 flex items-center justify-center gap-4"
        >
          <button
            onClick={handleToggle}
            className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            style={{ color: '#C2185B' }}
          >
            {isExpanded ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center relative inline-block transition-all duration-300 cursor-pointer"
            onClick={handleToggle}
            style={{ 
              color: '#C2185B',
              textShadow: isExpanded ? '0 0 20px rgba(194, 24, 91, 0.5), 0 0 40px rgba(194, 24, 91, 0.3)' : '0 0 0px rgba(194, 24, 91, 0)'
            }}
            onMouseEnter={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 20px rgba(194, 24, 91, 0.5), 0 0 40px rgba(194, 24, 91, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 0px rgba(194, 24, 91, 0)';
              } else {
                e.currentTarget.style.textShadow = '0 0 20px rgba(194, 24, 91, 0.5), 0 0 40px rgba(194, 24, 91, 0.3)';
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What I'm up to...
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="#C2185B" strokeWidth="6" fill="none" strokeLinecap="round"/>
            </svg>
          </motion.h2>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={i}
                className="bg-white rounded-3xl p-6 shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-2xl font-black mb-3" style={{ color: '#E84A3F' }}>
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
        </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CurrentFocus;
