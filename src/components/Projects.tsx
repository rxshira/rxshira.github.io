import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Github, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import GlowWrapper from './GlowWrapper';
import { Link } from 'react-router-dom';

const Projects = () => {
  const data = useData();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Filter only projects marked as featured in Admin
  const featuredProjects = useMemo(() => {
    if (!data || !data.projects) return [];
    const featured = data.projects.filter(p => p.featured);
    // If none marked, fallback to first 3
    return featured.length > 0 ? featured : data.projects.slice(0, 3);
  }, [data]);

  const toggleExpand = (id: string) => {
    const newIds = new Set(expandedIds);
    if (newIds.has(id)) {
      newIds.delete(id);
    } else {
      newIds.add(id);
    }
    setExpandedIds(newIds);
  };

  const columns = useMemo(() => {
    const cols: any[][] = [[], [], []];
    featuredProjects.forEach((project, index) => {
      cols[index % 3].push(project);
    });
    return cols;
  }, [featuredProjects]);

  if (!data || !data.projects || data.projects.length === 0) {
    return null;
  }

  return (
    <section id="projects">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-pink tracking-tight">Featured Work</h2>
        <Link 
          to="/projects" 
          className="text-pink hover:opacity-80 transition-all font-bold text-sm md:text-base border-b-2 border-pink/30 hover:border-pink pb-1"
        >
          See all projects →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-10">
            {column.map((project) => (
              <GlowWrapper key={project.id} className="card flex flex-col cursor-pointer" >
                <div className="h-full flex flex-col">
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
                              className="w-full border border-white/10 shadow-lg object-cover"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
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
                              </a>
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
                    {project.techStack && project.techStack.map((tech: string) => (
                      <span key={tech} className="tag text-xs py-1.5 px-3">{tech}</span>
                    ))}
                  </div>
                </div>
              </GlowWrapper>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
