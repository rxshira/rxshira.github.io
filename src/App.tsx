import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WavyDivider from './components/WavyDivider';
import CurrentFocus from './components/CurrentFocus';
import Research from './components/Research';
import Projects from './components/Projects';
import FutureProjects from './components/FutureProjects';
import Volunteering from './components/Volunteering';
import About from './components/About';
import Awards from './components/Awards';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import { initTheme } from './utils/theme';

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WavyDivider color="#FFD93D" />
      <CurrentFocus />
      <WavyDivider color="#C2185B" flip />
      <Research />
      <WavyDivider color="#F5F5F0" />
      <Projects />
      <WavyDivider color="#FFD93D" />
      <FutureProjects />
      <WavyDivider color="#FF8C42" flip />
      <Volunteering />
      <WavyDivider color="#C2185B" />
      <About />
      <WavyDivider color="#FFD93D" />
      <Awards />
      <WavyDivider color="#F5F5F0" />
      <Footer />
      <MusicPlayer />
    </div>
  );
}

export default App;

