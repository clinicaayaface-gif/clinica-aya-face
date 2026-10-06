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

const COLORS = ["#8052ff", "#8052ff", "#8052ff", "#ffffff", "#15c2a0", "#e23fb0", "#3d8bff", "#b38cff"];

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
  speed: 1.35,
  pointDrift: 4.5,
  ambientDrift: 8,
  glow: 0.82,
  glowBlur: 5,
  density: 0.78,
  maxFps: 30,
};

function rgba(alpha: number) {
  return `rgba(255,255,255,${alpha})`;
}

function drawFace(ctx: CanvasRenderingContext2D) {
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.strokeStyle = rgba(0.75);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(235, 610);
  ctx.quadraticCurveTo(232, 680, 150, 712);
  ctx.moveTo(365, 610);
  ctx.quadraticCurveTo(368, 680, 450, 712);
  ctx.stroke();

  const head = () => {
    ctx.beginPath();
    ctx.moveTo(300, 46);
    ctx.bezierCurveTo(430, 46, 486, 170, 478, 300);
    ctx.bezierCurveTo(472, 450, 410, 612, 300, 664);
    ctx.bezierCurveTo(190, 612, 128, 450, 122, 300);
    ctx.bezierCurveTo(114, 170, 170, 46, 300, 46);
    ctx.closePath();
  };

  head();
  ctx.fillStyle = rgba(0.18);
  ctx.fill();
  head();
  ctx.strokeStyle = rgba(1);
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.lineWidth = 5;
  ctx.strokeStyle = rgba(0.8);
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(300, 40 + i * 1.5);
    ctx.bezierCurveTo(210 - i * 12, 52 + i * 5, 150 - i * 5, 130, 128 - i * 3, 260 + i * 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(300, 40 + i * 1.5);
    ctx.bezierCurveTo(390 + i * 12, 52 + i * 5, 450 + i * 5, 130, 472 + i * 3, 260 + i * 8);
    ctx.stroke();
  }

  for (const x of [215, 385]) {
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x - 52, 296);
    ctx.quadraticCurveTo(x, 262, x + 52, 296);
    ctx.quadraticCurveTo(x, 326, x - 52, 296);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = rgba(0.95);
    ctx.beginPath();
    ctx.arc(x, 294, 21, 0, 7);
    ctx.fill();
  }

  ctx.lineWidth = 5;
  ctx.strokeStyle = rgba(0.6);
  ctx.beginPath();
  ctx.moveTo(280, 300);
  ctx.quadraticCurveTo(268, 380, 262, 432);
  ctx.moveTo(320, 300);
  ctx.quadraticCurveTo(332, 380, 338, 432);
  ctx.stroke();
  ctx.strokeStyle = rgba(1);
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(258, 440);
  ctx.quadraticCurveTo(300, 470, 342, 440);
  ctx.stroke();
  ctx.fillStyle = rgba(0.95);
  ctx.beginPath();
  ctx.moveTo(232, 528);
  ctx.quadraticCurveTo(268, 498, 300, 512);
  ctx.quadraticCurveTo(332, 498, 368, 528);
  ctx.quadraticCurveTo(300, 540, 232, 528);
  ctx.fill();
  ctx.fillStyle = rgba(0.7);
  ctx.beginPath();
  ctx.moveTo(236, 530);
  ctx.quadraticCurveTo(300, 544, 364, 530);
  ctx.quadraticCurveTo(334, 586, 300, 588);
  ctx.quadraticCurveTo(266, 586, 236, 530);
  ctx.fill();
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
