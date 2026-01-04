import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScanBoxProps {
  stream: MediaStream | null;
}

export function ScanBox({ stream }: ScanBoxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-2 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, transparent 50%, hsl(var(--accent)) 100%)',
          opacity: 0.3,
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Main box */}
      <div className="relative w-full h-full border-2 border-accent rounded-lg overflow-hidden box-glow">
        {/* Camera preview */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover bg-muted scale-x-[-1]"
        />
        
        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{ boxShadow: '0 0 20px hsl(var(--accent))' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-accent" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-accent" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-accent" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-accent" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--accent)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--accent)) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>
    </div>
  );
}
