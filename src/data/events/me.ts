import { DepartmentEvent } from "./types";

export const meEvents: DepartmentEvent[] = [
  {
    id: "assemble-x",
    title: "ASSEMBLE X (VR-based EV Assembly Challenge)",
    teamSize: 1,
    registrationFee: "₹100 per team",
    prizePool: "₹7,500",
    details: "A VR-based EV assembly challenge testing speed, precision, technical skills, and innovation.",
    prizes: ["🥇 ₹5,000", "🥈 ₹2,500"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "VR Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "VR equipment will be provided",
      "Complete EV assembly in VR environment",
      "Fastest accurate assembly wins",
      "No prior VR experience required",
      "Safety briefing mandatory"
    ],
    highlights: [
      "Cutting-edge VR technology",
      "Electric vehicle assembly",
      "Immersive experience",
      "Learn EV components"
    ]
  },
  {
    id: "rc-trails",
    title: "RC-TRAILS",
    teamSize: 1,
    registrationFee: "₹200 per team",
    prizePool: "₹4,500",
    details: "High-speed RC lap time challenge testing precision, control, and fastest track performance.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Outdoor Track, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Bring your own RC car or use provided",
      "Multiple laps, best time counts",
      "Track boundaries must be followed",
      "No modifications during race",
      "Battery swaps allowed between runs"
    ],
    highlights: [
      "Exciting RC racing",
      "Professional track setup",
      "Multiple attempts",
      "Thrilling competition"
    ]
  },
  {
    id: "cad-combat",
    title: "CAD COMBAT",
    teamSize: 1,
    registrationFee: "₹100 per participant",
    prizePool: "₹3,000",
    details: "CAD design challenge testing precision, creativity, and engineering skills.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "CAD Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Software: AutoCAD/SolidWorks/Fusion 360",
      "Time limit: 90 minutes",
      "Design problem given at start",
      "Accuracy and creativity judged",
      "File submission in standard format"
    ],
    highlights: [
      "Industry-standard CAD software",
      "Real engineering problems",
      "Skill-based competition",
      "Great for portfolio"
    ]
  },
  {
    id: "technical-quiz",
    title: "Technical Quiz",
    teamSize: 2,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details: "Technical mechanical quiz testing core concepts, speed, accuracy, and engineering knowledge.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "team",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of 2 members",
      "Multiple rounds",
      "Mechanical engineering topics",
      "No electronic devices",
      "Negative marking applies",
      "Finals: Rapid fire round"
    ],
    highlights: [
      "Test your ME knowledge",
      "Multi-round format",
      "Team collaboration",
      "Exciting finals"
    ]
  },
  {
    id: "sustainable-innovation-pitching",
    title: "SUSTAINABLE INNOVATION PITCHING",
    teamSize: 4,
    registrationFee: "₹100 per participant",
    prizePool: "₹3,000",
    details: "Sustainability innovation pitch showcasing impactful, feasible, eco-friendly engineering solutions.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Conference Hall, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Pitch duration: 10 minutes",
      "Q&A: 5 minutes",
      "Presentation slides required",
      "Prototype/model preferred",
      "Judging: Innovation, Feasibility, Impact, Presentation"
    ],
    highlights: [
      "Showcase sustainable ideas",
      "Industry expert judges",
      "Networking opportunity",
      "Make real impact"
    ]
  },
  {
    id: "lathe-master",
    title: "LATHE MASTER",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,000",
    details: "Hands-on machining contest where participants shape raw material into a finished mechanical component using a lathe.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Workshop, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Safety gear mandatory",
      "Time limit: 45 minutes",
      "Raw material and tools provided",
      "Judging: Accuracy, Finish, Time",
      "Safety violations may disqualify"
    ],
    highlights: [
      "Real machining experience",
      "Work on actual lathe",
      "Learn workshop skills",
      "Certificate for all"
    ]
  }
];
