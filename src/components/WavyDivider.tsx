import { motion } from 'framer-motion';

interface WavyDividerProps {
  color: string;
  flip?: boolean;
}

const WavyDivider = ({ color, flip = false }: WavyDividerProps) => {
  const wavePath = flip 
    ? "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,256L1392,256C1344,256,1248,256,1152,256C1056,256,960,256,864,256C768,256,672,256,576,256C480,256,384,256,288,256C192,256,96,256,48,256L0,256Z"
    : "M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";

  return (
    <div className="relative w-full h-24 overflow-hidden">
      <motion.svg
        viewBox="0 0 1440 256"
        className="absolute top-0 left-0 w-full h-full"
        initial={{ x: 0 }}
        animate={{ x: [0, 20, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.path
          d={wavePath}
          fill={color}
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.svg>
    </div>
  );
};

export default WavyDivider;

