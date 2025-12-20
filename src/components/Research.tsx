import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const Research = () => {
  return (
    <section className="bg-magenta grain-overlay py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-5xl md:text-7xl font-display font-black text-white mb-6"
          {...fadeInUp}
        >
          Current Research
        </motion.h2>

        <motion.div
          className="mb-8"
          {...fadeInUp}
        >
          <h3 className="text-4xl font-display font-bold text-white mb-2">
            Mechanizing AVL Trees in Decalf
          </h3>
          <p className="text-white/90 text-xl mb-4">
            with Prof. Robert Harper + Runming Li
          </p>
        </motion.div>

        <motion.p
          className="text-white text-lg mb-8 max-w-3xl"
          {...fadeInUp}
        >
          Working on formal verification of AVL tree balance invariants and complexity analysis using the Decalf framework.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20"
            variants={fadeInUp}
          >
            <h4 className="text-2xl font-display font-bold text-white mb-3">
              Functional Correctness
            </h4>
            <p className="text-white/90">
              Proof of AVL balance invariant
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20"
            variants={fadeInUp}
          >
            <h4 className="text-2xl font-display font-bold text-white mb-3">
              Complexity Analysis
            </h4>
            <p className="text-white/90">
              O(|h_L - h_R|) cost bounds
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-black/20 rounded-xl p-4 font-mono text-sm text-white/80 overflow-x-auto"
          {...fadeInUp}
        >
          <pre>{`// Decalf AVL Tree Implementation
type AVLTree<T> = 
  | Leaf
  | Node(left: AVLTree<T>, 
         value: T, 
         right: AVLTree<T>,
         height: Nat)

invariant balance: |h_L - h_R| ≤ 1`}</pre>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;

