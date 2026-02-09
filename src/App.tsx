import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import TwinklingStars from './components/TwinklingStars';
import MeteorShower from './components/MeteorShower';
import MeteorCursor from './components/MeteorCursor';
import Expandable from './components/Expandable';
import AllProjects from './components/AllProjects';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { useData } from './context/DataContext';
import GlowWrapper from './components/GlowWrapper';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MusicSection = () => {
  const data = useData();
  if (!data || !data.settings) return null;
  
  return (
    <section id="music" className="container mx-auto px-6 py-12 border-t border-white/5 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <div className="md:w-1/3 text-center md:text-left">
          <p className="text-lg md:text-xl text-pink leading-relaxed font-medium">
            I really like music... <br className="hidden md:block" />here is my current playlist.
          </p>
        </div>
        <div className="w-full md:w-2/3">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src={data.settings.spotifyLink}
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TeachingCard = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!item) return null;
  return (
    <GlowWrapper className="bg-white/5 border border-white/10 rounded-none overflow-hidden">
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold text-white leading-tight">{item.title}</h4>
          {isOpen ? <ChevronUp className="text-pink flex-shrink-0 ml-2" /> : <ChevronDown className="text-text-gray flex-shrink-0 ml-2" />}
        </div>
        <p className="text-pink font-semibold">{item.role} • {item.organization}</p>
        <p className="text-xs text-text-gray mt-1 italic">{item.timeline}</p>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="pt-4 mt-4 border-t border-white/10 text-text-gray leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlowWrapper>
  );
};

const Home = () => {
  const data = useData();
  
  if (!data) {
    console.error("Home: Data context is null!");
    return <div className="p-20 text-white text-center">Loading data...</div>;
  }

  const { courses, awards, volunteering, teaching } = data;

  return (
    <div className="space-y-12">
      <Hero />
      
      <main className="container mx-auto px-6 space-y-24 pb-12">
        <Projects />

        <section id="experience" className="space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-pink tracking-tight">Experience & Awards</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <Expandable title="Academic Experience">
              <div className="space-y-10 py-4">
                <div>
                  <h4 className="text-pink text-xl font-bold mb-6">Teaching</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teaching && teaching.map(item => (
                      <TeachingCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-pink text-xl font-bold mb-4">Selected Coursework</h4>
                  <div className="flex flex-wrap gap-3">
                    {courses && courses.map(course => (
                      <span key={course.code} className="tag text-xs py-2 px-4">
                        {course.code}: {course.name} {course.code === '16-865' && '[GRADUATE]'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Expandable>

            <Expandable title="Service & Leadership">
              <div className="space-y-10 py-4">
                {volunteering && volunteering.map(vol => (
                  <div key={vol.id} className="border-b border-white/5 pb-8 last:border-0 last:pb-0">
                    <h4 className="text-pink text-2xl font-bold mb-2">{vol.title}</h4>
                    <p className="text-pink text-base font-semibold mb-4">{vol.organization} • {vol.timeline}</p>
                    <p className="text-base md:text-lg mb-6 leading-relaxed text-text-gray">
                      {vol.description}
                    </p>
                    {vol.achievements && vol.achievements.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-white text-sm font-bold uppercase tracking-wider">Key Impact:</p>
                        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-gray/80">
                          {vol.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Expandable>

            <Expandable title="Awards & Recognition">
              <div className="space-y-10 py-4">
                {awards && awards.map((award, i) => (
                  <div key={i} className="border-b border-white/5 pb-8 last:border-0 last:pb-0">
                    <h4 className="text-pink text-2xl font-bold mb-2">{award.title}</h4>
                    <p className="text-pink text-base font-semibold mb-3">{award.date}</p>
                    <p className="text-base md:text-lg text-text-gray leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                ))}
              </div>
            </Expandable>
          </div>
        </section>

        <MusicSection />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-bg text-white font-body antialiased relative overflow-x-hidden">
        <TwinklingStars />
        <MeteorShower />
        <MeteorCursor />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
