import { motion } from 'framer-motion';
import { Github, Play } from 'lucide-react';
import { projects } from '../data/projects';
import BlobFrame from './BlobFrame';

const Projects = () => {
  const getBgClass = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-yellow';
      case 'magenta': return 'bg-magenta';
      case 'cream': return 'bg-cream';
      case 'orange': return 'bg-orange';
      default: return 'bg-cream';
    }
  };

  const getTextClass = (color: string) => {
    switch (color) {
      case 'magenta': return 'text-magenta';
      case 'orange': return 'text-orange';
      case 'white': return 'text-white';
      case 'black': return 'text-black';
      default: return 'text-black';
    }
  };

  const getColorHex = (color: string) => {
    switch (color) {
      case 'yellow': return '#FFD93D';
      case 'magenta': return '#D81B60';
      case 'cream': return '#F5F5F0';
      case 'orange': return '#FF8C42';
      default: return '#F5F5F0';
    }
  };

  const getStatsBgClass = (bgColor: string) => {
    return bgColor === 'yellow' ? 'bg-white' : 'bg-white/20';
  };

  const getCertBgClass = (bgColor: string) => {
    return bgColor === 'yellow' ? 'bg-magenta' : 'bg-yellow';
  };

  const getTechBgClass = (bgColor: string) => {
    return bgColor === 'magenta' ? 'bg-white/20' : 'bg-black/10';
  };

  const getAchievementBgClass = (bgColor: string) => {
    return bgColor === 'cream' ? 'bg-yellow' : 'bg-white/20';
  };

  // Wavy divider SVG path for card top edge
  const wavePath = "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,256L1392,256C1344,256,1248,256,1152,256C1056,256,960,256,864,256C768,256,672,256,576,256C480,256,384,256,288,256C192,256,96,256,48,256L0,256Z";

  return (
    <section className="bg-cream grain-overlay py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-black text-magenta mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="masonry-grid">
          {projects.map((project, index) => {
            const bgClass = getBgClass(project.bgColor);
            const textClass = getTextClass(project.textColor);
            const colorHex = getColorHex(project.bgColor);

            return (
              <motion.div
                key={project.id}
                className="masonry-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  {/* Wavy top edge - spans full width, outside rounded container */}
                  <div className="relative w-full h-16 overflow-hidden rounded-t-2xl">
                    <motion.svg
                      viewBox="0 0 1440 256"
                      preserveAspectRatio="none"
                      className="w-full h-full"
                      style={{ display: 'block' }}
                      initial={{ x: 0 }}
                      animate={{ x: [0, 10, 0] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path
                        d={wavePath}
                        fill={colorHex}
                      />
                    </motion.svg>
                  </div>

                  {/* Card content */}
                  <div className={`${bgClass} grain-overlay rounded-b-2xl shadow-lg hover:shadow-xl transition-shadow`}>
                    <div className="p-4 md:p-5">
                    {/* Optional image */}
                    {project.hasImage && (
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                      >
                        <BlobFrame className="w-full">
                          <div className="aspect-square bg-gradient-to-br from-yellow to-orange flex items-center justify-center">
                            <div className="text-4xl">🚀</div>
                          </div>
                        </BlobFrame>
                      </motion.div>
                    )}

                    {/* Title and subtitle */}
                    <div className="relative mb-2">
                      <h3 className={`text-3xl md:text-4xl font-display font-black ${textClass} italic leading-tight`}>
                        {project.title}
                      </h3>
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 opacity-60"
                        viewBox="0 0 400 20"
                        preserveAspectRatio="none"
                        style={{ color: colorHex }}
                      >
                        <path
                          d="M0,15 Q100,5 200,15 T400,15"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className={`text-sm md:text-base ${textClass}/90 mb-1 font-semibold`}>
                      {project.subtitle}
                    </p>
                    <p className={`text-xs ${textClass}/70 italic mb-3`}>
                      {project.timeline}
                    </p>

                    {/* Collaborator/Role */}
                    {(project.collaborator || project.role) && (
                      <p className={`text-xs ${textClass}/90 mb-3`}>
                        {project.collaborator || project.role}
                      </p>
                    )}

                    {/* Description */}
                    <p className={`${textClass}/90 mb-4 text-sm leading-relaxed`}>
                      {project.description}
                    </p>

                    {/* Stats */}
                    {project.stats && (
                      <div className={`${getStatsBgClass(project.bgColor)} rounded-lg p-3 mb-4`}>
                        <h4 className={`${textClass} font-bold text-sm mb-2`}>Some Stats...</h4>
                        <div className="space-y-1 text-xs">
                          <p className={textClass}>
                            <strong>Max Altitude:</strong> {project.stats.maxAltitude.ft}ft ({project.stats.maxAltitude.m}m)
                          </p>
                          <p className={textClass}>
                            <strong>Max Velocity:</strong> {project.stats.maxVelocity.mph} mph ({project.stats.maxVelocity.mps} m/s)
                          </p>
                          <p className={textClass}>
                            <strong>Max G forces:</strong> {project.stats.maxG} Gs
                          </p>
                          <p className={textClass}>
                            <strong>Motor Used:</strong> {project.stats.motor}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Certification */}
                    {project.certification && (
                      <div className={`${getCertBgClass(project.bgColor)} rounded-lg px-3 py-1.5 inline-block mb-4`}>
                        <p className="text-white font-bold text-xs">{project.certification}</p>
                      </div>
                    )}

                    {/* Features */}
                    {project.features && (
                      <ul className={`space-y-1 mb-4 ${textClass}/90 text-xs`}>
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-1.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Impact */}
                    {project.impact && (
                      <p className={`${textClass}/90 italic mb-4 text-xs`}>
                        <strong>Impact:</strong> {project.impact}
                      </p>
                    )}

                    {/* Achievement */}
                    {project.achievement && (
                      <div className={`${getAchievementBgClass(project.bgColor)} rounded-lg px-3 py-2 mb-4`}>
                        <p className={`${textClass} font-semibold text-xs`}>{project.achievement}</p>
                      </div>
                    )}

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className={`${getTechBgClass(project.bgColor)} ${textClass} px-2 py-1 rounded-full text-xs font-medium`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 ${textClass} hover:underline font-semibold text-sm`}
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {project.links?.video && (
                        <a
                          href={project.links.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 ${textClass} hover:underline font-semibold text-sm`}
                        >
                          <Play className="w-4 h-4" />
                          Watch Video
                        </a>
                      )}
                    </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
