import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitch?: boolean;
  delay?: number;
}
export const GlitchText = forwardRef<HTMLSpanElement, GlitchTextProps>(
  ({ text, className, glitch = false, delay = 0 }, ref) => {
    const letters = text.split('');

    return (
      <motion.span
        ref={ref}
        className={cn('inline-block relative', glitch && 'animate-glitch', className)}
        initial="hidden"
        animate="visible"
      >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
      
      {/* Glitch overlay layers */}
      {glitch && (
        <>
          <motion.span
            className={cn('absolute inset-0 text-accent/50', className)}
            style={{ clipPath: 'inset(0 0 50% 0)' }}
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0.5, 0.8, 0.5, 0.7, 0.5],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
          >
            {text}
          </motion.span>
          <motion.span
            className={cn('absolute inset-0 text-safe/30', className)}
            style={{ clipPath: 'inset(50% 0 0 0)' }}
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
            }}
            transition={{ duration: 0.25, repeat: Infinity, repeatType: 'reverse' }}
          >
            {text}
          </motion.span>
        </>
      )}
      </motion.span>
    );
  }
);

GlitchText.displayName = 'GlitchText';
