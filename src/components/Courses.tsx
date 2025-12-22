import { motion } from 'framer-motion';
import { courses } from '../data/courses';

const Courses = () => {
  // Use courses in the order they appear in the array
  const orderedCourses = courses;

  // Sunset colors: pink, orange, yellow
  const colors = ['#C2185B', '#FF8C42', '#FFD93D'];
  const getColor = (index: number) => colors[index % colors.length];

  return (
    <section id="courses" className="relative py-20 px-6" style={{ backgroundColor: '#D81B60' }}>
      <div className="max-w-7xl mx-auto text-white">
        <motion.h2 
          className="text-5xl md:text-6xl font-black mb-12 text-center relative inline-block"
          style={{ 
            color: 'white',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Courses
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
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
              const bgColor = getColor(i);
              const textColor = bgColor === '#FFD93D' ? '#1A1A1A' : 'white';
              
              return (
                <motion.span
                  key={course.code}
                  className="px-4 py-2 rounded-full font-bold text-sm inline-block"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  {course.code}: {course.name}
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
