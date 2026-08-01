import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Github, Play, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../context/DataContext';
import GlowWrapper from './GlowWrapper';
import { Link } from 'react-router-dom';

interface ItemSectionProps {
  id: string;
  title: string;
  items: Project[];
  seeAllLink?: string;
  maxVisible?: number;
}

const ItemSection = ({ id, title, items, seeAllLink, maxVisible }: ItemSectionProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (itemId: string) => {
    const next = new Set(expandedIds);
    next.has(itemId) ? next.delete(itemId) : next.add(itemId);
    setExpandedIds(next);
  };

  // Show only the first `maxVisible` items (if set); the rest live on the "See all" page.
  const hasMore = maxVisible !== undefined && items.length > maxVisible;
  const visibleItems = maxVisible !== undefined ? items.slice(0, maxVisible) : items;

  // Distribute into 3 columns so an expanding card pushes the ones below it in
  // its own column, never stretching its row neighbour.
  const columns = useMemo(() => {
    const cols: Project[][] = [[], [], []];
    visibleItems.forEach((item, i) => cols[i % 3].push(item));
    return cols;
  }, [visibleItems]);

  if (!items || items.length === 0) return null;

  return (
    <section id={id}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-pink tracking-tight">{title}</h2>
        {seeAllLink && hasMore && (
          <Link
            to={seeAllLink}
            className="text-pink hover:opacity-80 transition-all font-bold text-sm md:text-base border-b-2 border-pink/30 hover:border-pink pb-1"
          >
            See all →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {column.map((project) => (
              <GlowWrapper key={project.id} className="card flex flex-col cursor-pointer">
                <div className="h-full flex flex-col">
                  <div onClick={() => toggleExpand(project.id)} className="group/header">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:text-pink transition-colors">
                        {project.title}
                      </h3>
                      {expandedIds.has(project.id) ? (
                        <ChevronUp className="text-pink w-5 h-5 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="text-text-gray group-hover/header:text-white w-5 h-5 transition-colors flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-text-gray text-sm mb-3 leading-relaxed">{project.subtitle}</p>
                  </div>

                  <AnimatePresence>
                    {expandedIds.has(project.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-4"
                      >
                        <div className="pt-4 border-t border-white/10 space-y-4 cursor-default" onClick={(e) => e.stopPropagation()}>
                          <p className="text-sm md:text-base text-text-gray leading-relaxed">{project.description}</p>

                          {project.role && (
                            <p className="text-sm font-bold text-white uppercase tracking-wider">Role: {project.role}</p>
                          )}
                          {project.collaborator && (
                            <p className="text-sm italic text-text-gray/80">{project.collaborator}</p>
                          )}
                          {project.achievement && (
                            <p className="text-base font-bold text-pink">Achievement: {project.achievement}</p>
                          )}
                          {project.imagePath && (
                            <img
                              src={project.imagePath.startsWith('http') || project.imagePath.startsWith('data:') ? project.imagePath : `/images/${project.imagePath}`}
                              alt={project.title}
                              className="w-full border border-white/10 shadow-lg object-cover"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                          )}

                          <div className="flex flex-wrap gap-6">
                            {project.links?.github && (
                              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-pink hover:opacity-80 transition-colors inline-flex items-center gap-2 text-base font-semibold">
                                <Github className="w-5 h-5" /> GitHub
                              </a>
                            )}
                            {project.links?.website && (
                              <a href={project.links.website} target="_blank" rel="noopener noreferrer" className="text-pink hover:opacity-80 transition-colors inline-flex items-center gap-2 text-base font-semibold">
                                <ExternalLink className="w-5 h-5" /> Website
                              </a>
                            )}
                            {project.links?.video && (
                              <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="text-pink hover:opacity-80 transition-colors inline-flex items-center gap-2 text-base font-semibold">
                                <Play className="w-5 h-5" /> Video
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-3 mt-auto pt-4 cursor-default" onClick={(e) => e.stopPropagation()}>
                    {project.techStack && project.techStack.map((tech) => (
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

export default ItemSection;
