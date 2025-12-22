import { motion } from 'framer-motion';
import { courses } from '../data/courses';

const Courses = () => {
  // Use courses in the order they appear in the array
  const orderedCourses = courses;

  return (
    <section id="courses" className="relative py-20 px-6" style={{ backgroundColor: '#F5F5F0' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-black mb-12 text-center relative inline-block"
          style={{ 
            color: '#C2185B',
            textShadow: '0 0 20px rgba(194, 24, 91, 0.5), 0 0 40px rgba(194, 24, 91, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Courses
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="#C2185B" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.h2>
        
        <motion.div 
          className="bg-white rounded-3xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-3">
            {orderedCourses.map((course, i) => {
              return (
                <motion.span
                  key={course.code}
                  className="px-4 py-2 rounded-full font-bold text-sm inline-block"
                  style={{
                    backgroundColor: '#C2185B',
                    boxShadow: '0 0 15px rgba(194, 24, 91, 0.6), 0 0 30px rgba(194, 24, 91, 0.4)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <span
                    style={{
                      backgroundColor: '#FF8C42',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      marginRight: '6px'
                    }}
                  >
                    {course.code}
                  </span>
                  <span style={{ color: '#FFD93D' }}>
                    : {course.name}
                  </span>
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
