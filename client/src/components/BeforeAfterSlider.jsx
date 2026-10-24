import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Eye } from 'lucide-react';

export default function BeforeAfterSlider({ originalUrl, transformedUrl, originalLabel = 'Original', transformedLabel = 'Cloudinary AI' }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl select-none bg-slate-950 group cursor-ew-resize"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Background (Transformed Image) */}
      <img
        src={transformedUrl}
        alt="Transformed"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        loading="eager"
      />

      {/* Foreground Clipped (Original Image) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalUrl}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none max-w-none"
          style={{
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            height: '100%'
          }}
          loading="eager"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 pointer-events-none z-10">
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/70 backdrop-blur-md text-slate-300 border border-white/10 shadow">
          {originalLabel}
        </span>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none z-10">
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-600/80 backdrop-blur-md text-cyan-200 border border-cyan-400/30 shadow">
          {transformedLabel}
        </span>
      </div>

      {/* Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,240,255,0.7)] pointer-events-none transition-transform"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center border-2 border-blue-600">
          <SlidersHorizontal className="w-4 h-4 rotate-90 text-blue-600" />
        </div>
      </div>

      {/* Drag instruction helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-[11px] font-medium tracking-wide bg-slate-900/85 backdrop-blur-md text-slate-300 px-3 py-1 rounded-full border border-slate-700/80 shadow">
          ↔ Drag slider to compare before & after
        </span>
      </div>
    </div>
  );
}
