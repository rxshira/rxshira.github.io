import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, FileText } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

const Footer = () => {
  return (
    <footer id="contact" className="bg-magenta grain-overlay py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-center mb-12">
          {/* Left: Contact */}
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-display font-black text-white mb-6">
              Contact
            </h2>
            <div className="space-y-3 text-white/90">
              <div>
                <p className="font-semibold">Personal</p>
                <a
                  href="mailto:shiraxrubin@gmail.com"
                  className="hover:underline"
                >
                  shiraxrubin@gmail.com
                </a>
              </div>
              <div>
                <p className="font-semibold">School</p>
                <a
                  href="mailto:shirar@andrew.cmu.edu"
                  className="hover:underline"
                >
                  shirar@andrew.cmu.edu
                </a>
              </div>
            </div>
          </motion.div>

          {/* Center: Logo */}
          <motion.div
            className="text-center"
            {...fadeInUp}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4">
              Shira Rubin
            </h1>
            <svg
              className="mx-auto w-64 h-6 text-white"
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
            <p className="text-white/80 mt-4 italic">
              that's all for now! see you soon :)
            </p>
          </motion.div>

          {/* Right: Social Links */}
          <motion.div
            className="flex flex-col items-end md:items-start gap-4"
            {...fadeInUp}
          >
            <a
              href="https://github.com/rxshira"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-yellow transition-colors"
            >
              <Github className="w-6 h-6" />
              <span>github.com/rxshira</span>
            </a>
            <a
              href="https://linkedin.com/in/shira-rubin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-yellow transition-colors"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/Shira_Rubin_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-yellow transition-colors"
            >
              <FileText className="w-6 h-6" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center pt-8 border-t border-white/20"
          {...fadeInUp}
        >
          <p className="text-white/70 text-sm">
            © 2025 Shira Rubin. Built with React, TypeScript, and lots of type safety.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

