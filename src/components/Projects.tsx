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

  const renderProjectCard = (project: typeof projects[0]) => {
    const bgColor = getColorHex(project.bgColor);
    const textColor = getTextColor(project.bgColor);

    return (
      <div className="space-y-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-black relative inline-block"
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
          className="text-lg font-bold"
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
            className="text-base opacity-90"
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
            className="text-base italic opacity-80"
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
          className="text-base leading-relaxed"
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
            className="text-base italic"
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
            className="text-base font-bold"
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
              className="px-3 py-1 rounded-full font-bold text-xs"
              style={{ 
                backgroundColor: project.bgColor === 'magenta' ? 'rgba(255,255,255,0.2)' : project.bgColor === 'orange' ? 'rgba(255,255,255,0.2)' : '#C2185B',
                color: project.bgColor === 'magenta' || project.bgColor === 'orange' ? 'white' : 'white'
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
        
        {project.links?.github && (
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a 
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white hover:scale-105 transition-transform text-sm"
              style={{ backgroundColor: project.bgColor === 'magenta' ? 'white' : '#E84A3F', color: project.bgColor === 'magenta' ? '#D81B60' : 'white' }}
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </motion.div>
        )}
      </div>
    );
  };

  // Get specific projects
  const specml = projects.find(p => p.id === 'specml');
  const robograder = projects.find(p => p.id === 'robograder');
  const asteria = projects.find(p => p.id === 'asteria1');
  const ligo = projects.find(p => p.id === 'ligo');

  return (
    <>
      {/* SpecML and RoboGrader side by side */}
      <section className="relative py-20 px-0">
        <div className="flex flex-col md:flex-row">
          {specml && (
            <motion.div 
              style={{ backgroundColor: getColorHex(specml.bgColor) }} 
              className="flex-1 p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {renderProjectCard(specml)}
            </motion.div>
          )}

          {robograder && (
            <motion.div 
              style={{ backgroundColor: getColorHex(robograder.bgColor) }} 
              className="flex-1 p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {renderProjectCard(robograder)}
            </motion.div>
          )}
        </div>
      </section>

      {/* Asteria 1 - Full width with rocket collage */}
      {asteria && (
        <section className="relative py-20 px-6" style={{ backgroundColor: getColorHex(asteria.bgColor) }}>
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
                  style={{ color: getTextColor(asteria.bgColor) }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {asteria.title}
                  <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                    <path d="M0,10 Q100,0 200,10 T400,10" stroke={getTextColor(asteria.bgColor)} strokeWidth="6" fill="none" strokeLinecap="round"/>
                  </svg>
                </motion.h2>
                
                <motion.p 
                  className="text-2xl font-bold"
                  style={{ color: getTextColor(asteria.bgColor) }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {asteria.subtitle}
                </motion.p>
                
                <motion.p 
                  className="text-xl italic opacity-80"
                  style={{ color: getTextColor(asteria.bgColor) }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {asteria.timeline}
                </motion.p>
                
                {asteria.stats && (
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
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Max Altitude:</span> {asteria.stats.maxAltitude.ft}ft [or] {asteria.stats.maxAltitude.m}m</p>
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Max Velocity:</span> {asteria.stats.maxVelocity.mph} mph [or] {asteria.stats.maxVelocity.mps} m/s</p>
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Max G forces:</span> {asteria.stats.maxG} Gs</p>
                      <p><span className="font-bold" style={{ color: '#C2185B' }}>Motor Used:</span> {asteria.stats.motor}</p>
                    </div>
                  </motion.div>
                )}
                
                {asteria.certification && (
                  <motion.div 
                    className="bg-green-100 border-2 border-green-600 rounded-xl p-4 inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="font-bold text-green-800">🚀 {asteria.certification}</p>
                  </motion.div>
                )}
                
                {asteria.links?.video && (
                  <motion.a 
                    href={asteria.links.video}
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
      )}

      {/* LIGO - Full width */}
      {ligo && (
        <section className="relative py-20 px-6" style={{ backgroundColor: getColorHex(ligo.bgColor) }}>
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                className="text-5xl md:text-6xl font-black relative inline-block mb-6"
                style={{ color: getTextColor(ligo.bgColor) }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {ligo.title}
                <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
                  <path d="M0,10 Q100,0 200,10 T400,10" stroke={getTextColor(ligo.bgColor)} strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
              </motion.h2>
              
              <motion.p 
                className="text-xl font-bold mb-4"
                style={{ color: getTextColor(ligo.bgColor) }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {ligo.subtitle}
              </motion.p>
              
              <motion.p 
                className="text-lg opacity-90 mb-6"
                style={{ color: getTextColor(ligo.bgColor) }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {ligo.role} • {ligo.timeline}
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed mb-6"
                style={{ color: getTextColor(ligo.bgColor) }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {ligo.description}
              </motion.p>
              
              {ligo.achievement && (
                <motion.p 
                  className="text-lg font-bold mb-6"
                  style={{ color: getTextColor(ligo.bgColor) }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {ligo.achievement}
                </motion.p>
              )}
              
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {ligo.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 rounded-full font-bold text-sm"
                    style={{ 
                      backgroundColor: '#C2185B',
                      color: 'white'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Projects;
