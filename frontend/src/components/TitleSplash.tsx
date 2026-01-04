import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TitleSplashProps {
  onComplete: () => void;
}

export function TitleSplash({ onComplete }: TitleSplashProps) {
  const [phase, setPhase] = useState<'stranger' | 'techside' | 'fade'>('stranger');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('techside'), 2500);
    const timer2 = setTimeout(() => setPhase('fade'), 5000);
    const timer3 = setTimeout(() => onComplete(), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fade' ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated lightning/static background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Red atmospheric glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, hsl(0 70% 15% / 0.6) 0%, transparent 60%)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.5, 0.9, 0.4],
            scale: [1, 1.1, 1.05, 1.15, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Flickering light rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 origin-bottom"
            style={{
              width: '2px',
              height: '150vh',
              background: `linear-gradient(to top, hsl(0 80% 50% / 0.4), transparent)`,
              transform: `rotate(${i * 45}deg)`,
              filter: 'blur(3px)',
            }}
            animate={{
              opacity: [0, 0.6, 0, 0.4, 0],
              scaleY: [0.8, 1, 0.9, 1.1, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating particles/embers */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 30} 100% ${50 + Math.random() * 30}%)`,
              boxShadow: '0 0 10px currentColor',
            }}
            animate={{
              y: [0, -200 - Math.random() * 300],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Lightning flash */}
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            opacity: [0, 0, 0.8, 0, 0, 0.5, 0, 0, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            times: [0, 0.4, 0.42, 0.44, 0.6, 0.62, 0.64, 0.8, 1],
          }}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-20" />

      {/* Scan lines */}
      <div className="absolute inset-0 scan-lines opacity-40" />

      {/* Title content */}
      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          {phase === 'stranger' && (
            <motion.div
              key="stranger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Glow behind text */}
              <motion.div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(ellipse, hsl(0 100% 50% / 0.5) 0%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider relative"
                style={{ fontFamily: "'Cinzel', serif" }}
                initial={{ letterSpacing: '0.5em', opacity: 0 }}
                animate={{ letterSpacing: '0.15em', opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <motion.span
                  className="inline-block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, #ff1a1a 0%, #cc0000 50%, #800000 100%)',
                    textShadow: '0 0 60px hsl(0 100% 50% / 0.8), 0 0 120px hsl(0 100% 40% / 0.6)',
                    WebkitTextStroke: '1px hsl(0 100% 30%)',
                  }}
                  animate={{
                    textShadow: [
                      '0 0 60px hsl(0 100% 50% / 0.8), 0 0 120px hsl(0 100% 40% / 0.6)',
                      '0 0 80px hsl(0 100% 60% / 1), 0 0 160px hsl(0 100% 50% / 0.8)',
                      '0 0 60px hsl(0 100% 50% / 0.8), 0 0 120px hsl(0 100% 40% / 0.6)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  STRANGER
                </motion.span>
                <br />
                <motion.span
                  className="inline-block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, #ff1a1a 0%, #cc0000 50%, #800000 100%)',
                    textShadow: '0 0 60px hsl(0 100% 50% / 0.8), 0 0 120px hsl(0 100% 40% / 0.6)',
                    WebkitTextStroke: '1px hsl(0 100% 30%)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  THINGS
                </motion.span>
              </motion.h1>
            </motion.div>
          )}

          {phase === 'techside' && (
            <motion.div
              key="techside"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Intense glow */}
              <motion.div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(ellipse, hsl(0 100% 50% / 0.7) 0%, hsl(270 80% 40% / 0.3) 50%, transparent 80%)',
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider relative"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <motion.span
                  className="inline-block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, #ff3366 0%, #cc0033 50%, #660022 100%)',
                    textShadow: '0 0 80px hsl(340 100% 50% / 0.9), 0 0 150px hsl(340 100% 40% / 0.7)',
                    WebkitTextStroke: '1px hsl(340 100% 40%)',
                  }}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  TECHSIDE
                </motion.span>
                <br />
                <motion.span
                  className="inline-block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, #ff3366 0%, #cc0033 50%, #660022 100%)',
                    textShadow: '0 0 80px hsl(340 100% 50% / 0.9), 0 0 150px hsl(340 100% 40% / 0.7)',
                    WebkitTextStroke: '1px hsl(340 100% 40%)',
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                >
                  DOWN
                </motion.span>
              </motion.h1>

              {/* Glitch effect layers */}
              <motion.div
                className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider opacity-50"
                style={{ 
                  fontFamily: "'Cinzel', serif",
                  color: '#00ffff',
                  mixBlendMode: 'screen',
                }}
                animate={{
                  x: [-2, 2, -1, 3, 0],
                  opacity: [0, 0.3, 0, 0.2, 0],
                }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
              >
                TECHSIDE<br />DOWN
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />
    </motion.div>
  );
}