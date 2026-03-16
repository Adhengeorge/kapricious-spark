import { DepartmentEvent } from "./types";

export const eeeEvents: DepartmentEvent[] = [
  {
    id: "arduino-crafters",
    title: "Arduino Crafters",
    teamSize: 1,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details:
      "Design, code, and demo a working Arduino project using modular sensors and actuators. Creativity and reliability are key.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "EEE Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Boards and sensors provided",
      "Time limit: 90 minutes",
      "Code must be documented",
      "Judging: innovation, functionality, documentation",
      "No pre-built modules allowed"
    ],
    highlights: [
      "Hands-on embedded coding",
      "Create working demos",
      "Learn Arduino wiring",
      "Expert feedback"
    ]
  },
  {
    id: "zap-free-zone",
    title: "Zap Free Zone",
    teamSize: 1,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details:
      "Navigate a reaction-driven arena while avoiding zap zones and completing rapid-fire electrical challenges.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "EEE Department, KMEA Engineering College",
    rules: [
      "Solo participants",
      "Avoid touching marked zap zones",
      "Challenges come in rounds with increasing difficulty",
      "Timer stops on contact with forbidden areas",
      "Use provided toolkit only",
      "Fastest completion wins"
    ],
    highlights: [
      "Adrenaline-fueled reaction game",
      "Test reflexes and timing",
      "Multiple thrilling rounds",
      "Safety-first setup"
    ]
  },
  {
    id: "defuse-x",
    title: "Defuse-X",
    teamSize: 3,
    registrationFee: "₹150 per team",
    prizePool: "₹3,500",
    details:
      "A high-pressure challenge where teams decode clues and complete circuit puzzles to 'defuse' a mock device before time runs out.",
    prizes: ["🥇 ₹3,500"],
    type: "team",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:30 PM",
    venue: "EEE Lab, KMEA Engineering College",
    rules: [
      "Teams of three members",
      "Solve puzzles to unlock the next clue",
      "Communication only within the team",
      "Time limit: 30 minutes per round",
      "No outside assistance",
      "Fastest defusal wins"
    ],
    highlights: [
      "Team coordination",
      "Logical and circuit puzzles",
      "Tension-filled atmosphere",
      "Real-time scoring"
    ]
  },
  {
    id: "stacker-blocks",
    title: "Stacker Blocks",
    teamSize: 1,
    registrationFee: "₹30 per participant",
    prizePool: "₹800",
    details:
      "Stack as many blocks as possible while maintaining balance and speed. Each level ramps up the challenge.",
    prizes: ["🥇 ₹800"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "EEE Activity Zone, KMEA Engineering College",
    rules: [
      "Solo participation",
      "Stack blocks in allotted time",
      "Blocks shrink in size at higher levels",
      "Top score wins",
      "Multiple attempts allowed, best score counts",
      "No external aids"
    ],
    highlights: [
      "Fast-paced reflex test",
      "Simple yet addictive",
      "Quick rounds",
      "Ideal for casual participants"
    ]
  },
  {
    id: "power-play-arena",
    title: "Power Play Arena",
    teamSize: 4,
    registrationFee: "₹80 per participant",
    prizePool: "Nil",
    details:
      "Compete in popular console and PC titles inside a dedicated gaming arena. Score points, survive eliminations, and claim bragging rights.",
    prizes: ["Bragging rights and swag"],
    type: "team",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "10:00 AM - 6:00 PM",
    venue: "Gaming Zone, KMEA Engineering College",
    rules: [
      "Teams of up to four participants",
      "Multiple game titles in rotation",
      "Tournament bracket structure",
      "Fair play and sportsmanship required",
      "Controllers and consoles provided",
      "Participants responsible for their slots"
    ],
    highlights: [
      "Full-day gaming arena",
      "Multiple titles to choose",
      "Casual and competitive vibes",
      "Earn tournament points"
    ]
  }
];
