import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CurrentFocus from './components/CurrentFocus';
import Projects from './components/Projects';
import TeachingExperience from './components/TeachingExperience';
import Courses from './components/Courses';
import Awards from './components/Awards';
import Volunteering from './components/Volunteering';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import GrainTexture from './components/GrainTexture';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState<string>('rock revival');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleMusic = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    // When playing, show the indicator
    if (newState) {
      setShowMusicPlayer(true);
    }
  };

  const closeMusicPlayer = () => {
    // Only hide the indicator, don't pause the music
    setShowMusicPlayer(false);
  };

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
    // When playing starts, show the indicator
    if (playing) {
      setShowMusicPlayer(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-gray-900 transition-colors duration-300 relative overflow-x-hidden">
      <GrainTexture />
      
      <Header isPlaying={isPlaying} onToggleMusic={toggleMusic} expandedSections={expandedSections} />
      
      <Hero isPlaying={isPlaying} onPlayStateChange={handlePlayStateChange} />
      
      <CurrentFocus onExpandedChange={(expanded) => {
        const newSet = new Set(expandedSections);
        if (expanded) newSet.add('focus');
        else newSet.delete('focus');
        setExpandedSections(newSet);
      }} />
      
      <Projects onExpandedChange={(expanded) => {
        const newSet = new Set(expandedSections);
        if (expanded) newSet.add('projects');
        else newSet.delete('projects');
        setExpandedSections(newSet);
      }} />
      
      <TeachingExperience onExpandedChange={(expanded) => {
        const newSet = new Set(expandedSections);
        if (expanded) newSet.add('teaching');
        else newSet.delete('teaching');
        setExpandedSections(newSet);
      }} />
      
      <Courses onExpandedChange={(expanded) => {
        const newSet = new Set(expandedSections);
        if (expanded) newSet.add('courses');
        else newSet.delete('courses');
        setExpandedSections(newSet);
      }} />
      
      <Awards onExpandedChange={(expanded) => {
        const newSet = new Set(expandedSections);
        if (expanded) newSet.add('awards');
        else newSet.delete('awards');
        setExpandedSections(newSet);
      }} />
      
      <Volunteering onExpandedChange={(expanded) => {
        const newSet = new Set(expandedSections);
        if (expanded) newSet.add('volunteering');
        else newSet.delete('volunteering');
        setExpandedSections(newSet);
      }} />
      
      <Footer />
      
      <MusicPlayer 
        isPlaying={isPlaying && showMusicPlayer} 
        onToggle={toggleMusic}
        currentSong={currentSong}
        onClose={closeMusicPlayer}
      />
    </div>
  );
}

export default App;
