import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, X, ExternalLink, Plus, Minus } from 'lucide-react';
import { volunteering } from '../data/volunteering';

interface VolunteeringProps {
  onExpandedChange?: (expanded: boolean) => void;
  isExpanded?: boolean;
  onExpandRequest?: () => void;
}

const Volunteering = ({ onExpandedChange, isExpanded: externalExpanded, onExpandRequest }: VolunteeringProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);
  
  useEffect(() => {
    if (externalExpanded !== undefined) {
      setIsSectionExpanded(externalExpanded);
      if (!externalExpanded) {
        setExpandedId(null); // Close all items when section closes
      }
    }
  }, [externalExpanded]);
  
  const handleSectionToggle = () => {
    const newExpanded = !isSectionExpanded;
    setIsSectionExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
    if (!newExpanded) {
      setExpandedId(null); // Close all items when section closes
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="volunteering" className="relative py-20 px-6" style={{ backgroundColor: '#0A3323' }}>
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-12 flex items-center justify-center gap-4"
        >
          <button
            onClick={handleSectionToggle}
            className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            style={{ color: 'white' }}
          >
            {isSectionExpanded ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center relative inline-block transition-all duration-300 cursor-pointer"
            onClick={handleSectionToggle}
            style={{ 
              color: '#839958',
              textShadow: isSectionExpanded ? '0 0 20px rgba(131, 153, 88, 0.5), 0 0 40px rgba(131, 153, 88, 0.3)' : '0 0 0px rgba(131, 153, 88, 0)'
            }}
            onMouseEnter={(e) => {
              if (!isSectionExpanded) {
                e.currentTarget.style.textShadow = '0 0 20px rgba(131, 153, 88, 0.5), 0 0 40px rgba(131, 153, 88, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSectionExpanded) {
                e.currentTarget.style.textShadow = '0 0 0px rgba(131, 153, 88, 0)';
              } else {
                e.currentTarget.style.textShadow = '0 0 20px rgba(131, 153, 88, 0.5), 0 0 40px rgba(131, 153, 88, 0.3)';
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Volunteering
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="#839958" strokeWidth="6" fill="none" strokeLinecap="round"/>
            </svg>
          </motion.h2>
        </div>
        
        <AnimatePresence>
          {isSectionExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
        <div className="grid md:grid-cols-2 gap-6">
          {volunteering.map((vol, i) => {
            const isExpanded = expandedId === vol.id;

            return (
              <motion.div
                key={vol.id}
                className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 relative group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  alignSelf: 'start',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => toggleExpand(vol.id)}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(16, 86, 102, 0.08)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '25%',
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
                    pointerEvents: 'none',
                    borderBottomLeftRadius: '24px',
                    borderBottomRightRadius: '24px',
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(vol.id);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 absolute top-4 right-4 z-10"
                  style={{ color: 'white' }}
                >
                  {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
                <AnimatePresence mode="wait">
                  {!isExpanded ? (
                    // Collapsed state
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6"
                    >
                      <div className="flex items-start gap-4">
                        <Heart className="w-8 h-8 flex-shrink-0" style={{ color: '#D3968C' }} />
                        <div className="flex-1">
                          <h3 className="text-2xl font-black mb-1" style={{ color: '#0A3323' }}>{vol.title}</h3>
                          <p className="text-lg font-bold mb-1" style={{ color: '#0A3323' }}>{vol.organization}</p>
                          <p className="text-sm opacity-70 italic text-gray-600">{vol.timeline}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Expanded state
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 space-y-4 relative z-10"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Heart className="w-8 h-8 flex-shrink-0" style={{ color: '#D3968C' }} />
                          <div className="flex-1">
                            <h3 className="text-3xl font-black mb-1" style={{ color: '#0A3323' }}>{vol.title}</h3>
                            <p className="text-xl font-bold mb-1" style={{ color: '#0A3323' }}>{vol.organization}</p>
                            <p className="text-sm opacity-70 italic text-gray-600">{vol.timeline}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 absolute top-4 right-4"
                          style={{ color: 'white' }}
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-base leading-relaxed text-gray-700">
                        {vol.description}
                      </p>

                      {vol.achievements && vol.achievements.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-lg font-black" style={{ color: '#D3968C' }}>Key Achievements:</h4>
                          <ul className="space-y-1">
                            {vol.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start">
                                <span className="mr-2" style={{ color: '#0A3323' }}>•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {vol.link && (
                        <a
                          href={vol.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white hover:scale-105 transition-all duration-300 text-sm"
                          style={{ backgroundColor: '#D3968C' }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Volunteering;
