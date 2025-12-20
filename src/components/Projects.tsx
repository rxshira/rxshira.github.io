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

  return (
    <>
      {projects.map((project, index) => {
        const bgClass = getBgClass(project.bgColor);
        const textClass = getTextClass(project.textColor);

        return (
          <section
            key={project.id}
            className={`${bgClass} grain-overlay py-20 relative`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Image/Visual */}
                <motion.div
                  className={project.featured ? 'order-1' : 'order-2 md:order-1'}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <BlobFrame className="w-full">
                    <div className="aspect-square bg-gradient-to-br from-yellow to-orange flex items-center justify-center">
                      <div className="text-6xl">🚀</div>
                    </div>
                  </BlobFrame>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                  className={project.featured ? 'order-2' : 'order-1 md:order-2'}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h2 className={`text-5xl md:text-7xl font-display font-black ${textClass} mb-4`}>
                    {project.title}
                  </h2>
                  <p className={`text-xl ${textClass}/90 mb-2`}>
                    {project.subtitle}
                  </p>
                  <p className={`${textClass}/70 italic mb-6`}>
                    {project.timeline}
                  </p>

                  {project.collaborator && (
                    <p className={`${textClass}/90 mb-4`}>
                      {project.collaborator}
                    </p>
                  )}

                  <p className={`${textClass}/90 mb-6 text-lg`}>
                    {project.description}
                  </p>

                  {project.stats && (
                    <div className={`${getStatsBgClass(project.bgColor)} rounded-xl p-6 mb-6`}>
                      <h4 className={`${textClass} font-bold text-xl mb-4`}>Some Stats...</h4>
                      <div className="space-y-2">
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

                  {project.certification && (
                    <div className={`${getCertBgClass(project.bgColor)} rounded-lg px-4 py-2 inline-block mb-6`}>
                      <p className="text-white font-bold">{project.certification}</p>
                    </div>
                  )}

                  {project.features && (
                    <ul className={`space-y-2 mb-6 ${textClass}/90`}>
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.impact && (
                    <p className={`${textClass}/90 italic mb-6`}>
                      <strong>Impact:</strong> {project.impact}
                    </p>
                  )}

                  {project.achievement && (
                    <div className={`${getAchievementBgClass(project.bgColor)} rounded-lg px-4 py-3 mb-6`}>
                      <p className={`${textClass} font-semibold`}>{project.achievement}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mb-6">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className={`${getTechBgClass(project.bgColor)} ${textClass} px-4 py-2 rounded-full text-sm font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 ${textClass} hover:underline font-semibold`}
                      >
                        <Github className="w-5 h-5" />
                        GitHub
                      </a>
                    )}
                    {project.links?.video && (
                      <a
                        href={project.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 ${textClass} hover:underline font-semibold`}
                      >
                        <Play className="w-5 h-5" />
                        Watch Video
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Projects;

