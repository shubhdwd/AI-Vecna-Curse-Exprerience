import { motion } from 'framer-motion';
import { LeaderboardEntry, CurseLevel } from '@/types/vecna';
import { getCurseLevelColor } from '@/utils/curseGenerator';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <motion.div
      className="w-full max-w-sm bg-gradient-card border-2 border-primary/50 rounded-xl p-4 box-glow"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-bold text-accent uppercase tracking-wider mb-4 text-glow">
        Vecna Leaderboard
      </h3>

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No entries yet. Be the first to save a result.
        </p>
      ) : (
        <ul className="space-y-1 max-h-[50vh] overflow-y-auto pr-2">
          {entries.map((entry, index) => (
            <motion.li
              key={entry.id || index}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 border-b border-primary/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-muted-foreground w-6">
                  {index + 1}.
                </span>
                <div>
                  <span className="text-sm font-medium">{entry.name}</span>
                  <span className={`ml-2 text-xs ${getCurseLevelColor(entry.curse)}`}>
                    {entry.curse}
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-accent">
                {entry.score}%
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
