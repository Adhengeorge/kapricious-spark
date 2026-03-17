import { DepartmentEvent } from "./types";

export const eceEvents: DepartmentEvent[] = [
  {
    id: "e-solder",
    title: "Solder-Master",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹1,500",
    details:
      "Participants battle through rapid-fire circuit/frame challenges inspired by classic shooter missions.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B308",
    rules: [
      "Individual participation",
      "Battle stages are time-boxed",
      "No external hardware allowed",
      "Complete all phases to qualify for prizes",
      "Judging focuses on precision and speed",
      "Decision of the judges is final"
    ],
    highlights: [
      "Action-themed electronics",
      "Quick reflex challenges",
      "State-of-the-art lab setup",
      "New event format"
    ]
  },
  {
    id: "lazer-heist",
    title: "Lazer Heist",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹2,000",
    details:
      "Navigate through a grid of lasers to reach the vault without tripping any beam, testing focus and control.",
    prizes: ["🥇 ₹1,500", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B214",
    rules: [
      "Individual participation",
      "Laser grid is simulator based",
      "Three attempts per participant",
      "Touching a laser resets the attempt",
      "Judging: time and accuracy",
      "Participants must wear provided goggles"
    ],
    highlights: [
      "Immersive laser grid",
      "Precision & timing",
      "High-tech arena",
      "Thrilling finale"
    ]
  },
  {
    id: "electrodex",
    title: "ElectroDex",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹1,500",
    details:
      "A knowledge sprint reviewing electronic components, circuits, and communication systems across multiple rounds.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B307",
    rules: [
      "Individual participation",
      "Multiple-choice and puzzle rounds",
      "No electronic devices allowed",
      "Top scorers move to the finals",
      "Negative marking for wrong answers",
      "Judges decision is final"
    ],
    highlights: [
      "Comprehensive ECE quiz",
      "Multi-stage format",
      "Test your fundamentals",
      "Great learning opportunity"
    ]
  },
  {
    id: "electro-hunt",
    title: "Electro Hunt",
    teamSize: 1,
    registrationFee: "₹200 per team",
    prizePool: "₹3,000",
    details:
      "Decode clues, discover hidden checkpoints, and solve electronics-themed challenges across campus before time runs out.",
    prizes: ["🥇 ₹3,000"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Green Block",
    rules: [
      "Individual participation",
      "Complete sequential checkpoints",
      "Stay within campus boundaries",
      "No external help allowed",
      "Finishers ranked by time",
      "Organizers reserve the right to disqualify unfair play"
    ],
    highlights: [
      "Campus treasure hunt",
      "Electronics-themed clues",
      "Fast-paced adventure",
      "Fun competition"
    ]
  },
  {
    id: "code-red",
    title: "Code Red",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹1,500",
    details:
      "A high-pressure bomb defusal challenge where participants must identify the right wires, decode clues, and disarm the device before time runs out.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B303",
    rules: [
      "Individual participation",
      "Programming in C/C++ for microcontrollers",
      "Time limit: 90 minutes",
      "Code must run without errors on provided boards",
      "No pre-written templates allowed",
      "Internet access limited to offline docs"
    ],
    highlights: [
      "Embedded systems focus",
      "Hardware + software challenge",
      "Real IoT boards",
      "Round-the-clock support"
    ]
  }
];
