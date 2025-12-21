import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 px-6 min-h-screen flex items-center"
      style={{
        backgroundImage: 'url(/images/IMG-190.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="max-w-2xl">
          <div className="space-y-6">
            {/* Hi, I'm Shira! in a gentle square bubble */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl w-fit"
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
