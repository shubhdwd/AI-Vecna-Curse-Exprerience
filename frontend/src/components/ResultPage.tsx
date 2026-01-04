import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CurseResult, LeaderboardEntry } from '@/types/vecna';
import { ResultDisplay } from './ResultDisplay';
import { Leaderboard } from './Leaderboard';
import { Button } from '@/components/ui/button';
import { generateResultImage } from '@/utils/canvasGenerator';
import { toast } from 'sonner';

interface ResultPageProps {
  result: CurseResult;
  playerName: string;
  leaderboard: LeaderboardEntry[];
  onSaveResult: () => void;
  onScanAgain: () => void;
}

export function ResultPage({
  result,
  playerName,
  leaderboard,
  onSaveResult,
  onScanAgain,
}: ResultPageProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate preview image
  useEffect(() => {
    const generatePreview = async () => {
      try {
        const blob = await generateResultImage(result, playerName);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);

        // Draw to canvas for display
        if (canvasRef.current) {
          const img = new Image();
          img.onload = () => {
            const ctx = canvasRef.current!.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
              ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            }
          };
          img.src = url;
        }
      } catch (err) {
        console.error('Failed to generate preview:', err);
      }
    };

    generatePreview();

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [result, playerName]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onSaveResult();
      toast.success('Result saved to leaderboard!');
    } catch {
      toast.error('Failed to save result');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await generateResultImage(result, playerName);
      const filename = `vecna_curse_${playerName.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.png`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Image downloaded!');
    } catch (err) {
      console.error('Download failed:', err);
      toast.error('Failed to download image');
    }
  };

  return (
    <motion.div
      className="min-h-screen px-4 py-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Main result section */}
          <motion.div
            className="flex-1 w-full max-w-xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Result display */}
            <ResultDisplay result={result} playerName={playerName} />

            {/* Preview canvas */}
            <motion.div
              className="relative mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <canvas
                ref={canvasRef}
                width={540}
                height={540}
                className="w-full max-w-md mx-auto rounded-xl border-2 border-primary/30 shadow-card"
              />
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="vecna"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save to Leaderboard'}
              </Button>
              <Button variant="secondary" onClick={handleDownload}>
                Download
              </Button>
              <Button variant="outline" onClick={onScanAgain}>
                Scan Again
              </Button>
            </motion.div>
          </motion.div>

          {/* Leaderboard section */}
          <motion.div
            className="w-full lg:w-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Leaderboard entries={leaderboard} />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="text-center text-xs text-muted-foreground/50 mt-8 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        AI Vecna Curse Experience © 2026
      </motion.footer>
    </motion.div>
  );
}
