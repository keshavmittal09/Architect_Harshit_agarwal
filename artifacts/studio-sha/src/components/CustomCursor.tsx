import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringTextRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  // Mouse position state
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const [hoverState, setHoverState] = useState<'none' | 'link' | 'image'>('none');

  useEffect(() => {
    // Only show custom cursor on devices that support hover
    if (!window.matchMedia('(hover: hover)').matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const updateRing = () => {
      // Lerp ring position
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    const rafId = requestAnimationFrame(updateRing);

    // Track hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a') || target.closest('button')) {
        setHoverState('link');
      } else if (target.closest('img') || target.dataset.cursor === 'view') {
        setHoverState('image');
      } else {
        setHoverState('none');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  const ringSize = hoverState === 'image' ? 80 : hoverState === 'link' ? 56 : 32;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary transition-all duration-300 ease-out"
        style={{ width: ringSize, height: ringSize }}
      >
        <span
          ref={ringTextRef}
          className={`font-sans text-[9px] uppercase tracking-widest text-primary transition-opacity duration-300 ${
            hoverState === 'image' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          VIEW
        </span>
      </div>
    </div>
  );
}
