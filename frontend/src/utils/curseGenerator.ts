import { CurseResult, CurseLevel } from '@/types/vecna';

const MESSAGES: Record<CurseLevel, string[]> = {
  SAFE: [
    "You are untouched by the Techside Down.",
    "Vecna cannot reach you... yet.",
    "Your mind remains your own. For now.",
    "The darkness has not found you.",
  ],
  INFECTED: [
    "Vecna senses your presence...",
    "The Techside Down whispers your name.",
    "Dark tendrils brush against your consciousness.",
    "You've caught Vecna's attention.",
  ],
  POSSESSED: [
    "Vecna has claimed you.",
    "You are one with the Mind Flayer.",
    "The clock is ticking for you...",
    "There is no escape from Vecna's grasp.",
  ],
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCurseResult(): CurseResult {
  const levels: CurseLevel[] = ['SAFE', 'INFECTED', 'POSSESSED'];
  const curseLevel = randomFromArray(levels);
  
  const intensityRanges: Record<CurseLevel, [number, number]> = {
    SAFE: [5, 30],
    INFECTED: [40, 70],
    POSSESSED: [75, 100],
  };
  
  const [min, max] = intensityRanges[curseLevel];
  const intensity = randomInt(min, max);
  const message = randomFromArray(MESSAGES[curseLevel]);
  
  return {
    curse_level: curseLevel,
    intensity,
    message,
    timestamp: Date.now(),
  };
}

export function getCurseLevelColor(level: CurseLevel): string {
  switch (level) {
    case 'SAFE':
      return 'text-safe text-glow-safe';
    case 'INFECTED':
      return 'text-infected text-glow-infected';
    case 'POSSESSED':
      return 'text-possessed text-glow-possessed animate-glitch';
    default:
      return 'text-foreground';
  }
}
