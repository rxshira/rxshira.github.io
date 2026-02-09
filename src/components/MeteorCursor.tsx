import { useEffect, useState, useRef } from 'react';

const MeteorCursor = () => {
  const [trail, setTrail] = useState<{ x: number, y: number, id: number, age: number }[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setTrail(prev => {
        // Age all points
        const aged = prev.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 20);
        
        // Add new point if mouse moved
        const moved = Math.abs(mousePos.current.x - lastPos.current.x) > 0.5 || 
                      Math.abs(mousePos.current.y - lastPos.current.y) > 0.5;
        
        if (moved) {
          const newPoint = { ...mousePos.current, id: Math.random(), age: 0 };
          lastPos.current = { ...mousePos.current };
          return [newPoint, ...aged].slice(0, 30);
        }
        return aged;
      });
      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trail.map((point, i) => {
        const nextPoint = trail[i + 1];
        if (!nextPoint) return null;

        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if (dist < 1) return null;

        return (
          <div 
            key={point.id}
            className="absolute origin-left rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: `${dist + 2}px`,
              height: `${Math.max(1, 3 - point.age * 0.15)}px`,
              backgroundColor: 'white',
              opacity: (20 - point.age) / 25,
              transform: `rotate(${angle}deg)`,
              boxShadow: `0 0 10px var(--pink)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default MeteorCursor;