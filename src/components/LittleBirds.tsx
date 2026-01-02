const LittleBirds = () => {
  // Generate more birds scattered throughout the section
  const birds = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    size: 18 + Math.random() * 12,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {birds.map((bird) => (
        <div
          key={bird.id}
          className="absolute"
          style={{
            left: `${bird.x}%`,
            top: `${bird.y}%`,
            width: `${bird.size}px`,
            height: `${bird.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Clear bird shape - simple V/wishbone shape, not M */}
            <path
              d="M 6 10 L 12 16 L 18 10"
              stroke="#2a2a2a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default LittleBirds;
