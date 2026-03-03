import { Shield, Paintbrush } from "lucide-react";
import { FlagshipEvent } from "./types";

export const flagshipEvents: FlagshipEvent[] = [
  {
    id: "cyber-shield-ctf",
    title: "Cyber Shield CTF",
    category: "Cybersecurity",
    prize: "₹40,000",
    mode: "Capture The Flag",
    description: "Test your cybersecurity skills in this high-stakes Capture The Flag competition. Crack codes, exploit vulnerabilities, and defend systems against attacks. Navigate through challenges in web security, cryptography, reverse engineering, and forensics.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Computer Lab 1 & 2, KMEA Engineering College",
    teamSize: "1-3 members",
    registrationFee: "₹300 per team",
    highlights: [
      "Multiple difficulty levels from beginner to expert",
      "Categories: Web, Crypto, Forensics, Reverse Engineering, Pwn",
      "Real-time scoreboard",
      "Hints available for difficult challenges",
      "Certificates for all participants",
      "Top performers get internship opportunities"
    ],
    rules: [
      "Teams can have 1-3 members",
      "No attacking the CTF infrastructure",
      "No sharing flags between teams",
      "Use of automated tools is allowed",
      "Internet access will be provided",
      "No external help or communication with outsiders",
      "Brute-forcing flags is prohibited",
      "All challenges must be solved ethically",
      "Points are awarded based on difficulty and time"
    ],
    contact: {
      name: "Sneha Nair",
      phone: "+91 76543 21098"
    }
  },
  {
    id: "ui-ux-design-sprint",
    title: "UI/UX Design Sprint",
    category: "Design",
    prize: "₹25,000",
    mode: "6 Hour Sprint",
    description: "A rapid-fire design challenge. Create stunning, user-centric interfaces from a given brief in just 6 hours. Creativity, usability, and aesthetics will be judged. Show off your design thinking and prototyping skills.",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Design Studio, KMEA Engineering College",
    teamSize: "1-2 members",
    registrationFee: "₹200 per team",
    highlights: [
      "Real-world design brief from industry partner",
      "Access to design tools and resources",
      "Mentorship from professional designers",
      "Portfolio-worthy project",
      "Feedback from design jury",
      "Networking with design community"
    ],
    rules: [
      "Individual or team of 2 allowed",
      "Bring your own laptop with design software",
      "Figma, Adobe XD, or Sketch recommended",
      "Design brief will be revealed at the start",
      "No pre-made templates or assets",
      "Must submit interactive prototype",
      "Presentation of design thinking required",
      "Judging: Creativity (30%), Usability (30%), Aesthetics (25%), Presentation (15%)"
    ],
    contact: {
      name: "Priya Sharma",
      phone: "+91 65432 10987"
    }
  }
];

export const getEventById = (id: string): FlagshipEvent | undefined => {
  return flagshipEvents.find(event => event.id === id);
};
