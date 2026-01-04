import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlitchText } from './GlitchText';

interface HomePageProps {
  playerName: string;
  onBeginScan: () => void;
}

export const HomePage = forwardRef<HTMLDivElement, HomePageProps>(
  ({ playerName, onBeginScan }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      {/* Welcome message */}
      <motion.p
        className="text-sm md:text-base text-muted-foreground uppercase tracking-widest mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome, {playerName}
      </motion.p>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
      >
        <span className="text-accent text-glow">
          <GlitchText text="AI Vecna Curse" glitch delay={0.5} />
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-muted-foreground text-center max-w-md mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Are you already marked by the Techside Down?
      </motion.p>

      {/* Scan button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="vecna"
          size="xl"
          onClick={onBeginScan}
          className="animate-pulse-glow"
        >
          Begin Scan
        </Button>
      </motion.div>

      {/* Hint */}
      <motion.p
        className="text-xs text-muted-foreground/60 mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        (You will be asked to enable camera & mic)
      </motion.p>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--infected)), transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      </motion.div>
    );
  }
);

HomePage.displayName = 'HomePage';
