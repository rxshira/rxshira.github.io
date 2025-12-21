import { motion } from 'framer-motion';
import { Code2, GraduationCap, BookOpen, Rocket } from 'lucide-react';
import { fadeInUp, staggerChildren } from '../utils/animations';

const activities = [
  {
    icon: Code2,
    title: 'Agda',
    description: 'Exploring dependent types and proof assistants',
    color: 'magenta'
  },
  {
    icon: GraduationCap,
    title: '15150 TAing',
    description: 'Teaching Functional Programming (SML) at CMU',
    color: 'orange'
  },
  {
    icon: BookOpen,
    title: 'Hype for Types',
    description: 'Instructing type theory course (StuCo 98-317)',
    color: 'red-orange'
  },
  {
    icon: Rocket,
    title: 'Space Robotics',
    description: 'Building autonomous systems',
    color: 'hot-pink'
  }
];

const CurrentFocus = () => {
  return (
    <section className="bg-yellow grain-overlay py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-5xl md:text-7xl font-display font-black text-magenta mb-12"
          {...fadeInUp}
        >
          What I'm up to...
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 rounded-full ${
                  activity.color === 'magenta' ? 'bg-magenta' :
                  activity.color === 'orange' ? 'bg-orange' :
                  activity.color === 'red-orange' ? 'bg-red-orange' :
                  'bg-hot-pink'
                } flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-black mb-2">
                  {activity.title}
                </h3>
                <p className="text-black/70">
                  {activity.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentFocus;

