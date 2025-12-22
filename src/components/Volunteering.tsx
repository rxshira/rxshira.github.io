import { motion } from 'framer-motion';
import { volunteering } from '../data/volunteering';
import { Heart } from 'lucide-react';

const Volunteering = () => {
  return (
    <section className="relative py-20 px-6" style={{ backgroundColor: '#D81B60' }}>
      <div className="max-w-7xl mx-auto text-white">
        <motion.h2 
          className="text-5xl md:text-6xl font-black mb-12 text-center relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Volunteering
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {volunteering.map((vol, i) => (
            <motion.div 
              key={i}
              className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <Heart className="w-8 h-8 text-pink-300 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-black mb-1">{vol.title}</h3>
                  <p className="text-xl font-bold mb-2 opacity-90">{vol.organization}</p>
                  <p className="text-sm opacity-70 italic">{vol.timeline}</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">{vol.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;

