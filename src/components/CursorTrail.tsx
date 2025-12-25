import { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const colors = ['#C2185B', '#FFD93D', '#FF8C42', '#E84A3F', '#D81B60'];

const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Create new particles at mouse position
      const newParticles: Particle[] = [];
      const particleCount = Math.random() > 0.7 ? 2 : 1; // Sometimes create 2 particles
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        newParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 3 + Math.random() * 4,
        });
      }

      setParticles((prev) => [...prev, ...newParticles].slice(-50)); // Keep max 50 particles
    };

    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.98,
            vy: p.vy * 0.98,
            life: p.life - 0.02,
            size: p.size * 0.99,
          }))
          .filter((p) => p.life > 0 && p.size > 0.5)
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isEnabled]);

  // Double-click to toggle
  useEffect(() => {
    const handleDoubleClick = () => {
      setIsEnabled((prev) => !prev);
    };
    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'normal' }}
    >
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life * 0.8,
            transform: `translate(-50%, -50%)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;

