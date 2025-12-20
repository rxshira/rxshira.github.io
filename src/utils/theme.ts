export const toggleTheme = () => {
  try {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    
    if (currentTheme === 'light') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  } catch (error) {
    console.error('Error toggling theme:', error);
  }
};

export const initTheme = () => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
};

