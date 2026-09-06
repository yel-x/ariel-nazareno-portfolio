"use client";
import { useEffect, useRef, useState } from "react";
import { portraitWords } from "@/data/portfolio";
type Glyph = { x: number; y: number; size: number; opacity: number; word: string; angle: number };

export function TypographicPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
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
    const build = () => {
      if (disposed) return;
      const mobile = window.innerWidth < 700;
      const width = mobile ? 220 : 320;
      const height = Math.round(width * 1.05);
      const sample = document.createElement("canvas");
      sample.width = width; sample.height = height;
      const sampleContext = sample.getContext("2d");
      if (!sampleContext) return;
      sampleContext.drawImage(image, 0, 0, width, height);
      const pixels = sampleContext.getImageData(0, 0, width, height).data;
      const next: Glyph[] = [];
      const step = mobile ? 8 : 6;
      for (let y = 0; y < height; y += step) for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = pixels[index + 3] / 255;
        const luminance = (pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114) / 255;
        if (alpha < 0.1 || luminance > 0.94) continue;
        next.push({ x: x / width, y: y / height, size: 6 + (1 - luminance) * 3, opacity: 0.2 + (1 - luminance) * 0.72, word: portraitWords[next.length % portraitWords.length], angle: (next.length % 5 - 2) * 0.025 });
      }
      glyphsRef.current = next; canvas.width = width * 2; canvas.height = height * 2; canvas.style.aspectRatio = `${width} / ${height}`; setReady(true);
    };
    const draw = () => {
      const width = canvas.width; const height = canvas.height; context.clearRect(0, 0, width, height); context.fillStyle = "#0b1017"; context.fillRect(0, 0, width, height);
      const pointer = pointerRef.current; context.textAlign = "center"; context.textBaseline = "middle";
      glyphsRef.current.forEach((glyph, index) => { const distance = Math.hypot(glyph.x - pointer.x, glyph.y - pointer.y); const influence = pointer.active ? Math.max(0, 1 - distance * 3.2) : 0; const x = glyph.x * width + (pointer.x - glyph.x) * influence * 10; const y = glyph.y * height + (pointer.y - glyph.y) * influence * 10; context.save(); context.translate(x, y); context.rotate(glyph.angle + Math.sin(index) * 0.01); context.font = `${glyph.size * 2}px Arial, sans-serif`; context.fillStyle = `rgba(137, 190, 255, ${Math.min(1, glyph.opacity + influence * 0.18)})`; context.fillText(glyph.word, 0, 0); context.restore(); });
      frameRef.current = requestAnimationFrame(draw);
    };
    image.onload = build; image.onerror = () => { canvas.width = 640; canvas.height = 672; setReady(true); };
    window.addEventListener("resize", build);
    const move = (event: PointerEvent) => { const bounds = canvas.getBoundingClientRect(); pointerRef.current = { x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height, active: true }; };
    const leave = () => { pointerRef.current.active = false; };
    canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerleave", leave); frameRef.current = requestAnimationFrame(draw);
    return () => { disposed = true; window.removeEventListener("resize", build); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, []);
  return <div className="portrait-wrap" aria-label="Typographic portrait of Ariel Nazareno, built from ERP and technology terms"><canvas ref={canvasRef} className="portrait-canvas" role="img" /><div className={`portrait-loading ${ready ? "is-ready" : ""}`}>INITIALIZING PORTRAIT...</div><span className="portrait-tag tag-one">SAP / 01</span><span className="portrait-tag tag-two">DATA / 02</span><span className="portrait-tag tag-three">SUPPORT / 03</span></div>;
}