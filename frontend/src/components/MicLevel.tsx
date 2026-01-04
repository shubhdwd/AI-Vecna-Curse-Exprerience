import { motion } from 'framer-motion';

interface MicLevelProps {
  level: number;
}

export function MicLevel({ level }: MicLevelProps) {
  return (
    <div className="w-64 md:w-80 mx-auto mt-4">
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          className="w-3 h-3 rounded-full bg-accent"
          animate={{
            scale: level > 10 ? [1, 1.3, 1] : 1,
            opacity: level > 10 ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{ duration: 0.2 }}
        />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Voice Detection
        </span>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(40, 100%, 50%))',
            boxShadow: level > 30 ? '0 0 10px hsl(var(--accent))' : 'none',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </div>
  );
}
