import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Play, X, Plus, Minus } from 'lucide-react';
import { projects } from '../data/projects';

interface ProjectsProps {
  onExpandedChange?: (expanded: boolean) => void;
  isExpanded?: boolean;
  onExpandRequest?: () => void;
}

const Projects = ({ onExpandedChange, isExpanded: externalExpanded, onExpandRequest }: ProjectsProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);
  
  useEffect(() => {
    if (externalExpanded !== undefined) {
      setIsSectionExpanded(externalExpanded);
      if (!externalExpanded) {
        setExpandedId(null); // Close all projects when section closes
      }
    }
  }, [externalExpanded]);
  
  const handleSectionToggle = () => {
    const newExpanded = !isSectionExpanded;
    setIsSectionExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
    if (!newExpanded) {
      setExpandedId(null); // Close all projects when section closes
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="relative py-20 px-6" style={{ backgroundColor: '#C2185B' }}>
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
              color: '#FFD93D',
              textShadow: isSectionExpanded ? '0 0 20px rgba(255, 217, 61, 0.5), 0 0 40px rgba(255, 217, 61, 0.3)' : '0 0 0px rgba(255, 217, 61, 0)'
            }}
            onMouseEnter={(e) => {
              if (!isSectionExpanded) {
                e.currentTarget.style.textShadow = '0 0 20px rgba(255, 217, 61, 0.5), 0 0 40px rgba(255, 217, 61, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSectionExpanded) {
                e.currentTarget.style.textShadow = '0 0 0px rgba(255, 217, 61, 0)';
              } else {
                e.currentTarget.style.textShadow = '0 0 20px rgba(255, 217, 61, 0.5), 0 0 40px rgba(255, 217, 61, 0.3)';
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Projects
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="#FFD93D" strokeWidth="6" fill="none" strokeLinecap="round"/>
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
        <div className="grid md:grid-cols-3 gap-6 items-start">
      {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;

        return (
              <motion.div
            key={project.id}
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleExpand(project.id)}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(194, 24, 91, 0.08)',
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
                    toggleExpand(project.id);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 absolute top-4 right-4 z-10"
                  style={{ color: 'white' }}
                >
                  {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
                <AnimatePresence mode="wait">
                  {!isExpanded ? (
                    // Collapsed state - title, subtitle, and tech tags
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 space-y-3"
                    >
                      <h3 className="text-2xl font-black mb-2" style={{ color: '#C2185B' }}>
                        {project.title}
                      </h3>
                      <p className="text-gray-700 font-bold">{project.subtitle}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full font-bold text-xs relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                              backdropFilter: 'blur(30px)',
                              WebkitBackdropFilter: 'blur(30px)',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                              color: '#C2185B'
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(194, 24, 91, 0.15)',
                                pointerEvents: 'none',
                              }}
                            />
                            <span className="relative z-10">{tech}</span>
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span
                            className="px-3 py-1 rounded-full font-bold text-xs text-gray-600"
                          >
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    // Expanded state - full details
                <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 space-y-4 relative z-10"
                    >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-3xl font-black mb-2" style={{ color: '#C2185B' }}>
                          {project.title}
                        </h3>
                        <p className="text-xl font-bold mb-2 text-gray-700">{project.subtitle}</p>
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

                    {(project.collaborator || project.role) && (
                      <p className="text-base text-gray-600">
                        {project.collaborator || project.role} • {project.timeline}
                      </p>
                    )}

                    {!project.collaborator && !project.role && (
                      <p className="text-base italic text-gray-600">
                    {project.timeline}
                    </p>
                  )}

                    <p className="text-base leading-relaxed text-gray-700">
                    {project.description}
                  </p>

                    {project.impact && (
                      <p className="text-base italic text-gray-700">
                        {project.impact}
                      </p>
                    )}

                    {project.achievement && (
                      <p className="text-base font-bold text-gray-800">
                        {project.achievement}
                      </p>
                    )}

                    {/* Special handling for Asteria stats */}
                    {project.id === 'asteria1' && project.stats && (
                      <div className="bg-gray-100 rounded-2xl p-4 space-y-2">
                        <h4 className="text-xl font-black" style={{ color: '#E84A3F' }}>Some Stats...</h4>
                        <div className="space-y-1 text-sm text-gray-700">
                          <p><span className="font-bold" style={{ color: '#C2185B' }}>Max Altitude:</span> {project.stats.maxAltitude.ft}ft [or] {project.stats.maxAltitude.m}m</p>
                          <p><span className="font-bold" style={{ color: '#C2185B' }}>Max Velocity:</span> {project.stats.maxVelocity.mph} mph [or] {project.stats.maxVelocity.mps} m/s</p>
                          <p><span className="font-bold" style={{ color: '#C2185B' }}>Max G forces:</span> {project.stats.maxG} Gs</p>
                          <p><span className="font-bold" style={{ color: '#C2185B' }}>Motor Used:</span> {project.stats.motor}</p>
                      </div>
                    </div>
                  )}

                  {project.certification && (
                      <div className="bg-green-100 border-2 border-green-600 rounded-xl p-3 inline-block">
                        <p className="font-bold text-green-800 text-sm">🚀 {project.certification}</p>
                    </div>
                  )}

                    {/* Image */}
                    {project.hasImage && project.imagePath && (
                      <div className="relative">
                        <img
                          src={`/images/${project.imagePath}`}
                          alt={project.title}
                          className="w-full rounded-2xl shadow-lg object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                    </div>
                  )}

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                      <span
                          key={tech}
                          className="px-3 py-1 rounded-full font-bold text-xs relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                            color: '#C2185B'
                          }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(194, 24, 91, 0.15)',
                            pointerEvents: 'none',
                          }}
                        />
                        <span className="relative z-10">{tech}</span>
                      </span>
                    ))}
                  </div>

                    {/* Links */}
                    <div className="flex gap-3 flex-wrap">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white hover:scale-105 transition-all duration-300 text-sm"
                          style={{ 
                            backgroundColor: project.bgColor === 'magenta' ? 'white' : '#E84A3F',
                            color: project.bgColor === 'magenta' ? '#D81B60' : 'white'
                          }}
                        >
                          <Github className="w-4 h-4" />
                          View on GitHub
                        </a>
                      )}
                      {project.links?.video && (
                        <a
                          href={project.links.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white hover:scale-105 transition-all duration-300 text-sm"
                          style={{ backgroundColor: '#E84A3F' }}
                        >
                          <Play className="w-4 h-4" />
                          Watch Video
                        </a>
                      )}
                  </div>
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

export default Projects;
