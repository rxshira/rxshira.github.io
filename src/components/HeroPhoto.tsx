import { useMemo, useRef, useState, useEffect } from 'react';

const STAR_COUNT = 60;
const BLAST = 240;
const OUT_MS = 560;
const BACK_MS = 700;
const BURST_MS = 2000;

interface HeroPhotoProps {
  image: string;
  alt: string;
  width?: number;
  height?: number;
  /** 'planet' = homepage hero (circular sphere + Saturn ring);
      'classic' = original rounded-square treatment (used on the About page). */
  variant?: 'planet' | 'classic';
}

const HeroPhoto = ({ image, alt, width, height, variant = 'planet' }: HeroPhotoProps) => {
  const skyRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [bursting, setBursting] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => {
        const size = 0.8 + Math.random() * 1.8;
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          opacity: 0.25 + Math.random() * 0.7,
          spread: 0.7 + Math.random() * 0.6,
        };
      }),
    []
  );

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const nodes = () => {
    const children = skyRef.current?.children;
    return children ? (Array.from(children) as HTMLElement[]) : [];
  };

  const vector = (i: number) => {
    const dx = stars[i].x - 50;
    const dy = stars[i].y - 50;
    const dist = Math.hypot(dx, dy) || 1;
    return { dx, dy, dist };
  };

  const pushStars = () => {
    if (bursting) return;
    nodes().forEach((node, i) => {
      const { dx, dy, dist } = vector(i);
      const push = Math.max(0, 42 - dist) * 1.7;
      node.style.transition = 'transform 1s cubic-bezier(0.3, 0.8, 0.3, 1)';
      node.style.transform = `translate(${(dx / dist) * push}px, ${(dy / dist) * push}px)`;
    });
  };

  const resetStars = () => {
    if (bursting) return;
    nodes().forEach((node) => {
      node.style.transition = 'transform 1s cubic-bezier(0.3, 0.8, 0.3, 1)';
      node.style.transform = '';
    });
  };

  const burst = () => {
    if (bursting) return;
    setBursting(true);

    nodes().forEach((node, i) => {
      const { dx, dy, dist } = vector(i);
      const reach = BLAST * stars[i].spread;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      node.style.transition = `transform ${OUT_MS}ms cubic-bezier(0.08, 0.9, 0.2, 1), opacity ${OUT_MS}ms, border-radius ${OUT_MS}ms`;
      node.style.transform = `translate(${(dx / dist) * reach}px, ${(dy / dist) * reach}px) rotate(${angle}deg) scaleX(9) scaleY(1.4)`;
      node.style.borderRadius = '40%';
      node.style.opacity = '0';
    });

    timers.current.push(
      window.setTimeout(() => {
        nodes().forEach((node, i) => {
          node.style.transition = `transform ${BACK_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1), opacity ${BACK_MS}ms, border-radius ${BACK_MS}ms`;
          node.style.transform = '';
          node.style.borderRadius = '50%';
          node.style.opacity = String(stars[i].opacity);
        });
      }, OUT_MS + 60)
    );

    timers.current.push(window.setTimeout(() => setBursting(false), BURST_MS));
  };

  return (
    <div
      className={`hero-photo ${variant}${bursting ? ' bursting' : ''}`}
      style={width && height ? { width, height } : undefined}
      onMouseEnter={pushStars}
      onMouseLeave={resetStars}
      onClick={burst}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          burst();
        }
      }}
      role="img"
      tabIndex={0}
      aria-label={alt}
    >
      <div className="hero-nebula" />
      {variant === 'planet' && <div className="hero-atmosphere" />}
      <div className="hero-core" />
      <div className="hero-ring" />
      <div className="hero-ring-2" />
      <div className="hero-sky" ref={skyRef}>
        {stars.map((star) => (
          <i
            key={star.id}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.7)`,
            }}
          />
        ))}
      </div>
      {variant === 'planet' && <div className="hero-orbit-back" />}
      <div className="hero-img" style={{ backgroundImage: `url(${image})` }} />
      {variant === 'planet' && (
        <>
          <div className="hero-orbit-front" />
          <div className="hero-orbit-moon" />
        </>
      )}
    </div>
  );
};

export default HeroPhoto;
