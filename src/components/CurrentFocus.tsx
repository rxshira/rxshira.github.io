import { motion } from 'framer-motion';

const CurrentFocus = () => {
  return (
    <section className="relative py-20 px-6" style={{ backgroundColor: '#FFD93D' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-black mb-8 text-center relative inline-block"
          style={{ color: '#C2185B' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Programming Languages Research
          <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
            <path d="M0,10 Q100,0 200,10 T400,10" stroke="#C2185B" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-black mb-4" style={{ color: '#E84A3F' }}>
            Mechanizing AVL Trees
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Working on mechanized verification of AVL trees using the Decalf framework. Formalizing proofs for tree balance invariants and complexity analysis.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentFocus;
