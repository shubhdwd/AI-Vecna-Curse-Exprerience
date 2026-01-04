import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlitchText } from './GlitchText';

interface NameEntryProps {
  onSubmit: (name: string) => void;
  initialName?: string;
}

export function NameEntry({ onSubmit, initialName = '' }: NameEntryProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Enter your name to continue');
      return;
    }
    onSubmit(trimmedName);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 30%, hsl(0 80% 20% / 0.2), transparent 40%), radial-gradient(circle at 80% 70%, hsl(270 50% 20% / 0.15), transparent 40%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <div
          className="bg-gradient-card border-2 border-accent rounded-2xl p-8 box-glow"
          style={{
            transform: 'perspective(900px) rotateX(2deg)',
          }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-accent text-glow text-center mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlitchText text="THE CURSE AWAITS" delay={0.4} />
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Identify yourself before Vecna listens
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className="w-full h-14 text-lg bg-background border-2 border-primary/50 rounded-xl text-center font-medium focus:border-accent focus:ring-accent transition-all"
                maxLength={30}
                autoFocus
              />
              {error && (
                <motion.p
                  className="text-destructive text-sm mt-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button type="submit" variant="vecna" size="lg" className="w-full">
                Enter
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />
    </motion.div>
  );
}
