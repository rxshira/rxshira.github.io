import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { courses } from '../data/courses';

const Courses = () => {
  // Group courses by department prefix (first 2 digits)
  const groupedCourses = courses.reduce((acc, course) => {
    const prefix = course.code.substring(0, 2);
    if (!acc[prefix]) {
      acc[prefix] = [];
    }
    acc[prefix].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

  // Order: 15xxx, 18xxx (ECE), 16xxx, 33xxx, 21xxx
  const orderedPrefixes = ['15', '18', '16', '33', '21'];

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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedPrefixes.map((prefix) => {
            const prefixCourses = groupedCourses[prefix];
            if (!prefixCourses) return null;
            
            return prefixCourses.map((course, i) => (
              <motion.div 
                key={course.code}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#C2185B' }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black mb-1" style={{ color: '#E84A3F' }}>
                      {course.code}
                    </h3>
                    <p className="text-base font-bold mb-1" style={{ color: '#C2185B' }}>
                      {course.name}
                    </p>
                    <p className="text-sm text-gray-600">{course.department}</p>
                  </div>
                </div>
              </motion.div>
            ));
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
