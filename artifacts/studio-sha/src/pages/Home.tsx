import React, { useRef, useLayoutEffect } from 'react';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/data/projects';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import TextReveal from '@/components/TextReveal';
import bgImg from '@assets/7_1784381147735.png';
import dreamAvenueImg from '@assets/Dream_Avenue_1784381147736.png';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, window.innerHeight], [0, -150]);

  const featuredProjects = projects;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <PageTransition>
      <main className="flex-1 w-full flex flex-col bg-background">
        {/* Section 1: Hero */}
        <section className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <img
              src={bgImg}
              alt="Architecture Background"
              className="w-full h-full object-cover saturate-[0.3]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#171717]/60" />
          
          <div className="relative z-10 flex flex-col items-center justify-center px-6">
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-secondary mb-6 block">
              ARCHITECTURE
            </span>
            <h1 className="font-serif italic text-foreground text-center flex flex-col items-center justify-center m-0 p-0 leading-[0.95] text-[clamp(2.5rem,7vw,6rem)]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Space is
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                the practice.
              </motion.span>
            </h1>
            <motion.div
              className="w-[48px] h-[1px] bg-primary mt-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex">
            <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-secondary">
              SCROLL
            </span>
            <div className="w-[1px] h-[40px] overflow-hidden bg-secondary/20 relative">
              <div className="w-full h-full bg-primary absolute top-0 left-0 origin-top animate-[scrollLine_1.5s_infinite_ease-in-out]" />
            </div>
          </div>
        </section>

        {/* Section 2: Philosophy */}
        <section className="w-full py-[15vh] px-6 md:px-[10vw] max-w-[2000px] mx-auto bg-background">
          <TextReveal as="div" className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-secondary mb-8">
            PHILOSOPHY
          </TextReveal>
          <div className="max-w-4xl text-[clamp(1.1rem,2.2vw,2rem)] leading-[1.6] text-foreground font-serif text-balance">
            <TextReveal delay={0.2}>
              We build what endures.
            </TextReveal>
            <TextReveal delay={0.3}>
              Each commission begins with listening —
            </TextReveal>
            <TextReveal delay={0.4}>
              to the land, to the light,
            </TextReveal>
            <TextReveal delay={0.5}>
              to the life the space will hold.
            </TextReveal>
          </div>
        </section>

        {/* Section 3: Featured Projects — HORIZONTAL SCROLL STRIP */}
        <section ref={sectionRef} className="w-full bg-background relative h-auto overflow-hidden">
          <div className="px-6 md:px-[10vw] mb-12 flex items-baseline gap-4 pt-12">
            <h2 className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-secondary">
              SELECTED WORK
            </h2>
            <span className="font-sans text-[0.6rem] text-secondary/60 tracking-wider">
              (scroll to explore)
            </span>
          </div>

          <div ref={trackRef} className="flex flex-row items-stretch w-max pb-24">
            {featuredProjects.map((project, i) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="group cursor-pointer block relative flex-shrink-0 mx-[2vw] first:ml-[10vw] last:mr-[10vw]" style={{ width: 'clamp(280px, 65vw, 860px)' }}>
                <div className="w-full h-[85vh] relative overflow-hidden bg-muted/10">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                {/* Overlay Meta */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-[2px] h-[48px] bg-primary" />
                    <span className="font-sans text-[0.7rem] text-secondary mt-1 tracking-wider">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-[clamp(1.5rem,3.5vw,3rem)] text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="font-sans text-[0.7rem] uppercase tracking-[0.1em] text-secondary mt-2">
                      {project.location} <span className="opacity-50 mx-2">|</span> {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: Studio Teaser */}
        <section className="w-full py-[12vh] px-6 md:px-[10vw] max-w-[2000px] mx-auto bg-background">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-[4vw]">
            <div className="w-full md:w-1/2">
              <img
                src={dreamAvenueImg}
                alt="Studio Approach"
                className="w-full h-[60vh] object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 pr-0 lg:pr-12">
              <TextReveal as="h2" className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-secondary mb-8">
                STUDIO
              </TextReveal>
              <p className="font-serif text-foreground text-[1.3rem] leading-[1.6] mb-12">
                We work slowly and thoroughly. We do not take on more than we can hold with complete attention.
              </p>
              <Link href="/studio" className="inline-block font-sans text-[0.8rem] text-secondary hover:text-primary transition-colors duration-300 tracking-wider">
                About the Studio →
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}} />
    </PageTransition>
  );
}
