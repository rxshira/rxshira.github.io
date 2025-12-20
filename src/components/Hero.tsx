import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen bg-cream grain-overlay flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Photo placeholder */}
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] w-full aspect-square bg-gradient-to-br from-yellow to-orange shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="text-6xl">📸</div>
          </div>
        </motion.div>

        {/* Right: Headline */}
        <motion.div
          className="order-1 md:order-2 space-y-6"
          {...fadeInUp}
        >
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-display font-black text-red-orange italic leading-tight">
              Hi, I'm Shira!
            </h1>
            <svg
              className="absolute -bottom-4 left-0 w-full h-6 text-magenta"
              viewBox="0 0 400 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0,15 Q100,5 200,15 T400,15"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="space-y-4 text-lg md:text-xl text-black/80">
            <p>
              I am a student at{' '}
              <span className="font-bold text-magenta">Carnegie Mellon University</span> studying{' '}
              <span className="font-bold text-red-orange">Computer Science</span>.
            </p>
            <p className="text-red-orange font-semibold">
              I like rockets, robots, and people.
            </p>
            <p className="text-black/70 italic">
              Scroll down to explore some of my projects...
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

