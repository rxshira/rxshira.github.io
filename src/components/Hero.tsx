import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface HeroProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
  isPlaying?: boolean;
}

const Hero = ({ onPlayStateChange, isPlaying }: HeroProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Also try to detect when user plays directly in iframe
  useEffect(() => {
    if (!onPlayStateChange) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://open.spotify.com') {
        try {
          const data = event.data;
          if (data && typeof data === 'object') {
            // Try to detect playback state changes from Spotify
            if (data.type === 'play' || data.command === 'play') {
              onPlayStateChange(true);
            } else if (data.type === 'pause' || data.command === 'pause') {
              onPlayStateChange(false);
            }
          }
        } catch (e) {
          // Ignore errors
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onPlayStateChange]);

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
            {/* Hi, I'm Shira! in a gentle square bubble with all text */}
            <motion.div
              className="rounded-3xl p-8 shadow-xl"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
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
