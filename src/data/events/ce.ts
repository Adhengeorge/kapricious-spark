import { DepartmentEvent } from "./types";

export const ceEvents: DepartmentEvent[] = [
  {
    id: "bridgit",
    title: "Bridgit (Bridge Modelling)",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹4,500",
    details:
      "Design and construct a bridge using limited materials. The structure will be tested for load bearing capacity and efficiency.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "9:00 AM - 1:00 PM",
    venue: "Civil Engineering Lab, KMEA Engineering College",
    rules: [
      "Teams of up to four members",
      "Use only the materials provided",
      "Maximum span: 50 cm",
      "Bridge must support the specified load",
      "Time limit: 3 hours",
      "Judging: load capacity, design, creativity"
    ],
    highlights: [
      "Hands-on structural design",
      "Real load testing",
      "Team collaboration",
      "Budget-aware engineering"
    ]
  },
  {
    id: "cad-illumina",
    title: "CAD Illumina",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,750",
    details:
      "A software-based drafting competition that tests speed, accuracy, and technical understanding on CAD tools.",
    prizes: ["🥇 ₹2,500", "🥈 ₹1,250"],
    type: "individual",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "Civil CAD Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "AutoCAD or similar software only",
      "Time limit: 90 minutes",
      "Problem statement issued at start",
      "File submission in standard format",
      "Judging: speed, accuracy, presentation"
    ],
    highlights: [
      "Industry-standard drafting",
      "Civil engineering focus",
      "Creativity under time pressure",
      "Portfolio-ready work"
    ]
  },
  {
    id: "movethon",
    title: "Movethon",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹4,500",
    details:
      "Teams develop creative solutions for real-world civil engineering problems and present their innovations.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Conference Hall, KMEA Engineering College",
    rules: [
      "Teams of four members",
      "Problem statements revealed at start",
      "Pitch must include feasibility study",
      "Presentations limited to 10 minutes",
      "Q&A for 5 minutes per team",
      "Judging: innovation, viability, presentation"
    ],
    highlights: [
      "Real-world civil challenges",
      "Innovation-focused",
      "Mentorship from faculty",
      "Networking opportunity"
    ]
  },
  {
    id: "quizzard",
    title: "Quizzard",
    teamSize: 2,
    registrationFee: "₹50 per team",
    prizePool: "₹4,500",
    details:
      "A multi-round technical quiz covering structures, surveying, materials, and smart infrastructure.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of two members",
      "Rounds: written, rapid-fire, buzzer",
      "Topics span structures, surveying, materials",
      "No electronic devices allowed",
      "Negative marking applies on written rounds",
      "Tie-breaker through buzzer round"
    ],
    highlights: [
      "Multi-level quiz format",
      "Civil engineering focus",
      "Team strategy is key",
      "Exciting buzzer finale"
    ]
  },
  {
    id: "infrahunt",
    title: "Infrahunt",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details:
      "A technical treasure hunt where teams solve civil engineering clues to reach the finish line.",
    prizes: ["🥇 ₹3,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Campus Wide, KMEA Engineering College",
    rules: [
      "Teams of four members",
      "Solve engineering-themed clues sequentially",
      "Stay within campus boundaries",
      "Clue books provided at each checkpoint",
      "No external assistance allowed",
      "First team to reach the treasure wins"
    ],
    highlights: [
      "Engineered treasure hunt",
      "Team adventure",
      "Puzzles rooted in civil themes",
      "Fun and learning"
    ]
  },
  {
    id: "structra",
    title: "Structra (Paper Tower Challenge)",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details:
      "Build the tallest freestanding tower using limited paper and materials within a fixed time to test creativity and structural stability.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "3:00 PM - 5:00 PM",
    venue: "Civil Lab, KMEA Engineering College",
    rules: [
      "Teams of four members",
      "Use only paper, tape, and glue",
      "Time limit: 45 minutes",
      "Tower must stand for at least 30 seconds",
      "Height measured at the highest stable point",
      "No external supports allowed"
    ],
    highlights: [
      "Creative structural challenge",
      "Tallest tower wins",
      "Team coordination",
      "Hands-on civil fundamentals"
    ]
  }
];
