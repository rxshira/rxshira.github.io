interface LayeredForestDividerProps {
  topColor: string;
  bottomColor: string;
  backLayerColor: string;
  middleLayerColor: string;
  frontLayerColor: string;
  isExpanded?: boolean;
  isImportant?: boolean;
}

const LayeredForestDivider = ({
  topColor,
  bottomColor,
  backLayerColor,
  middleLayerColor,
  frontLayerColor,
  isExpanded = true,
  isImportant = false,
}: LayeredForestDividerProps) => {
  if (!isExpanded) {
    return null;
  }

  // Important dividers are full opacity and taller, others are faded and shorter
  const backOpacity = isImportant ? 0.4 : 0.2;
  const middleOpacity = isImportant ? 0.6 : 0.3;
  const height = isImportant ? 'h-64' : 'h-48';

  return (
    <div className={`relative ${height} overflow-hidden`} style={{ background: topColor }}>
      {/* Back layer - furthest */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 150" preserveAspectRatio="none" style={{ height: '150px' }}>
        <path
          d="M0,80 L240,70 L360,85 L480,75 L600,90 L720,70 L840,80 L960,75 L1080,85 L1200,78 L1440,80 L1440,150 L0,150 Z"
          style={{ fill: backLayerColor }}
          opacity={backOpacity}
        />
      </svg>
      
      {/* Middle layer */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '120px' }}>
        <path
          d="M0,60 L180,50 L300,70 L420,55 L540,75 L660,50 L780,65 L900,55 L1020,70 L1140,58 L1440,60 L1440,120 L0,120 Z"
          style={{ fill: middleLayerColor }}
          opacity={middleOpacity}
        />
      </svg>

      {/* Front layer - closest - fully opaque, matches section below */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ height: '100px' }}>
        <path
          d="M0,40 L120,35 L240,50 L360,38 L480,55 L600,35 L720,45 L840,38 L960,50 L1080,42 L1200,48 L1440,40 L1440,100 L0,100 Z"
          style={{ fill: bottomColor }}
          opacity={1}
        />
      </svg>
    </div>
  );
};

export default LayeredForestDivider;

