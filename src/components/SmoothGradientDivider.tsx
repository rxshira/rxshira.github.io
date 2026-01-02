interface SmoothGradientDividerProps {
  topColor: string;
  bottomColor: string;
  isExpanded?: boolean;
}

const SmoothGradientDivider = ({
  topColor,
  bottomColor,
  isExpanded = true,
}: SmoothGradientDividerProps) => {
  if (!isExpanded) {
    return null;
  }

  return (
    <div 
      className="relative h-32 overflow-hidden" 
      style={{ 
        background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`
      }}
    />
  );
};

export default SmoothGradientDivider;

