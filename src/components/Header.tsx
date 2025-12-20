import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 bg-off-white/80 backdrop-blur-md border-b border-black/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-display font-bold text-magenta hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            Shira Rubin
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-black hover:text-magenta transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-black hover:text-magenta transition-colors font-medium"
            >
              Contact
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-off-white border-t border-black/10"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left text-black hover:text-magenta transition-colors font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-black hover:text-magenta transition-colors font-medium"
                >
                  Contact
                </button>
                <div className="pt-2 border-t border-black/10">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;

