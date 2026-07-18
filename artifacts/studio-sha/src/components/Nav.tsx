import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import logoMark from '@assets/1_1784381147731.png';

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

function MagneticLink({ href, children, isActive }: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const moveX = (distanceX / rect.width) * 16;
    const moveY = (distanceY / rect.height) * 8;
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={href}>
      <motion.span
        ref={ref}
        style={{ x: springX, y: springY, display: 'inline-block' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`font-sans text-[0.7rem] tracking-[0.15em] uppercase transition-colors duration-300 cursor-pointer ${
          isActive ? 'text-primary' : 'text-foreground hover:text-primary'
        }`}
      >
        {children}
      </motion.span>
    </Link>
  );
}

export default function Nav() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'STUDIO', path: '/studio' },
    { label: 'WORK', path: '/work' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-[#171717]/95 backdrop-blur-md py-4 border-b border-border/50' : 'bg-transparent py-8'
        }`}
      >
        <div className="px-6 md:px-12 flex justify-between items-center max-w-[2000px] mx-auto">
          <Link href="/" className="z-50 block">
            <img src={logoMark} alt="Studio Harshit Agarwal" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12 items-center">
            {navLinks.map((link) => (
              <MagneticLink
                key={link.path}
                href={link.path}
                isActive={location === link.path || (link.path === '/work' && location.startsWith('/work'))}
              >
                {link.label}
              </MagneticLink>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 flex items-center justify-center w-10 h-10 text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-foreground">CLOSE</span>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#171717]/98 backdrop-blur-lg z-30 flex flex-col items-center justify-center gap-10 transition-transform duration-500 md:hidden ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            onClick={() => setMenuOpen(false)}
            className={`font-serif text-4xl tracking-wide transition-colors duration-300 ${
              location === link.path || (link.path === '/work' && location.startsWith('/work'))
                ? 'text-primary'
                : 'text-foreground hover:text-primary'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
