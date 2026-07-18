import React, { useEffect, useRef } from 'react';

export default function FilmGrain() {
  const filterRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let frameId: number;
    let lastTime = 0;

    const animateGrain = (time: number) => {
      if (time - lastTime > 80) {
        if (filterRef.current) {
          const seed = Math.floor(Math.random() * 100);
          filterRef.current.setAttribute('seed', seed.toString());
        }
        lastTime = time;
      }
      frameId = requestAnimationFrame(animateGrain);
    };

    frameId = requestAnimationFrame(animateGrain);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.04]">
      <svg className="h-full w-full">
        <filter id="grain">
          <feTurbulence
            ref={filterRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
