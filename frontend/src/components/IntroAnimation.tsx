import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText } from './GlitchText';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Radial glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, hsl(0 50% 10%) 0%, hsl(0 0% 0%) 70%)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
              background: `radial-gradient(circle, hsl(${i * 30} 80% 30% / 0.3), transparent 70%)`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Title reveal */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-accent text-glow mb-4">
            <GlitchText text="AI VECNA" glitch delay={0.8} />
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground">
            <GlitchText text="CURSE" delay={1.4} />
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          Are you marked by the Techside Down?
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.button
            className="px-10 py-4 text-lg font-bold uppercase tracking-wider bg-gradient-to-br from-primary to-secondary text-primary-foreground border-2 border-accent rounded-xl shadow-glow hover:shadow-glow-intense transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter Experience 🔊
          </motion.button>
        </motion.div>
      </div>

      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none scan-lines opacity-50" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none noise-overlay" />
    </motion.div>
  );
}
