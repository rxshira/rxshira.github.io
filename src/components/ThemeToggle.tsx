import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toggleTheme, initTheme } from '../utils/theme';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    initTheme();
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow" />
      ) : (
        <Moon className="w-5 h-5 text-magenta" />
      )}
    </button>
  );
};

export default ThemeToggle;

