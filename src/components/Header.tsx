import { useState } from 'react';
import { Play, Pause, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

const Header = ({ isPlaying, onToggleMusic }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'focus', label: 'Focus' },
    { id: 'projects', label: 'Projects' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'courses', label: 'Courses' },
    { id: 'awards', label: 'Awards' },
    { id: 'volunteering', label: 'Volunteering' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 
          className="text-2xl md:text-3xl font-black cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: '#C2185B' }}
            onClick={() => scrollToSection('hero')}
          >
            Shira Rubin
        </h1>
        
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className="font-bold hover:opacity-70 transition-opacity text-sm"
              style={{ color: '#C2185B' }}
            >
              {link.label}
            </a>
          ))}
            <button
            onClick={onToggleMusic}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors ml-2"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </nav>

        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

        {/* Mobile Menu */}
        <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white pt-4 px-6 pb-6 border-t"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="text-lg font-bold"
                  style={{ color: '#C2185B' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t">
                <button
                  onClick={onToggleMusic}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              </div>
            </nav>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
};

export default Header;
