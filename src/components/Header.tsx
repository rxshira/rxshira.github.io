import { Play, Pause } from 'lucide-react';

interface HeaderProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

const Header = ({ isPlaying, onToggleMusic }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 
          className="text-2xl md:text-3xl font-black cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: '#C2185B' }}
        >
          Shira Rubin
        </h1>
        
        <button 
          onClick={onToggleMusic}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
