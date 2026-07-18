import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  const navLinks = [
    { label: 'STUDIO', path: '/studio' },
    { label: 'WORK', path: '/work' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <footer className="bg-[#0e0e0e] w-full pt-16 pb-12 relative z-10 border-t border-primary/20">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-primary w-full opacity-30" />
      <div className="max-w-[2000px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <h4 className="font-serif text-[1.2rem] tracking-wide uppercase text-primary mb-2">
          STUDIO HARSHIT AGARWAL
        </h4>
        <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-secondary mb-12">
          ARCHITECTURE | INTERIORS | CONSTRUCTION
        </p>

        <div className="flex gap-8 md:gap-12 mb-16">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="font-sans text-[0.65rem] tracking-wider text-secondary/60">
          Bareilly, Uttar Pradesh, India
        </p>
      </div>
    </footer>
  );
}
