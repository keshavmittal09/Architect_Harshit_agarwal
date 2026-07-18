import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState<'hidden' | 'visible' | 'fading'>('hidden');

  useEffect(() => {
    // Stage 1: Reveal "STUDIO"
    const timer1 = setTimeout(() => {
      setStage('visible');
    }, 300);

    // Stage 2: Fade out
    const timer2 = setTimeout(() => {
      setStage('fading');
    }, 2000);

    // Stage 3: Complete
    const timer3 = setTimeout(() => {
      onComplete();
    }, 2500);

    const handleSkip = () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      onComplete();
    };

    window.addEventListener('click', handleSkip);
    window.addEventListener('touchstart', handleSkip);
    window.addEventListener('wheel', handleSkip);
    window.addEventListener('keydown', handleSkip);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#171717]"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'fading' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stage !== 'hidden' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[1.2rem] text-primary tracking-[0.4em] mb-4"
          >
            STUDIO
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stage !== 'hidden' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-[3.5rem] text-primary tracking-[0.4em] text-center px-4"
          >
            HARSHIT AGARWAL
          </motion.div>

          <motion.div
            className="mt-8 h-[1px] bg-primary"
            initial={{ width: 0 }}
            animate={stage !== 'hidden' ? { width: 80 } : {}}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
