"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/landing/HeroSection";
import ScrollCards from "@/components/landing/ScrollCards";
import { hasWarmLandingCache, preloadLandingExperience } from "@/lib/landingPreload";

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cached, setCached] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const cacheHit = hasWarmLandingCache();

    setCached(cacheHit);
    setProgress(cacheHit ? 0.3 : 0);

    preloadLandingExperience((nextProgress) => {
      if (!isMounted) return;
      setProgress(nextProgress);
    }).then(({ cached: cacheHit }) => {
      if (!isMounted) return;
      setCached(cacheHit);
      setProgress(1);
      setIsReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (!isReady) {
      root.classList.add("landing-loading");
      body.classList.add("landing-loading");
      return () => {
        root.classList.remove("landing-loading");
        body.classList.remove("landing-loading");
      };
    }

    root.classList.remove("landing-loading");
    body.classList.remove("landing-loading");

    return () => {
      root.classList.remove("landing-loading");
      body.classList.remove("landing-loading");
    };
  }, [isReady]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {!isReady && (
          <LoadingScreen
            progress={progress}
            cached={cached}
            label={cached ? "Launching from cache" : "Preloading hero media"}
          />
        )}
      </AnimatePresence>

      <div
        className={`transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeroSection />
        <ScrollCards />
      </div>
    </div>
  );
};

export default Index;
