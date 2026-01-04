import { CurseResult, CurseLevel } from '@/types/vecna';

interface ColorPalette {
  bg1: string;
  bg2: string;
  accent: string;
  accentAlt: string;
  text: string;
  glow: string;
}

const PALETTES: Record<CurseLevel | 'DEFAULT', ColorPalette> = {
  SAFE: { bg1: '#001a12', bg2: '#003d2b', accent: '#00ffd5', accentAlt: '#00ff88', text: '#e6fff8', glow: '#00ffd5' },
  INFECTED: { bg1: '#1a0033', bg2: '#3d1a80', accent: '#a855f7', accentAlt: '#f59e0b', text: '#f3e8ff', glow: '#c084fc' },
  POSSESSED: { bg1: '#1a0000', bg2: '#4d0011', accent: '#ff3366', accentAlt: '#ff0044', text: '#fff0f3', glow: '#ff3366' },
  DEFAULT: { bg1: '#0a0000', bg2: '#1a0000', accent: '#ff6b6b', accentAlt: '#ff4444', text: '#fff', glow: '#ff6b6b' },
};

function hexToRgba(hex: string, alpha: number = 1): string {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  if (!text) return y;
  const words = String(text).split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY;
}

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  size: number,
  color: string
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'square';

  // Top-left
  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.lineTo(x, y);
  ctx.lineTo(x + size, y);
  ctx.stroke();

  // Top-right
  ctx.beginPath();
  ctx.moveTo(x + w - size, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + size);
  ctx.stroke();

  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(x, y + h - size);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + size, y + h);
  ctx.stroke();

  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(x + w - size, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - size);
  ctx.stroke();
}

function drawScanLines(ctx: CanvasRenderingContext2D, size: number, opacity: number): void {
  ctx.fillStyle = `rgba(0,0,0,${opacity})`;
  for (let i = 0; i < size; i += 4) {
    ctx.fillRect(0, i, size, 1);
  }
}

