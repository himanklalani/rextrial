'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const COLUMNS = 15;
const ROWS = 15;
const TOTAL_BLOCKS = COLUMNS * ROWS;

export default function GlobalPreloader() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [loaderType, setLoaderType] = useState<'counter' | 'pixel'>('counter');
  const isFirstLoadRef = useRef(true);
  const pathname = usePathname();

  useEffect(() => {
    setShowLoader(true);

    if (pathname === '/' && isFirstLoadRef.current) {
      setLoaderType('counter');
      isFirstLoadRef.current = false;
      
      // Fake a rapid loading progress for the homepage
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 3;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            setShowLoader(false);
          }, 400); // Wait a bit at 100%
        }
        setLoadProgress(progress);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setLoaderType('pixel');
      isFirstLoadRef.current = false;
      
      // On navigation to other pages, we just want a quick pixel transition
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  const pixelVariants = {
    initial: { opacity: 1, scale: 1.02 },
    exit: (custom: number) => ({
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
        delay: (custom % COLUMNS) * 0.02 + Math.floor(custom / COLUMNS) * 0.02 + Math.random() * 0.1,
        ease: "easeInOut"
      }
    })
  };

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
          exit={loaderType === 'counter' ? { opacity: 0 } : undefined}
          transition={loaderType === 'counter' ? { duration: 0.8, ease: [0.77, 0.02, 0.24, 1.02] } : undefined}
        >
          {loaderType === 'counter' ? (
            // ==========================================
            // HOMEPAGE FIRST LOAD (COUNTER)
            // ==========================================
            <motion.div 
              className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center pointer-events-auto"
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Background huge percentage number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
                <span className="text-[35vw] font-outfit font-light tracking-tighter text-brand-white-pure leading-none">
                  {loadProgress}
                </span>
              </div>

              <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center">
                <motion.h2 
                  className="text-4xl md:text-5xl font-outfit font-light tracking-tight text-brand-white-pure mb-12"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Rex <span className="text-brand-green font-bold">International</span>
                </motion.h2>

                <div className="w-full h-[1px] bg-brand-gray/10 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-brand-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadProgress}%` }}
                    transition={{ duration: 0.2, ease: "linear" }}
                  />
                </div>
                
                <div className="w-full flex justify-between mt-4 text-xs font-semibold uppercase tracking-widest text-brand-gray-light/50">
                  <span>Initializing</span>
                  <span className="tabular-nums text-brand-white-pure">{loadProgress}%</span>
                </div>
              </div>
            </motion.div>
          ) : (
            // ==========================================
            // SUB-PAGE NAVIGATION (PIXEL REVEAL)
            // ==========================================
            <div 
              className="absolute -inset-2 pointer-events-auto"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)` 
              }}
            >
              {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={pixelVariants}
                  initial="initial"
                  exit="exit"
                  className="bg-brand-dark w-full h-full origin-center"
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
