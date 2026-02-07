import { useData } from '../context/DataContext';
import { Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const data = useData();
  
  if (!data || !data.settings) {
    return <footer className="p-10 text-center text-text-gray">© 2026 Shira Rubin</footer>;
  }

  const { settings } = data;

  return (
    <footer className="container mx-auto px-6 py-20 text-center border-t border-white/10 mt-20 relative">
      <p className="text-text-gray text-sm mb-6">
        © 2026 Shira Rubin • Built with React, TypeScript, and lots of type safety
      </p>
      
      <div className="flex flex-col items-center gap-6">
        <div className="flex justify-center gap-8">
          <a 
            href={settings.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-gray hover:text-pink transition-colors flex items-center gap-2 font-bold text-sm"
          >
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a 
            href={settings.xcom}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-gray hover:text-pink transition-colors flex items-center gap-2 font-bold text-sm"
          >
            <Twitter className="w-5 h-5" /> X.com
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {settings.emails && settings.emails.map((email, idx) => (
            <a 
              key={idx}
              href={`mailto:${email}`} 
              className="text-pink hover:text-hot-pink transition-colors text-sm font-semibold"
            >
              {email}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] text-text-gray/60 uppercase tracking-[0.2em]">
          Last Updated: {settings.lastUpdated}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
