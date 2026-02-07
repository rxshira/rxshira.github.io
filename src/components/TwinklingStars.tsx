import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
}

const TwinklingStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 700; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.3,
        opacity: 0.2 + Math.random() * 0.5,
        animationDelay: Math.random() * 10,
        animationDuration: 4 + Math.random() * 6,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 255, 255, 0.4)`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default TwinklingStars;
