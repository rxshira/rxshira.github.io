import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, Sparkles, Palette, Shapes, Zap } from 'lucide-react';

const DesignTesting = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const sectionDividers = [
    { id: 'wavy', name: 'Wavy Line (Current)', component: 'wavy' },
    { id: 'zigzag', name: 'Zigzag', component: 'zigzag' },
    { id: 'curved', name: 'Curved Wave', component: 'curved' },
    { id: 'dots', name: 'Dotted Line', component: 'dots' },
    { id: 'dashed', name: 'Dashed Wave', component: 'dashed' },
    { id: 'geometric', name: 'Geometric Shapes', component: 'geometric' },
    { id: 'gradient', name: 'Gradient Fade', component: 'gradient' },
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
    { id: 'fade', name: 'Fade In (Current)', type: 'fade' },
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
    { id: 'shimmer', name: 'Shimmer', type: 'shimmer' },
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

  return (
    <section id="design-testing" className="relative py-20 px-6 border-t-4 border-dashed" style={{ backgroundColor: '#F5F5F0' }}>
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
              color: '#C2185B',
              textShadow: isExpanded ? '0 0 20px rgba(194, 24, 91, 0.5), 0 0 40px rgba(194, 24, 91, 0.3)' : '0 0 0px rgba(194, 24, 91, 0)'
            }}
          >
            Design Testing (Temporary)
            <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 15">
              <path d="M0,10 Q100,0 200,10 T400,10" stroke="#C2185B" strokeWidth="6" fill="none" strokeLinecap="round"/>
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
                    <div key={category.id} className="bg-white rounded-3xl p-6">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6" style={{ color: '#C2185B' }} />
                          <h3 className="text-2xl font-black" style={{ color: '#E84A3F' }}>
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
              <div className="mt-8 bg-white rounded-3xl p-6">
                <h3 className="text-2xl font-black mb-4" style={{ color: '#E84A3F' }}>
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

