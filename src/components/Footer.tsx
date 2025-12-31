import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="relative py-20 px-6" style={{ backgroundColor: '#C2185B' }}>
      <div className="max-w-7xl mx-auto text-white">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div>
            <motion.h3 
              className="text-3xl font-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Contact
            </motion.h3>
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p><strong>Personal:</strong> shiraxrubin (at) gmail.com</p>
              <p><strong>School:</strong> shirar (at) andrew.cmu.edu</p>
              
              <div className="flex gap-4 mt-6">
                <a 
                  href="https://github.com/rxshira" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                    }}
                  />
                  <Github className="w-6 h-6 relative z-10" />
                </a>
                <a 
                  href="https://x.com/shiraxrubin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                    }}
                  />
                  <svg className="w-6 h-6 relative z-10 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <motion.h2 
              className="text-5xl md:text-6xl font-black relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Shira Rubin
              <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                <path d="M0,10 Q100,0 200,10 T400,10" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </motion.h2>
          </div>
          
          <div className="text-right">
            <motion.p 
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              that's all for now!
            </motion.p>
            <motion.p 
              className="text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              see you soon :)
            </motion.p>
          </div>
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-white/20 text-center text-sm opacity-75"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.75 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          © 2025 Shira Rubin. Built with React, TypeScript, and lots of type safety.
          <br />
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
