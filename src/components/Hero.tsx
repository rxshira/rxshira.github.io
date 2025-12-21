import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 px-6" style={{ backgroundColor: '#F5F5F0' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="/images/IMG-190.jpg" 
              alt="Shira Rubin"
              className="w-full h-full object-cover rounded-3xl shadow-xl"
              onError={(e) => {
                // Fallback to hero.jpg if IMG-190.jpg doesn't exist
                (e.target as HTMLImageElement).src = '/images/hero.jpg';
              }}
            />
          </motion.div>
          
          <div className="space-y-6">
            {/* Hi, I'm Shira! in a gentle square bubble */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-5xl md:text-7xl font-black leading-tight"
                style={{ color: '#E84A3F' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
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
            </motion.div>
            
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
              I like programming languages, space, and people.
            </motion.p>
            
            <motion.p 
              className="text-lg italic opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I also really like music. Here's my current playlist. Click play to listen to it as you learn more about me!
            </motion.p>
            
            {/* Spotify Playlist Embed */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/playlist/1QrBzW0CNaNv4LSm3EGhPP?utm_source=generator"
                  width="100%"
                  height="232"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
