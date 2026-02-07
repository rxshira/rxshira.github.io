import { useEffect, useState } from 'react';

interface Meteor {
  id: number;
  x: number;
  y: number;
  size: number;
  length: number;
  duration: number;
}

const MeteorShower = () => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const createMeteor = () => {
      const id = Math.random();
      const x = -10;
      const y = Math.random() * 60;
      const size = 1.2 + Math.random() * 1.5;
      const length = 80 + Math.random() * 100;
      const duration = 0.8 + Math.random() * 1.5;
      
      const newMeteor = { id, x, y, size, length, duration };
      setMeteors(prev => [...prev, newMeteor]);

      setTimeout(() => {
        setMeteors(prev => prev.filter(m => m.id !== id));
      }, duration * 1000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        createMeteor();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {meteors.map(m => (
        <div
          key={m.id}
          className="absolute rounded-full"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.length}px`,
            height: `${m.size}px`,
            // Use CSS variable for dynamic color
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1) 20%, white 100%)',
            transform: 'rotate(15deg)',
            opacity: 0,
            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))',
            animation: `meteor-right ${m.duration}s linear forwards`
          }}
        />
      ))}
      <style>{`
        @keyframes meteor-right {
          0% {
            transform: rotate(15deg) translateX(0);
            opacity: 0;
          }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% {
            transform: rotate(15deg) translateX(120vw);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MeteorShower;