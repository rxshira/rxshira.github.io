import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import ItemSection from './components/ItemSection';
import About from './components/About';
import Footer from './components/Footer';
import TwinklingStars from './components/TwinklingStars';
import MeteorShower from './components/MeteorShower';
import MeteorCursor from './components/MeteorCursor';
import Expandable from './components/Expandable';
import AllProjects from './components/AllProjects';
import Login from './pages/Login';
import Admin from './pages/Admin';
import CarpoolApp from './carpool/CarpoolApp';
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

const VolunteeringCard = ({ item }: { item: any }) => {
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
        <p className="text-pink font-semibold">{item.organization}</p>
        <p className="text-xs text-text-gray mt-1 italic">{item.timeline}</p>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/10 space-y-4">
                <p className="text-text-gray leading-relaxed">{item.description}</p>
                {item.achievements && item.achievements.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-white text-xs font-bold uppercase tracking-wider">Key Impact:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-text-gray/80">
                      {item.achievements.map((a: string, i: number) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-pink hover:opacity-80 transition-opacity text-sm font-semibold inline-block"
                  >
                    Visit →
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlowWrapper>
  );
};

const AwardCard = ({ item }: { item: any }) => {
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
        <p className="text-pink font-semibold">{item.date}</p>

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

// Distribute items round-robin into `n` columns so an expanding card pushes the
// cards below it in its own column instead of stretching its row neighbour.
const splitColumns = (arr: any[], n: number) => {
  const cols: any[][] = Array.from({ length: n }, () => []);
  arr.forEach((item, i) => cols[i % n].push(item));
  return cols;
};

const CardColumns = ({ items, render }: { items: any[]; render: (item: any) => JSX.Element }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
    {splitColumns(items, 2).map((col, ci) => (
      <div key={ci} className="flex flex-col gap-4">
        {col.map(render)}
      </div>
    ))}
  </div>
);

const Home = () => {
  const data = useData();
  
  if (!data) {
    console.error("Home: Data context is null!");
    return <div className="p-20 text-white text-center">Loading data...</div>;
  }

  const { projects, work, research, courses, awards, volunteering, teaching } = data;

  return (
    <div className="space-y-2">
      <Hero />

      <main className="container mx-auto px-6 space-y-12 pb-12">
        <ItemSection id="work" title="Experience" items={work} />
        <ItemSection id="research" title="Research" items={research} seeAllLink="/research" maxVisible={3} />
        <ItemSection id="projects" title="Projects" items={projects} seeAllLink="/projects" maxVisible={3} />

        <section id="experience" className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-pink tracking-tight">Involvement &amp; Honors</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <Expandable title="Academic Experience">
              <div className="space-y-10 py-4">
                <div>
                  <h4 className="text-pink text-xl font-bold mb-6">Teaching</h4>
                  <CardColumns items={teaching || []} render={(item) => <TeachingCard key={item.id} item={item} />} />
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
              <div className="py-4">
                <CardColumns items={volunteering || []} render={(vol) => <VolunteeringCard key={vol.id} item={vol} />} />
              </div>
            </Expandable>

            <Expandable title="Honors & Awards">
              <div className="py-4">
                <CardColumns items={awards || []} render={(award) => <AwardCard key={award.id || award.title} item={award} />} />
              </div>
            </Expandable>
          </div>
        </section>
      </main>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isCarpool = location.pathname.startsWith('/carpool');

  // Hard isolation for carpool routes to prevent DOM conflicts with main site effects
  if (isCarpool) {
    return (
      <div className="carpool-isolated-root bg-black min-h-screen text-white antialiased">
        <Routes>
          <Route path="/carpool/*" element={<CarpoolApp />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-white font-body antialiased relative overflow-x-hidden">
      <TwinklingStars />
      <MeteorShower />
      <MeteorCursor />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/research" element={<AllProjects category="research" />} />
        <Route path="/work" element={<AllProjects category="work" />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/carpool/*" element={<CarpoolApp />} />
      </Routes>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
