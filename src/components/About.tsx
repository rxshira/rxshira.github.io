import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const About = () => {
  return (
    <section id="about" className="bg-cream grain-overlay py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-5xl md:text-7xl font-display font-black text-magenta mb-12"
          {...fadeInUp}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Bio */}
          <motion.div
            className="space-y-6"
            {...fadeInUp}
          >
            <div className="text-lg leading-relaxed space-y-4 text-black/80">
              <p>
                I am a problem-solver both at heart and in mind, driven by a deep passion for engineering elegant and provably-correct solutions. I constantly push myself to excel, motivated by the challenge of proving—over and over—that I can deliver amazing results.
              </p>
              <p>
                Engineering is a powerful force for change, capable of taking people's wishes and making them a reality. When I see a complex problem, I feel the same thrill as when I'm building a solution that makes a tangible impact.
              </p>
            </div>
          </motion.div>

          {/* Right: Quick Facts */}
          <motion.div
            className="bg-yellow rounded-2xl p-8 shadow-lg"
            {...fadeInUp}
          >
            <h3 className="text-3xl font-display font-bold text-magenta mb-6">
              Quick Facts
            </h3>
            <dl className="space-y-4">
              <div>
                <dt className="font-bold text-black mb-1">Location</dt>
                <dd className="text-black/80">Pittsburgh, PA (originally Vancouver, BC)</dd>
              </div>
              <div>
                <dt className="font-bold text-black mb-1">University</dt>
                <dd className="text-black/80">Carnegie Mellon University</dd>
              </div>
              <div>
                <dt className="font-bold text-black mb-1">Major</dt>
                <dd className="text-black/80">Computer Science (B.S.)</dd>
              </div>
              <div>
                <dt className="font-bold text-black mb-1">Concentration</dt>
                <dd className="text-black/80">Programming Languages</dd>
              </div>
              <div>
                <dt className="font-bold text-black mb-1">Minor</dt>
                <dd className="text-black/80">Physics</dd>
              </div>
              <div>
                <dt className="font-bold text-black mb-1">Expected Graduation</dt>
                <dd className="text-black/80">May 2028</dd>
              </div>
              <div>
                <dt className="font-bold text-black mb-1">Fun Fact</dt>
                <dd className="text-black/80">I've been on TikTok since 2016 (when it was Musical.ly!)</dd>
              </div>
            </dl>
          </motion.div>
        </div>

        {/* Education & Courses */}
        <motion.div
          className="mt-16"
          {...fadeInUp}
        >
          <h3 className="text-3xl font-display font-bold text-black mb-6">
            Relevant Courses
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              '15150 - Functional Programming',
              '15122 - Imperative Programming',
              '15151 - Mathematical Foundations for CS',
              '15251 - Great Ideas in Theoretical CS',
              '15312 - Programming Languages',
              '15259 - Calculus in 3D',
              '18213 - Computer Systems',
              '16161 - AI + Humanity',
              '33114 - Physics of Musical Sound'
            ].map((course, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-yellow/20"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <p className="text-sm font-medium text-black">{course}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

