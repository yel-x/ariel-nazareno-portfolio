"use client";

import { useEffect, useRef, useState } from "react";
import { portraitWords } from "@/data/portfolio";

type Glyph = { x: number; y: number; size: number; opacity: number; text: string; angle: number };

const regionalWords = {
  hair: ["SAP", "ERP", "S4HANA", "SYSTEM"],
  forehead: ["MASTER DATA", "AUTOMATION", "PYTHON"],
  eyes: ["SUPPORT", "ACCESS", "AUTH", "SECURITY"],
  center: ["API", "DATA", "SQL"],
  cheeks: ["VALIDATION", "MIGRATION", "PROCESS", "WORKFLOW"],
  lower: ["TICKET", "INCIDENT", "SUPPORT", "RESOLVED"],
  jaw: ["ERP", "SAP", "DATABASE", "GITHUB"],
};

function vocabularyFor(y: number, x: number) {
  if (y < 0.2) return regionalWords.hair;
  if (y < 0.36) return regionalWords.forehead;
  if (y < 0.5) return x < 0.3 || x > 0.7 ? regionalWords.eyes : regionalWords.center;
  if (y < 0.68) return regionalWords.cheeks;
  if (y < 0.82) return regionalWords.lower;
  return regionalWords.jaw;
}

export function TypographicPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const glyphsRef = useRef<Glyph[]>([]);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const silhouetteRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const image = new Image();
    image.src = "/myID.jpg";
    let disposed = false;
    let lastWidth = 0;

    const buildPortrait = () => {
      if (disposed) return;
      const mobile = window.innerWidth < 700;
      const width = mobile ? 240 : 360;
      if (width === lastWidth && glyphsRef.current.length) return;
      lastWidth = width;
      const height = Math.round(width * 1.02);
      const sample = document.createElement("canvas");
      sample.width = width;
      sample.height = height;
      const sampleContext = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      sampleContext.drawImage(image, 0, 0, width, height);
      const pixels = sampleContext.getImageData(0, 0, width, height).data;
      const step = mobile ? 7 : 5;
      const next: Glyph[] = [];
      const silhouette = document.createElement("canvas");
      silhouette.width = width;
      silhouette.height = height;
      const silhouetteContext = silhouette.getContext("2d");
      const silhouettePixels = silhouetteContext?.createImageData(width, height);
      if (silhouettePixels) {
        for (let index = 0; index < pixels.length; index += 4) {
          const luminance = (pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114) / 255;
          const alpha = luminance < 0.93 ? Math.min(165, Math.round((0.93 - luminance) * 560)) : 0;
          silhouettePixels.data[index] = 105;
          silhouettePixels.data[index + 1] = 158;
          silhouettePixels.data[index + 2] = 212;
          silhouettePixels.data[index + 3] = alpha;
        }
        silhouetteContext?.putImageData(silhouettePixels, 0, 0);
        silhouetteRef.current = silhouette;
      }
      for (let y = 2; y < height - 2; y += step) {
        for (let x = 2; x < width - 2; x += step) {
          const index = (y * width + x) * 4;
          const luminance = (pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114) / 255;
          const previous = ((pixels[((y - 2) * width + x) * 4] * 0.299 + pixels[((y - 2) * width + x) * 4 + 1] * 0.587 + pixels[((y - 2) * width + x) * 4 + 2] * 0.114) / 255);
          const edge = Math.abs(luminance - previous);
          const landmark = edge > 0.1 || luminance < 0.55;
          if (luminance > 0.88 || (!landmark && (x + y) % (mobile ? 3 : 2) !== 0)) continue;
          const normalizedX = x / width;
          const normalizedY = y / height;
          const words = vocabularyFor(normalizedY, normalizedX);
          const text = words[next.length % words.length] || portraitWords[next.length % portraitWords.length];
          const eyeBand = normalizedY > 0.35 && normalizedY < 0.5;
          next.push({ x: normalizedX, y: normalizedY, size: eyeBand || landmark ? (mobile ? 3.4 : 3) : (mobile ? 2.3 : 2), opacity: Math.min(0.92, 0.24 + (1 - luminance) * 0.62 + edge * 0.35), text, angle: ((next.length % 5) - 2) * 0.018 });
        }
      }
      glyphsRef.current = next;
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.aspectRatio = `${width} / ${height}`;
      setReady(true);
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0b1017";
      context.fillRect(0, 0, width, height);
      if (silhouetteRef.current) {
        context.save();
        context.globalAlpha = 0.42;
        context.drawImage(silhouetteRef.current, 0, 0, width, height);
        context.restore();
      }
      const pointer = pointerRef.current;
      context.textAlign = "center";
      context.textBaseline = "middle";
      glyphsRef.current.forEach((glyph, index) => {
        const distance = Math.hypot(glyph.x - pointer.x, glyph.y - pointer.y);
        const influence = pointer.active ? Math.max(0, 1 - distance * 3.5) : 0;
        const x = glyph.x * width + (pointer.x - glyph.x) * influence * 5;
        const y = glyph.y * height + (pointer.y - glyph.y) * influence * 5;
        context.save();
        context.translate(x, y);
        context.rotate(glyph.angle);
        context.font = `${(glyph.size + influence * 0.5) * 2}px "DM Mono", monospace`;
        context.fillStyle = `rgba(164, 207, 255, ${Math.min(1, glyph.opacity + influence * 0.12)})`;
        context.fillText(glyph.text, 0, 0);
        context.restore();
        if (index % 19 === 0) {
          context.fillStyle = "rgba(123, 183, 255, 0.18)";
          context.fillRect(x - 1, y - 1, 2, 2);
        }
      });
      frameRef.current = requestAnimationFrame(draw);
    };

    image.onload = buildPortrait;
    image.onerror = () => setReady(true);
    const resize = () => { lastWidth = 0; buildPortrait(); };
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerRef.current = { x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height, active: true };
    };
    const leave = () => { pointerRef.current.active = false; };
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <div className="portrait-wrap" aria-label="Photo-derived typographic portrait of Ariel Nazareno, built from ERP and technology terms"><canvas ref={canvasRef} className="portrait-canvas" role="img" /><div className={`portrait-loading ${ready ? "is-ready" : ""}`}>INITIALIZING PORTRAIT...</div><span className="portrait-tag tag-one">SAP / 01</span><span className="portrait-tag tag-two">DATA / 02</span><span className="portrait-tag tag-three">SUPPORT / 03</span></div>;
}
