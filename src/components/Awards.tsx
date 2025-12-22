import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { awards } from '../data/awards';
import { Trophy } from 'lucide-react';

interface AwardsProps {
  onExpandedChange?: (expanded: boolean) => void;
}

const Awards = ({ onExpandedChange }: AwardsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  return (
    <section id="awards" className="relative py-20 px-6" style={{ backgroundColor: '#FFD93D' }}>
      <div className="max-w-7xl mx-auto">
        <div 
          className="cursor-pointer mb-12"
          onClick={handleToggle}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-black text-center relative inline-block transition-all duration-300"
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
            Awards
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
        <div className="grid md:grid-cols-3 gap-6">
          {awards.map((award, i) => (
        <motion.div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <Trophy className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-black mb-1" style={{ color: '#E84A3F' }}>{award.title}</h3>
                  <p className="text-sm opacity-70 italic text-gray-600">{award.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Awards;

