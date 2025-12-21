const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <h1 
          className="text-2xl md:text-3xl font-black cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: '#C2185B' }}
          onClick={() => scrollToSection('hero')}
        >
          Shira Rubin
        </h1>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#about" 
            className="font-bold hover:text-pink-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="font-bold hover:text-pink-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contact
          </a>
          <ThemeToggle />
          <button 
            onClick={onToggleMusic}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
            className="md:hidden bg-white dark:bg-gray-900 pt-4 px-6 pb-6"
          >
            <nav className="flex flex-col gap-6">
              <a 
                href="#about" 
                className="text-2xl font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-2xl font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact
              </a>
              <div className="flex items-center gap-4 pt-4 border-t">
                <ThemeToggle />
                <button 
                  onClick={onToggleMusic}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
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
