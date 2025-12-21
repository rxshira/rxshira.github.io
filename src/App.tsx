import Header from './components/Header';
import Hero from './components/Hero';
import CurrentFocus from './components/CurrentFocus';
import Research from './components/Research';
import Projects from './components/Projects';
import Footer from './components/Footer';
import GrainTexture from './components/GrainTexture';

function App() {
  return (
    <div className="min-h-screen bg-cream text-gray-900 transition-colors duration-300 relative overflow-x-hidden">
      <GrainTexture />
      
      <Header />
      
      <Hero />
      
      <CurrentFocus />
      
      <Research />
      
      <Projects />
      
      <Footer />
    </div>
  );
}

export default App;
