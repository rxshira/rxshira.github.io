import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
  isPlaying?: boolean;
}

const Hero = ({ onPlayStateChange, isPlaying }: HeroProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const clickDetectedRef = useRef(false);
  const [backgroundPosition, setBackgroundPosition] = useState('right center');
  const [showMoreAboutMe, setShowMoreAboutMe] = useState(false);

  // Set background position based on screen size
  useEffect(() => {
    const updateBackgroundPosition = () => {
      if (window.innerWidth < 768) {
        setBackgroundPosition('right center');
      } else {
        setBackgroundPosition('center');
      }
    };

    updateBackgroundPosition();
    window.addEventListener('resize', updateBackgroundPosition);
    return () => window.removeEventListener('resize', updateBackgroundPosition);
  }, []);

  // Try to control Spotify iframe when play state changes from header button
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // When isPlaying changes (from header button), try to control the iframe
    if (isPlaying) {
      // Try to send play command to iframe
      // Note: This may not work due to Spotify's security, but we try
      try {
        iframe.contentWindow?.postMessage(
          { command: 'play' },
          'https://open.spotify.com'
        );
      } catch (e) {
        // Silently fail if postMessage doesn't work
      }
    } else {
      // Try to send pause command
      try {
        iframe.contentWindow?.postMessage(
          { command: 'pause' },
          'https://open.spotify.com'
        );
      } catch (e) {
        // Silently fail
      }
    }
  }, [isPlaying]);

  // Detect when user clicks play directly in iframe
  useEffect(() => {
    if (!onPlayStateChange) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // Listen for messages from Spotify
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://open.spotify.com') {
        try {
          const data = event.data;
          if (data && typeof data === 'object') {
            // Try to detect playback state changes from Spotify
            if (data.type === 'play' || data.command === 'play' || data.event === 'play') {
              onPlayStateChange(true);
            } else if (data.type === 'pause' || data.command === 'pause' || data.event === 'pause') {
              onPlayStateChange(false);
            }
          }
        } catch (e) {
          // Ignore errors
        }
      }
    };

    // Detect clicks on the iframe container area
    // When user clicks on/near the iframe, assume they're interacting with it
    const container = iframe.parentElement?.parentElement;
    const handleClick = (e: MouseEvent) => {
      // Only trigger if clicking on the container (not already playing)
      if (!isPlaying) {
        // Small delay to let iframe handle the click first
        setTimeout(() => {
          // Assume they clicked play if not already playing
          onPlayStateChange(true);
        }, 300);
      }
    };

    window.addEventListener('message', handleMessage);
    if (container) {
      container.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (container) {
        container.removeEventListener('click', handleClick);
      }
    };
  }, [onPlayStateChange, isPlaying]);

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 px-6 min-h-screen flex items-center"
      style={{
        backgroundImage: 'url(/images/IMG-190.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="max-w-2xl">
          <div className="space-y-6">
            {/* Hi, I'm Shira! in a gentle square bubble with all text */}
            <motion.div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '25%',
                  background: 'linear-gradient(to top, rgba(255, 255, 255, 0.1), transparent)',
                  pointerEvents: 'none',
                  borderBottomLeftRadius: '24px',
                  borderBottomRightRadius: '24px',
                }}
              />
              <div className="space-y-4 relative z-10">
                <motion.h2 
                  className="text-5xl md:text-7xl font-black leading-tight"
                  style={{ color: '#E84A3F' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="relative inline-block">
                    Hi, I'm Shira!
                    <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                      <path d="M0,10 Q100,0 200,10 T400,10" stroke="#C2185B" strokeWidth="8" fill="none" strokeLinecap="round"/>
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
                  I like programming languages, space, and people.
                </motion.p>
                
                <motion.p 
                  className="text-lg italic opacity-80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  I also really like music. Here's my current playlist! Click play to listen to it. Scroll to see what I do.{' '}
                  <button
                    onClick={() => setShowMoreAboutMe(!showMoreAboutMe)}
                    className="underline cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: '#C2185B' }}
                  >
                    {showMoreAboutMe ? 'Less about me' : 'More about me'}
                  </button>
                </motion.p>
                
                <AnimatePresence>
                  {showMoreAboutMe && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <motion.p 
                        className="text-lg leading-relaxed mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        I am a problem solving addict, and my favorite kinds of problems to solve are the ones from two seemingly unrelated fields. If you talk to me, you'll also learn very fast that I love to talk. My talking "specialty" is fun facts I find amusing. I am always open to hearing more!
                        <br /><br />
                        Outside of the awesome projects I work/worked on I enjoy dancing (I used to compete in dancesport) and making chocolate completely from scratch.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Spotify Playlist Embed */}
            <motion.div
              className="mt-4 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  ref={iframeRef}
                  id="spotify-embed"
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
