import React, { useState, useRef, useEffect } from 'react';

interface GlowWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const GlowWrapper: React.FC<GlowWrapperProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !glowRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
  };

  return (
    <div 
      ref={containerRef}
      className={`glow-target group relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={glowRef}
        className="mouse-glow group-hover:opacity-100"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlowWrapper;
