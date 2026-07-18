import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import bgImg from '@assets/5_1784381147733.png';

interface IntroAnimationProps {
  onComplete: () => void;
}

const NAME = 'HARSHIT AGARWAL'.split('');

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState(0);
  // 0 = black silence
  // 1 = scan line sweeps
  // 2 = letterbox opens, image bleeds through
  // 3 = text assembles
  // 4 = fade to site

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 300));   // scan line
    t.push(setTimeout(() => setPhase(2), 1200));  // letterbox open
    t.push(setTimeout(() => setPhase(3), 2200));  // text
    t.push(setTimeout(() => setPhase(4), 3800));  // fade
    t.push(setTimeout(() => onComplete(), 4500)); // done

    const skip = () => { t.forEach(clearTimeout); onComplete(); };
    window.addEventListener('click', skip);
    window.addEventListener('keydown', skip);
    return () => {
      t.forEach(clearTimeout);
      window.removeEventListener('click', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden select-none"
      style={{ background: '#080808' }}
      animate={{ opacity: phase >= 4 ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ── Architectural background image ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: phase >= 2 ? 1.04 : 1.12 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        <img
          src={bgImg}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          style={{
            filter: 'saturate(0.15) brightness(0.3)',
          }}
        />
        {/* Deep radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(8,8,8,0.7) 70%, #080808 100%)',
          }}
        />
      </motion.div>

      {/* ── Cinematic letterbox bars ── */}
      {/* Top bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20"
        style={{ background: '#080808', transformOrigin: 'top' }}
        initial={{ height: '50%' }}
        animate={phase >= 2 ? { height: 0 } : { height: '50%' }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Bottom bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ background: '#080808', transformOrigin: 'bottom' }}
        initial={{ height: '50%' }}
        animate={phase >= 2 ? { height: 0 } : { height: '50%' }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Precision scan line ── */}
      <motion.div
        className="absolute z-30"
        style={{
          top: '50%',
          left: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(231,186,114,0.6) 20%, #E7BA72 50%, rgba(231,186,114,0.6) 80%, transparent)',
          translateY: '-50%',
          boxShadow: '0 0 20px 1px rgba(231,186,114,0.3)',
        }}
        initial={{ width: 0 }}
        animate={phase >= 1 ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* ── Text Content ── */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">

        {/* Descriptor line */}
        <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <motion.p
            className="font-sans text-center"
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.45em',
              color: 'rgba(163,153,143,0.7)',
            }}
            initial={{ y: 24, opacity: 0 }}
            animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            ARCHITECTURE · INTERIORS · CONSTRUCTION
          </motion.p>
        </div>

        {/* Main name — letter by letter */}
        <div
          style={{
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          {NAME.map((char, i) => (
            <motion.span
              key={i}
              style={{
                fontFamily: 'Lora, serif',
                fontSize: 'clamp(2.2rem, 5.5vw, 5.2rem)',
                fontWeight: 400,
                color: '#D6D4D5',
                lineHeight: 1,
                display: 'inline-block',
                ...(char === ' '
                  ? { width: 'clamp(0.4rem, 1.2vw, 1rem)' }
                  : {}),
              }}
              initial={{ y: '110%', opacity: 0 }}
              animate={
                phase >= 3
                  ? { y: '0%', opacity: 1 }
                  : { y: '110%', opacity: 0 }
              }
              transition={{
                duration: 1.1,
                delay: i * 0.038,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Gold hairline rule */}
        <motion.div
          style={{
            height: '1px',
            width: 64,
            background: '#E7BA72',
            marginTop: '2rem',
            originX: 0,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            phase >= 3 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Location */}
        <motion.p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.56rem',
            letterSpacing: '0.35em',
            color: 'rgba(163,153,143,0.5)',
            marginTop: '1.1rem',
          }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 1.4 }}
        >
          BAREILLY · INDIA · EST. 2012
        </motion.p>
      </div>

      {/* ── Frame counter aesthetic ── */}
      <motion.div
        className="absolute z-40"
        style={{
          top: '2rem',
          right: '2.5rem',
          fontFamily: 'Inter, monospace',
          fontSize: '0.5rem',
          letterSpacing: '0.12em',
          color: 'rgba(163,153,143,0.25)',
        }}
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        SHA — MMXXIV
      </motion.div>

      {/* ── Skip hint ── */}
      <motion.div
        className="absolute z-40"
        style={{
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.5rem',
          letterSpacing: '0.22em',
          color: 'rgba(163,153,143,0.3)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Click anywhere to skip
      </motion.div>

      {/* ── Corner crosshairs (architectural detail) ── */}
      {[
        { top: '1.5rem', left: '1.5rem' },
        { top: '1.5rem', right: '1.5rem' },
        { bottom: '1.5rem', left: '1.5rem' },
        { bottom: '1.5rem', right: '1.5rem' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute z-40"
          style={{
            ...pos,
            width: '16px',
            height: '16px',
            borderColor: 'rgba(231,186,114,0.2)',
            ...(i === 0
              ? { borderLeft: '1px solid', borderTop: '1px solid' }
              : i === 1
              ? { borderRight: '1px solid', borderTop: '1px solid' }
              : i === 2
              ? { borderLeft: '1px solid', borderBottom: '1px solid' }
              : { borderRight: '1px solid', borderBottom: '1px solid' }),
          }}
          initial={{ opacity: 0, scale: 1.5 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.8, delay: i * 0.08 }}
        />
      ))}
    </motion.div>
  );
}
