import { useEffect, useRef, useState } from "react";

interface ScrollRobotProps {
  className?: string;
}

const FRAME_COUNT = 80;

const currentFrame = (index: number) =>
  `/robo/Robot_face_transition_delpmaspu__${index.toString().padStart(3, "0")}.jpg`;

const ScrollRobot = ({ className = "" }: ScrollRobotProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= 1 && images[0]?.complete) {
          setLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    // Draw first frame once loaded
    const firstImg = images[0];
    firstImg.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const container = canvas.parentElement;
      canvas.width = container?.clientWidth || window.innerWidth;
      canvas.height = container?.clientHeight || window.innerHeight;
      ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      setLoaded(true);
    };
  }, []);

  // Scroll-driven frame update
  useEffect(() => {
    const handleScroll = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Resize canvas to fill container
      const container = canvas.parentElement;
      const w = container?.clientWidth || window.innerWidth;
      const h = container?.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const track = document.querySelector(".hero-scroll-track");
      const stickyDistance = track
        ? track.clientHeight - window.innerHeight
        : 0;

      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop =
        document.documentElement.scrollTop || window.scrollY;

      let frameIndex = 0;

      if (scrollTop <= stickyDistance && stickyDistance > 0) {
        // Sticky phase: frames 0–40
        const progress = Math.max(0, scrollTop / stickyDistance);
        frameIndex = Math.floor(progress * 40);
      } else {
        // Past sticky: frames 40–79
        const remainingScroll = maxScrollTop - stickyDistance;
        const scrollPastSticky = scrollTop - stickyDistance;
        const progress =
          remainingScroll > 0
            ? Math.max(0, Math.min(1, scrollPastSticky / remainingScroll))
            : 1;
        frameIndex = 40 + Math.floor(progress * 39);
      }

      frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, frameIndex));

      const img = imagesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
};

export default ScrollRobot;
