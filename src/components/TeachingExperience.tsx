import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Plus, Minus } from 'lucide-react';

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
      icon: GraduationCap,
      title: 'Principles of Functional Programming',
      subtitle: 'Teaching Assistant',
      organization: 'CMU School of Computer Science (15-150)',
      timeline: 'May 2025 - August 2025, Janurary 2026 - Present',
      description: 'Teaching assistant for 15-150 Principles of Functional Programming, helping students learn Standard ML and functional programming concepts. Lead recitations, grade assignments, and provide one-on-one support to students.',
      color: '#5E6623'
    },
    {
      icon: BookOpen,
      title: 'Hype for Types',
      subtitle: 'Instructor',
      organization: 'CMU Student College (98-317)',
      timeline: 'January 2026 - Present',
      description: 'Instructing a student-taught course on type theory, covering dependent types, proof assistants, and formal verification. Designed curriculum and teach weekly lectures to undergraduate students interested in advanced type systems.',
      color: '#893941'
    }
  ];

  return (
    <section id="teaching" className="relative py-20 px-6" style={{ backgroundColor: '#5E6623' }}>
      <div className="max-w-7xl mx-auto">
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
              color: 'white',
              textShadow: isExpanded ? '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)' : '0 0 0px rgba(255, 255, 255, 0)'
            }}
            onMouseEnter={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 0px rgba(255, 255, 255, 0)';
              } else {
                e.currentTarget.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)';
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Teaching
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
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
            const Icon = exp.icon;
            return (
              <motion.div 
                key={i}
                className="bg-white rounded-3xl p-8 shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: exp.color }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-1" style={{ color: '#893941' }}>{exp.title}</h3>
                    <p className="text-xl font-bold mb-2" style={{ color: '#893941' }}>{exp.subtitle}</p>
                    <p className="text-lg text-gray-700">{exp.organization}</p>
                    <p className="text-sm opacity-70 italic text-gray-600 mt-1">{exp.timeline}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
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

