"use client";

import { useEffect, useRef, useState } from "react";
import { portraitWords } from "@/data/portfolio";

type Glyph = { x: number; y: number; size: number; opacity: number; text: string; angle: number };

const words = [
  "SAP", "ERP", "S4HANA", "ABAP", "PYTHON", "DATA", "API", "SQL", "SLOC", "PLANT", "UOM", "GIT",
  "USER", "ROLE", "AUTH", "SUPPORT", "SYSTEM", "SECURITY", "TICKET", "VALIDATION", "MIGRATION", "FIORI",
];

function regionWords(y: number) {
  if (y < 0.2) return ["SAP", "ERP", "S4HANA", "SYSTEM"];
  if (y < 0.36) return ["MASTER DATA", "AUTOMATION", "PYTHON"];
  if (y < 0.53) return ["SUPPORT", "ACCESS", "AUTH", "SECURITY", "API", "DATA"];
  if (y < 0.72) return ["VALIDATION", "MIGRATION", "PROCESS", "WORKFLOW"];
  return ["TICKET", "INCIDENT", "SUPPORT", "RESOLVED", "DATABASE"];
}

function luminance(data: Uint8ClampedArray, index: number) {
  return (data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114) / 255;
}

export function TypographicPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const edgeRef = useRef<HTMLCanvasElement | null>(null);
  const glyphsRef = useRef<Glyph[]>([]);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const image = new Image();
    image.src = "/myID.jpg";
    let disposed = false;
    let lastWidth = 0;

    const prepare = () => {
      if (disposed) return;
      const mobile = window.innerWidth < 700;
      const width = mobile ? 260 : 420;
      if (width === lastWidth) return;
      lastWidth = width;
      const height = width;
      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;
      sourceContext.drawImage(image, 0, 0, width, height);
      const pixels = sourceContext.getImageData(0, 0, width, height).data;
      const base = document.createElement("canvas");
      base.width = width;
      base.height = height;
      const baseContext = base.getContext("2d");
      const basePixels = baseContext?.createImageData(width, height);
      const edge = document.createElement("canvas");
      edge.width = width;
      edge.height = height;
      const edgeContext = edge.getContext("2d");
      const edgePixels = edgeContext?.createImageData(width, height);
      if (!basePixels || !edgePixels) return;
      const next: Glyph[] = [];
      const step = mobile ? 9 : 7;
      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
          const index = (y * width + x) * 4;
          const current = luminance(pixels, index);
          const left = luminance(pixels, (y * width + x - 1) * 4);
          const right = luminance(pixels, (y * width + x + 1) * 4);
          const up = luminance(pixels, ((y - 1) * width + x) * 4);
          const down = luminance(pixels, ((y + 1) * width + x) * 4);
          const contrast = Math.min(1, Math.abs(right - left) + Math.abs(down - up));
          const edgeAlpha = Math.max(0, Math.min(190, Math.round(contrast * 720)));
          edgePixels.data[index] = 116;
          edgePixels.data[index + 1] = 179;
          edgePixels.data[index + 2] = 239;
          edgePixels.data[index + 3] = edgeAlpha;
          const baseAlpha = current < 0.94 ? Math.min(255, Math.round((0.94 - current) * 320)) : 0;
          basePixels.data[index] = 120;
          basePixels.data[index + 1] = 164;
          basePixels.data[index + 2] = 207;
          basePixels.data[index + 3] = baseAlpha;
          if (x % step !== 0 || y % step !== 0) continue;
          const feature = contrast > 0.12 || current < 0.48;
          const sparseMidtone = (x + y) % (mobile ? 4 : 3) === 0;
          if (current > 0.89 || (!feature && !sparseMidtone)) continue;
          const normalizedX = x / width;
          const normalizedY = y / height;
          const vocabulary = regionWords(normalizedY);
          next.push({
            x: normalizedX,
            y: normalizedY,
            size: feature ? (mobile ? 2.9 : 2.6) : (mobile ? 2.1 : 1.85),
            opacity: Math.min(0.94, 0.22 + (1 - current) * 0.48 + contrast * 0.5),
            text: vocabulary[next.length % vocabulary.length] || words[next.length % words.length] || portraitWords[next.length % portraitWords.length],
            angle: ((next.length % 7) - 3) * 0.012,
          });
        }
      }
      baseContext?.putImageData(basePixels, 0, 0);
      edgeContext?.putImageData(edgePixels, 0, 0);
      baseRef.current = base;
      edgeRef.current = edge;
      glyphsRef.current = next;
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.aspectRatio = "1 / 1";
      setReady(true);
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0b1017";
      context.fillRect(0, 0, width, height);
      if (baseRef.current) {
        context.save();
        context.globalAlpha = 0.09;
        context.drawImage(baseRef.current, 0, 0, width, height);
        context.restore();
      }
      if (edgeRef.current) {
        context.save();
        context.globalAlpha = 0.54;
        context.drawImage(edgeRef.current, 0, 0, width, height);
        context.restore();
      }
      const pointer = pointerRef.current;
      context.textAlign = "center";
      context.textBaseline = "middle";
      glyphsRef.current.forEach((glyph, index) => {
        const distance = Math.hypot(glyph.x - pointer.x, glyph.y - pointer.y);
        const influence = pointer.active ? Math.max(0, 1 - distance * 3.4) : 0;
        const x = glyph.x * width + (pointer.x - glyph.x) * influence * 4;
        const y = glyph.y * height + (pointer.y - glyph.y) * influence * 4;
        context.save();
        context.translate(x, y);
        context.rotate(glyph.angle);
        context.font = `${(glyph.size + influence * 0.3) * 2}px "DM Mono", monospace`;
        context.fillStyle = `rgba(181, 220, 255, ${Math.min(1, glyph.opacity + influence * 0.1)})`;
        context.fillText(glyph.text, 0, 0);
        context.restore();
        if (index % 23 === 0) {
          context.fillStyle = "rgba(188, 224, 255, 0.28)";
          context.fillRect(x - 1, y - 1, 2, 2);
        }
      });
      frameRef.current = requestAnimationFrame(draw);
    };

    image.onload = prepare;
    image.onerror = () => setReady(true);
    const resize = () => { lastWidth = 0; prepare(); };
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

  return <div className="portrait-wrap" aria-label="Hybrid photo-derived typographic portrait of Ariel Nazareno, built from ERP and technology terms"><canvas ref={canvasRef} className="portrait-canvas" role="img" /><div className={`portrait-loading ${ready ? "is-ready" : ""}`}>INITIALIZING PORTRAIT...</div><span className="portrait-tag tag-one">SAP / 01</span><span className="portrait-tag tag-two">DATA / 02</span><span className="portrait-tag tag-three">SUPPORT / 03</span></div>;
}
