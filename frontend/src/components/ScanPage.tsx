import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScanBox } from './ScanBox';
import { MicLevel } from './MicLevel';
import { Button } from '@/components/ui/button';
import { GlitchText } from './GlitchText';

interface ScanPageProps {
  stream: MediaStream | null;
  micLevel: number;
  scanProgress: number;
  scanPhase: string;
  onCancel: () => void;
}

export function ScanPage({
  stream,
  micLevel,
  scanProgress,
  scanPhase,
  onCancel,
}: ScanPageProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Title */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-accent text-glow mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlitchText text={`Scanning${dots}`} glitch delay={0} />
      </motion.h2>

      {/* Scan box with camera preview */}
      <ScanBox stream={stream} />

      {/* Mic level indicator */}
      <MicLevel level={micLevel} />

      {/* Progress bar */}
      <div className="w-64 md:w-80 mx-auto mt-6 space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider">
          <span>Progress</span>
          <span>{Math.round(scanProgress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
            style={{ boxShadow: '0 0 10px hsl(var(--accent))' }}
            animate={{ width: `${scanProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Status message */}
      <motion.p
        className="text-sm text-muted-foreground text-center mt-6 max-w-xs"
        key={scanPhase}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {scanPhase}
      </motion.p>

      {/* Cancel button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </motion.div>

      {/* Ambient glow effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, hsl(var(--accent) / 0.1), transparent 50%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
