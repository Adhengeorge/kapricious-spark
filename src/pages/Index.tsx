import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import InteractiveRobot from "@/components/InteractiveRobot";
import HeroSection from "@/components/landing/HeroSection";
import ScrollCards from "@/components/landing/ScrollCards";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ScrollCards />
    </div>
  );
};

export default Index;
