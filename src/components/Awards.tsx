import { motion } from 'framer-motion';
import { Award as AwardIcon } from 'lucide-react';
import { awards } from '../data/awards';
import { fadeInUp, staggerChildren } from '../utils/animations';

const Awards = () => {
  return (
    <section className="bg-yellow grain-overlay py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-5xl md:text-7xl font-display font-black text-magenta mb-12"
          {...fadeInUp}
        >
          Recognition
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <AwardIcon className="w-12 h-12 text-magenta mb-4" />
              <h3 className="text-2xl font-display font-bold text-black mb-2">
                {award.title}
              </h3>
              <p className="text-black/70 font-semibold mb-3">{award.date}</p>
              <p className="text-black/80">{award.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;

