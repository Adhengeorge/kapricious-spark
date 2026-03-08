import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollRobotProps {
  className?: string;
}

const FRAME_COUNT = 80;
const isMobile = () => window.innerWidth < 768;

// On mobile, load every other frame (40 frames) for performance
const getFrameIndices = () => {
  return Array.from({ length: 40 }, (_, i) => i * 2);
};

const currentFrame = (index: number) =>
  `/robo/Robot_face_transition_delpmaspu__${index.toString().padStart(3, "0")}.jpg`;

const ScrollRobot = ({ className = "" }: ScrollRobotProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(-1);

  // Preload frames
  useEffect(() => {
    const frameIndices = getFrameIndices();
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const total = frameIndices.length;

    frameIndices.forEach((frameIdx, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = currentFrame(frameIdx);
      img.onload = () => {
        loadedCount++;
        // Set canvas to natural image dimensions on first load (like original)
        if (i === 0 && canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = img.naturalWidth || 800;
          canvas.height = img.naturalHeight || 800;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      };
      images.push(img);
    });

    imagesRef.current = images;

    return () => {
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

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      // Keep canvas at natural image dimensions
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Scroll-driven frame update with RAF throttling
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const totalFrames = imagesRef.current.length;
        if (totalFrames === 0) return;

        const track = document.querySelector(".hero-scroll-track");
        if (!track) return;
        const stickyDistance = track.clientHeight - window.innerHeight;
        if (stickyDistance <= 0) return;

        const scrollTop = document.documentElement.scrollTop || window.scrollY;

        // Both mobile & desktop: first half during sticky, second half post-sticky
        const halfFrames = Math.floor(totalFrames / 2);
        if (scrollTop <= stickyDistance) {
          const progress = scrollTop / stickyDistance;
          const frameIndex = Math.min(halfFrames - 1, Math.floor(progress * (halfFrames - 1)));
          drawFrame(frameIndex);
        } else {
          const extraScroll = scrollTop - stickyDistance;
          const extraDistance = window.innerHeight;
          const progress = Math.min(1, extraScroll / extraDistance);
          const frameIndex = halfFrames + Math.min(halfFrames - 1, Math.floor(progress * (halfFrames - 1)));
          drawFrame(Math.min(totalFrames - 1, frameIndex));
        }
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
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "none",
        maxHeight: "none",
        objectFit: "cover",
        display: "block",
        borderRadius: "0px",
        filter: "drop-shadow(0 0 40px rgba(0, 180, 255, 0.3))",
      }}
    />
  );
};

export default ScrollRobot;
