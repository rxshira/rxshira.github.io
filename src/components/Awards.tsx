import { motion } from 'framer-motion';
import { awards } from '../data/awards';
import { Trophy } from 'lucide-react';

const Awards = () => {
  return (
    <section className="relative py-20 px-6" style={{ backgroundColor: '#FF8C42' }}>
      <div className="max-w-7xl mx-auto text-white">
        <motion.h2 
          className="text-5xl md:text-6xl font-black mb-12 text-center relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Awards
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <motion.div 
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <Trophy className="w-8 h-8 text-yellow-300 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-black mb-1">{award.title}</h3>
                  <p className="text-sm opacity-80 italic">{award.date}</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;

