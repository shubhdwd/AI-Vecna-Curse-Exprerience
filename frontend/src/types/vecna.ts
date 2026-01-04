export type CurseLevel = 'SAFE' | 'INFECTED' | 'POSSESSED';

export interface CurseResult {
  curse_level: CurseLevel;
  intensity: number;
  message: string;
  timestamp: number;
}

export interface LeaderboardEntry {
  id?: string;
  name: string;
  curse: CurseLevel;
  score: number;
  timestamp: number;
}

export type AppState = 'intro' | 'name' | 'home' | 'scan' | 'result';
