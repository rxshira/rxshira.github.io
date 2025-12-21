import { motion } from 'framer-motion';
import BlobFrame from './BlobFrame';

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 px-6" style={{ backgroundColor: '#F5F5F0' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <BlobFrame className="w-full max-w-md mx-auto">
            <img 
              src="/images/hero.jpg" 
              alt="Shira Rubin"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop';
              }}
            />
          </BlobFrame>
          
          <div className="space-y-6">
            <motion.h2 
              className="text-5xl md:text-7xl font-black leading-tight"
              style={{ color: '#E84A3F' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi, I'm
              <br />
              <span className="relative inline-block">
                Shira!
                <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 300 15">
                  <path d="M0,10 Q75,0 150,10 T300,10" stroke="#C2185B" strokeWidth="8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I am a student at <span className="font-bold" style={{ color: '#C2185B' }}>Carnegie Mellon University</span> studying{' '}
              <span className="font-bold" style={{ color: '#C2185B' }}>Computer Science</span>.
            </motion.p>
            
            <motion.p 
              className="text-xl md:text-2xl font-bold"
              style={{ color: '#FF8C42' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I like rockets, robots, and people.
            </motion.p>
            
            <motion.p 
              className="text-lg italic opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Scroll down to explore some of my projects...
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
