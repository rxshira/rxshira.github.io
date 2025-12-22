import { useState, useEffect } from 'react';
import { Play, Pause, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  expandedSections?: Set<string>;
  activeSection?: string;
  onExpandSection?: (sectionId: string) => void;
}

const Header = ({ isPlaying, onToggleMusic, expandedSections = new Set(), activeSection, onExpandSection }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      // Expand the section if it's not already expanded
      if (onExpandSection && !expandedSections.has(id)) {
        onExpandSection(id);
      }
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
          className="text-2xl md:text-3xl font-black cursor-pointer transition-all duration-300"
          style={{ 
            color: '#C2185B',
            textShadow: '0 0 0px rgba(194, 24, 91, 0)'
          }}
          onClick={() => scrollToSection('hero')}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FF8C42';
            e.currentTarget.style.textShadow = '0 0 15px rgba(255, 140, 66, 0.6), 0 0 30px rgba(255, 140, 66, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#C2185B';
            e.currentTarget.style.textShadow = '0 0 0px rgba(194, 24, 91, 0)';
          }}
        >
          Shira Rubin
        </h1>
        
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="font-bold transition-all duration-300 text-sm"
                style={{ 
                  color: isActive ? '#FF8C42' : '#C2185B',
                  textShadow: isActive ? '0 0 15px rgba(255, 140, 66, 0.6), 0 0 30px rgba(255, 140, 66, 0.4)' : '0 0 0px rgba(194, 24, 91, 0)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#FF8C42';
                    e.currentTarget.style.textShadow = '0 0 15px rgba(255, 140, 66, 0.6), 0 0 30px rgba(255, 140, 66, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#C2185B';
                    e.currentTarget.style.textShadow = '0 0 0px rgba(194, 24, 91, 0)';
                  } else {
                    e.currentTarget.style.color = '#FF8C42';
                    e.currentTarget.style.textShadow = '0 0 15px rgba(255, 140, 66, 0.6), 0 0 30px rgba(255, 140, 66, 0.4)';
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
            <button
            onClick={onToggleMusic}
            className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 ml-2"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 217, 61, 0.6), 0 0 30px rgba(255, 217, 61, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '';
            }}
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
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className="text-lg font-bold transition-all duration-300"
                    style={{ 
                      color: isActive ? '#FF8C42' : '#C2185B',
                      textShadow: isActive ? '0 0 15px rgba(255, 140, 66, 0.6), 0 0 30px rgba(255, 140, 66, 0.4)' : '0 0 0px rgba(194, 24, 91, 0)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#FF8C42';
                        e.currentTarget.style.textShadow = '0 0 15px rgba(255, 140, 66, 0.6), 0 0 30px rgba(255, 140, 66, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#C2185B';
                        e.currentTarget.style.textShadow = '0 0 0px rgba(194, 24, 91, 0)';
                      } else {
                        e.currentTarget.style.color = '#FF8C42';
                        e.currentTarget.style.textShadow = '0 0 15px rgba(255, 140, 66, 0.6), 0 0 30px rgba(255, 140, 66, 0.4)';
                      }
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
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
