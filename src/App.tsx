import { useState } from 'react';
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
import CursorTrail from './components/CursorTrail';
import StarPlayButton from './components/StarPlayButton';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState<string>('rock revival');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['focus', 'projects', 'teaching', 'courses', 'awards', 'volunteering']));

  const handleExpandSection = (sectionId: string) => {
    const newSet = new Set(expandedSections);
    newSet.add(sectionId);
    setExpandedSections(newSet);
  };

  const toggleMusic = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    // When playing, show the indicator
    if (newState) {
      setShowMusicPlayer(true);
    } else {
      // When pausing, you can optionally hide it, but for now let's keep it visible
      // setShowMusicPlayer(false);
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
      <CursorTrail />
      <GrainTexture />
      
      <StarPlayButton isPlaying={isPlaying} onToggle={toggleMusic} />
      
      <Hero isPlaying={isPlaying} onPlayStateChange={handlePlayStateChange} />
      
      <CurrentFocus 
        isExpanded={expandedSections.has('focus')}
        onExpandedChange={(expanded) => {
          const newSet = new Set(expandedSections);
          if (expanded) newSet.add('focus');
          else newSet.delete('focus');
          setExpandedSections(newSet);
        }}
        onExpandRequest={() => handleExpandSection('focus')}
      />
      
      <Projects 
        isExpanded={expandedSections.has('projects')}
        onExpandedChange={(expanded) => {
          const newSet = new Set(expandedSections);
          if (expanded) newSet.add('projects');
          else newSet.delete('projects');
          setExpandedSections(newSet);
        }}
        onExpandRequest={() => handleExpandSection('projects')}
      />
      
      <TeachingExperience 
        isExpanded={expandedSections.has('teaching')}
        onExpandedChange={(expanded) => {
          const newSet = new Set(expandedSections);
          if (expanded) newSet.add('teaching');
          else newSet.delete('teaching');
          setExpandedSections(newSet);
        }}
        onExpandRequest={() => handleExpandSection('teaching')}
      />
      
      <Courses 
        isExpanded={expandedSections.has('courses')}
        onExpandedChange={(expanded) => {
          const newSet = new Set(expandedSections);
          if (expanded) newSet.add('courses');
          else newSet.delete('courses');
          setExpandedSections(newSet);
        }}
        onExpandRequest={() => handleExpandSection('courses')}
      />
      
      <Awards 
        isExpanded={expandedSections.has('awards')}
        onExpandedChange={(expanded) => {
          const newSet = new Set(expandedSections);
          if (expanded) newSet.add('awards');
          else newSet.delete('awards');
          setExpandedSections(newSet);
        }}
        onExpandRequest={() => handleExpandSection('awards')}
      />
      
      <Volunteering 
        isExpanded={expandedSections.has('volunteering')}
        onExpandedChange={(expanded) => {
          const newSet = new Set(expandedSections);
          if (expanded) newSet.add('volunteering');
          else newSet.delete('volunteering');
          setExpandedSections(newSet);
        }}
        onExpandRequest={() => handleExpandSection('volunteering')}
      />
      
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
