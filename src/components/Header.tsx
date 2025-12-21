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
      </div>
    </header>
  );
};

export default Header;
