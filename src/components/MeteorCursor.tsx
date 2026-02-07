import { useEffect, useState } from 'react';

const MeteorCursor = () => {
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const id = Math.random();
      setTrail(prev => [{ x: e.clientX, y: e.clientY, id }, ...prev].slice(0, 10));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trail.map((point, i) => (
        <div 
          key={point.id}
          className="absolute bg-white"
          style={{
            left: point.x,
            top: point.y,
            width: '1px',
            height: '1px',
            opacity: (10 - i) / 20,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
          }}
        />
      ))}
    </div>
  );
};

export default MeteorCursor;