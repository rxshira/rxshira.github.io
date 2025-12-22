import { motion } from 'framer-motion';

const Research = () => {
  return (
    <section className="relative py-20 px-6" style={{ backgroundColor: '#C2185B' }}>
      <div className="max-w-7xl mx-auto text-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <motion.h2 
              className="text-5xl md:text-6xl font-black relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              AVL Trees
              <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                <path d="M0,10 Q100,0 200,10 T400,10" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </motion.h2>
            
            <motion.p 
              className="text-xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Mechanizing AVL Trees in Decalf
            </motion.p>
            
            <motion.p 
              className="text-lg opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              with Prof. Robert Harper + Runming Li • Current
            </motion.p>
            
            <motion.p 
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              My research focuses on mechanized verification of AVL trees within the decalf (Directed Effectful Cost-Aware Logical Framework) system. I'm formalizing the "Join-based" algorithmic framework developed by Blelloch, Sun, and Ferizovic, which shifts verification from monolithic insertion routines to a modular join(L, k, R) primitive—the constructive building block for efficient parallel set operations.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {['Decalf', 'Type Theory', 'Formal Verification', 'AVL Trees'].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-bold text-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
