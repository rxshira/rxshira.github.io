import { motion } from 'framer-motion';
import { Github, Play } from 'lucide-react';
import { projects } from '../data/projects';

const Projects = () => {
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

  const renderProject = (project: typeof projects[0], index: number) => {
    const bgColor = getColorHex(project.bgColor);
    const textColor = getTextColor(project.bgColor);
    const isEven = index % 2 === 0;

    // Asteria 1 has special layout
    if (project.id === 'asteria1') {
  return (
        <section key={project.id} className="relative py-20 px-6" style={{ backgroundColor: bgColor }}>
          <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="/images/rocketcollage.png"
                  alt="Asteria 1 Rocket Collage"
                  className="w-full rounded-2xl shadow-xl object-cover"
                />
              </motion.div>
              
              <div className="space-y-6">
                <motion.h2 
                  className="text-6xl md:text-7xl font-black relative inline-block"
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {project.title}
                  <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                    <path d="M0,10 Q100,0 200,10 T400,10" stroke={textColor} strokeWidth="6" fill="none" strokeLinecap="round"/>
                  </svg>
                </motion.h2>
                
                <motion.p 
                  className="text-2xl font-bold"
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {project.subtitle}
                </motion.p>
                
                <motion.p 
                  className="text-xl italic opacity-80"
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {project.timeline}
                </motion.p>

                  {project.stats && (
                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-lg space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-black" style={{ color: '#E84A3F' }}>
                      Some Stats...
                    </h3>
                    
                    <div className="space-y-2 text-lg">
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Max Altitude:</span> {project.stats.maxAltitude.ft}ft [or] {project.stats.maxAltitude.m}m</p>
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Max Velocity:</span> {project.stats.maxVelocity.mph} mph [or] {project.stats.maxVelocity.mps} m/s</p>
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Max G forces:</span> {project.stats.maxG} Gs</p>
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Motor Used:</span> {project.stats.motor}</p>
                    </div>
                  </motion.div>
                  )}

                  {project.certification && (
                  <motion.div 
                    className="bg-green-100 border-2 border-green-600 rounded-xl p-4 inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="font-bold text-green-800">🚀 {project.certification}</p>
                  </motion.div>
                )}
                
                {project.links?.video && (
                  <motion.a 
                    href={project.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform"
                    style={{ backgroundColor: '#E84A3F' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Play className="w-5 h-5" />
                    Watch Video
                  </motion.a>
                )}
              </div>
            </div>
                    </div>
        </section>
      );
    }

    // Standard layout for other projects - full width sections
    return (
      <section key={project.id} className="relative py-20 px-6" style={{ backgroundColor: bgColor }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {isEven ? (
              <>
                <div className="space-y-6">
                  <motion.h2 
                    className="text-5xl md:text-6xl font-black relative inline-block"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {project.title}
                    <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                      <path d="M0,10 Q100,0 200,10 T400,10" stroke={textColor} strokeWidth="6" fill="none" strokeLinecap="round"/>
                    </svg>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-xl font-bold"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {project.subtitle}
                  </motion.p>
                  
                  {(project.collaborator || project.role) && (
                    <motion.p 
                      className="text-lg opacity-90"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      {project.collaborator || project.role} • {project.timeline}
                    </motion.p>
                  )}
                  
                  {!project.collaborator && !project.role && (
                    <motion.p 
                      className="text-lg italic opacity-80"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      {project.timeline}
                    </motion.p>
                  )}
                  
                  <motion.p 
                    className="text-lg leading-relaxed"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>

                  {project.impact && (
                    <motion.p 
                      className="text-lg italic"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {project.impact}
                    </motion.p>
                  )}

                  {project.achievement && (
                    <motion.p 
                      className="text-lg font-bold"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {project.achievement}
                    </motion.p>
                  )}
                  
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full font-bold text-sm"
                        style={{ 
                          backgroundColor: project.bgColor === 'magenta' ? 'rgba(255,255,255,0.2)' : project.bgColor === 'orange' ? 'rgba(255,255,255,0.2)' : '#C2185B',
                          color: project.bgColor === 'magenta' || project.bgColor === 'orange' ? 'white' : 'white'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform"
                        style={{ backgroundColor: project.bgColor === 'magenta' ? 'white' : '#E84A3F', color: project.bgColor === 'magenta' ? '#D81B60' : 'white' }}
                      >
                        <Github className="w-5 h-5" />
                        View on GitHub
                      </a>
                    )}
                  </motion.div>
                </div>
                
                <div></div>
              </>
            ) : (
              <>
                <div></div>
                
                <div className="space-y-6">
                  <motion.h2 
                    className="text-5xl md:text-6xl font-black relative inline-block"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {project.title}
                    <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                      <path d="M0,10 Q100,0 200,10 T400,10" stroke={textColor} strokeWidth="6" fill="none" strokeLinecap="round"/>
                    </svg>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-xl font-bold"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {project.subtitle}
                  </motion.p>
                  
                  {(project.collaborator || project.role) && (
                    <motion.p 
                      className="text-lg opacity-90"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      {project.collaborator || project.role} • {project.timeline}
                    </motion.p>
                  )}
                  
                  {!project.collaborator && !project.role && (
                    <motion.p 
                      className="text-lg italic opacity-80"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      {project.timeline}
                    </motion.p>
                  )}
                  
                  <motion.p 
                    className="text-lg leading-relaxed"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {project.impact && (
                    <motion.p 
                      className="text-lg italic"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {project.impact}
                    </motion.p>
                  )}
                  
                  {project.achievement && (
                    <motion.p 
                      className="text-lg font-bold"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {project.achievement}
                    </motion.p>
                  )}
                  
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-bold"
                        style={{ color: textColor }}
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {project.links?.github && (
                      <a 
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pink-600 rounded-full font-bold hover:scale-105 transition-transform"
                      >
                        <Github className="w-5 h-5" />
                        View on GitHub
                      </a>
                    )}
                </motion.div>
                </div>
              </>
            )}
              </div>
            </div>
          </section>
        );
  };

  return (
    <>
      {projects.map((project, index) => renderProject(project, index))}
    </>
  );
};

export default Projects;
