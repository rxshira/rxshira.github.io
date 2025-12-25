import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="relative py-20 px-6" style={{ backgroundColor: '#893941' }}>
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
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:shirar@andrew.cmu.edu"
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <Mail className="w-6 h-6" />
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
