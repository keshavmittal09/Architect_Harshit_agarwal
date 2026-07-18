import React, { useEffect, useState, useRef } from 'react';
import PageTransition from '@/components/PageTransition';
import TextReveal from '@/components/TextReveal';
import { motion, useInView } from 'framer-motion';

import studioImage1 from '@assets/5_1784381147733.png';
import studioImage2 from '@assets/Dream_Avenue_1784381147736.png';

function Counter({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easePercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easePercentage));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return <span ref={ref}>{count.toString().padStart(2, '0')}</span>;
}

export default function Studio() {
  const heroWords = ['The', 'practice'];

  return (
    <PageTransition>
      <main className="flex-1 w-full bg-background">
        {/* Hero */}
        <section className="relative w-full min-h-screen flex items-center px-6 md:px-[10vw]">
          <div className="flex items-start gap-8 md:gap-12 md:pl-[15vw]">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 80 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="w-[2px] bg-primary mt-4 hidden md:block" 
            />
            <h1 className="font-serif italic text-[clamp(4rem,9vw,8.5rem)] text-foreground leading-[0.88] m-0">
              {heroWords.map((word, i) => (
                <span key={i} className="block overflow-hidden pb-4">
                  <motion.span
                    className="block"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: i * 0.2,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </section>

        {/* Block 1: Image Left, Text Right */}
        <section className="w-full py-24 px-6 md:px-[10vw] flex flex-col md:flex-row items-center gap-12 md:gap-[8vw]">
          <div className="w-full md:w-1/2">
            <img 
              src={studioImage1} 
              alt="Studio details" 
              className="w-full h-[70vh] object-cover bg-muted/10"
            />
          </div>
          <div className="w-full md:w-1/2">
            <TextReveal className="font-serif text-[1.6rem] text-foreground leading-[1.5] mb-8">
              I trained in spaces that taught me that architecture is not about forms — it is about the light that falls between them.
            </TextReveal>
            <TextReveal className="font-serif italic text-[1.3rem] text-secondary leading-[1.5]">
              Every project we take is a conversation about what endures.
            </TextReveal>
          </div>
        </section>

        {/* Block 2: Text Left, Image Right */}
        <section className="w-full py-24 px-6 md:px-[10vw] flex flex-col-reverse md:flex-row items-center gap-12 md:gap-[8vw]">
          <div className="w-full md:w-1/2">
            <TextReveal className="font-serif text-[1.4rem] text-foreground leading-[1.6] mb-12">
              We work slowly and thoroughly. We do not take on more than we can hold with complete attention. Our practice is based in Bareilly, and we build across Northern India.
            </TextReveal>
            <TextReveal as="div" className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">
              — Harshit Agarwal, Principal Architect
            </TextReveal>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src={studioImage2} 
              alt="Studio projects" 
              className="w-full h-[60vh] object-cover bg-muted/10"
            />
          </div>
        </section>

        {/* Studio Facts */}
        <section className="w-full py-32 px-6 md:px-[10vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-primary/20 pt-16">
            <div className="flex flex-col gap-4">
              <div className="font-serif text-[clamp(4rem,6vw,5rem)] text-primary leading-none">
                <Counter end={12} /><span className="text-[0.8em]">+</span>
              </div>
              <div className="font-sans text-[0.8rem] uppercase tracking-[0.2em] text-secondary">
                YEARS
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="font-serif text-[clamp(4rem,6vw,5rem)] text-primary leading-none">
                <Counter end={50} /><span className="text-[0.8em]">+</span>
              </div>
              <div className="font-sans text-[0.8rem] uppercase tracking-[0.2em] text-secondary">
                PROJECTS
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-serif text-[clamp(4rem,6vw,5rem)] text-primary leading-none">
                <Counter end={3} />
              </div>
              <div className="font-sans text-[0.8rem] uppercase tracking-[0.2em] text-secondary">
                STATES
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
