import { motion } from 'framer-motion';
import { CurseResult } from '@/types/vecna';
import { getCurseLevelColor } from '@/utils/curseGenerator';
import { GlitchText } from './GlitchText';

interface ResultDisplayProps {
  result: CurseResult;
  playerName: string;
}

export function ResultDisplay({ result, playerName }: ResultDisplayProps) {
  const isPossessed = result.curse_level === 'POSSESSED';
  const colorClass = getCurseLevelColor(result.curse_level);

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Player name */}
      <motion.h3
        className="text-lg md:text-xl text-muted-foreground uppercase tracking-widest"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {playerName}
      </motion.h3>

      {/* YOU ARE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="text-2xl md:text-3xl text-foreground uppercase tracking-wider">
          You Are
        </span>
      </motion.div>

      {/* Curse Level */}
      <motion.div
        className={`relative ${isPossessed ? 'animate-glitch-intense' : ''}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
      >
        <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase ${colorClass}`}>
          <GlitchText text={result.curse_level} glitch={isPossessed} delay={0.8} />
        </h2>
      </motion.div>

      {/* Message */}
      <motion.p
        className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {result.message}
      </motion.p>

      {/* Intensity bar */}
      <motion.div
        className="w-64 md:w-80 mx-auto space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex justify-between text-sm text-muted-foreground uppercase tracking-wider">
          <span>Intensity</span>
          <span className={colorClass}>{result.intensity}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: result.curse_level === 'SAFE'
                ? 'linear-gradient(90deg, hsl(var(--safe)), hsl(168, 100%, 60%))'
                : result.curse_level === 'INFECTED'
                  ? 'linear-gradient(90deg, hsl(var(--infected)), hsl(270, 100%, 70%))'
                  : 'linear-gradient(90deg, hsl(var(--possessed)), hsl(0, 100%, 70%))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${result.intensity}%` }}
            transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
