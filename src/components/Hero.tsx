import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import GlowWrapper from './GlowWrapper';
import { useData } from '../context/DataContext';

const Hero = () => {
  const [showMoreAboutMe, setShowMoreAboutMe] = useState(false);
  const data = useData();
  
  // Fallback values if context is still loading or partially missing
  const name = data?.settings?.name || "Shira Rubin";
  const h1 = data?.settings?.headline1 || "Computer Science @ Carnegie Mellon University";
  const h2 = data?.settings?.headline2 || "Programming Languages · Space · People";
  const about = data?.settings?.aboutMe || "";

  return (
    <section id="hero" className="relative pt-32 pb-16 px-6 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <motion.div
          className="hero space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 
            className="text-clamp-lg font-bold tracking-tighter bg-gradient-to-br from-white from-30% to-pink bg-clip-text text-transparent leading-tight pb-2" 
            style={{ 
              fontSize: 'clamp(56px, 10vw, 92px)',
              fontFamily: '"Space Grotesk", sans-serif',
              textShadow: '0 10px 40px rgba(var(--pink-rgb) / 0.2)'
            }}
          >
            {name}
          </h1>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-white font-medium">
              {h1}
            </p>
            <p className="text-base md:text-lg text-text-gray tracking-wide">
              {h2}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <GlowWrapper>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn text-base py-3 px-8"
              >
                View Work
              </button>
            </GlowWrapper>
            {about && (
              <GlowWrapper>
                <button 
                  onClick={() => setShowMoreAboutMe(!showMoreAboutMe)}
                  className="btn text-base py-3 px-8"
                >
                  {showMoreAboutMe ? 'Less about me' : 'More about me'}
                </button>
              </GlowWrapper>
            )}
          </div>

          <AnimatePresence>
            {showMoreAboutMe && about && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-8 text-left max-w-3xl mx-auto px-6 border-l-2 border-pink/30">
                  <p className="text-lg md:text-xl text-text-gray/90 leading-relaxed font-light whitespace-pre-wrap">
                    {about}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;