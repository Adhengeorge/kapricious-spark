import { Brain, Bot, Shield, Paintbrush, LucideIcon } from "lucide-react";

export interface FlagshipEvent {
  id: string;
  title: string;
  category: string;
  prize: string;
  mode: string;
  description: string;
  icon: LucideIcon;
  image: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  registrationFee: string;
  highlights: string[];
  rules: string[];
  contact: {
    name: string;
    phone: string;
  };
}

export const flagshipEvents: FlagshipEvent[] = [
  {
    id: "mega-hackathon-2026",
    title: "Mega Hackathon 2026",
    category: "AI/ML",
    prize: "₹1,00,000",
    mode: "24 Hour Onsite",
    description: "A 24-hour AI/ML innovation marathon. Build, train, and deploy machine learning solutions to real-world challenges. Teams of up to 4 members compete for the ultimate prize. This is the flagship event of Kapricious 2026, bringing together the brightest minds in artificial intelligence and machine learning.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "9:00 AM - 9:00 AM (Next Day)",
    venue: "Main Auditorium, KMEA Engineering College",
    teamSize: "2-4 members",
    registrationFee: "₹500 per team",
    highlights: [
      "24 hours of non-stop coding and innovation",
      "Mentorship from industry experts",
      "Access to cloud computing resources",
      "Networking opportunities with tech leaders",
      "Swag kits for all participants",
      "Food and refreshments provided"
    ],
    rules: [
      "Teams must consist of 2-4 members",
      "All team members must be currently enrolled students",
      "Pre-built code or templates are not allowed",
      "Use of AI coding assistants is permitted",
      "Projects must be original and created during the hackathon",
      "Final submission must include source code and a working demo",
      "Judging criteria: Innovation, Technical Complexity, UI/UX, and Presentation",
      "Decision of judges will be final and binding"
    ],
    contact: {
      name: "Rahul Kumar",
      phone: "+91 98765 43210"
    }
  },
  {
    id: "robo-wars",
    title: "Robo Wars",
    category: "Robotics",
    prize: "₹50,000",
    mode: "Arena Battle",
    description: "Design and build combat-ready robots to battle it out in the arena. Strategy, engineering, and raw power collide in the most electrifying event of the fest. Witness metal clash against metal as teams put their engineering prowess to the ultimate test.",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 6:00 PM",
    venue: "Open Ground Arena, KMEA Engineering College",
    teamSize: "3-5 members",
    registrationFee: "₹800 per team",
    highlights: [
      "Live arena battles with professional commentary",
      "Multiple weight categories",
      "Practice sessions before the main event",
      "Technical inspection by expert judges",
      "Spare parts station available",
      "Live streaming of all matches"
    ],
    rules: [
      "Robots must weigh between 5kg to 15kg",
      "Maximum dimensions: 50cm x 50cm x 50cm",
      "Wireless control only (2.4GHz recommended)",
      "No flammable or explosive weapons allowed",
      "No entanglement devices permitted",
      "Battery voltage must not exceed 24V",
      "Teams get 3 minutes per match",
      "Knockout or judges' decision determines winner",
      "Safety gear mandatory for pit crew"
    ],
    contact: {
      name: "Arun Menon",
      phone: "+91 87654 32109"
    }
  },
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
