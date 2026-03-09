import { useCallback, useEffect, useRef } from "react";

interface ScrollRobotProps {
  className?: string;
}

const FRAME_COUNT = 80;
const FRAME_INDICES = Array.from({ length: FRAME_COUNT }, (_, i) => i);
const MOBILE_BREAKPOINT = 768;

const currentFrame = (index: number) =>
  `/robo/Robot_face_transition_delpmaspu__${index.toString().padStart(3, "0")}.jpg`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const ScrollRobot = ({ className = "" }: ScrollRobotProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const trackRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef<boolean>(true);
  const trackStartRef = useRef<number>(0);
  const totalDistanceRef = useRef<number>(1);
  const lastFrameFloatRef = useRef<number>(-1);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const updateTrackMetrics = useCallback(() => {
    const track = document.querySelector(".hero-scroll-track") as HTMLElement | null;
    if (!track) return;

    trackRef.current = track;
    const rect = track.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const stickyDistance = Math.max(0, track.offsetHeight - window.innerHeight);
    const postStickyDistance = window.innerHeight;

    trackStartRef.current = scrollY + rect.top;
    totalDistanceRef.current = Math.max(1, stickyDistance + postStickyDistance);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const dprCap = isMobile ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (
      width === canvasSizeRef.current.width &&
      height === canvasSizeRef.current.height &&
      dpr === canvasSizeRef.current.dpr
    ) {
      return;
    }

    canvas.width = width;
    canvas.height = height;
    canvasSizeRef.current = { width, height, dpr };

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctxRef.current = ctx;
    }
  }, []);

  const drawImageCover = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, alpha = 1) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let dx = 0;
    let dy = 0;

    if (canvasAspect > imageAspect) {
      drawHeight = canvasWidth / imageAspect;
      dy = (canvasHeight - drawHeight) * 0.5;
    } else {
      drawWidth = canvasHeight * imageAspect;
      dx = (canvasWidth - drawWidth) * 0.5;
    }

    if (alpha < 1) {
      ctx.globalAlpha = alpha;
    }
    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    if (alpha < 1) {
      ctx.globalAlpha = 1;
    }
  }, []);

  const drawFrame = useCallback(
    (frameFloat: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      const baseIndex = Math.floor(frameFloat);
      const nextIndex = Math.min(FRAME_COUNT - 1, baseIndex + 1);
      const mix = frameFloat - baseIndex;

      const baseImage = imagesRef.current[baseIndex];
      if (!baseImage || !baseImage.complete || baseImage.naturalWidth === 0) return;

      drawImageCover(ctx, baseImage, 1);

      if (mix > 0.001) {
        const nextImage = imagesRef.current[nextIndex];
        if (nextImage && nextImage.complete && nextImage.naturalWidth > 0) {
          drawImageCover(ctx, nextImage, mix);
        }
      }
    },
    [drawImageCover]
  );

  const computeFrameFloat = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const relativeY = scrollY - trackStartRef.current;
    const progress = clamp(relativeY / totalDistanceRef.current, 0, 1);
    return progress * (FRAME_COUNT - 1);
  }, []);

  const renderIfNeeded = useCallback(() => {
    rafRef.current = 0;

    if (!isActiveRef.current) return;

    const frameFloat = computeFrameFloat();
    if (Math.abs(frameFloat - lastFrameFloatRef.current) < 0.015) return;

    drawFrame(frameFloat);
    lastFrameFloatRef.current = frameFloat;
  }, [computeFrameFloat, drawFrame]);

  const scheduleRender = useCallback(() => {
    if (rafRef.current !== 0) return;
    rafRef.current = window.requestAnimationFrame(renderIfNeeded);
  }, [renderIfNeeded]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    FRAME_INDICES.forEach((frameIdx, i) => {
      const img = new Image();
      img.decoding = "async";
      if ("fetchPriority" in img) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = i < 12 ? "high" : "auto";
      }
      img.src = currentFrame(frameIdx);
      images.push(img);
    });

    imagesRef.current = images;
    updateTrackMetrics();
    resizeCanvas();
    scheduleRender();

    return () => {
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas, scheduleRender, updateTrackMetrics]);

  useEffect(() => {
    const handleResize = () => {
      updateTrackMetrics();
      resizeCanvas();
      lastFrameFloatRef.current = -1;
      scheduleRender();
    };

    const handleScroll = () => {
      if (!isActiveRef.current) return;
      scheduleRender();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          lastFrameFloatRef.current = -1;
          scheduleRender();
        }
      },
      { root: null, rootMargin: "100% 0px 100% 0px", threshold: 0 }
    );

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [resizeCanvas, scheduleRender, updateTrackMetrics]);

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
        contain: "strict",
        willChange: "transform",
      }}
    />
  );
};

export default ScrollRobot;
