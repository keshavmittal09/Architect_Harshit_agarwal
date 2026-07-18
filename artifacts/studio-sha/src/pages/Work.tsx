import React, { useEffect, useState, useRef } from 'react';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/data/projects';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    setIsHoverDevice(window.matchMedia('(hover: hover)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <PageTransition>
      <main className="flex-1 w-full pt-40 pb-32 max-w-[2000px] mx-auto bg-background min-h-screen relative">
        <header className="px-6 md:px-[10vw] mb-20 md:mb-32 flex justify-between items-end">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(4rem,10vw,9rem)] text-foreground leading-[0.9]"
          >
            WORK
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-[0.7rem] uppercase tracking-[0.1em] text-secondary pb-4"
          >
            ({String(projects.length).padStart(2, '0')})
          </motion.span>
        </header>

        <div className="w-full h-[1px] bg-primary/20 mb-8" />

        <section className="flex flex-col relative">
          {projects.map((project, index) => (
            <div 
              key={project.slug} 
              className="relative w-full"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-full h-[1px] bg-border" />
              <Link href={`/work/${project.slug}`} className="block w-full">
                <div 
                  className={`w-full px-6 md:px-[10vw] py-8 transition-colors duration-300 flex items-center justify-between group ${
                    hoveredIndex === index ? 'bg-primary/[0.025]' : 'bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
                    <span className={`font-sans text-[0.7rem] transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-primary' : 'text-secondary'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className={`font-serif text-[clamp(1.5rem,2.5vw,2.8rem)] transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-primary' : 'text-foreground'
                    }`}>
                      {project.name}
                    </h2>
                  </div>
                  
                  <div className={`hidden md:block font-sans text-[0.7rem] uppercase tracking-[0.15em] transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-primary' : 'text-secondary'
                  }`}>
                    {project.year} <span className="opacity-50 mx-2">|</span> {project.typology}
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className="w-full h-[1px] bg-border" />
        </section>

        {/* Floating Image Preview (Desktop Only) */}
        {window.matchMedia('(hover: hover)').matches && (
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed pointer-events-none z-50 w-[350px] h-[430px] overflow-hidden hidden md:block"
                style={{
                  left: mousePos.x + 20,
                  top: mousePos.y - 200,
                }}
              >
                <img
                  src={projects[hoveredIndex].images[0]}
                  alt="Project preview"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </PageTransition>
  );
}
