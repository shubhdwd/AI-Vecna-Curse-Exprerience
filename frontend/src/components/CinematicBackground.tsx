import { useEffect, useState } from 'react';
import './CinematicBackground.css'

export function CinematicBackground() {
  const [lightningFlash, setLightningFlash] = useState(false);

  // Random lightning effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const triggerLightning = () => {
      const randomDelay = 8000 + Math.random() * 20000; // 8-28 seconds
      timeoutId = setTimeout(() => {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 100);
        triggerLightning();
      }, randomDelay);
    };
    triggerLightning();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(0 50% 8%) 0%, hsl(0 0% 0%) 70%)',
        }}
      />

      {/* Simplified animated fog - CSS only */}
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />

      {/* Reduced floating orbs - 3 instead of 6 */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Static smoke gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: 'linear-gradient(to top, hsl(0 0% 0% / 0.8), transparent)',
        }}
      />
      {/* Pulsing center glow - CSS animation */}
      <div className="center-glow" />

      {/* Lightning flash overlay */}
      <div 
        className={`absolute inset-0 bg-white/5 transition-opacity duration-100 ${lightningFlash ? 'opacity-30' : 'opacity-0'}`}
      />

      {/* Reduced floating particles - 8 instead of 20, CSS only */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="bg-particle"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        />
      ))}

      {/* Edge glow effects - static */}

      {/* Edge glow effects */}
      <div 
        className="absolute top-0 left-0 w-full h-32"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--accent) / 0.05), transparent)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-full h-32"
        style={{
          background: 'linear-gradient(to top, hsl(var(--primary) / 0.1), transparent)',
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 0% / 0.6) 100%)',
        }}
      />

      {/* Scan lines */}
      <div className="absolute inset-0 scan-lines opacity-20" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
    </div>
  );
}