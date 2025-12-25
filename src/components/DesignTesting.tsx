import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, Sparkles, Palette, Shapes, Zap } from 'lucide-react';

const DesignTesting = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    'animations': 'shimmer',
    'dividers': 'gradient'
  });

  const sectionDividers = [
    { id: 'wavy', name: 'Wavy Line', component: 'wavy' },
    { id: 'zigzag', name: 'Zigzag', component: 'zigzag' },
    { id: 'curved', name: 'Curved Wave', component: 'curved' },
    { id: 'dots', name: 'Dotted Line', component: 'dots' },
    { id: 'dashed', name: 'Dashed Wave', component: 'dashed' },
    { id: 'geometric', name: 'Geometric Shapes', component: 'geometric' },
    { id: 'gradient', name: 'Gradient Fade (Current)', component: 'gradient' },
    { id: 'stars', name: 'Stars Pattern', component: 'stars' },
    { id: 'circles', name: 'Circles Pattern', component: 'circles' },
    { id: 'diagonal', name: 'Diagonal Lines', component: 'diagonal' },
    { id: 'scalloped', name: 'Scalloped Edge', component: 'scalloped' },
    { id: 'none', name: 'None', component: 'none' },
  ];

  const bubbleStyles = [
    { id: 'rounded', name: 'Rounded (Current)', style: 'rounded-3xl' },
    { id: 'rounded-lg', name: 'Less Rounded', style: 'rounded-xl' },
    { id: 'rounded-full', name: 'Pill Shape', style: 'rounded-full' },
    { id: 'square', name: 'Sharp Corners', style: 'rounded-none' },
    { id: 'blob', name: 'Organic Blob', style: 'blob-shape' },
    { id: 'hexagon', name: 'Hexagon', style: 'hexagon-shape' },
    { id: 'diamond', name: 'Diamond', style: 'diamond-shape' },
    { id: 'rounded-asymmetric', name: 'Asymmetric Rounded', style: 'rounded-asymmetric' },
    { id: 'rounded-top', name: 'Rounded Top Only', style: 'rounded-t-3xl' },
    { id: 'rounded-bottom', name: 'Rounded Bottom Only', style: 'rounded-b-3xl' },
    { id: 'rounded-left', name: 'Rounded Left Only', style: 'rounded-l-3xl' },
    { id: 'rounded-right', name: 'Rounded Right Only', style: 'rounded-r-3xl' },
    { id: 'octagon', name: 'Octagon', style: 'octagon-shape' },
    { id: 'rounded-sm', name: 'Slightly Rounded', style: 'rounded-lg' },
  ];

  const textures = [
    { id: 'grain', name: 'Grain Texture (Current)', style: 'grain' },
    { id: 'paper', name: 'Paper Texture', style: 'paper' },
    { id: 'noise', name: 'Noise', style: 'noise' },
    { id: 'dots', name: 'Dot Pattern', style: 'dots-pattern' },
    { id: 'lines', name: 'Line Pattern', style: 'lines-pattern' },
    { id: 'mesh', name: 'Mesh Gradient', style: 'mesh' },
    { id: 'crosshatch', name: 'Crosshatch', style: 'crosshatch' },
    { id: 'grid', name: 'Grid Pattern', style: 'grid' },
    { id: 'stipple', name: 'Stipple', style: 'stipple' },
    { id: 'none', name: 'No Texture', style: 'none' },
  ];

  const animations = [
    { id: 'fade', name: 'Fade In', type: 'fade' },
    { id: 'slide-up', name: 'Slide Up', type: 'slide-up' },
    { id: 'slide-down', name: 'Slide Down', type: 'slide-down' },
    { id: 'slide-left', name: 'Slide Left', type: 'slide-left' },
    { id: 'slide-right', name: 'Slide Right', type: 'slide-right' },
    { id: 'scale', name: 'Scale In', type: 'scale' },
    { id: 'rotate', name: 'Rotate In', type: 'rotate' },
    { id: 'bounce', name: 'Bounce', type: 'bounce' },
    { id: 'elastic', name: 'Elastic', type: 'elastic' },
    { id: 'glow-pulse', name: 'Glow Pulse', type: 'glow-pulse' },
    { id: 'float', name: 'Float', type: 'float' },
    { id: 'shimmer', name: 'Shimmer (Current)', type: 'shimmer' },
    { id: 'flip', name: 'Flip', type: 'flip' },
    { id: 'zoom', name: 'Zoom', type: 'zoom' },
    { id: 'wiggle', name: 'Wiggle', type: 'wiggle' },
    { id: 'spin', name: 'Spin', type: 'spin' },
    { id: 'blur', name: 'Blur In', type: 'blur' },
    { id: 'stagger', name: 'Stagger', type: 'stagger' },
  ];

  const colorSchemes = [
    { id: 'current', name: 'Current Colors', colors: ['#FFD93D', '#C2185B', '#FF8C42', '#F5F5F0'] },
    { id: 'pastel', name: 'Pastel', colors: ['#FFE5E5', '#E5F3FF', '#FFF5E5', '#E5FFE5'] },
    { id: 'vibrant', name: 'Vibrant', colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'] },
    { id: 'monochrome', name: 'Monochrome', colors: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E'] },
    { id: 'sunset', name: 'Sunset', colors: ['#FF6B6B', '#FF8E53', '#FFA07A', '#FFB347'] },
    { id: 'ocean', name: 'Ocean', colors: ['#4A90E2', '#5BA3F5', '#6BB6FF', '#7CC9FF'] },
  ];

  const typography = [
    { id: 'current', name: 'Space Grotesk (Current)', font: 'Space Grotesk' },
    { id: 'inter', name: 'Inter', font: 'Inter' },
    { id: 'poppins', name: 'Poppins', font: 'Poppins' },
    { id: 'montserrat', name: 'Montserrat', font: 'Montserrat' },
    { id: 'playfair', name: 'Playfair Display', font: 'Playfair Display' },
    { id: 'raleway', name: 'Raleway', font: 'Raleway' },
  ];

  const spacingOptions = [
    { id: 'tight', name: 'Tight Spacing', value: 'py-12' },
    { id: 'normal', name: 'Normal (Current)', value: 'py-20' },
    { id: 'loose', name: 'Loose Spacing', value: 'py-32' },
    { id: 'varied', name: 'Varied Spacing', value: 'varied' },
    { id: 'compact', name: 'Compact', value: 'py-8' },
    { id: 'spacious', name: 'Spacious', value: 'py-40' },
  ];

  const borderStyles = [
    { id: 'none', name: 'No Border (Current)', style: 'border-0' },
    { id: 'thin', name: 'Thin Border', style: 'border' },
    { id: 'thick', name: 'Thick Border', style: 'border-4' },
    { id: 'dashed', name: 'Dashed Border', style: 'border-dashed' },
    { id: 'dotted', name: 'Dotted Border', style: 'border-dotted' },
    { id: 'double', name: 'Double Border', style: 'border-double' },
    { id: 'gradient', name: 'Gradient Border', style: 'gradient-border' },
  ];

  const hoverEffects = [
    { id: 'none', name: 'No Hover Effect (Current)', effect: 'none' },
    { id: 'lift', name: 'Lift Up', effect: 'lift' },
    { id: 'scale', name: 'Scale Up', effect: 'scale' },
    { id: 'glow', name: 'Glow', effect: 'glow' },
    { id: 'rotate', name: 'Slight Rotate', effect: 'rotate' },
    { id: 'shrink', name: 'Shrink', effect: 'shrink' },
    { id: 'tilt', name: 'Tilt', effect: 'tilt' },
    { id: 'pulse', name: 'Pulse', effect: 'pulse' },
  ];

  const categories = [
    { id: 'dividers', name: 'Section Dividers', icon: Shapes, options: sectionDividers },
    { id: 'bubbles', name: 'Bubble Styles', icon: Palette, options: bubbleStyles },
    { id: 'textures', name: 'Textures & Patterns', icon: Sparkles, options: textures },
    { id: 'animations', name: 'Animations', icon: Zap, options: animations },
    { id: 'colors', name: 'Color Schemes', icon: Palette, options: colorSchemes },
    { id: 'typography', name: 'Typography', icon: Sparkles, options: typography },
    { id: 'spacing', name: 'Spacing', icon: Shapes, options: spacingOptions },
    { id: 'borders', name: 'Border Styles', icon: Shapes, options: borderStyles },
    { id: 'hover', name: 'Hover Effects', icon: Zap, options: hoverEffects },
  ];

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const selectOption = (categoryId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [categoryId]: optionId
    });
  };

  // Helper functions to get applied styles
  const getBubbleStyle = () => {
    const selected = selectedOptions['bubbles'];
    if (!selected) return 'rounded-3xl';
    const option = bubbleStyles.find(o => o.id === selected);
    return option?.style || 'rounded-3xl';
  };

  const getTypography = () => {
    const selected = selectedOptions['typography'];
    if (!selected || selected === 'current') return 'Space Grotesk';
    const option = typography.find(o => o.id === selected);
    return option?.font || 'Space Grotesk';
  };

  const getSpacing = () => {
    const selected = selectedOptions['spacing'];
    if (!selected || selected === 'normal') return 'py-20';
    const option = spacingOptions.find(o => o.id === selected);
    return option?.value || 'py-20';
  };

  const getBorderStyle = () => {
    const selected = selectedOptions['borders'];
    if (!selected || selected === 'none') return { borderWidth: 0 };
    const option = borderStyles.find(o => o.id === selected);
    
    const borderStylesMap: Record<string, React.CSSProperties> = {
      'thin': { borderWidth: '1px', borderStyle: 'solid' },
      'thick': { borderWidth: '4px', borderStyle: 'solid' },
      'dashed': { borderWidth: '2px', borderStyle: 'dashed' },
      'dotted': { borderWidth: '2px', borderStyle: 'dotted' },
      'double': { borderWidth: '3px', borderStyle: 'double' },
      'gradient': { 
        borderWidth: '3px',
        borderImage: `linear-gradient(90deg, ${getTitleColor()}, ${getBackgroundColor()}) 1`,
        borderStyle: 'solid'
      },
    };
    
    return borderStylesMap[selected] || { borderWidth: 0 };
  };

  const getBackgroundColor = () => {
    const selected = selectedOptions['colors'];
    if (!selected || selected === 'current') return '#F5F5F0';
    const option = colorSchemes.find(o => o.id === selected);
    return option?.colors[3] || '#F5F5F0'; // Use last color as background
  };

  const getTitleColor = () => {
    const selected = selectedOptions['colors'];
    if (!selected || selected === 'current') return '#C2185B';
    const option = colorSchemes.find(o => o.id === selected);
    return option?.colors[1] || '#C2185B'; // Use second color for title
  };

  const getTextureStyle = () => {
    const selected = selectedOptions['textures'];
    if (!selected || selected === 'none' || selected === 'grain') return {};
    
    const textureStyles: Record<string, React.CSSProperties> = {
      'paper': {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)'/%3E%3C/svg%3E")`,
        opacity: 0.1
      },
      'noise': {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
        opacity: 0.15
      },
      'dots-pattern': {
        backgroundImage: `radial-gradient(circle, #C2185B 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        opacity: 0.1
      },
      'lines-pattern': {
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(194, 24, 91, 0.1) 10px, rgba(194, 24, 91, 0.1) 20px)`,
      },
      'mesh': {
        background: `linear-gradient(135deg, rgba(194, 24, 91, 0.1) 0%, rgba(255, 140, 66, 0.1) 50%, rgba(255, 217, 61, 0.1) 100%)`,
      },
      'crosshatch': {
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(194, 24, 91, 0.1) 2px, rgba(194, 24, 91, 0.1) 4px),
                          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(194, 24, 91, 0.1) 2px, rgba(194, 24, 91, 0.1) 4px)`,
      },
      'grid': {
        backgroundImage: `linear-gradient(rgba(194, 24, 91, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(194, 24, 91, 0.1) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      },
      'stipple': {
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(194, 24, 91, 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      },
    };
    
    return textureStyles[selected] || {};
  };

  const getDivider = () => {
    const selected = selectedOptions['dividers'] || 'gradient';
    if (selected === 'none') return null;
    
    const dividerComponents: Record<string, JSX.Element> = {
      'wavy': (
        <svg className="w-full h-8" viewBox="0 0 400 20" preserveAspectRatio="none">
          <path d="M0,10 Q100,0 200,10 T400,10" stroke={getTitleColor()} strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      'zigzag': (
        <svg className="w-full h-8" viewBox="0 0 400 20" preserveAspectRatio="none">
          <path d="M0,10 L100,0 L200,10 L300,0 L400,10" stroke={getTitleColor()} strokeWidth="6" fill="none"/>
        </svg>
      ),
      'curved': (
        <svg className="w-full h-8" viewBox="0 0 400 20" preserveAspectRatio="none">
          <path d="M0,10 Q100,5 200,10 T400,10" stroke={getTitleColor()} strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      'dots': (
        <svg className="w-full h-8" viewBox="0 0 400 20" preserveAspectRatio="none">
          <circle cx="50" cy="10" r="3" fill={getTitleColor()}/>
          <circle cx="150" cy="10" r="3" fill={getTitleColor()}/>
          <circle cx="250" cy="10" r="3" fill={getTitleColor()}/>
          <circle cx="350" cy="10" r="3" fill={getTitleColor()}/>
        </svg>
      ),
      'dashed': (
        <svg className="w-full h-8" viewBox="0 0 400 20" preserveAspectRatio="none">
          <path d="M0,10 Q100,0 200,10 T400,10" stroke={getTitleColor()} strokeWidth="6" fill="none" strokeDasharray="10,10" strokeLinecap="round"/>
        </svg>
      ),
      'geometric': (
        <div className="flex justify-center gap-4 py-2">
          <div className="w-4 h-4 rotate-45" style={{ backgroundColor: getTitleColor() }}></div>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getTitleColor() }}></div>
          <div className="w-4 h-4" style={{ backgroundColor: getTitleColor() }}></div>
        </div>
      ),
      'gradient': (
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: getTitleColor() }}></div>
      ),
      'stars': (
        <div className="flex justify-center gap-4 py-2 text-2xl" style={{ color: getTitleColor() }}>✦ ✦ ✦</div>
      ),
      'circles': (
        <div className="flex justify-center gap-4 py-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTitleColor() }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTitleColor() }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTitleColor() }}></div>
        </div>
      ),
      'diagonal': (
        <svg className="w-full h-8" viewBox="0 0 400 20" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="400" y2="20" stroke={getTitleColor()} strokeWidth="4"/>
        </svg>
      ),
      'scalloped': (
        <svg className="w-full h-8" viewBox="0 0 400 20" preserveAspectRatio="none">
          <path d="M0,10 Q50,0 100,10 T200,10 T300,10 T400,10" stroke={getTitleColor()} strokeWidth="6" fill="none"/>
        </svg>
      ),
    };
    
    return dividerComponents[selected] || null;
  };

  const getHoverClass = () => {
    const selected = selectedOptions['hover'];
    if (!selected || selected === 'none') return '';
    
    const hoverClasses: Record<string, string> = {
      'lift': 'hover:-translate-y-2',
      'scale': 'hover:scale-105',
      'glow': 'hover:shadow-lg hover:shadow-pink-500/50',
      'rotate': 'hover:rotate-2',
      'shrink': 'hover:scale-95',
      'tilt': 'hover:rotate-1',
      'pulse': 'hover:animate-pulse',
    };
    
    return hoverClasses[selected] || '';
  };

  const getAnimationClass = () => {
    const selected = selectedOptions['animations'] || 'shimmer';
    if (selected === 'shimmer') return 'shimmer-effect';
    return '';
  };

  const textureStyle = getTextureStyle();
  const hasTexture = selectedOptions['textures'] && selectedOptions['textures'] !== 'none' && selectedOptions['textures'] !== 'grain';

  const borderStyle = getBorderStyle();
  
  return (
    <section 
      id="design-testing" 
      className={`relative px-6 ${getSpacing()} ${getAnimationClass()}`}
      style={{ 
        backgroundColor: getBackgroundColor(),
        borderColor: getTitleColor(),
        fontFamily: getTypography(),
        ...borderStyle,
        ...(hasTexture ? textureStyle : {})
      }}
    >
      {/* Divider at top */}
      {getDivider() && (
        <div className="absolute top-0 left-0 right-0 z-10">
          {getDivider()}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            style={{ color: '#C2185B' }}
          >
            {isExpanded ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
          <motion.h2
            className="text-5xl md:text-6xl font-black text-center relative inline-block transition-all duration-300 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              color: getTitleColor(),
              textShadow: isExpanded ? `0 0 20px ${getTitleColor()}80, 0 0 40px ${getTitleColor()}50` : '0 0 0px transparent'
            }}
          >
            Design Testing (Temporary)
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke={getTitleColor()} strokeWidth="6" fill="none" strokeLinecap="round"/>
            </svg>
          </motion.h2>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-6">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isCategoryOpen = activeCategory === category.id;
                  const selectedOption = selectedOptions[category.id];

                  return (
                    <div 
                      key={category.id} 
                      className={`bg-white p-6 ${getBubbleStyle()} ${getHoverClass()} transition-all duration-300`}
                      style={{ borderColor: getTitleColor() }}
                    >
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6" style={{ color: getTitleColor() }} />
                          <h3 className="text-2xl font-black" style={{ color: getTitleColor() }}>
                            {category.name}
                          </h3>
                        </div>
                        {isCategoryOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </button>

                      <AnimatePresence>
                        {isCategoryOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                              {category.options.map((option: any) => {
                                const isSelected = selectedOption === option.id;
                                
                                // Special rendering for color schemes
                                if (category.id === 'colors') {
                                  return (
                                    <button
                                      key={option.id}
                                      onClick={() => selectOption(category.id, option.id)}
                                      className={`p-4 rounded-2xl border-2 transition-all ${
                                        isSelected ? 'border-pink-500 border-4' : 'border-gray-200'
                                      }`}
                                    >
                                      <div className="text-sm font-bold mb-2">{option.name}</div>
                                      <div className="flex gap-1 h-8">
                                        {option.colors.map((color: string, i: number) => (
                                          <div
                                            key={i}
                                            className="flex-1 rounded"
                                            style={{ backgroundColor: color }}
                                          />
                                        ))}
                                      </div>
                                    </button>
                                  );
                                }

                                // Special rendering for typography
                                if (category.id === 'typography') {
                                  return (
                                    <button
                                      key={option.id}
                                      onClick={() => selectOption(category.id, option.id)}
                                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                                        isSelected ? 'border-pink-500 border-4 bg-pink-50' : 'border-gray-200'
                                      }`}
                                      style={{ fontFamily: option.font }}
                                    >
                                      <div className="text-sm font-bold mb-1">{option.name}</div>
                                      <div className="text-xs" style={{ fontFamily: option.font }}>
                                        The quick brown fox
                                      </div>
                                    </button>
                                  );
                                }

                                // Special rendering for section dividers with preview
                                if (category.id === 'dividers') {
                                  return (
                                    <button
                                      key={option.id}
                                      onClick={() => selectOption(category.id, option.id)}
                                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                                        isSelected ? 'border-pink-500 border-4 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                                      }`}
                                    >
                                      <div className="text-sm font-bold mb-2">{option.name}</div>
                                      <div className="h-8 w-full flex items-center justify-center">
                                        {option.id === 'wavy' && (
                                          <svg width="100%" height="20" viewBox="0 0 200 20">
                                            <path d="M0,10 Q50,0 100,10 T200,10" stroke="#C2185B" strokeWidth="3" fill="none" strokeLinecap="round"/>
                                          </svg>
                                        )}
                                        {option.id === 'zigzag' && (
                                          <svg width="100%" height="20" viewBox="0 0 200 20">
                                            <path d="M0,10 L50,0 L100,10 L150,0 L200,10" stroke="#C2185B" strokeWidth="3" fill="none"/>
                                          </svg>
                                        )}
                                        {option.id === 'curved' && (
                                          <svg width="100%" height="20" viewBox="0 0 200 20">
                                            <path d="M0,10 Q50,5 100,10 T200,10" stroke="#C2185B" strokeWidth="3" fill="none" strokeLinecap="round"/>
                                          </svg>
                                        )}
                                        {option.id === 'dots' && (
                                          <svg width="100%" height="20" viewBox="0 0 200 20">
                                            <circle cx="20" cy="10" r="2" fill="#C2185B"/>
                                            <circle cx="60" cy="10" r="2" fill="#C2185B"/>
                                            <circle cx="100" cy="10" r="2" fill="#C2185B"/>
                                            <circle cx="140" cy="10" r="2" fill="#C2185B"/>
                                            <circle cx="180" cy="10" r="2" fill="#C2185B"/>
                                          </svg>
                                        )}
                                        {option.id === 'dashed' && (
                                          <svg width="100%" height="20" viewBox="0 0 200 20">
                                            <path d="M0,10 Q50,0 100,10 T200,10" stroke="#C2185B" strokeWidth="3" fill="none" strokeDasharray="5,5" strokeLinecap="round"/>
                                          </svg>
                                        )}
                                        {option.id === 'geometric' && (
                                          <div className="flex gap-1">
                                            <div className="w-3 h-3 bg-pink-500 rotate-45"></div>
                                            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-pink-500"></div>
                                          </div>
                                        )}
                                        {option.id === 'gradient' && (
                                          <div className="w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                                        )}
                                        {option.id === 'stars' && (
                                          <div className="flex gap-1 text-pink-500">✦ ✦ ✦</div>
                                        )}
                                        {option.id === 'circles' && (
                                          <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                          </div>
                                        )}
                                        {option.id === 'diagonal' && (
                                          <svg width="100%" height="20" viewBox="0 0 200 20">
                                            <line x1="0" y1="0" x2="200" y2="20" stroke="#C2185B" strokeWidth="2"/>
                                          </svg>
                                        )}
                                        {option.id === 'scalloped' && (
                                          <svg width="100%" height="20" viewBox="0 0 200 20">
                                            <path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10" stroke="#C2185B" strokeWidth="3" fill="none"/>
                                          </svg>
                                        )}
                                        {option.id === 'none' && (
                                          <div className="text-xs text-gray-400">No divider</div>
                                        )}
                                      </div>
                                    </button>
                                  );
                                }

                                // Special rendering for bubble styles with preview
                                if (category.id === 'bubbles') {
                                  const getPreviewClass = (styleId: string) => {
                                    const styleMap: Record<string, string> = {
                                      'rounded': 'rounded-3xl',
                                      'rounded-lg': 'rounded-xl',
                                      'rounded-full': 'rounded-full',
                                      'square': 'rounded-none',
                                      'rounded-sm': 'rounded-lg',
                                      'rounded-top': 'rounded-t-3xl',
                                      'rounded-bottom': 'rounded-b-3xl',
                                      'rounded-left': 'rounded-l-3xl',
                                      'rounded-right': 'rounded-r-3xl',
                                    };
                                    return styleMap[styleId] || 'rounded-3xl';
                                  };
                                  
                                  return (
                                    <button
                                      key={option.id}
                                      onClick={() => selectOption(category.id, option.id)}
                                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                                        isSelected ? 'border-pink-500 border-4 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                                      }`}
                                    >
                                      <div className="text-sm font-bold mb-2">{option.name}</div>
                                      <div className={`w-full h-12 bg-pink-200 ${getPreviewClass(option.id)}`}></div>
                                    </button>
                                  );
                                }

                                // Default rendering
                                return (
                                  <button
                                    key={option.id}
                                    onClick={() => selectOption(category.id, option.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                                      isSelected ? 'border-pink-500 border-4 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                                    }`}
                                  >
                                    <div className="text-sm font-bold">{option.name || option.id}</div>
                                    {option.description && (
                                      <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Preview Section */}
              <div className={`mt-8 bg-white p-6 ${getBubbleStyle()} ${getHoverClass()} transition-all duration-300`}>
                <h3 className="text-2xl font-black mb-4" style={{ color: getTitleColor() }}>
                  Preview Selected Options
                </h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(selectedOptions).map(([categoryId, optionId]) => {
                    const category = categories.find(c => c.id === categoryId);
                    const option = category?.options.find((o: any) => o.id === optionId);
                    return (
                      <div key={categoryId} className="flex gap-2">
                        <span className="font-bold">{category?.name}:</span>
                        <span>{option?.name || optionId}</span>
                      </div>
                    );
                  })}
                  {Object.keys(selectedOptions).length === 0 && (
                    <p className="text-gray-500 italic">No options selected yet</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DesignTesting;

