const GrainTexture = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.06] z-0">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

export default GrainTexture;

