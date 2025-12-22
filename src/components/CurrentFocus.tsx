import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Rocket } from 'lucide-react';

const activities = [
  {
    icon: GraduationCap,
    title: '15-150 - Principles of Functional Programming',
    description: 'TA-ing Functional Programming @ CMU',
    color: 'orange'
  },
  {
    icon: BookOpen,
    title: '98-317 - Hype for Types',
    description: 'Instructing type theory course @ CMU',
    color: 'red-orange'
  },
  {
    icon: Rocket,
    title: 'Research',
    description: 'Researching mechanized verification of AVL trees in Decalf',
    color: 'hot-pink'
  }
];

const CurrentFocus = () => {
  return (
    <section id="focus" className="relative py-20 px-6" style={{ backgroundColor: '#FFD93D' }}>
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
          What I'm up to...
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="#C2185B" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={i}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
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
      </div>
    </section>
  );
};

export default CurrentFocus;
