import { useEffect, useRef } from "react";

type Variant = "face" | "syringe" | "glow";

type Point = {
  x: number;
  y: number;
  color: number;
  radius: number;
  phase: number;
  speed: number;
  alpha: number;
  ambient: boolean;
};

const COLORS = ["#8052ff", "#8052ff", "#8052ff", "#ffb829", "#15c2a0", "#e23fb0", "#3d8bff", "#b38cff"];

/**
 * Ajustes rápidos da constelação.
 * - speed: velocidade geral do movimento.
 * - pointDrift / ambientDrift: amplitude do deslocamento.
 * - glow: intensidade da transparência do brilho.
 * - glowBlur: desfoque do brilho; mantenha baixo para preservar desempenho.
 * - density: quantidade de partículas geradas.
 * - maxFps: limite de frames para não sobrecarregar o navegador.
 */
export const CONSTELLATION_TUNING = {
  speed: 2.05,
  pointDrift: 7,
  ambientDrift: 14,
  glow: 0.82,
  glowBlur: 5,
  density: 0.78,
  maxFps: 36,
};

function rgba(alpha: number) {
  return `rgba(255,255,255,${alpha})`;
}

function drawFace(ctx: CanvasRenderingContext2D) {
  // Contorno frontal, delicado e simétrico: a animação fica nas partículas, não no rosto.
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.strokeStyle = rgba(0.9);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300, 42);
  ctx.bezierCurveTo(410, 42, 466, 126, 458, 276);
  ctx.bezierCurveTo(452, 414, 404, 548, 300, 648);
  ctx.bezierCurveTo(196, 548, 148, 414, 142, 276);
  ctx.bezierCurveTo(134, 126, 190, 42, 300, 42);
  ctx.stroke();

  // Cabelos longos e leves, com linhas que reforçam a silhueta feminina.
  ctx.strokeStyle = rgba(0.72);
  ctx.lineWidth = 3;
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(300, 42);
    ctx.bezierCurveTo(204 - i * 8, 48 + i * 5, 116 - i * 4, 182, 110 - i * 3, 370 + i * 13);
    ctx.bezierCurveTo(108 - i * 2, 500, 150 + i * 6, 616, 222 + i * 7, 696);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(300, 42);
    ctx.bezierCurveTo(396 + i * 8, 48 + i * 5, 484 + i * 4, 182, 490 + i * 3, 370 + i * 13);
    ctx.bezierCurveTo(492 + i * 2, 500, 450 - i * 6, 616, 378 - i * 7, 696);
    ctx.stroke();
  }

  // Sobrancelhas e olhos amendoados.
  ctx.strokeStyle = rgba(0.92);
  ctx.lineWidth = 5;
  for (const x of [215, 385]) {
    ctx.beginPath();
    ctx.moveTo(x - 55, 258);
    ctx.quadraticCurveTo(x, 225, x + 55, 258);
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 48, 294);
    ctx.quadraticCurveTo(x, 262, x + 48, 294);
    ctx.quadraticCurveTo(x, 320, x - 48, 294);
    ctx.stroke();
    ctx.fillStyle = rgba(0.95);
    ctx.beginPath(); ctx.arc(x, 293, 12, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = 4;
  }

  // Nariz fino e boca suave.
  ctx.strokeStyle = rgba(0.68);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(287, 292);
  ctx.quadraticCurveTo(278, 370, 270, 426);
  ctx.quadraticCurveTo(282, 438, 300, 432);
  ctx.quadraticCurveTo(318, 438, 330, 426);
  ctx.quadraticCurveTo(322, 370, 313, 292);
  ctx.stroke();
  ctx.strokeStyle = rgba(1);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(256, 470);
  ctx.quadraticCurveTo(300, 444, 344, 470);
  ctx.quadraticCurveTo(300, 506, 256, 470);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(268, 474);
  ctx.quadraticCurveTo(300, 486, 332, 474);
  ctx.stroke();

  // Pescoço e ombros elegantes.
  ctx.strokeStyle = rgba(0.78);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(228, 608); ctx.quadraticCurveTo(230, 674, 154, 718);
  ctx.moveTo(372, 608); ctx.quadraticCurveTo(370, 674, 446, 718);
  ctx.stroke();
}
function drawSyringe(ctx: CanvasRenderingContext2D) {
  ctx.translate(350, 265);
  ctx.rotate(-0.55);
  ctx.lineCap = ctx.lineJoin = "round";
  const rounded = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  };
  rounded(-166, -37, 194, 74, 6);
  ctx.fillStyle = rgba(0.5);
  ctx.fill();
  rounded(-172, -46, 304, 92, 12);
  ctx.fillStyle = rgba(0.12);
  ctx.fill();
  ctx.strokeStyle = rgba(1);
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.lineWidth = 4;
  for (let i = 0; i < 10; i++) {
    const x = -136 + i * 26;
    ctx.beginPath();
    ctx.moveTo(x, -46);
    ctx.lineTo(x, i % 3 === 0 ? -18 : -30);
    ctx.strokeStyle = rgba(0.95);
    ctx.stroke();
  }
  rounded(28, -40, 26, 80, 5);
  ctx.fillStyle = rgba(1);
  ctx.fill();
  rounded(54, -9, 230, 18, 4);
  ctx.fillStyle = rgba(0.85);
  ctx.fill();
  rounded(282, -52, 20, 104, 10);
  ctx.fillStyle = rgba(1);
  ctx.fill();
  rounded(124, -74, 16, 148, 6);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-172, -22);
  ctx.lineTo(-208, -9);
  ctx.lineTo(-208, 9);
  ctx.lineTo(-172, 22);
  ctx.closePath();
  ctx.fillStyle = rgba(0.7);
  ctx.fill();
  ctx.strokeStyle = rgba(1);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-208, 0);
  ctx.lineTo(-340, 0);
  ctx.stroke();
  for (const [x, y, r] of [[-384, 12, 8], [-396, 48, 5], [-404, 82, 3.5]]) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  }
}

