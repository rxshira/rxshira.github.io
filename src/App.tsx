import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CurrentFocus from './components/CurrentFocus';
import Research from './components/Research';
import Projects from './components/Projects';
import TeachingExperience from './components/TeachingExperience';
import Awards from './components/Awards';
import Volunteering from './components/Volunteering';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import GrainTexture from './components/GrainTexture';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen bg-cream text-gray-900 transition-colors duration-300 relative overflow-x-hidden">
      <GrainTexture />
      
      <Header isPlaying={isPlaying} onToggleMusic={toggleMusic} />
      
      <Hero />
      
      <CurrentFocus />
      
      <Research />
      
      <Projects />
      
      <TeachingExperience />
      
      <Awards />
      
      <Volunteering />
      
      <Footer />
      
      <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
    </div>
  );
}

export default App;
