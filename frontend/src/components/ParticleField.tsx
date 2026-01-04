import { useMemo } from 'react';
import './ParticleField.css';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleField({ count = 15 }: { count?: number }) {
  // Reduced count for mobile performance
  const particles = useMemo<Particle[]>(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 8,
    })), [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full bg-accent/40"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}