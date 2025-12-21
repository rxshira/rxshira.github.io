import { motion } from 'framer-motion';
import { volunteering } from '../data/volunteering';

const Volunteering = () => {
  return (
    <section className="relative py-20 px-6" style={{ backgroundColor: '#F5F5F0' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-black mb-12 text-center relative inline-block"
          style={{ color: '#FF8C42' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Volunteering
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="#FF8C42" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {volunteering.map((item, i) => (
            <motion.div 
              key={i}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-2xl font-black mb-2" style={{ color: '#E84A3F' }}>
                {item.title}
              </h3>
              <p className="text-lg font-bold mb-2" style={{ color: '#C2185B' }}>
                {item.organization}
              </p>
              <p className="text-sm text-gray-600 mb-3 italic">{item.timeline}</p>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;

