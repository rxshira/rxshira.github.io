import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, X, ExternalLink } from 'lucide-react';
import { volunteering } from '../data/volunteering';

const Volunteering = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSectionExpanded, setIsSectionExpanded] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="volunteering" className="relative py-20 px-6" style={{ backgroundColor: '#FF8C42' }}>
      <div className="max-w-7xl mx-auto">
        <div 
          className="cursor-pointer mb-12"
          onClick={() => setIsSectionExpanded(!isSectionExpanded)}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center relative inline-block transition-all duration-300"
            style={{ 
              color: 'white',
              textShadow: '0 0 0px rgba(255, 255, 255, 0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = '0 0 0px rgba(255, 255, 255, 0)';
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Volunteering
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
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
                className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(194, 24, 91, 0.4), 0 0 40px rgba(194, 24, 91, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => toggleExpand(vol.id)}
                style={{ alignSelf: 'start' }}
              >
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
                        <Heart className="w-8 h-8 text-pink-600 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-black mb-1" style={{ color: '#E84A3F' }}>{vol.title}</h3>
                          <p className="text-lg font-bold mb-1" style={{ color: '#C2185B' }}>{vol.organization}</p>
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
                      className="p-6 space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Heart className="w-8 h-8 text-pink-600 flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="text-3xl font-black mb-1" style={{ color: '#E84A3F' }}>{vol.title}</h3>
                            <p className="text-xl font-bold mb-1" style={{ color: '#C2185B' }}>{vol.organization}</p>
                            <p className="text-sm opacity-70 italic text-gray-600">{vol.timeline}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>

                      <p className="text-base leading-relaxed text-gray-700">
                        {vol.description}
                      </p>

                      {vol.achievements && vol.achievements.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-lg font-black" style={{ color: '#E84A3F' }}>Key Achievements:</h4>
                          <ul className="space-y-1">
                            {vol.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start">
                                <span className="mr-2" style={{ color: '#C2185B' }}>•</span>
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(232, 74, 63, 0.6), 0 0 30px rgba(232, 74, 63, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '';
                          }}
                          style={{ backgroundColor: '#E84A3F' }}
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
