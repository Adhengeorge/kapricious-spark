import { DepartmentEvent } from "./types";

export const ceEvents: DepartmentEvent[] = [
  {
    id: "bridgit",
    title: "BRIDGIT (Bridge Modelling Competition)",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹4,500",
    details: "A structural model-making competition where teams design and construct a bridge using limited materials. The model will be tested for load carrying capacity and structural efficiency.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:00 AM - 1:00 PM",
    venue: "Civil Lab, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Materials provided: ice cream sticks, glue",
      "Maximum span: 50cm",
      "Must support minimum 1kg load",
      "Time limit: 3 hours",
      "Judging: Load capacity, Design, Aesthetics"
    ],
    highlights: [
      "Hands-on structural design",
      "Real load testing",
      "Team collaboration",
      "Learn engineering principles"
    ]
  },
  {
    id: "cad-illumina",
    title: "CAD ILLUMINA",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,750",
    details: "A software-based drafting competition that evaluates students' technical accuracy, speed, and design understanding within a specified time.",
    prizes: ["🥇 ₹2,500", "🥈 ₹1,250"],
    type: "individual",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "CAD Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Software: AutoCAD",
      "Time limit: 90 minutes",
      "Civil engineering drawing given",
      "Accuracy is key",
      "Standard drafting conventions must be followed"
    ],
    highlights: [
      "Industry-standard software",
      "Civil engineering focus",
      "Skill-based competition",
      "Build your portfolio"
    ]
  },
  {
    id: "movethon",
    title: "MOVETHON",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹4,500",
    details: "A team event where students develop simple and innovative ideas to solve real-world civil engineering problems.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Conference Hall, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Problem statement given at start",
      "Develop innovative solution",
      "Presentation: 10 minutes",
      "Q&A: 5 minutes",
      "Judging: Innovation, Feasibility, Presentation"
    ],
    highlights: [
      "Real-world problems",
      "Innovation focused",
      "Present to experts",
      "Great networking"
    ]
  },
  {
    id: "quizzard",
    title: "QUIZZARD",
    teamSize: 2,
    registrationFee: "₹50 per team",
    prizePool: "₹4,500",
    details: "A knowledge-based competition focusing on core civil engineering subjects which is conducted in multi levels.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of 2 members",
      "Multiple rounds",
      "Topics: Structures, Surveying, Materials, etc.",
      "No electronic devices",
      "Negative marking in written round",
      "Finals: Buzzer round"
    ],
    highlights: [
      "Multi-level quiz",
      "Civil engineering focus",
      "Team participation",
      "Exciting buzzer round"
    ]
  },
  {
    id: "infrahunt",
    title: "INFRAHUNT (Treasure Hunt)",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details: "A fun, team-based event where participants solve engineering and technical-related clues to find the final treasure.",
    prizes: ["🥇 ₹3,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Campus Wide, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Follow clues in sequence",
      "Civil engineering themed clues",
      "First team to treasure wins",
      "No external help",
      "Stay within campus boundaries"
    ],
    highlights: [
      "Campus-wide hunt",
      "Engineering puzzles",
      "Team adventure",
      "Fun and learning"
    ]
  },
  {
    id: "structra",
    title: "STRUCTRA",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details: "A fun structural challenge where teams build the tallest free-standing tower using only paper and limited materials within a fixed time, testing creativity, stability, and basic engineering principles.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "3:00 PM - 5:00 PM",
    venue: "Civil Lab, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Materials: Paper, tape only",
      "Time limit: 45 minutes",
      "Tower must stand for 30 seconds",
      "Height measured at top",
      "No external support allowed"
    ],
    highlights: [
      "Tallest tower wins",
      "Creative challenge",
      "Team coordination",
      "Fun competition"
    ]
  }
];
