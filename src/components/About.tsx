import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import GlowWrapper from './GlowWrapper';
import HeroPhoto from './HeroPhoto';

// Minimal, dependency-free markdown → HTML for the About bio. Escapes HTML first,
// then applies a small subset: headings, bold, italic, links, and bullet lists.
const renderMarkdown = (md: string): string => {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-pink hover:opacity-80 underline">$1</a>');

  const lines = md.split('\n');
  let html = '';
  let inList = false;
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^###\s+/.test(line)) { closeList(); html += `<h3 class="text-xl font-bold text-white mt-6 mb-2">${inline(line.replace(/^###\s+/, ''))}</h3>`; }
    else if (/^##\s+/.test(line)) { closeList(); html += `<h2 class="text-2xl font-bold text-white mt-6 mb-3">${inline(line.replace(/^##\s+/, ''))}</h2>`; }
    else if (/^#\s+/.test(line)) { closeList(); html += `<h1 class="text-3xl font-bold text-white mt-6 mb-4">${inline(line.replace(/^#\s+/, ''))}</h1>`; }
    else if (/^[-*]\s+/.test(line)) { if (!inList) { html += '<ul class="list-disc list-inside space-y-1.5 my-3 text-text-gray">'; inList = true; } html += `<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`; }
    else if (line.trim() === '') { closeList(); }
    else { closeList(); html += `<p class="text-base text-text-gray leading-relaxed my-3">${inline(line)}</p>`; }
  }
  closeList();
  return html;
};

const navLinks: { id?: string; to?: string; label: string }[] = [
  { to: '/', label: 'Back to main page' },
  { id: 'work', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Involvement' },
  { id: 'contact', label: 'Contact' },
];

const About = () => {
  const data = useData();
  const navigate = useNavigate();
  const settings = data?.settings;
  const name = settings?.name || 'Shira Rubin';
  const md = settings?.aboutMarkdown || '';
  const aboutImage = settings?.aboutImage || settings?.heroImage || '';
  const links = settings?.aboutLinks || [];

  const handleNav = (link: { id?: string; to?: string }) => {
    navigate('/');
    if (link.id) {
      setTimeout(() => document.getElementById(link.id!)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    } else {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    }
  };

  return (
    <section className="relative pt-10 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left: title + text, tightly stacked */}
          <motion.div
            className="flex-1 max-w-2xl order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1
              className="font-bold tracking-tighter bg-gradient-to-br from-white from-30% to-pink bg-clip-text text-transparent leading-tight pb-2 mb-4"
              style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontFamily: '"Space Grotesk", sans-serif' }}
            >
              About Me
            </h1>

            {md.trim() && <div dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />}

            {settings?.spotifyLink && (
              <div className="mt-10 max-w-md">
                {settings.musicCaption?.trim() && (
                  <p className="text-base md:text-lg text-pink leading-relaxed font-medium mb-4">
                    {settings.musicCaption}
                  </p>
                )}
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <iframe
                    src={settings.spotifyLink}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>

                {links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                        <GlowWrapper className="card !p-3 !px-5 text-sm font-bold text-white hover:text-pink transition-colors">
                          {link.label}
                        </GlowWrapper>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Right: menu + bigger photo */}
          <div className="order-1 md:order-2 flex flex-col items-center md:items-end gap-8 flex-shrink-0">
            <nav className="hero-nav" aria-label="Section navigation">
              {navLinks.map((link) => (
                <button key={link.label} type="button" className="hero-nav-link" onClick={() => handleNav(link)}>
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="relative md:top-6">
              <HeroPhoto image={aboutImage} alt={name} width={260} height={350} variant="classic" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
