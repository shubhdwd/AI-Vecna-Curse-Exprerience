import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState, CurseResult, LeaderboardEntry } from '@/types/vecna';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMediaStream } from '@/hooks/useMediaStream';
import { useMicAnalyzer } from '@/hooks/useMicAnalyzer';
import { generateCurseResult } from '@/utils/curseGenerator';
import { TitleSplash } from './TitleSplash';
import { IntroAnimation } from './IntroAnimation';
import { NameEntry } from './NameEntry';
import { HomePage } from './HomePage';
import { ScanPage } from './ScanPage';
import { ResultPage } from './ResultPage';
import { ParticleField } from './ParticleField';
import { CinematicBackground } from './CinematicBackground';
const BACKEND_URL = "http://localhost:5000"; 
// later change to deployed URL

// Background music URL - eerie ambient track
const BACKGROUND_MUSIC_URL = '/public/song.mp3';

type ExtendedAppState = AppState | 'splash';

const SCAN_PHASES = [
  'Initializing camera & microphone...',
  'Capturing face & voice — hold still and speak',
  'Analyzing biometric patterns...',
  'Detecting Techside Down signatures...',
  'Consulting with Vecna...',
  'Processing results...',
];

export function VecnaApp() {
  const [appState, setAppState] = useState<ExtendedAppState>('splash');
  const [playerName, setPlayerName] = useLocalStorage('vecna_player_name', '');
  const [result, setResult] = useState<CurseResult | null>(null);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('vecna_leaderboard', []);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState(SCAN_PHASES[0]);

  const { stream, startStream, stopStream, isLoading: streamLoading } = useMediaStream();
  const { level: micLevel, startAnalyzing, stopAnalyzing } = useMicAnalyzer();

   // Background music ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  // Initialize background music
  useEffect(() => {
    audioRef.current = new Audio(BACKGROUND_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Start music on first user interaction (after splash)
  useEffect(() => {
    if (appState !== 'splash' && !musicStarted && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked - will try again on next state change
      });
      setMusicStarted(true);
    }
  }, [appState, musicStarted]);

  // Pause music during scanning, resume after
  useEffect(() => {
    if (!audioRef.current) return;

    if (appState === 'scan') {
      audioRef.current.pause();
    } else if (musicStarted) {
      audioRef.current.play().catch(() => {});
    }
  }, [appState, musicStarted]);

  // Handle splash complete
  const handleSplashComplete = useCallback(() => {
    setAppState('intro');
  }, []);

  // Handle intro complete
  const handleIntroComplete = useCallback(() => {
    if (playerName) {
      setAppState('home');
    } else {
      setAppState('name');
    }
  }, [playerName]);

  // Handle name submission
  const handleNameSubmit = useCallback((name: string) => {
    setPlayerName(name);
    setAppState('home');
  }, [setPlayerName]);

  // Begin scan flow
  const handleBeginScan = useCallback(async () => {
    setAppState('scan');
    setScanProgress(0);
    setScanPhase(SCAN_PHASES[0]);

    const mediaStream = await startStream();
    
    if (mediaStream) {
      startAnalyzing(mediaStream);
    }

    // Simulate scan progress
    const scanDuration = 10000; // 10 seconds
    const startTime = Date.now();
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / scanDuration) * 100, 100);
      setScanProgress(progress);

      // Update phase based on progress
      const phaseIndex = Math.min(
        Math.floor((progress / 100) * SCAN_PHASES.length),
        SCAN_PHASES.length - 1
      );
      setScanPhase(SCAN_PHASES[phaseIndex]);

      if (progress >= 100) {
        clearInterval(progressInterval);
        
        // Stop media and generate result
        stopStream();
        stopAnalyzing();
        
        const curseResult = generateCurseResult();
        setResult(curseResult);
        setAppState('result');
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      stopStream();
      stopAnalyzing();
    };
  }, [startStream, startAnalyzing, stopStream, stopAnalyzing]);

  // Cancel scan
  const handleCancelScan = useCallback(() => {
    stopStream();
    stopAnalyzing();
    setAppState('home');
  }, [stopStream, stopAnalyzing]);

  const fetchLeaderboard = useCallback(async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/leaderboard`);
    const data = await res.json();
    setLeaderboard(data);
  } catch (error) {
    console.error("Failed to fetch leaderboard", error);
  }
}, []);


  // Save result to leaderboard
  const handleSaveResult = useCallback(async () => {
  if (!result || !playerName) return;

  try {
    const res = await fetch(`${BACKEND_URL}/api/leaderboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playerName,
        score: result.intensity,
      }),
    });

    const data = await res.json();
    console.log("Saved with AI verdict:", data.verdict);

    // ✅ now this function exists
    fetchLeaderboard();
  } catch (error) {
    console.error("Failed to save result", error);
  }
}, [result, playerName, fetchLeaderboard]);

useEffect(() => {
  if (appState === "result") {
    fetchLeaderboard();
  }
}, [appState, fetchLeaderboard]);

  // Scan again
  const handleScanAgain = useCallback(() => {
    setResult(null);
    setAppState('home');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream();
      stopAnalyzing();
    };
  }, [stopStream, stopAnalyzing]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
     {/* Cinematic background with all effects */}
      <CinematicBackground />
      
      {/* Additional floating particles */}
      <ParticleField count={25} />

      {/* Main content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {appState === 'splash' && (
            <TitleSplash key="splash" onComplete={handleSplashComplete} />
          )}

          {appState === 'intro' && (
            <IntroAnimation key="intro" onComplete={handleIntroComplete} />
          )}

          {appState === 'name' && (
            <NameEntry
              key="name"
              onSubmit={handleNameSubmit}
              initialName={playerName}
            />
          )}

          {appState === 'home' && (
            <HomePage
              key="home"
              playerName={playerName}
              onBeginScan={handleBeginScan}
            />
          )}

          {appState === 'scan' && (
            <ScanPage
              key="scan"
              stream={stream}
              micLevel={micLevel}
              scanProgress={scanProgress}
              scanPhase={scanPhase}
              onCancel={handleCancelScan}
            />
          )}

          {appState === 'result' && result && (
            <ResultPage
              key="result"
              result={result}
              playerName={playerName}
              leaderboard={leaderboard}
              onSaveResult={handleSaveResult}
              onScanAgain={handleScanAgain}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
