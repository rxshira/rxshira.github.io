import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { Mail } from 'lucide-react';

const FutureProjects = () => {
  return (
    <section className="bg-yellow grain-overlay py-20 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl md:text-7xl font-display font-black text-magenta mb-8"
          {...fadeInUp}
        >
          What's Next?
        </motion.h2>

        <motion.p
          className="text-black text-lg md:text-xl mb-8 leading-relaxed"
          {...fadeInUp}
        >
          I'm always exploring new ideas at the intersection of type theory, formal verification, and systems engineering. Stay tuned for upcoming projects in Agda, advanced proof assistants, and space robotics software!
        </motion.p>

        <motion.div {...fadeInUp}>
          <p className="text-magenta font-bold text-xl mb-4">
            Have an idea? Let's collaborate!
          </p>
          <a
            href="mailto:shiraxrubin@gmail.com"
            className="inline-flex items-center gap-2 bg-magenta text-white px-8 py-4 rounded-full font-semibold hover:bg-hot-pink transition-colors shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureProjects;

