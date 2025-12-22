import { motion } from 'framer-motion';
import { awards } from '../data/awards';
import { Trophy } from 'lucide-react';

const Awards = () => {
  return (
    <section id="awards" className="relative py-20 px-6" style={{ backgroundColor: '#FFD93D' }}>
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
          Awards
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="#C2185B" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {awards.map((award, i) => (
        <motion.div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
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
      </div>
    </section>
  );
};

export default Awards;

