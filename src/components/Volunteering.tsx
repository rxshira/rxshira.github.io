import { motion } from 'framer-motion';
import { GraduationCap, Users, Heart, Award } from 'lucide-react';
import { fadeInUp, staggerChildren } from '../utils/animations';

const volunteeringData = [
  {
    icon: Heart,
    title: 'The Lovelace Foundation',
    role: 'Executive Director & Founder (Registered NPO)',
    description: 'Focus on STEM education and accessibility',
    color: 'magenta'
  },
  {
    icon: Users,
    title: 'Vancouver Pacific Grace Youth Council (VPGYC)',
    role: 'Youth Council Leader',
    description: 'Civic engagement and policy advocacy',
    color: 'orange'
  },
  {
    icon: GraduationCap,
    title: 'VISST Camps',
    role: 'Co-Leader & Instructor',
    description: 'Deconstructing TikTok Camp - Week-long camp for grades 4-9 covering social media algorithms, data ethics, and digital literacy. (March 2022, March 2023, July-Aug 2024)',
    color: 'red-orange'
  }
];

const teachingData = [
  {
    title: '15150 - Functional Programming (SML)',
    terms: 'Summer 2025, Spring 2026 - Present',
    description: 'Created content, led labs for 30+ students. 1-on-1 office hours and GitHub collaboration with TAs.'
  },
  {
    title: '98-317: Hype for Types (StuCo Instructor)',
    terms: 'Student-run course on type theory and PL theory',
    description: 'Topics covered: Simply-Typed Lambda Calculus, Algebraic Data Types, Curry-Howard Isomorphism, Continuations, Substructural Logic, Phantom Types, Polymorphism & Parametricity, Monads, Dependent Types',
    topics: [
      'Simply-Typed Lambda Calculus',
      'Algebraic Data Types',
      'Curry-Howard Isomorphism',
      'Continuations',
      'Substructural Logic',
      'Phantom Types',
      'Polymorphism & Parametricity',
      'Monads',
      'Dependent Types'
    ]
  }
];

const Volunteering = () => {
  return (
    <section className="bg-orange grain-overlay py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-5xl md:text-7xl font-display font-black text-white mb-12"
          {...fadeInUp}
        >
          Beyond Code
        </motion.h2>

        {/* Volunteering Section */}
        <motion.div
          className="mb-16"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display font-bold text-white mb-8">Volunteering</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {volunteeringData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30"
                  variants={fadeInUp}
                >
                  <Icon className="w-10 h-10 text-white mb-4" />
                  <h4 className="text-xl font-display font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-white/90 font-semibold mb-2">{item.role}</p>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Teaching Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display font-bold text-white mb-8">Teaching at CMU</h3>
          <div className="space-y-8">
            {teachingData.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30"
                variants={fadeInUp}
              >
                <h4 className="text-2xl font-display font-bold text-white mb-2">
                  {course.title}
                </h4>
                <p className="text-white/90 font-semibold mb-3">{course.terms}</p>
                <p className="text-white/80 mb-4">{course.description}</p>
                {course.topics && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {course.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="bg-white/30 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Volunteering;

