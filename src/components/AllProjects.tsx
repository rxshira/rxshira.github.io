import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Github, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import GlowWrapper from './GlowWrapper';
import { Link } from 'react-router-dom';

const AllProjects = () => {
  const { projects } = useData();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.techStack.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter(p => 
      selectedTags.every(tag => p.techStack.includes(tag))
    );
  }, [selectedTags, projects]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleExpand = (id: string) => {
    const newIds = new Set(expandedIds);
    if (newIds.has(id)) {
      newIds.delete(id);
    } else {
      newIds.add(id);
    }
    setExpandedIds(newIds);
  };

  // Group filtered projects into 3 stable columns
  const columns = useMemo(() => {
    const cols: any[][] = [[], [], []];
    filteredProjects.forEach((project, index) => {
      cols[index % 3].push(project);
    });
    return cols;
  }, [filteredProjects]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <Link to="/" className="text-pink hover:opacity-80 transition-colors text-base font-bold flex items-center gap-2">
              <span className="text-2xl">←</span> Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">All Projects</h1>
          </div>
          
          <div className="flex flex-wrap gap-3 max-w-2xl justify-end">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={selectedTags.includes(tag) ? { 
                  boxShadow: '0 0 20px rgba(var(--pink-rgb) / 0.5)',
                  backgroundColor: 'var(--pink)',
                  borderColor: 'var(--pink)'
                } : {}}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  selectedTags.includes(tag) ? 'text-white' : 'border-white/10 text-text-gray hover:border-pink/50 hover:text-pink'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-4 py-2 rounded-full text-xs font-bold border-2 border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-10">
              {column.map((project) => (
                <GlowWrapper key={project.id} className="card flex flex-col cursor-pointer">
                  <div className="h-full flex flex-col">
                    {/* Clickable Header Area */}
                    <div 
                      onClick={() => toggleExpand(project.id)} 
                      className="group/header"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-pink transition-colors">
                          {project.title}
                        </h3>
                        {expandedIds.has(project.id) ? (
                          <ChevronUp className="text-pink w-6 h-6 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="text-text-gray group-hover/header:text-white w-6 h-6 transition-colors flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-text-gray text-base mb-6 leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    <AnimatePresence>
                      {expandedIds.has(project.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mb-6"
                        >
                          <div className="pt-6 border-t border-white/10 space-y-6 cursor-default" onClick={(e) => e.stopPropagation()}>
                            <p className="text-base md:text-lg text-text-gray leading-relaxed">
                              {project.description}
                            </p>
                            
                            {project.role && (
                              <p className="text-sm font-bold text-white uppercase tracking-wider">
                                Role: {project.role}
                              </p>
                            )}

                            {project.collaborator && (
                              <p className="text-sm italic text-text-gray/80">
                                {project.collaborator}
                              </p>
                            )}

                            {project.achievement && (
                              <p className="text-base font-bold text-pink">
                                Achievement: {project.achievement}
                              </p>
                            )}

                            {project.imagePath && (
                              <img 
                                src={project.imagePath.startsWith('http') ? project.imagePath : `/images/${project.imagePath}`} 
                                alt={project.title}
                                className="w-full border border-white/10 shadow-lg"
                              />
                            )}
                            
                            {project.id === 'asteria1' && project.stats && (
                              <div className="bg-white/5 p-6 rounded-none text-sm space-y-2 text-text-gray border border-white/5">
                                <p><span className="text-pink font-semibold">Max Altitude:</span> {project.stats.maxAltitude.ft}ft</p>
                                <p><span className="text-pink font-semibold">Max Velocity:</span> {project.stats.maxVelocity.mph} mph</p>
                                <p><span className="text-pink font-semibold">Max G forces:</span> {project.stats.maxG} Gs</p>
                              </div>
                            )}

                            <div className="flex gap-6">
                              {project.links?.github && (
                                <a 
                                  href={project.links.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-pink hover:opacity-80 transition-colors inline-flex items-center gap-2 text-base font-semibold"
                                >
                                  <Github className="w-5 h-5" /> GitHub
                                </a >
                              )}
                              {project.links?.video && (
                                <a 
                                  href={project.links.video} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-pink hover:opacity-80 transition-colors inline-flex items-center gap-2 text-base font-semibold"
                                >
                                  <Play className="w-5 h-5" /> Video
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-3 mt-auto pt-4 cursor-default" onClick={(e) => e.stopPropagation()}>
                      {project.techStack.map((tech: string) => (
                        <span 
                          key={tech} 
                          style={selectedTags.includes(tech) ? { 
                            boxShadow: '0 0 10px rgba(var(--pink-rgb) / 0.4)',
                            backgroundColor: 'var(--pink)',
                            borderColor: 'var(--pink)',
                            color: 'white'
                          } : {}}
                          className={`tag text-xs py-1.5 px-3 transition-colors`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowWrapper>
              ))}
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-32">
            <p className="text-2xl text-text-gray italic">No projects found with all of those tags.</p>
            <button onClick={() => setSelectedTags([])} className="text-pink text-xl font-bold mt-8 underline hover:opacity-80 transition-colors">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
