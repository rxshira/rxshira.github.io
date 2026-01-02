import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { courses } from '../data/courses';
import { Plus, Minus } from 'lucide-react';
import LittleBirds from './LittleBirds';

interface CoursesProps {
  onExpandedChange?: (expanded: boolean) => void;
  isExpanded?: boolean;
  onExpandRequest?: () => void;
}

const Courses = ({ onExpandedChange, isExpanded: externalExpanded, onExpandRequest }: CoursesProps) => {
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
  // Use courses in the order they appear in the array
  const orderedCourses = courses;

  return (
    <section id="courses" className="relative py-20 px-6 overflow-hidden" style={{ backgroundColor: '#F7F4D5' }}>
      <LittleBirds />
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          className="mb-12 flex items-center justify-center gap-4"
        >
          <button
            onClick={handleToggle}
            className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            style={{ color: '#0A3323' }}
          >
            {isExpanded ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center relative inline-block transition-all duration-300 cursor-pointer"
            onClick={handleToggle}
            style={{ 
              color: '#839958',
              textShadow: isExpanded ? '0 0 20px rgba(131, 153, 88, 0.5), 0 0 40px rgba(131, 153, 88, 0.3)' : '0 0 0px rgba(131, 153, 88, 0)'
            }}
            onMouseEnter={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 20px rgba(131, 153, 88, 0.5), 0 0 40px rgba(131, 153, 88, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.textShadow = '0 0 0px rgba(131, 153, 88, 0)';
              } else {
                e.currentTarget.style.textShadow = '0 0 20px rgba(131, 153, 88, 0.5), 0 0 40px rgba(131, 153, 88, 0.3)';
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Courses
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="#839958" strokeWidth="6" fill="none" strokeLinecap="round"/>
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
        <motion.div 
          className="rounded-3xl p-8 relative overflow-hidden group"
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
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(247, 244, 213, 0.08)',
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
          <div className="flex flex-wrap gap-3 relative z-10">
            {orderedCourses.map((course, i) => {
              const isGraduateSpaceRobotics = course.code === '16-865';
              return (
                <motion.span
                  key={course.code}
                  className="px-4 py-2 rounded-full font-bold text-sm inline-block relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(131, 153, 88, 0.4)',
                      pointerEvents: 'none',
                    }}
                  />
                  <span
                    className="relative z-10"
                    style={{
                      backgroundColor: '#105666',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      marginRight: '6px'
                    }}
                  >
                    {course.code}
                  </span>
                  <span className="relative z-10" style={{ color: '#839958' }}>
                    : {course.name}
                    {isGraduateSpaceRobotics && (
                      <strong> [GRADUATE]</strong>
                    )}
                  </span>
                </motion.span>
              );
            })}
          </div>
        </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Courses;
