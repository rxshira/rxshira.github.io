import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import TwinklingStars from './TwinklingStars';

interface TeachingExperienceProps {
  onExpandedChange?: (expanded: boolean) => void;
  isExpanded?: boolean;
  onExpandRequest?: () => void;
}

const TeachingExperience = ({ onExpandedChange, isExpanded: externalExpanded, onExpandRequest }: TeachingExperienceProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
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
  
  const experiences = [
    {
      title: 'Principles of Functional Programming',
      subtitle: 'Teaching Assistant',
      organization: 'CMU School of Computer Science (15-150)',
      timeline: 'May 2025 - August 2025, Janurary 2026 - Present',
      description: 'Teaching assistant for 15-150 Principles of Functional Programming, helping students learn Standard ML and functional programming concepts. Lead recitations, grade assignments, and provide one-on-one support to students.'
    },
    {
      title: 'Hype for Types',
      subtitle: 'Instructor',
      organization: 'CMU Student College (98-317)',
      timeline: 'January 2026 - Present',
      description: 'Instructing a student-taught course on type theory, covering dependent types, proof assistants, and formal verification. Designed curriculum and teach weekly lectures to undergraduate students interested in advanced type systems.'
    }
  ];

  return (
    <section id="teaching" className="relative py-20 px-6 overflow-hidden" style={{ backgroundColor: '#d66c61' }}>
      <TwinklingStars count={18} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          className="mb-12 flex items-center justify-center gap-4"
        >
          <button
            onClick={handleToggle}
            className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            style={{ color: 'white' }}
          >
            {isExpanded ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center relative inline-block transition-all duration-300 cursor-pointer"
            onClick={handleToggle}
            style={{ 
              color: '#736390',
              textShadow: isExpanded ? '0 0 20px rgba(115, 99, 144, 0.5), 0 0 40px rgba(115, 99, 144, 0.3)' : '0 0 0px rgba(115, 99, 144, 0)'
            }}
            onMouseEnter={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 20px rgba(115, 99, 144, 0.5), 0 0 40px rgba(115, 99, 144, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 0px rgba(115, 99, 144, 0)';
              } else {
                e.currentTarget.style.textShadow = '0 0 20px rgba(115, 99, 144, 0.5), 0 0 40px rgba(115, 99, 144, 0.3)';
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Teaching
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="#736390" strokeWidth="6" fill="none" strokeLinecap="round"/>
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
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => {
            return (
              <motion.div 
                key={i}
                className="rounded-3xl p-8 transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(131, 153, 88, 0.08)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
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
                    borderBottomLeftRadius: '24px',
                    borderBottomRightRadius: '24px',
                  }}
                />
                <div className="mb-4 relative z-10">
                  <h3 className="text-3xl font-black mb-1" style={{ color: '#736390' }}>{exp.title}</h3>
                  <p className="text-xl font-bold mb-2" style={{ color: '#0A3323' }}>{exp.subtitle}</p>
                  <p className="text-lg text-gray-700">{exp.organization}</p>
                  <p className="text-sm opacity-70 italic text-gray-600 mt-1">{exp.timeline}</p>
                </div>
                <p className="text-gray-700 leading-relaxed relative z-10">{exp.description}</p>
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

export default TeachingExperience;

