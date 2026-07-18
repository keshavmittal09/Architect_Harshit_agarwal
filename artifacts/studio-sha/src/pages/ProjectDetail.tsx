import React, { useRef } from 'react';
import { useParams, Link } from 'wouter';
import PageTransition from '@/components/PageTransition';
import TextReveal from '@/components/TextReveal';
import { projects } from '@/data/projects';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function ImageReveal({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <div ref={ref} className="relative w-full aspect-[16/9] overflow-hidden mb-8 md:mb-16">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <motion.div
        initial={{ width: '100%' }}
        animate={isInView ? { width: '0%' } : { width: '100%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 h-full bg-[#171717] origin-right"
      />
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, window.innerHeight], [0, -150]);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center font-serif text-2xl text-secondary">
          Project not found.
        </div>
      </PageTransition>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <PageTransition>
      <main className="flex-1 w-full bg-background">
        {/* Hero */}
        <section className="relative w-full h-[100dvh] overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <img
              src={project.images[0]}
              alt={project.name}
              className="w-full h-full object-cover saturate-[0.8]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-[8vw] pb-[10vh] flex flex-col gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-foreground leading-none m-0"
            >
              {project.name}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-secondary"
            >
              {project.location} <span className="opacity-50 mx-2">|</span> {project.year} <span className="opacity-50 mx-2">|</span> {project.typology}
            </motion.div>
          </div>
        </section>

        {/* Concept Note */}
        <section className="w-full py-24 md:py-32 px-6 md:px-[15vw]">
          <div className="w-[60px] h-[1px] bg-primary mb-16" />
          <TextReveal className="font-serif text-[1.2rem] md:text-[1.5rem] text-foreground leading-[1.7]">
            {project.conceptNote}
          </TextReveal>
        </section>

        {/* Gallery */}
        <section className="w-full px-6 md:px-[5vw]">
          {project.images.slice(1).map((img, i) => (
            <ImageReveal key={i} src={img} alt={`${project.name} view ${i + 2}`} />
          ))}
          {/* If there's only 1 image, show it again for demonstration of the component, or skip it. Let's just use the first image if it's the only one for the gallery. */}
          {project.images.length === 1 && (
            <ImageReveal src={project.images[0]} alt={`${project.name} full view`} />
          )}
        </section>

        {/* Metadata */}
        <section className="w-full py-24 px-6 md:px-[15vw] border-t border-border mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Location</span>
              <span className="font-serif text-[0.95rem] text-foreground">{project.location}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Year</span>
              <span className="font-serif text-[0.95rem] text-foreground">{project.year}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Typology</span>
              <span className="font-serif text-[0.95rem] text-foreground">{project.typology}</span>
            </div>
            {project.size && (
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Size</span>
                <span className="font-serif text-[0.95rem] text-foreground">{project.size}</span>
              </div>
            )}
            {project.materials && (
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Materials</span>
                <span className="font-serif text-[0.95rem] text-foreground">{project.materials}</span>
              </div>
            )}
            {project.status && (
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-secondary">Status</span>
                <span className="font-serif text-[0.95rem] text-foreground">{project.status}</span>
              </div>
            )}
          </div>
        </section>

        {/* Next/Prev Navigation */}
        <section className="w-full py-16 px-6 md:px-[10vw] flex justify-between items-center border-t border-border">
          {prevProject ? (
            <Link href={`/work/${prevProject.slug}`} className="font-serif text-lg text-foreground hover:text-primary transition-colors">
              ← Previous
            </Link>
          ) : <div />}
          
          {nextProject ? (
            <Link href={`/work/${nextProject.slug}`} className="font-serif text-lg text-foreground hover:text-primary transition-colors">
              Next →
            </Link>
          ) : <div />}
        </section>
      </main>
    </PageTransition>
  );
}
