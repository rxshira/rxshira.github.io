import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Github, Play, X } from 'lucide-react';
import { projects } from '../data/projects';

const Projects = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getColorHex = (color: string) => {
    switch (color) {
      case 'yellow': return '#FFD93D';
      case 'magenta': return '#D81B60';
      case 'cream': return '#F5F5F0';
      case 'orange': return '#FF8C42';
      default: return '#F5F5F0';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'yellow': return '#C2185B';
      case 'magenta': return 'white';
      case 'cream': return '#FF8C42';
      case 'orange': return 'white';
      default: return '#FF8C42';
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="relative py-20 px-6" style={{ backgroundColor: '#C2185B' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-black mb-12 text-center"
          style={{ color: '#FFD93D' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            const bgColor = getColorHex(project.bgColor);
            const textColor = getTextColor(project.bgColor);

            return (
              <motion.div
                key={project.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleExpand(project.id)}
                animate={{
                  backgroundColor: isExpanded ? bgColor : 'white',
                  color: isExpanded ? textColor : '#1A1A1A'
                }}
                style={{ alignSelf: 'start' }}
              >
                <AnimatePresence mode="wait">
                  {!isExpanded ? (
                    // Collapsed state - just title and subtitle
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6"
                    >
                      <h3 className="text-2xl font-black mb-2" style={{ color: '#E84A3F' }}>
                        {project.title}
                      </h3>
                      <p className="text-gray-700 font-bold">{project.subtitle}</p>
                    </motion.div>
                  ) : (
                    // Expanded state - full details
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 space-y-4"
                    >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-3xl font-black mb-2">
                          {project.title}
                        </h3>
                        <p className="text-xl font-bold mb-2">{project.subtitle}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(null);
                        }}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {(project.collaborator || project.role) && (
                      <p className="text-base opacity-90">
                        {project.collaborator || project.role} • {project.timeline}
                      </p>
                    )}

                    {!project.collaborator && !project.role && (
                      <p className="text-base italic opacity-80">
                        {project.timeline}
                      </p>
                    )}

                    <p className="text-base leading-relaxed">
                      {project.description}
                    </p>

                    {project.impact && (
                      <p className="text-base italic">
                        {project.impact}
                      </p>
                    )}

                    {project.achievement && (
                      <p className="text-base font-bold">
                        {project.achievement}
                      </p>
                    )}

                    {/* Special handling for Asteria stats */}
                    {project.id === 'asteria1' && project.stats && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 space-y-2">
                        <h4 className="text-xl font-black">Some Stats...</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-bold">Max Altitude:</span> {project.stats.maxAltitude.ft}ft [or] {project.stats.maxAltitude.m}m</p>
                          <p><span className="font-bold">Max Velocity:</span> {project.stats.maxVelocity.mph} mph [or] {project.stats.maxVelocity.mps} m/s</p>
                          <p><span className="font-bold">Max G forces:</span> {project.stats.maxG} Gs</p>
                          <p><span className="font-bold">Motor Used:</span> {project.stats.motor}</p>
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
                          className="px-3 py-1 rounded-full font-bold text-xs"
                          style={{
                            backgroundColor: project.bgColor === 'magenta' || project.bgColor === 'orange' 
                              ? 'rgba(255,255,255,0.2)' 
                              : '#C2185B',
                            color: 'white'
                          }}
                        >
                          {tech}
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
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white hover:scale-105 transition-transform text-sm"
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
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white hover:scale-105 transition-transform text-sm"
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
      </div>
    </section>
  );
};

export default Projects;