function drawHexPattern(ctx: CanvasRenderingContext2D, size: number, color: string): void {
  ctx.strokeStyle = hexToRgba(color, 0.05);
  ctx.lineWidth = 1;
  const hexSize = 40;
  
  for (let row = 0; row < size / hexSize + 2; row++) {
    for (let col = 0; col < size / hexSize + 2; col++) {
      const offsetX = (row % 2) * (hexSize * 0.866);
      const x = col * hexSize * 1.732 + offsetX;
      const y = row * hexSize * 1.5;
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + hexSize * 0.5 * Math.cos(angle);
        const py = y + hexSize * 0.5 * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}

function drawGlowCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string
): void {
  const layers = 5;
  for (let i = layers; i >= 0; i--) {
    const alpha = 0.15 - i * 0.025;
    const r = radius + i * 20;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(color, alpha);
    ctx.fill();
  }
}

export async function generateResultImage(
  result: CurseResult,
  playerName: string
): Promise<Blob> {
  const size = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const level = result.curse_level;
  const intensity = result.intensity;
  const message = result.message;
  const pal = PALETTES[level] || PALETTES.DEFAULT;

  // Deep background
  const bgGrad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size * 0.8);
  bgGrad.addColorStop(0, pal.bg2);
  bgGrad.addColorStop(0.5, pal.bg1);
  bgGrad.addColorStop(1, '#000000');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // Hexagonal pattern overlay
  drawHexPattern(ctx, size, pal.accent);

  // Animated-style diagonal streaks
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 3; i++) {
    const streak = ctx.createLinearGradient(
      size * (0.2 + i * 0.3), 0,
      size * (0.4 + i * 0.3), size
    );
    streak.addColorStop(0, 'rgba(0,0,0,0)');
    streak.addColorStop(0.4, hexToRgba(pal.accent, 0.03));
    streak.addColorStop(0.6, hexToRgba(pal.accent, 0.06));
    streak.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = streak;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.globalCompositeOperation = 'source-over';

  // Central glow
  const cx = size / 2;
  const cy = size * 0.42;
  drawGlowCircle(ctx, cx, cy, size * 0.22, pal.glow);

  // Inner ring
  ctx.strokeStyle = hexToRgba(pal.accent, 0.3);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.18, 0, Math.PI * 2);
  ctx.stroke();

  // Outer ring with dashes
  ctx.setLineDash([12, 8]);
  ctx.strokeStyle = hexToRgba(pal.accent, 0.15);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Top decorative line
  const lineGrad = ctx.createLinearGradient(100, 0, size - 100, 0);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.3, hexToRgba(pal.accent, 0.6));
  lineGrad.addColorStop(0.5, pal.accent);
  lineGrad.addColorStop(0.7, hexToRgba(pal.accent, 0.6));
  lineGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 160);
  ctx.lineTo(size - 100, 160);
  ctx.stroke();

  // Player name with glow
  ctx.textAlign = 'center';
  ctx.font = "600 42px 'Orbitron', sans-serif";
  ctx.shadowColor = pal.glow;
  ctx.shadowBlur = 20;
  ctx.fillStyle = pal.accent;
  ctx.fillText(playerName.toUpperCase(), cx, 120);
  ctx.shadowBlur = 0;

  // "CURSE ANALYSIS" label
  ctx.font = "400 18px 'Orbitron', sans-serif";
  ctx.fillStyle = hexToRgba(pal.text, 0.5);
  ctx.letterSpacing = '4px';
  ctx.fillText('▸ CURSE ANALYSIS COMPLETE ◂', cx, 200);

  // "YOU ARE" text
  ctx.font = "700 52px 'Orbitron', sans-serif";
  ctx.fillStyle = hexToRgba(pal.text, 0.9);
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('YOU ARE', cx, cy - 80);
  ctx.shadowBlur = 0;

  // Main level text with gradient and glow
  const levelFontSize = level.length >= 9 ? 110 : level.length >= 7 ? 125 : 140;
  ctx.font = `900 ${levelFontSize}px 'Orbitron', sans-serif`;
  
  // Glow layers
  ctx.shadowColor = pal.glow;
  ctx.shadowBlur = 40;
  ctx.fillStyle = pal.accent;
  ctx.fillText(level, cx, cy + 50);
  
  ctx.shadowBlur = 20;
  ctx.fillText(level, cx, cy + 50);
  ctx.shadowBlur = 0;

  // Gradient overlay on text
  const textGrad = ctx.createLinearGradient(0, cy - 60, 0, cy + 80);
  textGrad.addColorStop(0, pal.accent);
  textGrad.addColorStop(0.5, '#ffffff');
  textGrad.addColorStop(1, pal.accentAlt);
  ctx.fillStyle = textGrad;
  ctx.fillText(level, cx, cy + 50);

  // Decorative brackets around level
  drawCornerBrackets(ctx, cx - 280, cy - 110, 560, 200, 30, hexToRgba(pal.accent, 0.4));

  // Message text
  ctx.font = "400 26px 'Orbitron', sans-serif";
  ctx.fillStyle = hexToRgba(pal.text, 0.85);
  wrapText(ctx, `"${message}"`, cx, cy + 160, size - 180, 36);

  // Bottom decorative line
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, size - 220);
  ctx.lineTo(size - 100, size - 220);
  ctx.stroke();

  // Intensity bar background
  const barW = 400;
  const barH = 12;
  const barX = cx - barW / 2;
  const barY = size - 180;
  
  ctx.fillStyle = hexToRgba('#000', 0.5);
  ctx.beginPath();
  ctx.roundRect(barX - 2, barY - 2, barW + 4, barH + 4, 8);
  ctx.fill();

  // Intensity bar fill
  const fillGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
  fillGrad.addColorStop(0, pal.accentAlt);
  fillGrad.addColorStop(1, pal.accent);
  ctx.fillStyle = fillGrad;
  ctx.beginPath();
  ctx.roundRect(barX, barY, barW * (intensity / 100), barH, 6);
  ctx.fill();

  // Intensity label
  ctx.font = "700 28px 'Orbitron', sans-serif";
  ctx.fillStyle = pal.accent;
  ctx.shadowColor = pal.glow;
  ctx.shadowBlur = 10;
  ctx.fillText(`INTENSITY: ${intensity}%`, cx, size - 130);
  ctx.shadowBlur = 0;

  // Scan lines overlay
  drawScanLines(ctx, size, 0.08);

  // Vignette
  const vignette = ctx.createRadialGradient(cx, size / 2, size * 0.3, cx, size / 2, size * 0.75);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, size, size);

  // Footer branding
  ctx.font = "400 16px 'Orbitron', sans-serif";
  ctx.fillStyle = hexToRgba(pal.text, 0.4);
  ctx.fillText('AI VECNA CURSE', cx, size - 50);
  
  ctx.font = "300 12px 'Orbitron', sans-serif";
  ctx.fillStyle = hexToRgba(pal.text, 0.25);
  ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), cx, size - 28);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png', 1);
  });
}
