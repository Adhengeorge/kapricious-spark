import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollRobotProps {
  className?: string;
}

const FRAME_COUNT = 80;
const isMobile = () => window.innerWidth < 768;

// On mobile, load every other frame to reduce memory & loading time
const getFrameIndices = () => {
  if (isMobile()) {
    return Array.from({ length: 40 }, (_, i) => i * 2); // 40 frames
  }
  return Array.from({ length: FRAME_COUNT }, (_, i) => i);
};

const currentFrame = (index: number) =>
  `/robo/Robot_face_transition_delpmaspu__${index.toString().padStart(3, "0")}.jpg`;

const ScrollRobot = ({ className = "" }: ScrollRobotProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndicesRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(-1);
  const [loaded, setLoaded] = useState(false);

  // Preload frames
  useEffect(() => {
    const frameIndices = getFrameIndices();
    frameIndicesRef.current = frameIndices;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const total = frameIndices.length;

    frameIndices.forEach((frameIdx, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = currentFrame(frameIdx);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) setLoaded(true);
        // Draw first frame
        if (i === 0 && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const container = canvas.parentElement;
          const dpr = Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2);
          const w = container?.clientWidth || window.innerWidth;
          const h = container?.clientHeight || window.innerHeight;
          canvas.width = w * dpr;
          canvas.height = h * dpr;
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
          ctx.scale(dpr, dpr);
          // Use same aspect-ratio-preserving draw
          const imgR = img.naturalWidth / img.naturalHeight;
          const cR = w / h;
          let dW: number, dH: number, dX: number, dY: number;
          if (isMobile()) {
            if (cR > imgR) { dH = h; dW = h * imgR; } else { dW = w; dH = w / imgR; }
          } else {
            if (cR > imgR) { dW = w * 0.85; dH = dW / imgR; } else { dH = h * 0.85; dW = dH * imgR; }
          }
          dX = (w - dW) / 2;
          dY = (h - dH) / 2;
          ctx.drawImage(img, dX, dY, dW, dH);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= 1) setLoaded(true);
      };
      images.push(img);
    });

    imagesRef.current = images;

    return () => {
      // Cleanup
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    if (frameIndex === lastFrameRef.current) return;
    lastFrameRef.current = frameIndex;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2);
    const w = container?.clientWidth || window.innerWidth;
    const h = container?.clientHeight || window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, w, h);
      
      // Draw with aspect ratio preserved (cover on desktop, contain on mobile)
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (isMobile()) {
        // Contain: fit entire image within canvas
        if (canvasRatio > imgRatio) {
          drawH = h;
          drawW = h * imgRatio;
        } else {
          drawW = w;
          drawH = w / imgRatio;
        }
        drawX = (w - drawW) / 2;
        drawY = (h - drawH) / 2;
      } else {
        // Cover but less aggressive: scale to 85% cover
        if (canvasRatio > imgRatio) {
          drawW = w * 0.85;
          drawH = drawW / imgRatio;
        } else {
          drawH = h * 0.85;
          drawW = drawH * imgRatio;
        }
        drawX = (w - drawW) / 2;
        drawY = (h - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }, []);

  // Scroll-driven frame update with RAF throttling
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return; // Already scheduled

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const totalFrames = imagesRef.current.length;
        if (totalFrames === 0) return;

        // Map frames to the hero sticky scroll distance only
        const track = document.querySelector(".hero-scroll-track");
        if (!track) return;
        const stickyDistance = track.clientHeight - window.innerHeight;
        if (stickyDistance <= 0) return;

        const scrollTop = document.documentElement.scrollTop || window.scrollY;
        const progress = Math.max(0, Math.min(1, scrollTop / stickyDistance));
        const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(progress * (totalFrames - 1))));

        drawFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", willChange: "transform" }}
    />
  );
};

export default ScrollRobot;
