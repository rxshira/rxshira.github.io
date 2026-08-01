import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import HeroPhoto from './HeroPhoto';

const Hero = () => {
  const data = useData();
  const navigate = useNavigate();

  const name = data?.settings?.name || 'Shira Rubin';
  const h1 = data?.settings?.headline1 || 'Computer Science @ Carnegie Mellon University';
  const h2 = data?.settings?.headline2 || 'Programming Languages · Space · People';
  const heroImage = data?.settings?.heroImage || '/images/hero.jpg';

  const navLinks: { id?: string; to?: string; label: string }[] = [
    { to: '/about', label: 'About Me' },
    { id: 'work', label: 'Experience' },
    { id: 'research', label: 'Research' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Involvement' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (link: { id?: string; to?: string }) => {
    if (link.to) {
      navigate(link.to);
    } else if (link.id) {
      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative pt-10 pb-4">
      <div className="container mx-auto px-6 relative z-10 w-full">
        <motion.div
          className="hero space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-2">
            <div className="flex flex-col items-center md:items-start gap-4">
              <h1
                className="text-clamp-lg font-bold tracking-tighter bg-gradient-to-br from-white from-30% to-pink bg-clip-text text-transparent leading-tight pb-2 text-center md:text-left"
                style={{
                  fontSize: 'clamp(56px, 10vw, 92px)',
                  fontFamily: '"Space Grotesk", sans-serif',
                  textShadow: '0 10px 40px rgba(var(--pink-rgb) / 0.2)',
                }}
              >
                {name}
              </h1>

              <div className="space-y-3 max-w-xl text-center md:text-left">
                <p className="text-xl md:text-2xl text-white font-medium">{h1}</p>
                <p className="text-base md:text-lg text-text-gray tracking-wide">{h2}</p>
              </div>
            </div>

            <div className="relative md:top-6">
              <HeroPhoto image={heroImage} alt={name} />
            </div>

            <nav className="hero-nav" aria-label="Section navigation">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="hero-nav-link"
                  onClick={() => handleNav(link)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