function build(draw: (ctx: CanvasRenderingContext2D) => void, width: number, height: number, seed: number, density: number, maxPoints: number) {
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext("2d")!;
  draw(ctx);
  const data = ctx.getImageData(0, 0, width, height).data;
  const points: Point[] = [];
  let state = seed;
  const random = () => (state = (state * 16807) % 2147483647) / 2147483647;

  for (let y = 0; y < height; y += 6) {
    for (let x = 0; x < width; x += 6) {
      const alpha = data[(y * width + x) * 4 + 3] / 255;
      if (alpha > 0.05 && random() < alpha * density) {
        points.push({
          x: x + random() * 6,
          y: y + random() * 6,
          color: Math.floor(random() * COLORS.length),
          radius: 1.2 + random() * 2,
          phase: random() * 6.28,
          speed: 0.45 + random() * 0.9,
          alpha: 0.55 + random() * 0.45,
          ambient: false,
        });
      }
    }
  }

  for (let i = 0; i < 150; i++) {
    points.push({
      x: (random() * 1.5 - 0.25) * width,
      y: (random() * 1.3 - 0.15) * height,
      color: Math.floor(random() * COLORS.length),
      radius: 1 + random() * 1.8,
      phase: random() * 6.28,
      speed: 0.3 + random() * 0.6,
      alpha: 0.14 + random() * 0.2,
      ambient: true,
    });
  }

  return points.slice(0, maxPoints);
}

export default function ConstellationCanvas({ variant = "face", className = "" }: { variant?: Variant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionFactor = reduced ? 0.35 : 1;
    const width = variant === "syringe" ? 700 : 600;
    const height = variant === "syringe" ? 540 : 720;
    const draw = variant === "syringe" ? drawSyringe : drawFace;
    const maxPoints = variant === "glow" ? 1800 : 2600;
    const points = build(draw, width, height, variant === "glow" ? 37 : variant === "syringe" ? 23 : 11, CONSTELLATION_TUNING.density, maxPoints);
    let frameId = 0;
    let lastFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const cssWidth = canvas.clientWidth || 600;
      canvas.width = cssWidth * dpr;
      canvas.height = cssWidth * dpr * height / width;
    };

    const render = (now: number) => {
      if (now - lastFrame < 1000 / CONSTELLATION_TUNING.maxFps) {
        frameId = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;
      const time = now / 1000;
      const scale = canvas.width / width;
      const glow = variant === "glow";
      const sweep = (time * 0.35 * CONSTELLATION_TUNING.speed) % 1.6 - 0.3;
      const drift = CONSTELLATION_TUNING.pointDrift;
      const ambientDrift = CONSTELLATION_TUNING.ambientDrift;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.lineWidth = 0.9;
      context.lineCap = "round";
      context.lineJoin = "round";

      for (let color = 0; color < COLORS.length; color++) {
        context.beginPath();
        context.strokeStyle = COLORS[color];
        context.shadowColor = COLORS[color];
        context.shadowBlur = glow ? CONSTELLATION_TUNING.glowBlur : 0;
        context.globalAlpha = glow ? CONSTELLATION_TUNING.glow : 0.78;

        for (const point of points) {
          if (point.color !== color) continue;
          const depth = point.ambient ? 20 : 10;
          const amplitude = point.ambient ? ambientDrift : drift;
          const x = point.x + Math.sin(time * point.speed * CONSTELLATION_TUNING.speed * motionFactor + point.phase) * amplitude + Math.cos(time * 0.17 + point.phase) * 1.5 + pointerX * depth;
          const y = point.y + Math.cos(time * point.speed * 0.9 * CONSTELLATION_TUNING.speed * motionFactor + point.phase) * amplitude + Math.sin(time * 0.13 + point.phase) * 1.5 + pointerY * depth;
          let radius = point.radius * (1 + 0.16 * Math.sin(time * point.speed * 1.6 * motionFactor + point.phase));
          if (glow) radius *= 1 + Math.max(0, 1 - Math.abs(point.y / height - sweep) * 5) * 1.1;
          context.moveTo(x, y - radius);
          context.lineTo(x + radius * 0.95, y + radius * 0.7);
          context.lineTo(x - radius * 0.95, y + radius * 0.7);
          context.closePath();
        }
        context.stroke();
      }

      context.shadowBlur = 0;
      context.globalAlpha = 1;
      frameId = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const leave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [variant]);

  return <canvas ref={ref} className={`constellation-canvas ${className}`} role="img" aria-label={variant === "syringe" ? "Constelação de partículas formando uma seringa" : "Constelação de partículas formando um rosto"} />;
}
